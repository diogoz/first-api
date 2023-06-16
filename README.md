# firstApi (JStack)

Esta é uma API simples de usuários desenvolvida em Node.js sem nenhum framework. Ela permite gerenciar usuários, incluindo a criação, atualização e exclusão de usuários, bem como a recuperação de informações de usuários individuais ou de todos os usuários.

## Requisitos

- Node.js instalado na máquina.

## 🔥 Instalação

- Clone este repositório.

```sh
git clone https://github.com/renatojfsantos/JStack-firstApi.git
```

## Uso

1 - Inicie o servidor com o seguinte comando atráves do terminal integrado:

```sh
node src/index.js
```

2 - A API estará disponível em `http://localhost:3000`


## Endpoints

### A API possui os seguintes endpoints:

##
### Request `GET /users`
- Retorna uma lista de todos os usuários cadastrados na API.
### Response
```json
[
  {
    "id": 1,
    "name": "John Doe"
  },
  {
    "id": 2,
    "name": "Fulado de tal"
  }
    {
    "id": 3,
    "name": "Foo"
  }
]
```
##
### Request `GET /users/:id`
- Retorna informações de um usuário específico com base no ID fornecido.
### Response
```json
{
  "id": 1,
  "name": "John Doe"
}
```
##
### Request `POST /users`
- Cria um novo usuário na API. O usuário deve ser fornecido no corpo da solicitação em formato JSON.
```json
{
  "name": "Mary Smith"
}
```
### Response
```json
{
  "id": 4,
  "name": "Mary Smith"
}
```
##
### Request `PUT /users/:id`
- Atualiza um usuário existente com base no ID fornecido. O usuário deve ser fornecido no corpo da solicitação em formato JSON.
```json
{
  "name": "Sir John"
}
```
### Response
```json
{
  "id": 4,
  "name": "Sir John"
}
```
##
### Request `DELETE /users/:id`
- Exclui um usuário específico com base no ID fornecido.
### Response
```json
{
	"deleted": true
}
```

## 📂 Arquivos e diretórios

A estrutura de arquivos da aplicação é organizada da seguinte forma:

```plainText
src
│ ├──controllers
│ │  └─ UserController.js
│ ├──helpers
│ │  └─ bodyParser.js
│ ├──mocks
│ │  └─ users.js
│ ├──index.js
│ └──routes.js
└─ README.md
```


- **`src`:** Este diretório contém todos os arquivos relacionados ao código-fonte da aplicação.
  - **`controllers`:** Este diretório contém os arquivos que implementam as funções de controle de rota. O arquivo `UserController.js` define as funções de controle de rota para o recurso de usuário.
  - **`helpers`:** Este diretório contém os arquivos auxiliares para a aplicação. O arquivo `bodyParser.js` é responsável por fazer o parse do corpo da solicitação HTTP e retornar um objeto JavaScript.
  - **`mocks`:** Este diretório contém arquivo de mock usados para simular usuários já cadastrados. O arquivo `users.js` contém um array de objetos de usuários que podem ser usados para simular um banco de dados..
  - **`index.js`:** Este arquivo é o arquivo principal que cria o servidor HTTP. Ele usa o módulo `http` do Node.js para criar o servidor, e define as funções de callback que serão chamadas sempre que uma solicitação HTTP for recebida.
  - **`routes.js`:** Este arquivo define todas as rotas da aplicação e associa cada rota a uma função de controle de rota. Cada rota é definida usando um objeto JavaScript que especifica o método HTTP (por exemplo, GET, POST, PUT ou DELETE), o caminho da rota e a função de controle de rota correspondente.

## Contribuindo
Se você quiser contribuir para esta aplicação, sinta-se à vontade para enviar um pull request ou abrir uma issue. Todos os contribuidores são bem-vindos!
