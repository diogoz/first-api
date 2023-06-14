const http = require("http");
const routes = require("./routes");
const url = require("url");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);

  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method
  );

  if (route) {
    request.query = parsedUrl.query;
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { "Content-Type": "application/json" });
      response.send(JSON.stringify(body));
    };

    route.handler(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.send(`Cannot ${request.method} ${request.url}`);
  }
});
server.listen(3000, () =>
  console.log("Server started at http://localhost:3000")
);
