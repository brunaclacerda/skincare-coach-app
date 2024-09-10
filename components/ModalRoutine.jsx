import {
  Text,
  Modal,
  Box,
  Button,
  ScrollView,
  Heading,
  HStack,
  Progress,
  Center,
  Image,
  VStack,
  TextArea,
  Container,
  Pressable,
  Divider,
} from "native-base";

import {
  View,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import FullScreenModal from "./FullScreenModal";
import { useState, useEffect, createContext, useContext } from "react";

const getRoutine = (skinType) => {
  switch (skinType) {
    case "dry":
      return {
        Morning: [
          {
            product: "Cleanser",
            name: "The Ordinary Squalene Cleanser",
            description:
              "This gentle cleanser effectively removes impurities without stripping moisture, suitable for dry and sensitive skin",
          },
          {
            product: "Serum",
            name: "The Ordinary Hyaluronic Acid 2% + B5",
            description:
              "This gentle cleanser effectively removes impurities without stripping moisture, suitable for dry and sensitive skin",
          },
          {
            product: "Moisturizer",
            name: "The Ordinary Natural Moisturizing Factors + HA",
            description:
              "A hydrating moisturizer that works well under makeup and provides lasting hydration.",
          },
          {
            product: "Sun Protection",
            name: "The Ordinary Mineral UV Filters SPF 30 with Antioxidants",
            description:
              "Provides sun protection while being gentle on sensitive skin and includes antioxidants for added skin benefits.",
          },
        ],
        Evening: [
          {
            product: "Cleanser",
            name: "The Ordinary Squalene Cleanser",
            description:
              "This gentle cleanser effectively removes impurities without stripping moisture, suitable for dry and sensitive skin",
          },
          {
            product: "Serum",
            name: "The Ordinary Hyaluronic Acid 2% + B5",
            description:
              "This gentle cleanser effectively removes impurities without stripping moisture, suitable for dry and sensitive skin",
          },
          {
            product: "Moisturizer",
            name: "The Ordinary Natural Moisturizing Factors + HA",
            description:
              "A hydrating moisturizer that works well under makeup and provides lasting hydration.",
          },
        ],
      };
    default:
      return {
        Morning: [
          {
            product: "Cleanser",
            name: "CeraVe Acne Control Cleanser",
            description:
              "This acne control cleanser with 2% salicylic acid is formulated to clear acne, reduce blackheads and improve the appearance of pores, while purifying clay helps absorb excess oil.",
          },
          {
            product: "Serum",
            name: "Cetaphil Pro Dermacontrol Oil Control Moisturizer SPF 30",
            description:
              "Advanced 3-in-1 lotion provides facial hydration, shine control and SPF 30 sun protection.",
          },
        ],
        Evening: [
          {
            product: "Cleanser",
            name: "CeraVe Acne Control Cleanser",
            description:
              "This acne control cleanser with 2% salicylic acid is formulated to clear acne, reduce blackheads and improve the appearance of pores, while purifying clay helps absorb excess oil.",
          },
        ],
      };
  }
};
const template = (routine = {}, prop = "") => (
  <ScrollView>
    <VStack pt={4} space={8} flex={1} alignItems="center">
      {routine[prop].map((value, index) => {
        return (
          <VStack>
            <Heading size="sm">Step {index + 1} </Heading>
            <HStack space={2}>
              <Image
                p={2}
                source={{
                  uri: "https://wallpaperaccess.com/full/317501.jpg",
                }}
                alt=""
                size="sm"
              />
              <Container>
                <Heading size="xs" bold>
                  {value.product}
                </Heading>
                <Text>{value.name}</Text>
                <Text>{value.description}</Text>
              </Container>
            </HStack>
          </VStack>
        );
      })}
    </VStack>
  </ScrollView>
);

const initialLayout = {
  width: Dimensions.get("window").width,
};

export default function ModalRoutine({
  showRoutineModal,
  setShowRoutineModal,
  skinAnalyses,
  setIsClosed,
  setRestartQuiz,
}) {
  const [routine, setRoutine] = useState({ Morning: [], Evening: [] });
  console.log("ModalRoutine");
  // const routine = getRoutine();

  useEffect(() => {
    if (showRoutineModal) {
      console.log("UseEffect showRoutineModal");
      console.log(skinAnalyses);
      setRoutine(getRoutine(skinAnalyses[0]?.result || "dry"));
    }
  }, [showRoutineModal]);

  const renderScene = SceneMap({
    first: template.bind(this, routine, "Morning"),
    second: template.bind(this, routine, "Evening"),
    // third: ThirdRoute,
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "first",
      title: "Morning",
    },
    {
      key: "second",
      title: "Evening",
    },
    // {
    //   key: "third",
    //   title: "Weekly",
    // },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          const color = index === i ? "#e5e5e5" : "#1f2937";
          const borderColor = index === i ? "#1f2937" : "#e5e5e5";
          return (
            <TouchableOpacity
              style={{
                ...styles.tabItem,
                borderColor: borderColor,
              }}
              onPress={() => setIndex(i)}
            >
              <Animated.Text style={{ opacity, color }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <FullScreenModal
      useState={{
        showModal: showRoutineModal,
        setShowModal: setShowRoutineModal,
      }}
    >
      <Center pt={8} safeArea>
        <Heading>Your Skincare Routine</Heading>
      </Center>

      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{
          marginTop: StatusBar.currentHeight,
        }}
      />
      <Modal.Footer borderTopWidth={0}>
        <Center flex={1}>
          <Button.Group space="30px">
            <Button
              minW="80px"
              onPress={() => {
                setRestartQuiz(true);
                setShowRoutineModal(false);
              }}
            >
              Restart quiz
            </Button>
            <Button
              minW="80px"
              onPress={() => {
                setIsClosed(true);
                setShowRoutineModal(false);
              }}
            >
              Close
            </Button>
          </Button.Group>
        </Center>
      </Modal.Footer>
    </FullScreenModal>
  );
}

// }
// function Footer() {
//   const {
//     isDone,
//     setShowAnalysesModal,
//     setIndex,
//     index,
//     setIsClosed,
//     summary,
//     setRestartQuiz,
//   } = useContext(AnalysesModalContext);

//   const closeOnPress = () => {
//     setShowAnalysesModal(false);
//     setIsClosed(true);
//   };

//   const nextOnPress = () => {
//     setIndex(index + 1);
//   };

//   const backOnPress = () => {
//     setIndex(index - 1);
//   };

//   return (
//     <Center flex={1}>
//       {!summary.showSummary && (
//         <Button.Group space="30px">
//           {index > 0 && (
//             <Button minW="80px" onPress={backOnPress}>
//               Back
//             </Button>
//           )}
//           {!isDone && (
//             <Button minW="80px" onPress={nextOnPress}>
//               Next
//             </Button>
//           )}
//           {isDone && (
//             <Button minW="80px" onPress={closeOnPress}>
//               Close
//             </Button>
//           )}
//         </Button.Group>
//       )}
//       {summary.showSummary && (
//         <Button.Group space="30px">
//           <Button
//             minW="80px"
//             onPress={() => {
//               console.log("retart quiz");
//               setRestartQuiz(true);
//               setShowAnalysesModal(false);
//             }}
//           >
//             Restart quiz
//           </Button>
//           <Button
//             minW="80px"
//             onPress={() => {
//               console.log("Show routine builder");
//             }}
//           >
//             Next
//           </Button>
//         </Button.Group>
//       )}
//     </Center>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    // borderBottomColor: "#1f2937",
    borderBottomWidth: 3,
  },
});
