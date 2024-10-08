import { useEffect, useState } from "react";
import ModalSurvey from "../../components/ModalSurvey";
import ModalOrboarding from "../../components/ModalOnboarding";
import ModalAnalyses from "../../components/ModalAnalyses";
import { Box } from "native-base";
import { useSession } from "../../ctx";
import { useRouter } from "expo-router";
import ModalRoutine from "../../components/ModalRoutine";

export default function NewUserModal() {
  console.log("NewUserModal");

  const [showProfileModal, setShowProfileModal] = useState(true);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [showAnalysesModal, setShowAnalysesModal] = useState(false);
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [skinAnalyses, setSkinAnalyses] = useState([]);
  const [restartQuiz, setRestartQuiz] = useState(false);
  const [isClosed, setIsClosed] = useState();
  const router = useRouter();
  const { setUserSurvey } = useSession();

  useEffect(() => {
    if (skinAnalyses && skinAnalyses.length && !isClosed) {
      return setShowAnalysesModal(true);
    }
    if (isClosed) {
      console.log("isClosed");
      setUserSurvey();
      router.replace("/");
    }
  }, [skinAnalyses, isClosed]);

  return (
    <Box>
      <ModalOrboarding
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        setShowSurveyModal={setShowSurveyModal}
      />
      ( showSurveyModal &&
      <ModalSurvey
        showSurveyModal={showSurveyModal}
        setShowSurveyModal={setShowSurveyModal}
        setSkinAnalyses={setSkinAnalyses}
        setIsClosed={setIsClosed}
        restartQuiz={restartQuiz}
        setRestartQuiz={setRestartQuiz}
      />
      ) ( (skinAnalyses && showAnalysesModal) &&
      <ModalAnalyses
        showAnalysesModal={showAnalysesModal}
        setShowAnalysesModal={setShowAnalysesModal}
        skinAnalyses={skinAnalyses}
        setIsClosed={setIsClosed}
        restartQuiz={restartQuiz}
        setRestartQuiz={setRestartQuiz}
        setShowRoutineModal={setShowRoutineModal}
      />
      )
      {showRoutineModal && (
        <ModalRoutine
          showRoutineModal={showRoutineModal}
          setShowRoutineModal={setShowRoutineModal}
          setRestartQuiz={setRestartQuiz}
          setIsClosed={setIsClosed}
          skinAnalyses={skinAnalyses}
        />
      )}
    </Box>
  );
}
