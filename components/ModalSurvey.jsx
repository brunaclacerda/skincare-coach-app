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
} from "native-base";

import { Link } from "expo-router";

import FullScreenModal from "./FullScreenModal";
import { useState, useEffect, createContext, useContext } from "react";

import { getApi } from "../api/survey";

const SurveyContext = createContext();
const SectionContext = createContext({
  sectionData: "",
  sectionIndex: -1,
  setSectionIndex: null,
});
const QuestionContext = createContext();

//TO DO create .env for url
// async function fetchSurvey(){
//   try{
//       const response = await
//           fetch('http://10.0.2.2:3000/survey', {
//           method: 'GET',
//           headers: {
//               Accept: 'application/json',
//               'Content-Type': 'application/json',
//           }
//       })

//       if (!response.ok) throw new Error("Error not identified.")

//       const data = await response.json()

//       return data

//     } catch (error) {
//       throw new Error({ failure: true, message: error})
//     }
// }

function Section({ children }) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const { surveyData, setShowSurveyModal, setIsClosed } =
    useContext(SurveyContext);

  return (
    <SectionContext.Provider
      value={{
        sectionData: surveyData[sectionIndex],
        sectionIndex,
        setSectionIndex,
      }}
    >
      <Modal.Header borderBottomWidth="0" safeArea>
        <HStack>
          <Heading w="85%" md="20px" mb="20px" margin="8px">
            {surveyData[sectionIndex].section}
          </Heading>
          <Button
            variant="unstyled"
            onPress={() => {
              setShowSurveyModal(false);
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

      {children}
    </SectionContext.Provider>
  );
}

function Question({ children }) {
  const { sectionData } = useContext(SectionContext);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [isPressed, setIsPressed] = useState("");

  return (
    <QuestionContext.Provider
      display="flex"
      flexDirection="column"
      flex="1"
      value={{
        questionData: sectionData.question[questionIndex],
        questionIndex,
        setQuestionIndex,
        isPressed,
        setIsPressed,
      }}
    >
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
            <Center>
              <Heading textAlign="center" size="md">
                {sectionData.question[questionIndex].text}
              </Heading>
            </Center>
          </Box>

          <Answer />
        </ScrollView>
      </Modal.Body>

      <Footer />
    </QuestionContext.Provider>
  );
}

function Answer() {
  const { questionData, isPressed, setIsPressed } = useContext(QuestionContext);
  const { userAnswer, setUserAnswer } = useContext(SurveyContext);

  const questionID = questionData._id;

  useEffect(() => {
    const answerID = userAnswer.get(questionID);
    if (answerID) setIsPressed(answerID);
  }, [userAnswer, setIsPressed, questionID]);

  const handlePress = (answerID) => {
    const newAnswerMap = userAnswer.set(questionID, answerID);
    setUserAnswer(newAnswerMap);
    setIsPressed(answerID);
  };

  return (
    <Button.Group space={2} variant="outline">
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        flex="1"
        gap="4"
        pb="5"
        pt="7"
      >
        {questionData.answer.map((value) => {
          return (
            <Button
              w="5/6"
              key={value._id}
              onPress={() => {
                handlePress(value._id);
              }}
              variant={isPressed === value._id ? "solid" : "outline"}
            >
              {value.text}
            </Button>
          );
        })}
      </Box>
    </Button.Group>
  );
}

function Footer() {
  console.log("Footer");
  const { setSectionIndex, sectionIndex, sectionData } =
    useContext(SectionContext);
  const { setQuestionIndex, questionIndex } = useContext(QuestionContext);
  const { surveyData, userAnswer, setSkinAnalyses, setShowSurveyModal } =
    useContext(SurveyContext);

  const maxSectionIdx = surveyData.length - 1;
  const maxQuestionIdx = sectionData.question.length - 1;

  const nextOnPress = () => {
    if (questionIndex < maxQuestionIdx) {
      setQuestionIndex(questionIndex + 1);
    } else if (sectionIndex < maxSectionIdx) {
      setSectionIndex(sectionIndex + 1);
      setQuestionIndex(0);
    }
  };
  const backOnPress = () => {
    if (questionIndex === 0) {
      if (sectionIndex > 0) {
        const preSectionIdx = sectionIndex - 1;
        const preSecQuestionIdx = surveyData[preSectionIdx].question.length - 1;
        setSectionIndex(preSectionIdx);
        setQuestionIndex(preSecQuestionIdx);
      }
    } else {
      setQuestionIndex(questionIndex - 1);
    }
  };
  const submitOnPress = async (e) => {
    e.target.isDisable = true;
    const survey = surveyData.flatMap((section) => {
      console.log("section  ", section);
      const questions = section.question.flatMap((question) => {
        console.log("question   ", question);
        const answer = userAnswer.get(question._id);
        if (answer) {
          console.log("objAnswer   ", objAnswer);
          const objAnswer = { _id: question._id, answer: [{ _id: answer }] };
          return objAnswer;
        }
        return [];
      });

      console.log("questions       ", questions);
      if (questions.length) return { _id: section._id, question: questions };
      return [];
    });
    console.log(survey);

    try {
      const response = await fetch("http://10.0.2.2:3000/user/survey", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section: survey,
        }),
      });

      const data = await response.json();
      console.log("response     ", data);
      if (!response.ok) {
        if (data.failureMsg) throw new Error(data.failureMsg);
        throw new Error("Error not identified.");
      }
      setShowSurveyModal(false);
      setSkinAnalyses([data.skinAnalysis, ...data.concernAnalysis]);
    } catch (error) {
      // throw new Error({ failure: true, message: error})
      alert(error);
    }
  };

  return (
    <Modal.Footer borderTopWidth="0">
      <Center flex={1}>
        <Button.Group space="30px">
          {(sectionIndex > 0 || questionIndex > 0) && (
            <Button variant="subtle" minW="80px" onPress={backOnPress}>
              Back
            </Button>
          )}
          {(sectionIndex < maxSectionIdx || questionIndex < maxQuestionIdx) && (
            <Button minW="80px" onPress={nextOnPress}>
              Next
            </Button>
          )}
          {sectionIndex === maxSectionIdx &&
            questionIndex === maxQuestionIdx && (
              <Button minW="80px" onPress={submitOnPress}>
                Submit
              </Button>
            )}
        </Button.Group>
      </Center>
    </Modal.Footer>
  );
}

function SurveyModalContent({
  surveyData,
  setSurveyData,
  userAnswer,
  setUserAnswer,
  setSkinAnalyses,
  setShowSurveyModal,
  setIsClosed,
}) {
  console.log("SurveyModal");

  return (
    <SurveyContext.Provider
      display="flex"
      flexDirection="column"
      flex="1"
      value={{
        setShowSurveyModal,
        surveyData,
        setSurveyData,
        userAnswer,
        setUserAnswer,
        setSkinAnalyses,
        setIsClosed,
      }}
    >
      <Section display="flex" flexDirection="column" flex="1">
        <Question display="flex" flexDirection="column" flex="1" />
      </Section>
    </SurveyContext.Provider>
  );
}

export default function ModalSurvey({
  showSurveyModal,
  setShowSurveyModal,
  setSkinAnalyses,
  setIsClosed,
}) {
  console.log("ModalSurvey");
  const [userAnswer, setUserAnswer] = useState(new Map());

  const [surveyData, setSurveyData] = useState(undefined);

  useEffect(() => {
    getApi()
      .then((data) => {
        console.log("setSurveyData");

        setSurveyData(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  return (
    <FullScreenModal
      useState={{
        showModal: showSurveyModal,
        setShowModal: setShowSurveyModal,
      }}
    >
      {surveyData && (
        <SurveyModalContent
          surveyData={surveyData}
          setSurveyData={setSurveyData}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          setSkinAnalyses={setSkinAnalyses}
          setShowSurveyModal={setShowSurveyModal}
          setIsClosed={setIsClosed}
        ></SurveyModalContent>
      )}
    </FullScreenModal>
  );
}
