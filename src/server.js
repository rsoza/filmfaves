const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new sqlite3.Database('./todos.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the todos database.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT NOT NULL, completed INTEGER NOT NULL DEFAULT 0)');

// Get all todos
app.get('/api/todos', (req, res) => {
  const sql = 'SELECT * FROM todos ORDER BY id DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving todos from database.' });
    } else {
      res.json(rows);
    }
  });
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  if (!task) {
    res.status(400).json({ error: 'Task is required.' });
    return;
  }
  const sql = 'INSERT INTO todos (task) VALUES (?)';
  db.run(sql, [task], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error adding todo to database.' });
    } else {
      res.json({ message: 'Todo added successfully.' });
    }
  });
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const sql = 'UPDATE todos SET completed = ? WHERE id = ?';
  db.run(sql, [completed, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error updating todo in database.' });
    } else {
      res.json({ message: 'Todo updated successfully.' });
    }
  });
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todos WHERE id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting todo from database.' });
    } else {
      res.json({ message: 'Todo deleted successfully.' });
    }
  });
});
