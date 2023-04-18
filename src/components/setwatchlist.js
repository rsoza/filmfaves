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
import { getFullWatchlist, deleteMovieFromWatchlist, updateWatchlist } from "./axios";
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
      await updateWatchlist(id,user_id,movie_id, setWatched);
    } catch (error) {
      console.log(error);
    }
    console.log("Updated watchlist");
  };

  useEffect(() => {
    async function fetchTables() {
      const watchlistTable = await getFullWatchlist();
      setWatchlist(watchlistTable);
    }
    
    fetchTables();
  }, [watchlist]);
  
  const filteredWatchlist = watchlist.filter(element => element.watched === setWatched && element.user_id === 1);

  return (
    <>
      {filteredWatchlist.length > 0 ? (
        filteredWatchlist.map((watching) => (
          <Container p="2">
            <Card
              direction={{ base: "column", sm: "row" }}
              variant="outline"
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
                    Directed by {watching.director}
                  </Text>
                  <Text fontSize="14" color="grey" fontFamily="Helvetica">
                    Starring {watching.star_actors}
                  </Text>
                  <Menu>
                    <MenuButton
                      colorScheme="blackAlpha"
                      mt="2"
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                    >
                      <span>
                        <CheckIcon color="olivedrab" mr="3" />
                        Watched
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
                        <span>Want to watch</span>
                      </MenuItem>
                      <MenuItem
                        minH="40px"
                        onClick={() => {
                          handleRemoveFromWatchlist(watching.watchlist_id);
                        }}
                      >
                        <span>Remove from watchlist</span>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </CardBody>
              </Stack>
            </Card>
          </Container>
        ))) : (
          <Heading>(0) items watched</Heading>
        )}
    </>
  );
};

export default SetWatchlist;
