import React from "react";
import Navbar from "./navbar";
import "./App.css";
import { Container, Button,  } from "@chakra-ui/react";
import Review from "./components/review";

function App() {

  return (
      <>
      <Navbar />
      <div className="layout" section='top'>
      <Container>
        <Button
          variant="solid"
          colorScheme='blackAlpha'
          borderRadius="10"
          shadow="lg"
          fontFamily="Lato"
          fontWeight='medium'
        >
          Start a review
        </Button>
        <Review />
      </Container>
    </div></>
  );
}

export default App;
