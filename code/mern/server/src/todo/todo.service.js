const TodoDTO = require('./todo.dto');
const { Todo } = require('./todo.model');

// TODO Service
// The purpose of the service layer is to separate the business logic from the controller.
// The service is responsible for executing the business logic.
// The service is responsible for handling the requests from the controller.
// The service is responsible for returning the response to the controller.
// The service is responsible for handling the errors.
// The service is responsible for handling the exceptions.
// The service is responsible for handling the validation.
class TodoService {
  constructor() {
    this.Todo = Todo;
  }

  async insertAll(req, res) {
    await this.Todo.insertMany([
      { id: 1, title: "First Todo", done: false },
      { id: 2, title: "Second Todo", done: false },
      { id: 3, title: "Third Todo", done: false }
    ]);
    res.status(200).send("Inserted all todos!");
  }

  async getAll(req, res) {
    try {
      const todos = await this.Todo.find({});
      const todosDTO = todos.map(todo => new TodoDTO(todo));
      res.status(200).send(todosDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async add(req, res) {
    const newTodo = new this.Todo({
      id: req.body.id,
      title: req.body.title,
      done: req.body.done
    });
    await newTodo.save();
    res.status(200).send("Todo added successfully!");
  }

  async update(req, res) {
    await this.Todo.updateOne({ id: req.body.id }, { done: req.body.done });
    res.status(200).send("Todo updated successfully!");
  }

  async remove(req, res) {
    await this.Todo.deleteOne({ id: req.params.id });
    res.status(200).send("Todo deleted successfully!");
  }
}

module.exports = TodoService;