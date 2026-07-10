[<- Java DB](java-db-quick.md)

# Todo CRUD App with React, Spring Boot, and MySQL

Below is a complete guide for creating a **Todo CRUD App** using:

- **React** with **Vite** (frontend)
- **Spring Boot** (backend)
- **MySQL** (database)

---

## Backend: Spring Boot with MySQL

### 1. **Set Up Spring Boot Project**
1. Go to [Spring Initializr](https://start.spring.io/).
2. Create a project with these dependencies:
   - **Spring Web**
   - **Spring Data JPA**
   - **MySQL Driver**
   - **Spring Boot DevTools**
3. Download the project, extract it, and open it in your IDE.

---

### 2. **Configure `application.properties` for MySQL**

Add the following configurations in the `src/main/resources/application.properties` file:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/todo_app
spring.datasource.username=root
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
server.port=8080
```

Replace `your_mysql_password` with your MySQL password.

---

### 3. **Create the Todo Entity**

```java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private boolean completed;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
```

---

### 4. **Create the Repository**

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
```

---

### 5. **Create the Controller**

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173") // Vite frontend URL
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        return todoRepository.findById(id).map(todo -> {
            todo.setTitle(updatedTodo.getTitle());
            todo.setCompleted(updatedTodo.isCompleted());
            return todoRepository.save(todo);
        }).orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}
```

---

### 6. **Run the Application**
1. Start your MySQL server.
2. Create a database named `todo_app`.
3. Run the Spring Boot application. The backend will be available at `http://localhost:8080/api/todos`.

---

## Frontend: React with Vite

### 1. **Set Up React Project with Vite**
1. Create a new React app:
   ```bash
   npm create vite@latest todo-app --template react
   cd todo-app
   npm install
   ```
2. Install Axios for API calls:
   ```bash
   npm install axios
   ```

---

### 2. **Create the Todo Component**

#### **App.jsx**
```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const API_URL = "http://localhost:8080/api/todos";

  // Fetch all todos
  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const response = await axios.post(API_URL, { title: newTodo, completed: false });
      setTodos([...todos, response.data]);
      setNewTodo("");
    }
  };

  // Toggle completion
  const toggleCompletion = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    const response = await axios.put(`${API_URL}/${todo.id}`, updatedTodo);
    setTodos(todos.map((t) => (t.id === todo.id ? response.data : t)));
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleCompletion(todo)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

---

### 3. **Run the Frontend**
1. Start the Vite server:
   ```bash
   npm run dev
   ```
2. Visit `http://localhost:5173` to see the React app.

---

## Features

1. **Create Todos**: Add new todo items to the list.
2. **Read Todos**: Fetch and display all existing todos.
3. **Update Todos**: Toggle completion status of a todo.
4. **Delete Todos**: Remove a todo from the list.

---

## Summary

1. **Backend**: Spring Boot provides REST APIs with endpoints for CRUD operations. MySQL stores the data persistently.
2. **Frontend**: React (using Vite) consumes the REST APIs to provide a dynamic user interface.
3. **Full Stack**: The React app communicates with the Spring Boot backend using Axios to perform CRUD operations.

---

[<- Java DB](java-db-quick.md)
