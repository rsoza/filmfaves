const sqlite = require('sqlite3').verbose();
let sql;

const express = require('express');
const app = express();
const port = 3001;

// connect to db
const db = new sqlite.Database('./db.db', sqlite.OPEN_READWRITE, (error) => {
  if(error) return console.error(error);
});

// create tables
// sql = `CREATE TABLE user(ID INTEGER PRIMARY KEY, firstname, lastname, email, phone_number, school)`;
// db.run(sql);

// insert info
// sql = `INSERT INTO user(firstname, lastname, email, phone_number, school) VALUES (?,?,?,?,?)`;
// db.run(sql, ['Rebecca', 'Soza', 'bsoza93@gmail.com', '(786)222-2222', 'Wichita State University'], (error) => {
//   if (error) return console.error(error.message);
//   console.log(`Rows insertd ${this.changes}`);
// });

// display data
sql = `SELECT * FROM user`;
db.all(sql, [], (error, rows) => {
  if (error) return console.error(error.message);
  console.log(rows);
});
app.get('/user', (req, res) => {
  db.all('SELECT * FROM user', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching user from database');
    } else {
      res.send(rows);
    }
  });
});

// app.listen(port, () => {
//   console.log(`Express server listening on port ${port}`);
// });


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
