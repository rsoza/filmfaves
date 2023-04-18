import React from "react";
import Navbar from "./navbar";
import "./App.css";
import {
  Box,
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
} from "@chakra-ui/react";
import Review from "./components/review";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Navbar />
      <div className="layout" section="top">
        <Container>
          <Flex>
            <Spacer />
            <Box>
              <IconButton 
              variant='ghost'
              icon={<AddIcon />} 
              onClick={onOpen} />
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
                      <Input placeholder="Type Movie" autoComplete="on" />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Flex>
          <Review />
        </Container>
      </div>
    </>
  );
}

export default App;
