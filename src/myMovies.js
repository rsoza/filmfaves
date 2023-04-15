import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Container,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { getFullWatchlist } from "./components/axios";
import "./App.js";
import Navbar from "./navbar";

import { ChevronDownIcon } from "@chakra-ui/icons";

function MyMovies() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    async function fetchTables() {
      const watchlistTable = await getFullWatchlist();
      setWatchlist(watchlistTable);
      console.log(watchlistTable);
    }

    fetchTables();
  }, []);

  return (
    <>
      <Navbar />
      <div className="layout">
        {watchlist.map((watching) => (
          <Container p="2">
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
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
                  <Heading size="md" pt="8">
                    {watching.title}
                  </Heading>
                  <Text fontSize="14" color="grey" fontFamily="Helvetica">
                    Directed by {watching.director}
                  </Text>
                  <Text fontSize="14" color="grey" fontFamily="Helvetica">
                    Starring {watching.star_actors}
                  </Text>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Want to watch
                    </MenuButton>
                    <MenuList>
                      <MenuItem minH="48px">
                        <span>Currently watching</span>
                      </MenuItem>
                      <MenuItem minH="40px">
                        <span>Remove from watchlist</span>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </CardBody>
              </Stack>
            </Card>
          </Container>
        ))}
      </div>
    </>
  );
}

export default MyMovies;
