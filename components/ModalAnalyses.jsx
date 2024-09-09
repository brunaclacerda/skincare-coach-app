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
} from "native-base";

import FullScreenModal from "./FullScreenModal";
import { useState, useEffect, createContext, useContext } from "react";

const AnalysesModalContext = createContext();

function Footer() {
  const { isDone, setShowAnalysesModal, setIndex, index, setIsClosed } =
    useContext(AnalysesModalContext);

  const closeOnPress = () => {
    setShowAnalysesModal(false);
    setIsClosed(true);
  };

  const nextOnPress = () => {
    setIndex(index + 1);
  };

  const backOnPress = () => {
    setIndex(index - 1);
  };

  return (
    <Center flex={1}>
      <Button.Group space="30px">
        {index > 0 && (
          <Button minW="80px" onPress={backOnPress}>
            Back
          </Button>
        )}
        {!isDone && (
          <Button minW="80px" onPress={nextOnPress}>
            Next
          </Button>
        )}
        {isDone && (
          <Button minW="80px" onPress={closeOnPress}>
            Close
          </Button>
        )}
      </Button.Group>
    </Center>
  );
}

export default function ModalAnalyses({
  showAnalysesModal,
  setShowAnalysesModal,
  skinAnalyses,
  setIsClosed,
}) {
  console.log("ModalAnalyses");
  const [pageData, setPageData] = useState({});
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    console.log("UseEffect skin ", index, skinAnalyses.length);
    if (showAnalysesModal) {
      setIsDone(index == skinAnalyses.length - 1 ? true : false);
      if (index < skinAnalyses.length) return setPageData(skinAnalyses[index]);
      setIsDone(true);
    }
  }, [index, showAnalysesModal]);

  return (
    <FullScreenModal
      useState={{
        showModal: showAnalysesModal,
        setShowModal: setShowAnalysesModal,
      }}
    >
      {skinAnalyses && (
        <AnalysesModalContext.Provider
          value={{
            pageData,
            setShowAnalysesModal,
            isDone,
            setIndex,
            index,
            setIsClosed,
          }}
        >
          <Modal.Header borderBottomWidth="0" safeArea>
            <HStack>
              <Heading w="85%" md="20px" mb="20px" margin="8px">
                {pageData.analysis}
              </Heading>
              <Button
                variant="unstyled"
                onPress={() => {
                  setIsClosed(true);
                }}
              >
                <Text fontSize="2xs">Skip</Text>
              </Button>
            </HStack>
            <Box w="100%">
              <Progress
                size="xs"
                value={((index + 1) * 100) / skinAnalyses.length}
              />
            </Box>
          </Modal.Header>

          <Modal.Body flex="1" w="100%">
            <ScrollView>
              <Box pb="5" pt="7">
                <VStack
                  space={3}
                  w="100%"
                  flex="1"
                  display="flex"
                  alignItems="center"
                >
                  <Heading textAlign="center" size="md">
                    {"You have " + pageData.result}
                  </Heading>
                  <Center>
                    <Image
                      source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg",
                      }}
                      alt=""
                      size="xl"
                    />
                  </Center>
                  {/* <Box justifyContent="center" boxSize="100%">
                    <TextArea
                      isDisabled
                      _disabled={{
                        _font: {
                          fontStyle: "normal", // Change font style to normal
                          fontWeight: "normal", // Optional: You can also set font weight to normal
                        },
                      }}
                      style={{ fontStyle: "normal" }}
                      textAlign="center"
                      flexDirection="column"
                      display="flex"
                      flex={1}
                      h={350}
                    >
                      {pageData.text}
                    </TextArea> */}
                  <Container boxSize="100%">
                    <Text alignContent="center" textAlign="center" h={350}>
                      {pageData.text}
                    </Text>
                  </Container>
                  {/* </Box> */}
                </VStack>
              </Box>
            </ScrollView>
          </Modal.Body>

          <Modal.Footer borderTopWidth="0">
            <Footer />
          </Modal.Footer>
        </AnalysesModalContext.Provider>
      )}
    </FullScreenModal>
  );
}
