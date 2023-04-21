import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Box,
  Center,
  Spacer,
  Input,
  Select,
} from "@chakra-ui/react";
import { getBobsReviews, deleteReview } from "./axios";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";

function CurrentUserReview() {
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [isEditting, setIsEditting] = useState(false);

  const handleEditOpen = (title) => {
    setIsEditting(true);
    setMovie(title);
  };

  const handleEditClose = () => {
    setIsEditting(false);
  };

  const handleRemoveBobsReview = async (id) => {
    try {
      await deleteReview(id);
    } catch (error) {
      console.log(error);
    }
    console.log("Removed from reviews clicked");
  };

  useEffect(() => {
    async function fetchTables() {
      const reviewsTable = await getBobsReviews();
      setReviews(reviewsTable);
    }

    fetchTables();
  }, [reviews]);

  return (
    <>
      {reviews.map((review) =>
        isEditting ? (
          <Container
            p="2"
            border="2px"
            width="400px"
            mb="2"
            bgColor="whiteAlpha.100"
          >
            <Flex>
              <Center>
                <Box p="1">
                  <Select 
                  placeholder={review.title}
                  value={movie}
                  textColor="white"
                  onChange={(event) => {
                    setMovie(event.target.value);
                  }}>
                  </Select>
                </Box>
              </Center>
              <Spacer />
              <Box>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  onClick={() => {handleEditClose()}}
                >
                  <CheckIcon color="white" />
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  onClick={() => {
                    handleRemoveBobsReview(review.review_id);
                  }}
                >
                  <DeleteIcon color="white" />
                </Button>
              </Box>
            </Flex>
            <Flex>
              <Text
                fontSize="12"
                fontWeight="normal"
                fontStyle="italic"
                color="White"
                pl="4"
                fontFamily="Helvetica"
              >
                "{review.review_comment}"
              </Text>
              <Spacer />
              <Box>
                <Text
                  fontWeight="semibold"
                  fontSize="12"
                  color="Highlight"
                  fontFamily="Helvetica"
                >
                  Rating: {review.rating}/10
                </Text>
              </Box>
            </Flex>
          </Container>
        ) : (
          <Container
            p="2"
            border="2px"
            width="400px"
            mb="2"
            bgColor="whiteAlpha.100"
          >
            <Flex>
              <Center>
                <Box p="1">
                  <Heading size="sm" color="white" fontFamily="Helvetica">
                    {review.title}
                  </Heading>
                </Box>
              </Center>
              <Spacer />
              <Box>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  onClick={()=> {handleEditOpen(review.title)}}
                >
                  <EditIcon color="white" />
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  onClick={() => {
                    handleRemoveBobsReview(review.review_id);
                  }}
                >
                  <DeleteIcon color="white" />
                </Button>
              </Box>
            </Flex>
            <Flex>
              <Text
                fontSize="12"
                fontWeight="normal"
                fontStyle="italic"
                color="White"
                pl="4"
                fontFamily="Helvetica"
              >
                "{review.review_comment}"
              </Text>
              <Spacer />
              <Box>
                <Text
                  fontWeight="semibold"
                  fontSize="12"
                  color="Highlight"
                  fontFamily="Helvetica"
                >
                  Rating: {review.rating}/10
                </Text>
              </Box>
            </Flex>
          </Container>
        )
      )}
    </>
  );
}

export default CurrentUserReview;
