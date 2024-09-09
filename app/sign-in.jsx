import { router, Redirect } from "expo-router";
import { View } from "react-native";
import {
  Button,
  Input,
  Heading,
  Center,
  Text,
  VStack,
  Box,
  HStack,
  Link,
  FormControl,
  Pressable,
  Icon,
  Collapse,
  Alert,
  IconButton,
  CloseIcon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

import { useSession } from "../ctx";

export default function SignIn() {
  const { signIn } = useSession();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log("sign-in");
  return (
    <>
      <ErrorStatus show={showError} setShow={setShowError} error={error} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Center w="100%" alignContent="center">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl isRequired>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  type={show ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </Link>
              </FormControl>
              <Button
                mt="2"
                onPress={() => {
                  setShowError(false);
                  signIn(username, password)
                    .then((result) => {
                      if (result?.failure) {
                        console.log(result);
                        setError("Incorrect username or password");
                        return setShowError(true);
                      }
                      router.replace("/");
                    })
                    .catch((error) => {
                      setError(error);
                      return setShowError(true);
                    });
                }}
              >
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Pressable
                  onPress={() => {
                    router.replace("/sign-up");
                  }}
                >
                  <Text color="indigo.500" fontSize="sm" fontWeight="medium">
                    Sign Up
                  </Text>
                </Pressable>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </View>
    </>
  );
}

function ErrorStatus({ show, setShow, error }) {
  return (
    <Box pt={5} w="100%" alignItems="center" safeArea>
      <Collapse isOpen={show}>
        <Alert maxW="400" status="error">
          <HStack space={1} alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text
                fontSize="md"
                fontWeight="medium"
                textAlign="center"
                _dark={{
                  color: "coolGray.800",
                }}
              >
                {error}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: "coolGray.600",
              }}
              onPress={() => setShow(false)}
            />
          </HStack>
        </Alert>
      </Collapse>
    </Box>
  );
}
