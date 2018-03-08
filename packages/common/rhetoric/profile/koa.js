const Schrodinger = require("@collaboratory/schrodinger");
const compose = require("koa-compose");

const methods = [
  (ctx, next) => {
    ctx.test++;
    next();
  },
  (ctx, next) => {
    ctx.test += 2;
    next();
  },
  (ctx, next) => {
    ctx.test += 4;
    next();
  }
];

const results = [];
const composed = compose(methods);
const ctx = {
  test: 0
};
for (let i = 0; i < 10; i++) {
  results.push(
    Schrodinger.profile(() => {
      return composed(ctx);
    })
  );
}

Promise.all(results).then(resolved => {
  const totals = Schrodinger.sum(resolved);
  const averages = Schrodinger.average(resolved);
  console.log(totals, averages);
});
