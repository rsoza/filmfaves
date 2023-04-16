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
import { getFullReviews } from "./axios";
import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons";

const Watched = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchTables() {
      const reviewsTable = await getFullReviews();
      setReviews(reviewsTable);
    }

    fetchTables();
  }, []);

  return (
    <>
      {reviews.map((review) => (
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
              src={"/images/movies/" + review.movie_id + ".jpg"}
              alt={review.title}
              p="2"
            />
          </Stack>
          <Stack>
            <CardBody textAlign={["left"]}>
              <Heading size="md" mb="4">
                {review.title}
              </Heading>
              <Text fontSize="14" color="grey" fontFamily="Helvetica">
                Directed by {review.director}
              </Text>
              <Text fontSize="14" color="grey" fontFamily="Helvetica">
                Starring {review.star_actors}
              </Text>
              <Menu>
                <MenuButton colorScheme="blackAlpha" mt='2' as={Button} rightIcon={<ChevronDownIcon />}>
                <span>
                    <CheckIcon color='olivedrab' mr='3'/>
                    Done watching
                    </span>
                </MenuButton>
                <MenuList>
                  <MenuItem minH="48px">
                    <span>Want to watch</span>
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
    </>
  );
};

export default Watched;
