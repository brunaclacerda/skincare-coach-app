import { router } from "expo-router";
import { View } from "react-native";
import {
  Button,
  Input,
  FormControl,
  Text,
  Center,
  Heading,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { useEffect, useState } from "react";

import { useSession } from "../ctx";
import ErrorStatus from "../components/ErrorStatus";

export default function SignUp() {
  const { signUp, signIn } = useSession();
  const [username, setUsername] = useState("bruna@hotmail.com");
  const [password, setPassword] = useState("Ab12345678910-");
  const [pwdVal, setPwdVal] = useState("Ab12345678910-");
  const [pwdError, setPwdError] = useState();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (password && pwdVal) {
      if (pwdVal !== password) {
        setIsDisabled(true);
        return setPwdError("Password informed is not identical.");
      }
      setPwdError("");
      setIsDisabled(false);
    }
  }, [password, pwdVal]);

  const onSubmit = () => {
    if (pwdError) return;

    setError(null);
    setShowError(false);
    setIsLoading(true);

    signUp(username, password)
      .then((result) => {
        if (!result.success) throw new Error(result.failureMsg);
        return;
      })
      .then(() => {
        return signIn(username, password);
      })
      .then((result) => {
        if (!result.failure) return router.replace("/");
        throw new Error(result.message);
      })
      .catch((error) => {
        setError(error.message);
        setShowError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <ErrorStatus show={showError} setShow={setShowError} error={error} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Center w="100%" alignItems="center">
          <VStack space={2} safeArea p="2" w="90%" maxW="290" py="8">
            <VStack space={1}>
              <Heading
                size="md"
                _dark={{
                  color: "warmGray.50",
                }}
                fontWeight="semibold"
                textAlign="center"
              >
                Start Your Skincare Journey
              </Heading>
              <Text
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="medium"
                textAlign="center"
              >
                Get personalized skincare advice, product recommendations, and
                expert tips.
              </Text>
            </VStack>
            <VStack space={3} mt="5">
              <FormControl isRequired>
                <Input
                  size="2xl"
                  placeholder="Email"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  size="2xl"
                  type="password"
                  placeholder="Password"
                />
              </FormControl>
              <FormControl isInvalid={pwdError} isRequired>
                <Input
                  value={pwdVal}
                  onChangeText={(text) => {
                    setPwdVal(text);
                  }}
                  size="2xl"
                  type="password"
                  placeholder="Confirm password"
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {pwdError}
                </FormControl.ErrorMessage>
              </FormControl>
              <Button
                size="lg"
                mt="2"
                isLoading={isLoading}
                isDisabled={isDisabled}
                _disabled={{ variant: "subtle" }}
                onPress={onSubmit}
              >
                Sign up
              </Button>
            </VStack>
            <VStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Already a member?
              </Text>
              <Button
                variant="outline"
                onPress={() => {
                  router.replace("/sign-in");
                }}
              >
                <Text>Log in</Text>
              </Button>
            </VStack>
          </VStack>
        </Center>
      </View>
    </>
  );
}
