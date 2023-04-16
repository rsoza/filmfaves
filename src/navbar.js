import {
  Box,
  Container,
  Button,
  Center,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./App.css";
import { ChevronUpIcon } from "@chakra-ui/icons";

function Navbar() {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (window.location.hash === "#top") {
      window.scrollTo({ top: 0 });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      as="section"
      position="fixed"
      zIndex="1"
      bg="rgb(244, 241, 234)"
      width="100%"
    >
      <Box as="nav" bg="bg-surface" boxShadow="sm" shadow="lg">
        <Container py={{ base: "1", lg: "5" }}>
          <Center>
            <Heading fontFamily="Lato" fontWeight="light">
              film
            </Heading>
            <Heading fontFamily="Lato" fontWeight="bold">
              faves
            </Heading>
            <Box pl="5">
              <Link to="/account">
                <Avatar bg="olivedrab" size="sm" />
              </Link>
            </Box>
          </Center>
          {scrollPosition > 200 ? (
            <Link href="/#top">
              <Box
                position="fixed"
                bottom="20px"
                right={["16px", "84px"]}
                zIndex={1}
              >
                <button onClick={handleScrollToTop}>
                  <ChevronUpIcon />
                </button>
              </Box>
            </Link>
          ) : (
            <Center>
              <Button colorScheme="primary" variant="ghost">
                <Link
                  to="/"
                  fontFamily="Helvetica Neue"
                  className={location.pathname === "/" ? "active" : ""}
                >
                  reviews
                </Link>
              </Button>
              <Button colorScheme="primary" variant="ghost">
                <Link
                  to="/mymovies"
                  fontFamily="Helvetica Neue"
                  className={location.pathname === "/mymovies" ? "active" : ""}
                >
                  watchlist
                </Link>
              </Button>
              <Button colorScheme="white" variant="ghost">
                <Link
                  to="/tables"
                  fontFamily="Helvetica Neue"
                  className={location.pathname === "/tables" ? "active" : ""}
                >
                  database
                </Link>
              </Button>
            </Center>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Navbar;
