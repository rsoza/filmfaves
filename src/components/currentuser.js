import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Box,
  Center,
  Spacer,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { getBobsReviews, deleteReview, getMovies, updateReview } from "./axios";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

function CurrentUserReview() {
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState("");
  const [movieId, setMovieId] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isEditting, setIsEditting] = useState(false);

  const handleEditOpen = (title, review, rate, id) => {
    setIsEditting(true);
    setMovie(title);
    setComment(review);
    setRating(rate);
    setMovieId(id);
  };

  const handleEditClose = async (id) => {
    await updateReview(id, 1, movieId, rating, comment);
    setIsEditting(false);
  };

  const handleRemoveBobsReview = async (id) => {
    try {
      await deleteReview(id);
    } catch (error) {
      console.log(error);
    }
    console.log("Removed from reviews clicked");
  };

  useEffect(() => {
    async function fetchTables() {
      const reviewsTable = await getBobsReviews();
      const moviesTable = await getMovies();
      setMovieList(moviesTable);
      setReviews(reviewsTable);
    }

    fetchTables();
  }, [reviews]);

  return (
    <>
      {reviews.map((review) =>
        isEditting ? (
          <Container
            p="2"
            border="2px"
            width="400px"
            mb="2"
            bgColor="whiteAlpha.100"
          >
            <Flex>
              <Center>
                <Box>
                  <Select
                    size="xs"
                    placeholder={review.title}
                    height="22px"
                    bgColor="white"
                    value={movie}
                    width="200px"
                    onChange={(event) => {
                      setMovie(event.target.value);
                    }}
                  >
                    {movieList.map((movie) => (
                      <option key={movie.movie_id} value={movie.movie_id}>
                        {movie.title}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Center>
              <Spacer />
              <Box>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  onClick={() => {
                    handleEditClose(review.review_id);
                  }}
                >
                  <CheckIcon color="white" />
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  onClick={() => {
                    setIsEditting(false);
                  }}
                >
                  <CloseIcon color="red.500" />
                </Button>
              </Box>
            </Flex>
            <Flex>
              <Input
                bgColor="white"
                size="xs"
                height="22px"
                width="200px"
                placeholder={comment}
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
              <Spacer />
              <Box>
                <NumberInput
                  step={2}
                  min={0}
                  max={10}
                  size="xs"
                  width="80px"
                  bgColor="white"
                >
                  <NumberInputField
                    placeholder={rating}
                    value={rating}
                    onChange={(event) => {
                      setRating(event.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </Flex>
          </Container>
        ) : (
          <Container
            p="2"
            border="2px"
            width="400px"
            mb="2"
            bgColor="whiteAlpha.100"
          >
            <Flex>
              <Center>
                <Box p="1">
                  <Heading size="sm" color="white" fontFamily="Helvetica">
                    {review.title}
                  </Heading>
                </Box>
              </Center>
              <Spacer />
              <Box>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  onClick={() => {
                    handleEditOpen(
                      review.title,
                      review.review_comment,
                      review.rating,
                      review.movie_id
                    );
                  }}
                >
                  <EditIcon color="white" />
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  onClick={() => {
                    handleRemoveBobsReview(review.review_id);
                  }}
                >
                  <DeleteIcon color="white" />
                </Button>
              </Box>
            </Flex>
            <Flex>
              <Text
                fontSize="12"
                fontWeight="normal"
                fontStyle="italic"
                color="White"
                pl="4"
                fontFamily="Helvetica"
              >
                "{review.review_comment}"
              </Text>
              <Spacer />
              <Box>
                <Text
                  fontWeight="semibold"
                  fontSize="12"
                  color="Highlight"
                  fontFamily="Helvetica"
                >
                  Rating: {review.rating}/10
                </Text>
              </Box>
            </Flex>
          </Container>
        )
      )}
    </>
  );
}

export default CurrentUserReview;
