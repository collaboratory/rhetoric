module.exports.default = (router, v) => {
  router.get(v("/"), (ctx, next) => {
    ctx.body = {
      version: "1.0"
    };
  });
};
