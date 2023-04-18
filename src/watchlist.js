import React from "react";
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
  Input
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

function MyMovies() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                      <Input placeholder="Type Movie" autoComplete='on'/>
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
