import {
  AddIcon,
  Button,
  Heading,
  VStack,
  Pressable,
  Box,
  HStack,
  Avatar,
  Spacer,
  Icon,
  Center,
  ScrollView,
  View,
  Text,
  useSafeArea,
  Modal,
} from "native-base";

import { Link } from "expo-router";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

// function NewChatModal(showModal, setShowModal) {
//   console.log("newChatModal");

//   return (
//     <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
//       <Modal.Content>
//         <Modal.Header>
//           {/* <HStack> */}
//           <Heading w="85%" md="20px" mb="20px" margin="8px"></Heading>
//           {/* <Button variant="unstyled">
//               <Text fontSize="2xs">Skip</Text>
//             </Button> */}
//           {/* </HStack> */}
//         </Modal.Header>

//         <Modal.Body flex="1" w="100%">
//           {/* <ScrollView> */}
//           <Box
//             alignItems="center"
//             display="flex"
//             flexDirection="column"
//             flex="1"
//             gap="4"
//             pb="5"
//             pt="7"
//           >
//             <VStack space={3}>
//               <Heading textAlign="center" size="md"></Heading>
//               <Text textAlign="center" size="md">
//                 aaaaaasdfsadfasjkhfskjdhfsjkdhjbfkdjfhsldfsd
//               </Text>
//             </VStack>
//           </Box>
//           {/* </ScrollView> */}
//         </Modal.Body>

//         <Modal.Footer borderTopWidth="0">
//           <Button
//             onPress={() => {
//               setShowModal(!showModal);
//             }}
//           >
//             Open Modal
//           </Button>
//         </Modal.Footer>
//       </Modal.Content>
//     </Modal>
//   );
// }

export default function ChatbotTab() {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 4,
  });

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
              <Button leftIcon={<AddIcon />} variant="outline">
                <Link href="/chatmodal"> Start a new chat</Link>
              </Button>
            </VStack>
          </Center>
          {/* <ScrollView
          contentContainerStyle={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        > */}
          <Basic />
          {/* </ScrollView> */}
        </Box>
      </View>
    </>
  );
}

function getData() {
  return [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Afreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl: "",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujita Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
      avatarUrl: "",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "Good Day!",
      avatarUrl: "",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Aniket Kumar",
      timeStamp: "8:56 PM",
      recentText: "All the best",
      avatarUrl: "",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "I will call today.",
      avatarUrl: "",
    },
  ];
}

function Basic() {
  const data = getData();
  const [listData, setListData] = useState(data);

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
        onPress={() => console.log("You touched me")}
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
                {item.fullName}
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
              {item.timeStamp}
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
        keyExtractor={(item) => item.id}
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
