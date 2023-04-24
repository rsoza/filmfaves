# Database Description

This database is designed to store information about users, movies, reviews and watchlists. It includes four tables: users, movies, reviews, and watchlist.



## Tables
## `Users`

| `Column Name` | `Data Type`| `Primary Key` |`Not Null` | `Foreign Key` | `Foreign Key Constraint` |
| ----------- | --------------------- | --------------- | ------------------ | -------- | -------- |
| user_id     | INTEGER      | Yes        | Yes | No  | N/A |
| firstname   | VARCHAR(50)	 | No         | Yes | No  | N/A |
| lastname    | VARCHAR(50)	 | No         | Yes | No  | N/A |
| location    | VARCHAR(50)	 | No         | No  | No  | N/A |

### `Sample Data`
| `user_id`     | `firstname`      | `lastname`        | `location` |
| ----------- | --------------------- | -------- | -------- |
| 1 | John |Doe |	New York|
| 2 | Jane |Smith |	Los Angeles|


## `Movies`

| `Column Name` | `Data Type`| `Primary Key` |`Not Null` | `Foreign Key` | `Foreign Key Constraint` |
| ----------- | --------------------- | --------------- | ------------------ | -------- | -------- |
| movie_id     | INTEGER	 |  Yes | Yes   |	No  |	N/A |
| title        | VARCHAR(100)|	No  | Yes   |	No  |	N/A |
| release_year | INTEGER	 |  No  | Yes   |	No  |	N/A |
| genre        | VARCHAR(100)|	No  | No	|   No	|   N/A |
| director     | VARCHAR(100)|	No  | No	|   No	|   N/A |
| star_actors  | VARCHAR(500)|	No  | No	|   No	|   N/A |

### `Sample Data`
| `movie_id`     | `title`      | `release_year`    | `genre` | `director` | `star_actors` |
| ----------- | --------------------- | -------- | -------- | -------- | -------- |
|1 |The Shawshank Redemption|	1994|	Drama|	Frank Darabont|	Tim Robbins, Morgan Freeman|
|2 |The Godfather|	1972|	Crime	|Francis Ford Coppola|	Marlon Brando, Al Pacino|


## `Reviews`

| `Column Name` | `Data Type`| `Primary Key` |`Not Null` | `Foreign Key` | `Foreign Key Constraint` |
| ----------- | --------------------- | --------------- | ------------------ | -------- | -------- |
| review_id    | INTEGER	 |  Yes | Yes   |	No  |	N/A |
| user_id      | INTEGER     |	No  | Yes   |	No  |	REFERENCES users(user_id) ON DELETE CASCADE |
| movie_id     | INTEGER	 |  No  | Yes   |	No  |	REFERENCES movies(movie_id) ON DELETE CASCADE |
| rating       | INTEGER     |	No  | No	|   No	|   N/A |
|review_comment| TEXT        |	No  | No	|   No	|   N/A |

### `Sample Data`
| `review_id`     | `user_id`      | `movie_id`    | `rating` | `review_comment` | 
| ----------- | --------------------- | -------- | -------- | -------- | 
|1	|1	|1|	5|	"This is an amazing movie!"|
|2	|2	|2|	4|	"I really enjoyed this classic film."|


## `Watchlist`

| `Column Name` | `Data Type`| `Primary Key` |`Not Null` | `Foreign Key` | `Foreign Key Constraint` |
| ----------- | --------------------- | --------------- | ------------------ | -------- | -------- |
| watchlist_id    | INTEGER	 |  Yes | Yes   |	No  |	N/A |
| user_id      | INTEGER     |	No  | Yes   |	Yes  |	REFERENCES users(user_id) ON DELETE CASCADE |
| movie_id     | INTEGER	 |  No  | Yes   |	Yes  |	REFERENCES movies(movie_id) ON DELETE CASCADE |
| watched       | BOOLEAN     |	No  | Yes	|   No	|   N/A |

### `Sample Data`
| `watchlist_id`     | `user_id`      | `movie_id`    | `watched` |  
| ----------- | --------------------- | -------- | -------- | 
|1|1| 2| false|
|2|1| 3| false|

# 3NF Explanation
All tables in this database are in Third Normal Form (3NF). Each table has a primary key and all other attributes are dependent on the primary key. There are no transitive dependencies between non-key attributes. All foreign key constraints are properly enforced to maintain referential integrity.