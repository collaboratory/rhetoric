const { Middleware } = require("../dist/main");
const config = require("./middleware_config");
config.profiler(Middleware.compose);
