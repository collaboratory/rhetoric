const http = require("http");
const qs = require("querystring");

/**
 *
 * @param port
 * @param host
 * @param config
 * @returns {function(*=, *)}
 * @constructor
 */
export function WebProvider({ port = 3000, host = "127.0.0.1", ...config }) {
  // TODO: Make use of config & service variables
  return (onRequest, service) => {
    const server = http.createServer((req, res) => {
      console.time("request");
      WebContext(req, res).then(ctx => {
        return Promise.resolve(onRequest(ctx, "web"))
          .then(() => {
            if (!ctx.handled) {
              inspectMemory();
              if (ctx.response.body && typeof ctx.response.body !== "string") {
                ctx.response.head["Content-Type"] = "text/json";
                ctx.response.body = JSON.stringify(ctx.response.body);
              }

              res.writeHead(ctx.response.status, ctx.response.head);
              res.write(ctx.response.body);
              res.addTrailers(ctx.response.trailers);
              console.timeEnd("request");
              return res.end();
            }
          })
          .catch(err => {
            inspectMemory();
            console.timeEnd("request");
            throw err;
          });
      });
    });

    console.log(`Craft web provider listening at ${host}:${port}`);
    server.listen(port, host);

    server.on("clientError", (err, socket) =>
      onRequest(WebContext(null, null, err))
    );
  };
}
export default WebProvider;

function inspectMemory() {
  console.log(
    `memory: ${Math.round(
      process.memoryUsage().heapUsed / 1024 / 1024 * 100
    )}MB`
  );
}

export function convertMiddleware(fn, finalize = false) {
  return async (ctx, next) => {
    try {
      if (finalize) {
        ctx.handled = true;
      }
      const req = ctx.request.raw();
      const res = ctx.response.raw();
      await fn(req, res, next);
    } catch (e) {
      console.error(e);
    }
  };
}

export function WebContext(req = null, res = null, error = null, data = {}) {
  const [url, queryString = ""] = req.url.split("?");
  const query = qs.parse(queryString);

  const ctx = {
    request: {
      url,
      query,
      data: [],
      raw: () => req
    },
    response: {
      status: 200,
      head: {},
      trailers: {},
      body: "",
      raw: () => res
    },
    ...data
  };

  return new Promise((resolve, reject) => {
    req
      .on("data", chunk => {
        ctx.request.data.push(chunk);
      })
      .on("end", () => {
        ctx.request.data = Buffer.concat(ctx.request.data).toString();
        try {
          ctx.request.data = JSON.parse(ctx.request.data);
        } catch (e) {
          ctx.request.data = qs.parse(ctx.request.data);
        }
        resolve(ctx);
      })
      .on("error", reject);
  });
}
