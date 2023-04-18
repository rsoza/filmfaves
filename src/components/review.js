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
            direction={{base:'column', sm: "row" }}
            overflow="hidden"
            variant="outline"
            size="md"
            pt='2'
            pl='2'
            textAlign={['left']}
            shadow='lg'
            
            >
            <Stack>
              <Stack flexDirection="row">
                <Image
                  objectFit="contain"
                  maxW={{ base: "20%", sm: "35px" }}
                  src={"/images/users/" + review.user_id + ".jpg"}
                  alt={review.firstname}
                  />
                <Text fontSize="12" pl='3' fontWeight='light' fontFamily="Helvetica">{review.firstname} has watched</Text>
              </Stack>
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "167px" }}
                src={"/images/movies/" + review.movie_id + ".jpg"}
                alt={review.title}
                pl="50"
              />
              <CardFooter>
              <Text fontWeight='semibold' fonSize='12' color='olivedrab' fontFamily="Helvetica">Rating: {review.rating}/10</Text>
              </CardFooter>
            </Stack>

            <Stack>
              <CardBody textAlign={['left']}>
                <Heading size="md" pt='8'>{review.title}</Heading>
                <Text fontSize='14' color='grey' fontFamily="Helvetica">Directed by {review.director}</Text>
                <Text fontSize='14' color='grey' fontFamily="Helvetica">Starring {review.star_actors}</Text >
                <Button 
                variant="solid" 
                colorScheme='blackAlpha' 
                borderRadius='10' 
                shadow='lg' 
                fontFamily="Lato"
                fontWeight='medium'
                mt='5'
                >
                  Add to watchlist
                </Button>
              </CardBody>
                <Text fontSize='14' fontWeight='hairline'color='grey' pt='2' fontFamily="Helvetica">Review: </Text>
                <Text fontSize='14' fontWeight='hairline' fontStyle='italic' color='grey' pb='4' fontFamily="Helvetica">{review.review_comment}</Text>
            </Stack>
          </Card>
        </Container>
      ))}
  </>
  );
}

export default Review;
