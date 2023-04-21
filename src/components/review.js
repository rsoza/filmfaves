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
  Flex
} from "@chakra-ui/react";
import { getFullReviews } from "./axios";

function Review() {
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
            overflowY="hidden"
            size="md"
            pt="2"
            pl="2"
            textAlign={["left"]}
            shadow="md"
            height="300px"
            width="400px"
            bgColor="whiteAlpha.100"
            borderRadius="2xl"
          >
            <Stack>
              <Stack flexDirection="row">
                <Image
                  objectFit="contain"
                  maxW={{ base: "20%", sm: "35px" }}
                  src={"/images/users/" + review.user_id + ".jpg"}
                  alt={review.firstname}
                  borderRadius="50%"
                />
                <Text
                  color="red.500"
                  fontSize="12"
                  pl="3"
                  fontWeight="bold"
                  fontFamily="Helvetica"
                >
                  {review.firstname}
                </Text>
                <Text
                  fontSize="12"
                  pl="1"
                  fontWeight="light"
                  fontFamily="Helvetica"
                  color="white"
                >
                  has watched
                </Text>
              </Stack>
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "167px" }}
                src={"/images/movies/" + review.movie_id + ".jpg"}
                alt={review.title}
                pl="50"
                
              />
              <CardFooter>
                <Text
                  fontWeight="semibold"
                  fontSize="12"
                  color="Highlight"
                  fontFamily="Helvetica"
                >
                  Rating: {review.rating}/10
                </Text>
              </CardFooter>
            </Stack>

            <Stack>
              <CardBody textAlign={["left"]}>
                <Heading size="md" pt="8" color="white">
                  {review.title}
                </Heading>

                <Stack flexDirection="row">
                  <Text
                    fontSize="13"
                    color="grey"
                    fontFamily="Helvetica"
                    pt="2"
                  >
                    Genre:
                  </Text>
                  <Text fontSize="13" fontFamily="Helvetica" pl="1" color="white">
                    {review.genre}
                  </Text>
                </Stack>
                <Stack flexDirection="row">
                  <Text
                    fontSize="13"
                    color="grey"
                    fontFamily="Helvetica"
                    pt="2"
                  >
                    Cast:
                  </Text>
                  <Text fontSize="13" fontFamily="Helvetica" pl="1" color="white">
                    {review.star_actors}
                  </Text>
                </Stack>
                <Button
                  variant="solid"
                  colorScheme="blackAlpha"
                  borderRadius="10"
                  shadow="lg"
                  fontFamily="Lato"
                  fontWeight="medium"
                  mt="5"
                >
                  Add to watchlist
                </Button>
                <Flex pt="2">
              <Text
                fontSize="14"
                fontWeight="normal"
                fontStyle="italic"
                color="white"
                fontFamily="Helvetica"
                >
                "{review.review_comment}"
              </Text>
                </Flex>
              </CardBody>
            </Stack>
          </Card>
        </Container>
      ))}
    </>
  );
}

export default Review;
