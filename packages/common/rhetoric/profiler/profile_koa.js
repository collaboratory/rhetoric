const compose = require("koa-compose");
const config = require("./middleware_config");
config.profiler(compose);
