const compose = require("./compose");
const config = require("./middleware_config");
config.profiler(compose);
