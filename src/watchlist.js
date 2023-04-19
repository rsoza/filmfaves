import React, { useState} from "react";
import "./App.js";
import Navbar from "./navbar.js";
import SetWatchlist from "./components/setwatchlist.js";
import {
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
  FormControl,
  FormLabel,
  Input,
  filter
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { postNewWatchlist, getMovies } from "./components/axios.js";

function MyMovies() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movieList, setMovieList] = useState([]);
  const [inputVal, setInputVal] = useState('');

  const handlePostWatchlist = async (user_id, movie_id, watched) => {
    try{
      await postNewWatchlist(user_id,movie_id, watched);
    } catch (error) {
      console.log(error);
    }
    console.log("Added watchlist");
  };


  const handleAutoComplete = async (e) => {
    const query = e.target.value;

    if (query) {
      const response = await getMovies();
      const filterMovie = response.filter(element => element.title.toLowerCase().includes(query.toLowerCase()));
      setMovieList(filterMovie);
    } else {
      setMovieList([]);
    }


  }
  



  return (
    <>
      <Navbar />
      <div className="layout">
        <Container>
          <Flex>
            <Spacer />
            <Box>
              <IconButton variant='ghost' icon={<AddIcon />} onClick={onOpen} />
              <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                  bg="none"
                  backdropFilter="auto"
                  backdropInvert="80%"
                  backdropBlur="2px"
                />
                <ModalContent>
                  <ModalHeader>Add to list</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl isRequired>
                      <FormLabel>Movie</FormLabel>
                      <Input
                      type="text"
                      placeholder="Type Movie"
                      onChange={handleAutoComplete}
                      />
                      {
                        movieList.map(movie => (
                          <li>{movie.title}</li>
                        ))
                      }
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
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
