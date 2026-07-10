const TodoService = require('./todo.service');

// Creating TODO controller
// The purpose of the controller layer is to separate the business logic from the client and the server.
// The controller is responsible for handling the incoming requests from the client.
// The controller is responsible for calling the service layer to execute the business logic.
// The controller is responsible for returning the response to the client.
// The controller is responsible for handling the errors.
// The controller is responsible for handling the exceptions.
class TodoController {
  constructor(todoService) {
    this.todoService = todoService;
  }

  insertAll = async (req, res) => {
    try {
      await this.todoService.insertAll(req, res);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  getAll = async (req, res) => {
    try {
      await this.todoService.getAll(req, res);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  add = async (req, res) => {
    try {
      await this.todoService.add(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }

  update = async (req, res) => {
    try {
      await this.todoService.update(req, res);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  remove = async (req, res) => {
    try {
      await this.todoService.remove(req, res);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new TodoController(new TodoService());
