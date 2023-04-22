import {
  Box,
  Button,
  Heading,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Center,
  Text,
  Input,
  Flex,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./App.css";
import { ChevronUpIcon, SearchIcon, BellIcon, EmailIcon, SettingsIcon } from "@chakra-ui/icons";

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
    <>
      <Box
        as="section"
        position="fixed"
        zIndex="1"
        width="100%"
        shadow="base"
        bgColor="#141414"
      >
          <Center>
        <Flex flexDirection="row">
        <Button variant="ghost" colorScheme="whiteAlpha" ref={btnRef} onClick={onOpen} width="140px" margin="0 16px 0 15px">
          <Heading fontFamily="Lato" fontWeight="hairline" color="white">
            film
          </Heading>
          <Heading fontFamily="Lato" fontWeight="bold" color="red.500">
            faves
          </Heading>
        </Button>
        <InputGroup
        p="1"
        width="100%"
        >
        <Input 
        placeholder="Search movies"
        fontSize="14"
        border="#DCD6CC 1px solid"
        bgColor="white"
        height="32px"
        pr="300"
        />
        <InputRightElement children={<SearchIcon color='grey' />}
        
        />
        </InputGroup>
        <Button variant="ghost" colorScheme="whiteAlpha">
          <BellIcon color="white" />
        </Button>
        <Button variant="ghost">
          <EmailIcon color="white" colorScheme="whiteAlpha" />
        </Button>
        <Link to="/profile">
        <Button variant="ghost">
          <SettingsIcon color="white" colorScheme="whiteAlpha"/>
        </Button>
        </Link>
        </Flex>
        </Center>
        {/* <Link to="/account"> */}
        {/* </Link> */}
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Backend</DrawerHeader>
            <DrawerBody>
            <Button colorScheme="white" variant="ghost">
              <Link to="/" fontFamily="Helvetica Neue">
                home
              </Link>
            </Button>
              <Button colorScheme="white" variant="ghost">
                <Link to="/tables" fontFamily="Helvetica Neue">
                  database
                </Link>
              </Button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      {(scrollPosition > 200 || location.pathname === "/profile") ? (
        <Link href="/#top">
          <Box
            position="fixed"
            bottom="20px"
            right={["16px", "84px"]}
            zIndex={1}
          >
            <button onClick={handleScrollToTop}>
              <ChevronUpIcon color="white" />
            </button>
          </Box>
        </Link>
      ) : (
        <Box display="flex" pt="39" pb="2"  bgColor="#141414" justifyContent="center">
          <Center>
            <Button colorScheme="whiteAlpha" variant="ghost">
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : "inactive"}
              >
                <Text fontFamily="Helvetica" pt="3" fontWeight="normal">
                Home
                </Text>
              </Link>
            </Button>
            <Button colorScheme="whiteAlpha" variant="ghost">
              <Link
                to="/mymovies"
                fontFamily="Helvetica Neue"
                className={location.pathname === "/mymovies" ? "active" : "inactive"}
              >
                <Text fontFamily="Helvetica" pt="3" fontWeight="normal">
                My Movies
                </Text>
              </Link>
            </Button>
            <Button colorScheme="whiteAlpha" variant="ghost">
              <Link
                to="/friends"
                fontFamily="Helvetica Neue"
                className={location.pathname === "/friends" ? "active" : "inactive"}
              >
                <Text fontFamily="Helvetica" pt="3" fontWeight="normal">
                Friends
                </Text>
              </Link>
            </Button>
          </Center>
        </Box>
      )}
      </>
  );
}

export default Navbar;
