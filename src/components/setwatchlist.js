import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Container,
  CardBody,
  Stack,
  Heading,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { getUserWatchlistByWatched, deleteMovieFromWatchlist, updateWatchlist } from "./axios";
import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons";

const SetWatchlist = ({setWatched}) => {
  const [watchlist, setWatchlist] = useState([]);

  const handleRemoveFromWatchlist = async (id) => {
    try {
      await deleteMovieFromWatchlist(id);
    } catch (error) {
      console.log(error);
    }
    console.log("Remove from watchlist clicked", watchlist);
  };

  const handleWatchlistUpdate = async (id, user_id, movie_id) => {
    try{
      await updateWatchlist(id,user_id,movie_id, !setWatched);
    } catch (error) {
      console.log(error);
    }
    console.log("Updated watchlist");
  };

  useEffect(() => {
    async function fetchTables() {
      const watchlistTable = await getUserWatchlistByWatched(1, setWatched);
      setWatchlist(watchlistTable);
    }
    
    fetchTables();
  }, [setWatched, watchlist]);
  

  return (
    <>
      {watchlist.length > 0 ? (
        watchlist.map((watching) => (
          <Container p="2">
            <Card
              direction={{ base: "column", sm: "row" }}
              size="md"
              pt="2"
              pl="2"
              textAlign={["left"]}
              shadow="lg"
            >
              <Stack>
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "160px" }}
                  src={"/images/movies/" + watching.movie_id + ".jpg"}
                  alt={watching.title}
                  p="2"
                />
              </Stack>
              <Stack>
                <CardBody textAlign={["left"]}>
                  <Heading size="md" mb="4">
                    {watching.title}
                  </Heading>
                  <Text fontSize="14" color="grey" fontFamily="Helvetica">
                    Genre: {watching.genre}
                  </Text>
                  <Text fontSize="14" color="grey" fontFamily="Helvetica">
                    Director: {watching.director}
                  </Text>
                  <Text fontSize="14" color="grey" fontFamily="Helvetica">
                    Cast: {watching.star_actors}
                  </Text>
                  <Menu>
                    <MenuButton
                      colorScheme="blackAlpha"
                      mt="2"
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                    >
                      <span color="white">
                        <CheckIcon color="olivedrab" mr="3" />
                       {!setWatched ? 'Want to watch' :'Watched'}
                      </span>
                    </MenuButton>
                    <MenuList>
                      <MenuItem minH="48px"
                      onClick={() => {
                        handleWatchlistUpdate(
                          watching.watchlist_id,
                          watching.user_id,
                          watching.movie_id);
                      }}>
                        <span color="white">
                        {!setWatched ? 'Watched': 'Want to watch'}
                        </span>
                      </MenuItem>
                      <MenuItem
                        minH="40px"
                        onClick={() => {
                          handleRemoveFromWatchlist(watching.watchlist_id);
                        }}
                      >
                        <span color="white">Remove from watchlist</span>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </CardBody>
              </Stack>
            </Card>
          </Container>
        ))) : (
          <Heading color="white">(0) items listed</Heading>
        )}
    </>
  );
};

export default SetWatchlist;
