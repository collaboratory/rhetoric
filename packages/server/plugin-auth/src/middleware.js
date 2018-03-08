const compose = require("koa-compose");
const jwt = require("jsonwebtoken");
const { get } = require("lodash");
const User = require("database/models/user");

const authMiddleware = async (ctx, next) => {
  ctx.auth_error = false;

  const providedTokens = [
    "headers.authorization",
    "request.body.access_token",
    "query.access_token"
  ]
    .map(v => get(ctx, v, false))
    .filter(v => v);

  if (providedTokens.length === 0) {
    ctx.auth_error = "missing token";
  } else if (providedTokens.length > 1) {
    ctx.auth_error = "multiple tokens";
  } else {
    const tokenRaw = providedTokens
      .shift()
      .split(" ")
      .pop();
    const token = jwt.verify(tokenRaw, process.env.JWT_SECRET);

    if (!token) {
      ctx.auth_error = "invalid token";
    } else if (!token.id) {
      ctx.auth_error = "invalid token payload";
    } else {
      const user = await User.findOne({
        id: token.id,
        access_token: tokenRaw
      });

      if (!user) {
        ctx.auth_error = "user not found";
      } else {
        ctx.state.token = token;
        ctx.state.user = user;
      }
    }
  }

  await next();
};
exports.authMiddleware = authMiddleware;

const requireAuth = async (ctx, next) => {
  if (ctx.auth_error) {
    return ctx.throw(401, ctx.auth_error);
  } else if (!ctx.state.user) {
    return ctx.throw(401, "User not found");
  }

  await next();
};
exports.requireAuth = requireAuth;

const requireAdmin = compose([
  requireAuth,
  async (ctx, next) => {
    if (!ctx.state.user.attributes.superuser) {
      return ctx.throw(401, "Insufficient permissions");
    }
    await next();
  }
]);

exports.requireAdmin = async (ctx, next) => {
  await requireAdmin(ctx, next);
};
