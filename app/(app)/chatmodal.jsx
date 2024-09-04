import { StyleSheet } from "react-native";
import {
  Button,
  Heading,
  VStack,
  Box,
  HStack,
  ScrollView,
  View,
  Text,
  useSafeArea,
  Center,
  Divider,
} from "native-base";

import { chatbot } from "../../api/chatbot";

// async function name(params) {

// }

export default function ChatModal() {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 4,
  });

  return (
    <View style={styles.container} {...safeAreaProps}>
      <Box
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
        flex="1"
        w="100%"
      >
        <Center bg="amber.100">
          <HStack>
            <Heading w="85%">Chatbot</Heading>
            <Button variant="unstyled">
              <Text fontSize="2xs">Skip</Text>
            </Button>
          </HStack>
        </Center>
        <Divider />
        <ScrollView>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            flex="1"
            gap="4"
            pb="5"
            pt="7"
          >
            <VStack space={3}>
              <Heading textAlign="center" size="md"></Heading>
              <Text textAlign="center" size="md">
                aaaaaasdfsadfasjkhfskjdhfsjkdhjbfkdjfhsldfsd
              </Text>
            </VStack>
          </Box>
        </ScrollView>
        <Box alignItems="center" pb={2}>
          <Button w="3/4" variant="outline">
            Let's start!
          </Button>
        </Box>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
