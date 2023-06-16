function bodyParser(request, callback) {
  let body = "";

  // metodo para "ouvir" as mensagens que estao chegando do body
  request.on("data", (chunk) => {
    body += chunk; // a cada vez que chega informação, concatena na variavel body
  });

  //quando chega a ultima informação dentro do body, chama o evento end
  request.on("end", () => {
    body = JSON.parse(body); // faz o parse do body para transformar string em obj JSON
    request.body = body; // injeta esse obj dentro do request na propriedade body
    callback(); // e chama a função callback do bodyParser, que é o route.handler
  });
}

module.exports = bodyParser;
