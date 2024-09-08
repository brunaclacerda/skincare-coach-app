import {
  AddIcon,
  Button,
  Heading,
  VStack,
  Pressable,
  Box,
  HStack,
  Spacer,
  Icon,
  Center,
  View,
  Text,
  useSafeArea,
} from "native-base";

import { useRouter } from "expo-router";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import dateFormat from "dateformat";

import { getChats } from "../../../api/chatbot.js";
import { useChatContext } from "../../../components/ChatContext";

export default function ChatbotTab() {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 4,
  });
  const chatContext = useChatContext();

  const router = useRouter();

  return (
    <>
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
          <Center>
            <VStack alignItems="center">
              <Heading p="4" pb="3" size="lg">
                Chat
              </Heading>
              <Button
                leftIcon={<AddIcon />}
                variant="outline"
                onPress={() => {
                  chatContext.selectChat(null);
                  router.replace("/chatmodal");
                }}
              >
                {/* <Link href="/chatmodal"> Start a new chat</Link> */}
                <Text>Start a new chat</Text>
              </Button>
            </VStack>
          </Center>
          <Basic chatContext={chatContext} />
        </Box>
      </View>
    </>
  );
}

async function getData() {
  const chats = await getChats();
  const list = chats.map((chat) => {
    const lastMsgIdx = chat.message.length - 1;
    chat.recentText = chat.message[lastMsgIdx]?.content?.substr(0, 20) || "";
    chat.date = dateFormat(chat.createdAt, "paddedShortDate");
    return chat;
  });
  return list;
}

function Basic({ chatContext }) {
  const [listData, setListData] = useState();
  const router = useRouter();

  useEffect(() => {
    getData()
      .then((data) => {
        setListData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        onPress={() => {
          chatContext.selectChat(item);
          router.replace({
            pathname: "/chatmodal",
          });
        }}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            {/* <Avatar
              size="48px"
              source={{
                uri: item.avatarUrl,
              }}
            /> */}
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {item.title}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.recentText}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              alignSelf="flex-start"
            >
              {item.date}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.id)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.id)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
        keyExtractor={(item) => item._id}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    w: "100%",
  },
});
