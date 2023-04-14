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


// Get all watchlist
app.get('/api/watchlist', (req, res) => {
  const sql = 'SELECT * FROM watchlist ORDER BY id DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving watchlist from database.' });
    } else {
      res.json(rows);
    }
  });
});

// Add a new watchlist item
app.post('/api/watchlist', (req, res) => {
  const [ user_id, movie_id ] = req.body;
  if (!user_id || !movie_id) {
    res.status(400).json({ error: 'User and movie are required.' });
    return;
  }
  const sql = 'INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)';
  db.run(sql, [user_id, movie_id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error adding watchlist item to database.' });
    } else {
      res.json({ message: 'User added successfully.' });
    }
  });
});

// Update a watchlist item
app.put('/api/watchlist/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, movie_id } = req.body;
  const sql = 'UPDATE watchlist SET user_id = ?, movie_id = ? WHERE user_id = ?';
  db.run(sql, [user_id, movie_id, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error updating watchlist item in database.' });
    } else {
      res.json({ message: 'User updated successfully.' });
    }
  });
});

// Delete a watchlist item
app.delete('/api/watchlist/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM watchlist WHERE user_id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting watchlist item from database.' });
    } else {
      res.json({ message: 'User deleted successfully.' });
    }
  });
});
