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


// Get all reviews
app.get('/api/reviews', (req, res) => {
  const sql = 'SELECT * FROM reviews ORDER BY id DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving reviews from database.' });
    } else {
      res.json(rows);
    }
  });
});

// Add a new review
app.post('/api/reviews', (req, res) => {
  const [ user_id, movie_id, rating, review_comment ] = req.body;
  if (!user_id || !movie_id || !rating || !review_comment) {
    return;
  }
  const sql = 'INSERT INTO reviews (user_id, movie_id, rating, review_comment) VALUES (?, ?, ?, ?)';
  db.run(sql, [user_id, movie_id, rating, review_comment ], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error adding review to database.' });
    } else {
      res.json({ message: 'User added successfully.' });
    }
  });
});

// Update a review
app.put('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, movie_id, rating, review_comment } = req.body;
  const sql = 'UPDATE reviews SET user_id = ?, movie_id = ?, rating = ?,  review_comment = ? WHERE user_id = ?';
  db.run(sql, [user_id, movie_id, rating,  review_comment, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error updating review in database.' });
    } else {
      res.json({ message: 'User updated successfully.' });
    }
  });
});

// Delete a review
app.delete('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM reviews WHERE user_id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting review from database.' });
    } else {
      res.json({ message: 'User deleted successfully.' });
    }
  });
});
