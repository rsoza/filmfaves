import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
} from "@chakra-ui/react";
import Navbar from "./navbar";

// AXIOS
import {
  getUsers,
  getMovies,
  getReviews,
  getWatchlist,
} from "./components/axios";

function Tables() {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    async function fetchTables() {
      const usersTable = await getUsers();
      setUsers(usersTable);

      const moviesTable = await getMovies();
      setMovies(moviesTable);

      const reviewsTable = await getReviews();
      setReviews(reviewsTable);

      const watchlistTables = await getWatchlist();
      setWatchlist(watchlistTables);
    }

    fetchTables();
  }, []);

  return (
    <>
      <Navbar />
      <div className="layout">
        <div>
          <Container maxW="2xl" bg="white" shadow="lg" centerContent>
            <TableContainer>
              USER TABLE
              <Table size="sm" overflowX="auto">
                <Thead>
                  <Tr>
                    <Th>user_id</Th>
                    <Th>Firstname</Th>
                    <Th>Lastname</Th>
                    <Th>Location</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => (
                    <Tr>
                      <Td>{user.user_id}</Td>
                      <Td>{user.firstname}</Td>
                      <Td>{user.lastname}</Td>
                      <Td>{user.location}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer>
              MOVIES TABLE
              <Table size="sm" overflowX="auto">
                <Thead>
                  <Tr>
                    <Th>movie_id</Th>
                    <Th>Title</Th>
                    <Th>Release Year</Th>
                    <Th>Genre</Th>
                    <Th>Director</Th>
                    <Th>Star Actors</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {movies.map((movie) => (
                    <Tr>
                      <Td>{movie.movie_id}</Td>
                      <Td>{movie.title}</Td>
                      <Td>{movie.release_year}</Td>
                      <Td>{movie.genre}</Td>
                      <Td>{movie.director}</Td>
                      <Td>{movie.star_actors}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer>
              REVIEWS TABLE
              <Table size="sm" overflowX="auto">
                <Thead>
                  <Tr>
                    <Th>review_id</Th>
                    <Th>user_id</Th>
                    <Th>movie_id</Th>
                    <Th>rating</Th>
                    <Th>review_comment</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {reviews.map((review) => (
                    <Tr>
                      <Td>{review.review_id}</Td>
                      <Td>{review.user_id}</Td>
                      <Td>{review.movie_id}</Td>
                      <Td>{review.rating}</Td>
                      <Td>{review.review_comment}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer>
              WATCHLIST TABLE
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>watchlist_id</Th>
                    <Th>user_id</Th>
                    <Th>movie_id</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {watchlist.map((watch) => (
                    <Tr>
                      <Td>{watch.watchlist_id}</Td>
                      <Td>{watch.user_id}</Td>
                      <Td>{watch.movie_id}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Tables;
