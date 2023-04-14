import { Box, Container, Button, Center } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import filmfaves from "./components/filmfaves.png";

function Navbar() {
  return (
    <Box as="section" pb={{ base: "12", md: "24" }}>
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Container py={{ base: "4", lg: "5" }}>
          <Center>
            <img src={filmfaves} alt="Logo" />
          </Center>
          <Center>
            <Button colorScheme="primary" variant="ghost">
              <Link to="/">Home</Link>
            </Button>
            <Button colorScheme="primary" variant="ghost">
              <Link to="/mymovies">My Movies</Link>
            </Button>
            <Button colorScheme="primary" variant="ghost">
              <Link to="/account">Account</Link>
            </Button>
          </Center>
        </Container>
      </Box>
    </Box>
  );
}

export default Navbar;
