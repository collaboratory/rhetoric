const { CraftServer } = require("@collaboratory/craft-server");
const {
  WebProvider,
  Router
} = require("@collaboratory/craft-server-provider-web");

const app = new CraftServer();
const router = new Router();

app.addProvider(
  "web1",
  WebProvider({
    port: 3000
  })
);

app.addProvider(
  "web2",
  WebProvider({
    port: 3001
  })
);

router.use("/asdf", async (ctx, next) => {
  ctx.response.body = {
    asdf: true
  };
  await next();
});

router.use("/", async (ctx, next) => {
  ctx.response.body = {
    version: "0.1a"
  };
  await next();
});

app.addMiddleware(router.middleware, "web1");
