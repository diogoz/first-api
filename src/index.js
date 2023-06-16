const http = require("http");
const routes = require("./routes");
const url = require("url");
const bodyParser = require("./helper/bodyParser");

const server = http.createServer((request, response) => {
  // fazer o parse da URL para conseguir extrair os queryParams
  // e o true é pra transformar a string em um objeto
  const parsedUrl = url.parse(request.url, true);

  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  let { pathname } = parsedUrl;
  let id = null;

  // identificar quando o usuario estiver mandando uma requisição com o ID
  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`; // e quando tiver ID, colocar no placeholder :id pra localizar a rota
    id = splitEndpoint[1]; // salva o id que está chegando na rota.
  }
  // pesquisa dentro do array de rota, alguma rota que faça match de endpoint e method com o que ta chegando na url
  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method
  );

  if (route) {
    // injetamos o  queryParams dentro do request quando encontrar uma rota
    request.query = parsedUrl.query;
    request.params = { id }; // injeta o ID na propriedade params(obj)

    // criação do metodo (response.send) para facilitar para nao ter que fazer writeHead e end
    // toda vez  que quer enviar uma resposta pra nossa requisição
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { "Content-Type": "application/json" });
      response.end(JSON.stringify(body));
    };

    // verificação do metodo HTTP que ta chegando é post, put, patch e se tiver
    // executa a função bodyParser pra conseguir pegar string do body e transf. em obj JSON
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    // se nao existir a rota, exibi um erro 404 que a rota nao foi encontrada
    response.writeHead(404, { "content-type": "text/html" });
    response.end(`Cannot: ${request.method} ${parsedUrl.pathname}`);
  }
});
server.listen(3000, () =>
  console.log("Server started at http://localhost:3000")
);
