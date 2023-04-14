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


// Get all movies
app.get('/api/movies', (req, res) => {
  const sql = 'SELECT * FROM movies ORDER BY id DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving movies from database.' });
    } else {
      res.json(rows);
    }
  });
});

// Add a new movie
app.post('/api/movies', (req, res) => {
  const [ title, release_year, genre, director, star_actors ] = req.body;
  if (!title || !release_year || !genre || !director || !star_actors) {
    res.status(400).json({ error: 'Title, release year, genre, director, and star actors are required.' });
    return;
  }
  const sql = 'INSERT INTO movies (title, release_year, genre, director, star_actors) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [title, release_year, genre, director, star_actors ], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error adding movie to database.' });
    } else {
      res.json({ message: 'User added successfully.' });
    }
  });
});

// Update a movie
app.put('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const { title, release_year, genre, director, star_actors } = req.body;
  const sql = 'UPDATE movies SET title = ?, release_year = ?, genre = ?,  director = ?, star_actors = ? WHERE user_id = ?';
  db.run(sql, [title, release_year, genre,  director, star_actors, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error updating movie in database.' });
    } else {
      res.json({ message: 'User updated successfully.' });
    }
  });
});

// Delete a movie
app.delete('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM movies WHERE user_id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting movie from database.' });
    } else {
      res.json({ message: 'User deleted successfully.' });
    }
  });
});
