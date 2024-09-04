// import { useEffect, useState } from "react";
// import ModalSurvey from "../../../components/ModalSurvey";
// import ModalOrboarding from "../../../components/ModalOnboarding";
// import ModalAnalyses from "../../../components/ModalAnalyses";
import { useSafeArea, View, Text, Box, Heading } from "native-base";

import { useSession } from "../../../ctx";

export default function Index() {
  console.log("Index");
  const { user } = useSession();
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 4,
  });

  return (
    <Box {...safeAreaProps}>
      <Heading size="xl">{"Welcome " + user.name.first}</Heading>
    </Box>
  );
}
