/* Database Schema
Table 1: Users
user_id (Primary key)
firstname
lastname
location
Functional dependencies:
user_id -> fn, ln, local


Table 2: Movies
movie_id (Primary key)
title
release_year
director_id
Functional dependencies:
movie_id -> title, release_year, director_id
Foreign key constraint:
director_id references Directors(director_id) ON DELETE CASCADE


Table 3: Reviews
review_id (Primary key)
movie_id (Foreign key)
user_id (Foreign key)
rating
review_text
created_at
Functional dependencies:
review_id -> movie_id, user_id, rating, review_text, created_at
(movie_id, user_id) -> rating, review_text, created_at
Foreign key constraints:
movie_id references Movies(movie_id) ON DELETE CASCADE
user_id references Users(user_id) ON DELETE CASCADE


Table 4: Watchlist
user_id (Foreign key, Primary key)
movie_id (Foreign key, Primary key)

Functional dependencies:
(user_id, movie_id) -> added_at
Foreign key constraints:
user_id references Users(user_id) ON DELETE CASCADE
movie_id references Movies(movie_id) ON DELETE CASCADE

*/

const sqlite = require("sqlite3").verbose();
var sql;

// connect to db
let db = new sqlite.Database('./db.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the ./db.db.');
});

// create tables

// table for users
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    location VARCHAR(50)
    );
    `);
// table for movies
db.run(`
  CREATE TABLE IF NOT EXISTS movies (
    movies_id INTEGER PRIMARY KEY,
    title VARCHAR(100),
    release_year INTEGER NOT NULL,
    genre VARCHAR(100),
    director VARCHAR(100),
    star_actors VARCHAR(500)
    );
    `);
// table for reviews
db.run(`
  CREATE TABLE IF NOT EXISTS reviews (
    reviews_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    movie_id INTEGER NOT NULL REFERENCES movies(movie_id) ON DELETE CASCADE,
    rating INTEGER NOT NULL,
    review_comment TEXT,
    UNIQUE(user_id,movie_id));
    `);
// table for watchlist
db.run(`
  CREATE TABLE IF NOT EXISTS watchlist (
    watchlist_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    movie_id INTEGER NOT NULL REFERENCES movies(movie_id) ON DELETE CASCADE,
    UNIQUE(user_id,movie_id));
    `);

// // data generated by chatGPT
// const users = [
//   ['John', 'Doe', 'New York'],
//   ['Jane', 'Doe', 'Los Angeles'],
//   ['Bob', 'Smith', 'Chicago'],
//   ['Alice', 'Johnson', 'San Francisco'],
//   ['David', 'Lee', 'Seattle']
// ];


// // insert info for users
// sql = `INSERT INTO users(firstname, lastname, location) VALUES (?,?,?)`;
// users.forEach( (user) =>{
//   db.run(sql, user, (error) => {
//     if (error) return console.error(error.message);
//     console.log(`Rows inserted ${this.changes}`);
//   });
// });


// // data generated by chatGPT
// const movies = [
//   ["The Shawshank Redemption", 1994, "Drama", "Frank Darabont", "Tim Robbins, Morgan Freeman"],
//   ["The Godfather", 1972, "Crime", "Francis Ford Coppola", "Marlon Brando, Al Pacino"],
//   ["The Dark Knight", 2008, "Action", "Christopher Nolan", "Christian Bale, Heath Ledger, Aaron Eckhart"],
//   ["Pulp Fiction", 1994, "Crime", "Quentin Tarantino", "John Travolta, Uma Thurman, Samuel L. Jackson"],
//   ["Forrest Gump", 1994, "Drama", "Robert Zemeckis", "Tom Hanks, Robin Wright, Gary Sinise"],
//   ["The Matrix", 1999, "Action", "The Wachowskis", "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss"],
//   ["Star Wars: Episode IV - A New Hope", 1977, "Action", "George Lucas", "Mark Hamill, Harrison Ford, Carrie Fisher"],
//   ["The Silence of the Lambs", 1991, "Thriller", "Jonathan Demme", "Jodie Foster, Anthony Hopkins, Scott Glenn"],
//   ["Jurassic Park", 1993, "Adventure", "Steven Spielberg", "Sam Neill, Laura Dern, Jeff Goldblum"],
//   ["The Lord of the Rings: The Fellowship of the Ring", 2001, "Adventure", "Peter Jackson", "Elijah Wood, Ian McKellen, Orlando Bloom"]
// ];

// // insert info for movies
// sql = `INSERT INTO movies(title, release_year, genre, director, star_actors) VALUES (?,?,?,?,?)`;
// movies.forEach( (user) =>{
//   db.run(sql, user, (error) => {
//     if (error) return console.error(error.message);
//     console.log(`Rows inserted ${this.changes}`);
//   });
// });


// // data generated by chatGPT
// const reviews = [
//   [1, 1, 9, 'Great movie!'],
//   [3, 10, 8, 'Enjoyable, but not as good as the book'],
//   [1, 2, 7, 'Decent movie, good acting'],
//   [4, 3, 6, 'Not my favorite genre, but the plot was interesting'],
//   [5, 4, 8, 'Loved the soundtrack and visuals'],
//   [5, 5, 9, 'Amazing film, highly recommend it'],
//   [4, 6, 5, 'Disappointing adaptation'],
//   [3, 7, 7, 'Solid movie, good performances'],
//   [2, 8, 6, 'Liked it, but not my favorite'],
//   [1, 9, 9, 'One of my all-time favorites'],
//   [9, 1, 4, "This movie was bananas! I laughed so hard I cried."],
//   [2, 3, 3, "It was okay. Not the best, but not the worst either."],
//   [3, 2, 5, "Wow, just wow. This movie blew my mind."],
//   [4, 1, 2, "Meh, it was okay. I've seen better."],
//   [3, 4, 4, "Hilarious! I can't remember the last time I laughed so hard."],
// ];
// // insert data for reviews
// sql = `INSERT INTO reviews (user_id, movie_id, rating, review_comment) VALUES (?,?,?,?)`;
// reviews.forEach( (user) =>{
//   db.run(sql, user, (error) => {
//     if (error) return console.error(error.message);
//     console.log(`Rows inserted ${this.changes}`);
//   });
// });


// data generated by chatGPT
const watchlist = [
  [1, 2],
  [1, 3],
  [1, 6],
  [2, 1],
  [2, 4],
  [2, 7],
  [3, 2],
  [3, 5],
  [3, 9]
];
// // insert data for watchlist
// sql = `INSERT INTO watchlist (user_id, movie_id) VALUES (?,?)`;
// watchlist.forEach( (user) =>{
//   db.run(sql, user, (error) => {
//     if (error) return console.error(error.message);
//     console.log(`Rows inserted ${this.changes}`);
//   });
// });

// // display data
// sql = `SELECT * FROM watchlist`;
// db.all(sql, [], (error, rows) => {
//   if (error) return console.error(error.message);
//   console.log(rows);
// });


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});