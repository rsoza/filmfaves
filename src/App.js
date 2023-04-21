import React, {useEffect, useState} from "react";
import Navbar from "./navbar";
import "./App.css";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import Review from "./components/review";
// import AddReview from "./components/addreview";
import Slide from "./components/filler/Slide";
import CurrentUserReview from "./components/filler/currentuser";

function App() {
  const [moviePosters, setMoviePosters] = useState([]);

  useEffect(() => {
    const apiKey = "9fcd7aea8c7932cc31bf09eddfe308eb";

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const posters = data.results.map(
          (movie) => `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        );
        setMoviePosters(posters);
      });
  }, []);

    console.log(moviePosters)
  return (
    <>
      <Navbar />
      <div className="layout" section="top">
        {/* <AddReview /> */}
         <Slide images={moviePosters} />
        <Center>
          <Flex 
          border='none'>
            <Box>
              <Heading 
              fontSize="16"
              p='3'
              fontWeight='bold'
              fontFamily="Helvetica"
              >
                MY REVIEWS
              </Heading>
              <CurrentUserReview />
            </Box>
            <Box>
              <Heading 
              fontSize="16"
              p='3'
              fontWeight='bold'
              fontFamily="Helvetica"
              >
               COMMUNITY UPDATES
              </Heading>
              <Review />
            </Box>
          </Flex>
        </Center>
      </div>
    </>
  );
}

export default App;
