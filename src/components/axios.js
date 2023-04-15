import axios from 'axios';

export async function getUsers() {
  try {
    const response = await axios.get('http://localhost:3010/api/users');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function getMovies() {
  try {
    const response = await axios.get('http://localhost:3010/api/movies');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export async function getReviews() {
  try {
    const response = await axios.get('http://localhost:3010/api/reviews');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function getWatchlist() {
  try {
    const response = await axios.get('http://localhost:3010/api/watchlist');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function getFullReviews() {
  try {
    const response = await axios.get('http://localhost:3010/api/fullReviewTable');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function getFullWatchlist() {
  try {
    const response = await axios.get('http://localhost:3010/api/fullWatchlistTable');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
