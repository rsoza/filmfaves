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
  getFullWatchlist,
  getMovies,
  postNewWatchlist,
} from "./components/axios.js";

function MyMovies() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movieList, setMovieList] = useState([]);
  const [movieId, setMovieTitle] = useState(null);
  const [watchedVal, setWatchedVal] = useState(null);
  const [userWatchlist, setUserWatchlist] = useState([]);

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
      const movieTable = await getMovies();
      const user_watchlist = await getFullWatchlist();
      setMovieList(movieTable);
      setUserWatchlist(user_watchlist);
    }

    fetchTables();
  }, []);

  const filteredWatchlist = userWatchlist.filter(
    (element) => element.user_id === 1
  );

  const filteredMovieList = movieList.filter((element) => {
    for (const userMovies of filteredWatchlist) {
      if (element.movie_id === userMovies.movie_id) {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <Navbar />
      <div className="layout">
        <Container>
          <Flex>
            <Spacer />
            <Box>
              <IconButton variant="ghost" icon={<AddIcon />} onClick={onOpen} />
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
                      {filteredMovieList.map((movie) => (
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
                      <option key={1} value={0}>
                        Want to watch
                      </option>
                      <option key={2} value={1}>
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
                          bgColor="olivedrab"
                        >
                          Add
                        </Button>
                      </Box>
                      <Button
                        onClick={onClose}
                        width="100px"
                      >
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
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Want to watch
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <SetWatchlist setWatched={1} />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Have watched
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <SetWatchlist setWatched={0} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </div>
    </>
  );
}

export default MyMovies;
