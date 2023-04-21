import React, { useState, useEffect } from "react";
import "./App.js";
import Navbar from "./navbar.js";
import SetWatchlist from "./components/setwatchlist.js";
import {
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import {
  postNewWatchlist,
  getMoviesToAddToWatchlist,
} from "./components/axios.js";

function MyMovies() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movieList, setMovieList] = useState([]);
  const [movieId, setMovieTitle] = useState(null);
  const [watchedVal, setWatchedVal] = useState(null);

  const handleNewWatchlist = async () => {
    try {
      await postNewWatchlist(1, movieId, watchedVal);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchTables() {
      const movieTable = await getMoviesToAddToWatchlist(1);
      setMovieList(movieTable);
    }

    fetchTables();
  }, [movieList]);

  return (
    <>
      <Navbar />
      <div className="layout">
        <Container>
          <Flex>
            <Spacer />
            <Box>
              <IconButton
                variant="ghost"
                colorScheme="whiteAlpha"
                icon={<AddIcon />}
                onClick={onOpen}
                color="white"
              />
              <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                  bg="none"
                  backdropFilter="auto"
                  backdropInvert="25%"
                  backdropBlur="2px"
                />
                <ModalContent>
                  <ModalHeader>Add to watchlist</ModalHeader>
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
                      {movieList.map((movie) => (
                        <option key={movie.movie_id} value={movie.movie_id}>
                          {movie.title}
                        </option>
                      ))}
                    </Select>
                    <Select
                      placeholder="Select an option"
                      variant="flushed"
                      value={watchedVal}
                      onChange={(event) => {
                        setWatchedVal(event.target.value);
                      }}
                      isRequired
                    >
                      <option key={0} value={0}>
                        Want to watch
                      </option>
                      <option key={1} value={1}>
                        Have watched
                      </option>
                    </Select>
                  </ModalBody>
                  <ModalFooter>
                    <Stack flexDirection="row">
                      <Box pt="2" pr="2">
                        <Button
                          onClick={handleNewWatchlist}
                          width="100px"
                          bgColor="red.500"
                        >
                          Add
                        </Button>
                      </Box>
                      <Button onClick={onClose} width="100px">
                        Close
                      </Button>
                    </Stack>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Flex>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton color="white">
                  <Box as="span" flex="1" textAlign="left">
                    Want to watch
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <SetWatchlist setWatched={0} />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton color="white">
                  <Box as="span" flex="1" textAlign="left">
                    Have watched
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <SetWatchlist setWatched={1} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </div>
    </>
  );
}

export default MyMovies;
