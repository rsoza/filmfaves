const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// connection between database and react
const app = express();
const port = 3001;

// interpreter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new sqlite3.Database('./db.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the db.db database.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});


// Get all users
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users ORDER BY id DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving users from database.' });
    } else {
      res.json(rows);
    }
  });
});

// Add a new user
app.post('/api/users', (req, res) => {
  const [ firstname, lastname, location ] = req.body;
  if (!firstname || !lastname || !location) {
    res.status(400).json({ error: 'First name, last name, and location are required.' });
    return;
  }
  const sql = 'INSERT INTO users (firstname, lastname, location) VALUES (?, ?, ?)';
  db.run(sql, [firstname, lastname, location], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error adding user to database.' });
    } else {
      res.json({ message: 'User added successfully.' });
    }
  });
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, location } = req.body;
  const sql = 'UPDATE users SET firstname = ?, lastname = ?, location = ? WHERE user_id = ?';
  db.run(sql, [firstname, lastname, location, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error updating user in database.' });
    } else {
      res.json({ message: 'User updated successfully.' });
    }
  });
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE user_id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting user from database.' });
    } else {
      res.json({ message: 'User deleted successfully.' });
    }
  });
});
