import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      return;
    }
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    })
      .then(() => {
        setTodos([...todos, { task, completed: 0 }]);
        setTask('');
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((err) => console.error(err));
  };

  const handleComplete = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: todo.completed ? 0 : 1 }),
    })
      .then(() => {
        const newTodos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: todo.completed ? 0 : 1 };
          }
          return todo;
        });
        setTodos(newTodos);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <Navbar />
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.task}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleComplete(todo.id)}>
              {todo.completed ? 'Incomplete' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;