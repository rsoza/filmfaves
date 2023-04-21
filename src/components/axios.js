import axios from "axios";

export async function getUsers() {
  try {
    const response = await axios.get("http://localhost:8080/api/users");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMovies() {
  try {
    const response = await axios.get("http://localhost:8080/api/movies");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getReviews() {
  try {
    const response = await axios.get("http://localhost:8080/api/reviews");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBobsReviews() {
  try {
    const response = await axios.get("http://localhost:8080/api/bobsreviews");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/reviews/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function getWatchlist() {
  try {
    const response = await axios.get("http://localhost:8080/api/watchlist");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFullReviews() {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/fullReviewTable"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFullWatchlist() {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/fullWatchlistTable"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getUserWatchlistByWatched = async (id, watched) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/fullUsersWatchlistTable/${id}`,
      {
        params: { watched: watched },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteMovieFromWatchlist = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/watchlist/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateWatchlist = async (id, user_id, movie_id, watched) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/watchlist/${id}`,
      {
        user_id,
        movie_id,
        watched,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postNewWatchlist = async (user_id, movie_id, watched) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/watchlist`, {
      user_id: user_id,
      movie_id: movie_id,
      watched: watched,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postNewReview = async (
  user_id,
  movie_id,
  rating,
  review_comment
) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/reviews`, {
      user_id: user_id,
      movie_id: movie_id,
      rating: rating,
      review_comment: review_comment,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
