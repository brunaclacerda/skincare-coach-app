import { createContext, useContext } from "react";
import { Modal, ScrollView, Box, Input } from "native-base";

const ModalContext = createContext(null)

export default function ModalSurveyContent() {

    return (
        <ModalContext.Provider>
            {/* For MVP closeButton option is disabled */}
            {/* <Modal.CloseButton />*/}
            {/* <Modal.Header>Questionnaire</Modal.Header> */}
    <Modal.Body>
      <ScrollView>
      {
        // <Box 
        // position="absolute"
        // justifyContent="center"
        //   top={0}
        //   left={0}
        //   right={0}
        //   bottom={0}
        // alignItems="center">
        //     <Center>
        //         <Spinner color="cyan.500" animating={showModalSurvey} align="center" justify="center"/>
        //     </Center>
        // </Box>
        

      }
        {/* <Box>
          <Text>Let's Understand Your Skin</Text>
          <Text>Answer a few simple question to get personalized recommendations.</Text>
        </Box>
        <Box>
          <Input
            mt={2}
            placeholder="Name"
            value={profileData.name}
            onChangeText={(text) => setProfileChange('name', text)}
          />
          <Input
            mt={2}
            placeholder="Birthdate"
            value={profileData.birthDate}
            onChangeText={(text) => setProfileChange('birthdate', text)}
          />
        </Box> */}
      </ScrollView>
    </Modal.Body>
    <Modal.Footer>
      <Button.Group space={2}>
        <Button onPress={() => {
            setShowModalSurvey(false)
            setShowProfileModal(true);
            }} 
            colorScheme="muted">
          Voltar
        </Button>
        <Button onPress={handleProfileSubmit}>
          Next
        </Button>
      </Button.Group>
    </Modal.Footer>
        </ModalContext.Provider>
    )

}