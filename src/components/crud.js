const express = require("express");
const bodyParser = require("body-parser");
const sqlite = require("sqlite3").verbose();

// connection between database and react
const app = express();
const port = 3010;

// allows fetch
var cors = require("cors");
app.use(cors());

// interpreter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new sqlite.Database("./db.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the db.db database.");
});

/* USERS TABLES */

// Get all users
app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Error retrieving users from database." });
    } else {
      res.json(rows);
    }
  });
});

// Add a new user
app.post("/api/users", (req, res) => {
  const [firstname, lastname, location] = req.body;
  if (!firstname || !lastname || !location) {
    res
      .status(400)
      .json({ error: "First name, last name, and location are required." });
    return;
  }
  const sql =
    "INSERT INTO users (firstname, lastname, location) VALUES (?, ?, ?)";
  db.run(sql, [firstname, lastname, location], (err) => {
    if (err) {
      res.status(500).json({ error: "Error adding user to database." });
    } else {
      res.json({ message: "User added successfully." });
    }
  });
});

// Update a user
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, location } = req.body;
  const sql =
    "UPDATE users SET firstname = ?, lastname = ?, location = ? WHERE user_id = ?";
  db.run(sql, [firstname, lastname, location, id], (err) => {
    if (err) {
      res.status(500).json({ error: "Error updating user in database." });
    } else {
      res.json({ message: "User updated successfully." });
    }
  });
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE user_id = ?";
  db.run(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Error deleting user from database." });
    } else {
      res.json({ message: "User deleted successfully." });
    }
  });
});

/* MOVIES TABLE */

// Get all movies
app.get("/api/movies", (req, res) => {
  const sql = "SELECT * FROM movies";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Error retrieving movies from database." });
    } else {
      res.json(rows);
    }
  });
});

// Add a new movie
app.post("/api/movies", (req, res) => {
  const [title, release_year, genre, director, star_actors] = req.body;
  if (!title || !release_year || !genre || !director || !star_actors) {
    res
      .status(400)
      .json({
        error:
          "Title, release year, genre, director, and star actors are required.",
      });
    return;
  }
  const sql =
    "INSERT INTO movies (title, release_year, genre, director, star_actors) VALUES (?, ?, ?, ?, ?)";
  db.run(sql, [title, release_year, genre, director, star_actors], (err) => {
    if (err) {
      res.status(500).json({ error: "Error adding movie to database." });
    } else {
      res.json({ message: "User added successfully." });
    }
  });
});

// Update a movie
app.put("/api/movies/:id", (req, res) => {
  const { id } = req.params;
  const { title, release_year, genre, director, star_actors } = req.body;
  const sql =
    "UPDATE movies SET title = ?, release_year = ?, genre = ?,  director = ?, star_actors = ? WHERE user_id = ?";
  db.run(
    sql,
    [title, release_year, genre, director, star_actors, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Error updating movie in database." });
      } else {
        res.json({ message: "User updated successfully." });
      }
    }
  );
});

// Delete a movie
app.delete("/api/movies/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM movies WHERE user_id = ?";
  db.run(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Error deleting movie from database." });
    } else {
      res.json({ message: "User deleted successfully." });
    }
  });
});

/* REVIEWS TABLES */

// Get all reviews
app.get("/api/reviews", (req, res) => {
  const sql = "SELECT * FROM reviews";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Error retrieving reviews from database." });
    } else {
      res.json(rows);
    }
  });
});

// Add a new review
app.post("/api/reviews", (req, res) => {
  const [user_id, movie_id, rating, review_comment] = req.body;
  if (!user_id || !movie_id || !rating || !review_comment) {
    return;
  }
  const sql =
    "INSERT INTO reviews (user_id, movie_id, rating, review_comment) VALUES (?, ?, ?, ?)";
  db.run(sql, [user_id, movie_id, rating, review_comment], (err) => {
    if (err) {
      res.status(500).json({ error: "Error adding review to database." });
    } else {
      res.json({ message: "User added successfully." });
    }
  });
});

// Update a review
app.put("/api/reviews/:id", (req, res) => {
  const { id } = req.params;
  const { user_id, movie_id, rating, review_comment } = req.body;
  const sql =
    "UPDATE reviews SET user_id = ?, movie_id = ?, rating = ?,  review_comment = ? WHERE user_id = ?";
  db.run(sql, [user_id, movie_id, rating, review_comment, id], (err) => {
    if (err) {
      res.status(500).json({ error: "Error updating review in database." });
    } else {
      res.json({ message: "User updated successfully." });
    }
  });
});

// Delete a review
app.delete("/api/reviews/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM reviews WHERE user_id = ?";
  db.run(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Error deleting review from database." });
    } else {
      res.json({ message: "User deleted successfully." });
    }
  });
});

/* WATCHLIST TABLE */

// Get all watchlist
app.get("/api/watchlist", (req, res) => {
  const sql = "SELECT * FROM watchlist";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Error retrieving watchlist from database." });
    } else {
      res.set("Content-Type", "application/json"); // Set the Content-Type header
      res.json(rows);
    }
  });
});

// Add a new watchlist item
app.post("/api/watchlist", (req, res) => {
  const [user_id, movie_id] = req.body;
  if (!user_id || !movie_id) {
    res.status(400).json({ error: "User and movie ids are required." });
    return;
  }
  const sql = "INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)";
  db.run(sql, [user_id, movie_id], (err) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Error adding watchlist item to database." });
    } else {
      res.json({ message: "User added successfully." });
    }
  });
});

// Update a watchlist item
app.put("/api/watchlist/:id", (req, res) => {
  const { id } = req.params;
  const { user_id, movie_id } = req.body;
  const sql =
    "UPDATE watchlist SET user_id = ?, movie_id = ? WHERE user_id = ?";
  db.run(sql, [user_id, movie_id, id], (err) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Error updating watchlist item in database." });
    } else {
      res.json({ message: "User updated successfully." });
    }
  });
});

// Delete a watchlist item
app.delete("/api/watchlist/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM watchlist WHERE user_id = ?";
  db.run(sql, [id], (err) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Error deleting watchlist item from database." });
    } else {
      res.json({ message: "User deleted successfully." });
    }
  });
});

// Reviews full table
app.get("/api/fullReviewTable", (req, res) => {
  const sql = 
  `SELECT * 
  FROM reviews 
  JOIN movies ON movies.movie_id = reviews.movie_id 
  JOIN users ON users.user_id = reviews.user_id`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Error retrieving reviews from database." });
    } else {
      res.set("Content-Type", "application/json"); // Set the Content-Type header
      res.json(rows);
    }
  });
});


// Watchlist full table
app.get("/api/fullWatchlistTable", (req, res) => {
  const sql = 
  `SELECT * 
  FROM watchlist 
  JOIN movies ON movies.movie_id = watchlist.movie_id 
  JOIN users ON users.user_id = watchlist.user_id`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Error retrieving watchlist from database." });
    } else {
      res.set("Content-Type", "application/json"); // Set the Content-Type header
      res.json(rows);
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});