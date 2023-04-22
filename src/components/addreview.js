import React, { useEffect, useState } from "react";
import "../App.css";
import {
  Box,
  Spacer,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { getUserWatchlistByWatched, postNewReview } from "./axios";

function AddReview() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [movieId, setMovieTitle] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);

  const handleNewReview = async () => {
    try {
      console.log("Added to reviews table: ", { movieId, review, rating });
      await postNewReview(1, movieId, rating, review);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchTables() {
      const user_watchlist = await getUserWatchlistByWatched(1, 1);
      setUserWatchlist(user_watchlist);
    }

    fetchTables();
  }, [userWatchlist]);

  return (
    <Flex>
      <Spacer />
      <Box>
        <IconButton variant="ghost"
        color="white"
        icon={<AddIcon />}
        colorScheme="whiteAlpha"
        onClick={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="25%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>Add a review</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select
                placeholder="Select a movie"
                variant="flushed"
                value={movieId}
                onChange={(event) => {
                  setMovieTitle(event.target.value);
                }}
              >
                {userWatchlist.map((movie) => (
                  <option key={movie.movie_id} value={movie.movie_id}>
                    {movie.title}
                  </option>
                ))}
              </Select>
              <Box pt="5">
                <NumberInput
                  variant="flushed"
                  step={2}
                  min={0}
                  max={10}
                  width={40}
                >
                  <NumberInputField
                    placeholder="Rate 0 to 10"
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
              <Box pt="5">
                <Input
                  placeholder="Write review here.."
                  variant="outline"
                  value={review}
                  onChange={(event) => {
                    setReview(event.target.value);
                  }}
                  isRequired
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Stack flexDirection="row">
                <Box pt="2" pr="2">
                  <Button
                    onClick={handleNewReview}
                    width="100px"
                    bgColor="red.500"
                  >
                    Add
                  </Button>
                </Box>
                <Button width="100px" onClick={onClose}>
                  Close
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default AddReview;
