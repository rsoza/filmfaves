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
  Flex,
  Box,
  Center,
} from "@chakra-ui/react";
import { getBobsReviews } from "../axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function CurrentUserReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchTables() {
      const reviewsTable = await getBobsReviews();
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
            variant="outline"
            borderColor="#D8D8D8"
            size="md"
            pt="2"
            pl="2"
            textAlign={["left"]}
            shadow="md"
            height="255px"
            width="350px"
          >
            <Stack>
              <Stack flexDirection="row">
                  <Text
                    fontWeight="semibold"
                    fontSize="12"
                    color="olivedrab"
                    fontFamily="Helvetica"

                  >
                    Rating: {review.rating}/10
                  </Text>
              </Stack>
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "167px" }}
                src={"/images/movies/" + review.movie_id + ".jpg"}
                alt={review.title}
                pl='50'
              />
              <Center>
                <Box>
                  <Button variant="ghost">
                    <DeleteIcon />
                  </Button>
                  <Button variant="ghost">
                    <EditIcon />
                  </Button>
                </Box>
              </Center>
            </Stack>

            <Stack>
              <CardBody textAlign={["left"]}>
                <Heading size="md" pt="8">
                  {review.title}
                </Heading>

                <Stack flexDirection="row">
                  <Text
                    fontSize="12"
                    color="grey"
                    fontFamily="Helvetica"
                    pt="2"
                  >
                    Genre:
                  </Text>
                  <Text fontSize="12" fontFamily="Helvetica" pl="1">
                    {review.genre}
                  </Text>
                </Stack>
                <Stack flexDirection="row">
                  <Text
                    fontSize="12"
                    color="grey"
                    fontFamily="Helvetica"
                    pt="2"
                  >
                    Cast:
                  </Text>
                  <Text fontSize="12" fontFamily="Helvetica" pl="1">
                    {review.star_actors}
                  </Text>
                </Stack>
                <Flex pt="2">
                  <Text
                    fontSize="14"
                    fontWeight="normal"
                    fontStyle="italic"
                    color="grey"
                    pb="4"
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

export default CurrentUserReview;
