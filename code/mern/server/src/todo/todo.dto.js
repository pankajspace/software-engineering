// DTO for TODO
// The purpose of the DTO is to provide a simple interface for the client to interact with the entity.
// The DTO is a simple class that has the same properties as the entity it represents.
// The DTO is used to transfer data between the client and the server.
// The DTO is used to hide the implementation details of the entity from the client.
// The DTO is used to decouple the client from the server.

class TodoDTO {
  constructor(todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.done = todo.done;
  }
}

module.exports = TodoDTO;
