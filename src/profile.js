import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Divider,
  Center,
  Flex,
  Container,
  Input,
  Image,
  Stack,
  Button,
} from "@chakra-ui/react";
import { getUserOne, updateUser } from "./components/axios";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [location, setLocation] = useState("");
  const [isSet, setIsSet] = useState(false);

  const handleUpdateUser = async () => {
    try {
      await updateUser(1, firstname, lastname, location);
    } catch (e) {
      return console.log(e);
    }
  };

  useEffect(() => {
    async function fetchTables() {
      const userOneTable = await getUserOne();
      setUser(userOneTable);
    }
    fetchTables();
  }, [user]);

    useEffect(() => {
    if (user.length > 0 && !isSet ) {
      const element = user[0];
      setFirstname(element.firstname);
      setLastname(element.lastname);
      setLocation(element.location);
      setIsSet(true)
    }
  }, [isSet, user]);

  return (
    <>
      <div className="layout" section="top">
        <Container>
          <Box
            display="flex"
            pt="45"
            pb="2"
            bgColor="#141414"
            justifyContent="left"
          >
            <Center>
              <Flex>
                <Heading
                  pt="5"
                  fontSize="45px"
                  fontFamily="sans-serif"
                  fontWeight="normal"
                  color="white"
                >
                  Edit Profile
                </Heading>
              </Flex>
            </Center>
          </Box>
          <Divider />
          <Flex pt="10">
            {user.map((element) => (
              <>
                <Image
                  objectFit="contain"
                  maxW={{ base: "20%", sm: "150px" }}
                  src={"/images/users/" + element.user_id + ".jpg"}
                  alt={element.firstname}
                  borderRadius="50%"
                />
                <Flex flexDirection="column">
                  <Box ml="3" mb="3">
                    <Input
                      value={firstname}
                      onChange={(event) => {
                        setFirstname(event.target.value);
                      }}
                      fontWeight="normal"
                      color="white"
                      fontFamily="sans-serif"
                    />
                  </Box>
                  <Box ml="3" mb="3">
                    <Input
                      placeHolder={lastname}
                      value={lastname}
                      onChange={(event) => {
                        setLastname(event.target.value);
                      }}
                      fontWeight="normal"
                      color="white"
                      fontFamily="sans-serif"
                    />
                  </Box>
                  <Box ml="3" mb="3">
                    <Input
                      placeHolder={location}
                      value={location}
                      onChange={(event) => {
                        setLocation(event.target.value);
                      }}
                      fontWeight="normal"
                      color="white"
                      fontFamily="sans-serif"
                    />
                  </Box>
                </Flex>
              </>
            ))}
          </Flex>
          <Stack flexDirection="row" pt="10">
            <Box pt="2" pr="2">
                <Link to="/">
              <Button
                onClick={handleUpdateUser}
                width="100px"
                bgColor="red.500"
              >
                Update
              </Button>
            </Link>
            </Box>
            <Link to="/">
              <Button width="100px">Close</Button>
            </Link>
          </Stack>
        </Container>
      </div>
    </>
  );
}

export default Profile;
