const { compose } = require("../dist/main");
const config = require("./middleware_config");
config.profiler(compose);
