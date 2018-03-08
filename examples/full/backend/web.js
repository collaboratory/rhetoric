const { CraftServer } = require("@collaboratory/craft-server");
const {
  CraftWebProvider
} = require("@collaboratory/craft-server-provider-web");

const app = new CraftServer();

app.addProvider(
  "web1",
  CraftWebProvider({
    port: 3000
  })
);

app.addProvider(
  "web2",
  CraftWebProvider({
    port: 3001
  })
);

app.addMiddleware(async (ctx, next) => {
  console.log("Incoming request", ctx);
  await next();
});

app.addMiddleware(async (ctx, next) => {
  ctx.response.status = 400;
  ctx.response.body = "Not found";
  await next();
}, "web1");

app.addMiddleware(async (ctx, next) => {
  ctx.response.body = {
    hello: "world"
  };
  await next();
}, "web2");
