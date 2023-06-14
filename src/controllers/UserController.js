// controlador é responsável por armazenar todas as regras de negócio da aplicação

// CRUD:
// Create(criar um novo usuario),
// read(fazer um get, pegar todos os usuarios, ou algum usuario pelo ID ),
// update  (fazer alguma mudança no usuario)
// delete (remover o usuario)

const users = require("../mocks/users");

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === "desc") {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });
    response.end(200, sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;
    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return response.end(400, { error: "User not found" });
    }

    response.end(200, user);
  },
};
