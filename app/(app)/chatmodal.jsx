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
  Input,
  Pressable,
  Spacer,
  Spinner,
} from "native-base";
import { useState, useEffect, useRef } from "react";
import { Link } from "expo-router";

import Markdown from "react-native-markdown-display";

import { TabBarIcon } from "../../components/navigation/TabBarIconJs";
import { chatbot } from "../../api/chatbot";
import { useChatContext } from "../../components/ChatContext";

export default function ChatModal() {
  const WELCOME_MSG = [
    {
      content: "Hi! I’m here to help!?",
      role: "assistant",
    },
  ];

  // Setting inicial messages state
  const { selectedChat } = useChatContext();
  const [chat, setChat] = useState(selectedChat || { message: WELCOME_MSG });
  const [messages, setMessages] = useState(chat.message);

  // setting template states
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState();
  const [textBtnTopic, setTextBtnTopic] = useState(
    chat.topic?.button && !chat.thread ? chat.topic.button : "",
  );
  const scrollViewRef = useRef();
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 4,
  });

  //functions
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const getStream = async (chunk) => {
    setAnswer((prevAnswer) => {
      return prevAnswer + chunk;
    });
  };
  const isDone = async (id) => {
    if (!chat._id) setChat({ ...chat, _id: id });
    setIsLoading(false);
    if (textBtnTopic) setTextBtnTopic("");
  };

  //Setting useEffects
  useEffect(() => {
    if (query) {
      chatbot(query, getStream, isDone, chat?._id);

      setMessages((prevMessages) => {
        const content = textBtnTopic || query;
        const newUsrMsg = { content, role: "user" };
        const newMsgList = prevMessages.concat([newUsrMsg]);
        return newMsgList;
      });
      setQuery("");
      scrollToBottom();
    }
  }, [query]);

  useEffect(() => {
    if (!isLoading && answer) {
      setMessages((prevMessages) => {
        const receivedMsg = { content: answer, role: "assistant" };
        const newMsgList = prevMessages.concat([receivedMsg]);
        return newMsgList;
      });

      setAnswer("");

      scrollToBottom();
    }
  }, [isLoading]);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.message);
      setChat(selectedChat);
    }
  }, [selectedChat]);

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
        p={2}
      >
        <Center>
          <HStack>
            <Heading w="85%">Chatbot</Heading>
            <Button variant="unstyled">
              <Link href="../chatbot">
                <Text fontSize="2xs">Close</Text>
              </Link>
            </Button>
          </HStack>
        </Center>
        <Divider />
        <ScrollView ref={scrollViewRef}>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            flex="1"
            gap="4"
            pb="5"
            pt="7"
          >
            <VStack space={3} p={2}>
              <Spacer flex={1}></Spacer>
              {messages.map((message) => {
                return (
                  <Box rounded="xl" {...styles[message.role]} p="3">
                    {/* <Text>{message.content}</Text> */}
                    <Markdown>{message.content}</Markdown>
                  </Box>
                );
              })}
              {isLoading && (
                <Box rounded="xl" p="3" {...styles.assistant}>
                  <Markdown>{answer}</Markdown>
                </Box>
              )}
            </VStack>
          </Box>
        </ScrollView>
        <VStack>
          {!textBtnTopic && (
            <MessageButton
              isLoading={isLoading}
              setQuery={setQuery}
              setIsLoading={setIsLoading}
            />
          )}

          {textBtnTopic && (
            <Center>
              <Button
                w="3/4"
                variant="outline"
                isLoading={isLoading}
                onPress={() => {
                  setIsLoading(true);
                  setQuery(chat.topic.aiContent);
                }}
              >
                {textBtnTopic}
              </Button>
            </Center>
          )}
        </VStack>
      </Box>
    </View>
  );
}

function MessageButton({ setQuery, isLoading, setIsLoading }) {
  const [input, setInput] = useState();

  return (
    <HStack pt={2} space={1}>
      <Input
        flex={1}
        value={input}
        onChangeText={(text) => setInput(text)}
        rounded="xl"
      ></Input>

      <Pressable
        justifyContent="center"
        onPress={() => {
          setIsLoading(true);
          setQuery(input);
          setInput("");
        }}
      >
        {!isLoading && <TabBarIcon name="send" />}
        {isLoading && <Spinner size="sm" />}
      </Pressable>
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    padding: "16",
    border: "4",
  },
  assistant: {
    marginLeft: "5",
    bg: "gray.300",
  },
  admin: {
    marginLeft: "5",
    bg: "gray.300",
  },
  user: {
    marginRight: "5",
    bg: "gray.100",
  },
});
