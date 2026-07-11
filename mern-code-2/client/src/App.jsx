import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {

  useEffect(() => {
    async function getTodos() {
      const { data } = await axios.get("http://localhost:9000/todo/getall");
      setTodos(data);
    }

    getTodos();
  }, []);

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEnter = (e) => {
    if (e.keyCode == 13 && e.target.value.trim() != "") {
      const newTodo = { id: todos.length + 1, title: e.target.value }
      const newTodos = [...todos, newTodo]
      axios.post("http://localhost:9000/todo/add", newTodo).then(() => {
        setTodos(newTodos);
        setTodo("");
      }).catch(() => {
        setTodos(todos);
        setTodo("");
      });
    };
  }

  const handleTodoclick = (id) => {
    let done = false;
    const newTodos = todos.map(todo => {
      if (todo.id == id) {
        todo.done = !todo.done;
        done = todo.done;
      }
      return todo;
    });
    axios.post("http://localhost:9000/todo/update", { id, done }).then(() => {
      setTodos(newTodos);
    }).catch(() => {
      setTodos(todos);
    });
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter(todo => todo.id != id);
    axios.delete(`http://localhost:9000/todo/delete/${id}`).then(() => {
      setTodos(newTodos);
    }).catch(() => {
      setTodos(todos);
    });
  }

  return (
    <>
      <h2>TODO App</h2>

      <label>
        Add Todo:&nbsp; <input value={todo} onChange={(e) => setTodo(e.target.value)} onKeyUp={handleEnter} />
      </label>

      <ul>
        {
          todos.map(todo => {
            return <li key={todo.id}>
              <span onClick={() => handleTodoclick(todo.id)} className={todo.done ? "strike" : ""}>{todo.title}</span>
              <button className='delete' onClick={() => handleDelete(todo.id)} >delete</button>
            </li>
          })
        }
      </ul>
    </>
  )
}

export default App
