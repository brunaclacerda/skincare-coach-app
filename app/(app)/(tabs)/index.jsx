import {
  useSafeArea,
  Icon,
  Text,
  Box,
  Heading,
  VStack,
  Input,
  HStack,
  Image,
  Button,
  ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { useSession } from "../../../ctx";
import { StyleSheet } from "react-native";

export default function Index() {
  console.log("Index");
  const { user } = useSession();
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 4,
  });
  console.log(user);
  return (
    <Box {...safeAreaProps} w="100%" pt={20}>
      <VStack w="90%" space={10} alignSelf="center">
        <Heading size="xl">{"Hello " + (user.name?.first || "")}</Heading>

        <Input
          width="100%"
          borderRadius="5"
          fontSize="14"
          maxH="32px"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
          InputRightElement={
            <Icon
              m="2"
              mr="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="mic" />}
            />
          }
        />
        <HStack space={4}>
          <Box {...props.scam}>
            <Text color="black" fontSize="xs">
              Barcode
            </Text>
          </Box>
          <Box {...props.scam}>
            <Text color="black" fontSize="xs">
              Scam ingredients
            </Text>
          </Box>
        </HStack>
        <VStack space={4}>
          <Heading> Suggested products</Heading>
          <ScrollView>
            <HStack space={3}>
              <Box {...props.products}>
                <Text color="black" fontSize="xs">
                  Barcode
                </Text>
              </Box>
              <Box {...props.products}>
                <Text color="black" fontSize="xs">
                  Barcode
                </Text>
              </Box>
              <Box {...props.products}>
                <Text color="black" fontSize="xs">
                  Barcode
                </Text>
              </Box>
            </HStack>
          </ScrollView>
        </VStack>
        {/* <Button variant="outline" borderColor="primary.500">
          <Text color="primary.500">Build a routine</Text>
        </Button> */}
      </VStack>
    </Box>
  );
}

const props = {
  scam: {
    width: "156",
    height: "100",
    bg: "E3EAED",
    alignItems: "center",
    borderRadius: "4",
    borderWidth: "1",
  },
  products: {
    width: "124",
    height: "165",
    bg: "gray.200",
    alignItems: "center",
    borderRadius: "4",
    borderWidth: "1",
  },
};
