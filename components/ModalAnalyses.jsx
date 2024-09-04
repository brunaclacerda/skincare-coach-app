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
    setIndex(index++);
  };

  const backOnPress = () => {
    setIndex(index--);
  };

  return (
    <Center flex={1}>
      <Button.Group space="30px">
        {!isDone && index > 0 && (
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
    console.log("UseEffect skin ", index, skinAnalyses);
    if (skinAnalyses && index < skinAnalyses.length)
      return setPageData(skinAnalyses[index]);
    setIsDone(true);
  }, [index, skinAnalyses]);

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
              <Progress size="xs" value={45} />
            </Box>
          </Modal.Header>

          <Modal.Body flex="1" w="100%">
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
                  <Text textAlign="center" size="md">
                    {pageData.text}
                  </Text>
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
