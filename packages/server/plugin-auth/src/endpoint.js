const User = require("database/models/user");
const { requireAuth } = require("backend/middleware/auth");

exports.default = (router, v) => {
  router.post(v("/auth/login"), async (ctx, next) => {
    const { email, password } = ctx.request.body;
    if (!email || !password) {
      return ctx.throw(401, "email and password are required");
    }

    const authed = await User.login(email, password);
    if (!authed) {
      return ctx.throw(401, "invalid email or password");
    }

    ctx.body = {
      success: true,
      user: authed
    };
  });

  router.get(v("/auth/logout"), requireAuth, async (ctx, next) => {
    await ctx.state.user.save({ access_token: null }, { patch: true });
    ctx.body = {
      success: true
    };
  });

  router.get(v("/auth/status"), requireAuth, async (ctx, next) => {
    ctx.body = {
      authenticated: true,
      user: ctx.state.user
    };
  });
};
