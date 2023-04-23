## Table creation

Users

```bash
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    location VARCHAR(50)
    );
    `);
```

Movies

```bash
  db.run(`
  CREATE TABLE IF NOT EXISTS movies (
    movie_id INTEGER PRIMARY KEY,
    title VARCHAR(100),
    release_year INTEGER NOT NULL,
    genre VARCHAR(100),
    director VARCHAR(100),
    star_actors VARCHAR(500)
    );
    `);
```

Reviews

```bash
    CREATE TABLE IF NOT EXISTS reviews (
    review_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    movie_id INTEGER NOT NULL REFERENCES movies(movie_id) ON DELETE CASCADE,
    rating INTEGER NOT NULL,
    review_comment TEXT,
    UNIQUE(user_id,movie_id));
    `);
```

Watchlist

```bash
  db.run(`
  CREATE TABLE IF NOT EXISTS watchlist (
    watchlist_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    movie_id INTEGER NOT NULL REFERENCES movies(movie_id) ON DELETE CASCADE,
    watched BOOLEAN NOT NULL DEFAULT false,
    UNIQUE(user_id,movie_id));
    `);
```
