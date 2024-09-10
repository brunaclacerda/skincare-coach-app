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
  const {
    isDone,
    setShowAnalysesModal,
    setIndex,
    index,
    setIsClosed,
    summary,
    setRestartQuiz,
    setShowRoutineModal,
  } = useContext(AnalysesModalContext);

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
      {!summary.showSummary && (
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
      )}
      {summary.showSummary && (
        <Button.Group space="30px">
          <Button
            minW="80px"
            onPress={() => {
              setRestartQuiz(true);
            }}
          >
            Restart quiz
          </Button>
          <Button
            minW="80px"
            onPress={() => {
              setShowRoutineModal(true);
              setShowAnalysesModal(false);
            }}
          >
            Next
          </Button>
        </Button.Group>
      )}
    </Center>
  );
}

export default function ModalAnalyses({
  showAnalysesModal,
  setShowAnalysesModal,
  skinAnalyses,
  setIsClosed,
  setRestartQuiz,
  restartQuiz,
  setShowRoutineModal,
}) {
  console.log("ModalAnalyses");
  const [pageData, setPageData] = useState({});
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    console.log("UseEffect skin ", index, skinAnalyses);
    if (showAnalysesModal && skinAnalyses) {
      setIsDone(index == skinAnalyses.length ? true : false);
      if (index < skinAnalyses.length) return setPageData(skinAnalyses[index]);
    }
  }, [index, showAnalysesModal]);

  useEffect(() => {
    if (isDone) setShowSummary(true);
  }, [isDone]);

  useEffect(() => {
    if (restartQuiz) {
      setShowSummary(false);
      setIndex(0);
      setShowAnalysesModal(false);
    }
  }, [restartQuiz]);

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
            summary: { showSummary, setShowSummary },
            setRestartQuiz,
            setShowRoutineModal,
          }}
        >
          <Modal.Header borderBottomWidth="0" safeArea>
            {!showSummary && (
              <>
                <HStack>
                  <Heading w="85%" md="20px" mb="20px" margin="8px">
                    {pageData?.analysis}
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
              </>
            )}

            {showSummary && (
              <>
                <HStack>
                  <Heading w="85%" p="10px">
                    Your Skin Analysis
                  </Heading>
                </HStack>
              </>
            )}
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
                  {!showSummary && (
                    <>
                      <Heading textAlign="center" size="md">
                        {"You have " + pageData?.result}
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
                      <Container boxSize="100%">
                        <Text alignContent="center" textAlign="center" h={350}>
                          {pageData?.text}
                        </Text>
                      </Container>
                    </>
                  )}
                  {showSummary && (
                    <VStack space={7} boxSize="100%">
                      {skinAnalyses.map((skin) => {
                        console.log(skin);
                        return (
                          <HStack maxHeight={80}>
                            <Image
                              p={2}
                              source={{
                                uri: "https://wallpaperaccess.com/full/317501.jpg",
                              }}
                              alt=""
                              size="sm"
                            />
                            <Container pl={3} space={1}>
                              <Heading textAlign="left" fontSize="sm">
                                {skin.analysis}
                              </Heading>
                              <Text
                                textAlign="left"
                                maxHeight={55}
                                fontSize="xs"
                              >
                                {skin.text}{" "}
                              </Text>
                            </Container>
                          </HStack>
                        );
                      })}
                    </VStack>
                  )}
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
