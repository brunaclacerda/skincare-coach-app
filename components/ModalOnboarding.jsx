import {
  Text,
  Modal,
  Box,
  Button,
  ScrollView,
  Input,
  Heading,
  Center,
  VStack,
  Alert,
  IconButton,
  HStack,
  CloseIcon,
  Stack,
} from "native-base";
import { useState, useContext, createContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import FullScreenModal from "./FullScreenModal";
import { updateApi } from "../api/user";

const ProfileContext = createContext();

function ProfileModal() {
  console.log("ProfileModal");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { profileData, setProfileData } = useContext(ProfileContext);
  const handleInputChange = (fnSet, data, field, value) => {
    fnSet({ ...data, [field]: value });
  };

  const setProfileChange = handleInputChange.bind(
    this,
    setProfileData,
    profileData,
  );

  const formatDate = (date) => {
    // Format date as "day / month / year"
    if (date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate !== undefined) setProfileChange("birthDate", selectedDate);
  };

  return (
    <Box>
      <VStack space={2} alignItems="center">
        <Heading>Let's Understand Your Skin</Heading>
        <Text fontSize="md" textAlign="center" fontStyle="">
          Answer a few simple questions to get personalized recommendations.
        </Text>

        <Box width="90%">
          <Input
            size="2xl"
            mt={2}
            placeholder="Name"
            value={profileData.name}
            onChangeText={setProfileChange.bind(this, "name")}
          />

          <Input
            size="2xl"
            mt={2}
            placeholder="Birthdate"
            value={formatDate(profileData.birthDate)}
            onPress={() => {
              setShowDatePicker(true);
            }}
          />
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              display="default"
              mode="date"
              onChange={onDateChange}
            />
          )}
        </Box>
      </VStack>
    </Box>
  );
}

function SubmitButton() {
  const { profileData, setShowProfileModal, setShowSurveyModal } =
    useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  console.log("SubmitButton");

  return (
    <Stack space={3} w="100%" alignItems="center">
      {show && (
        <Alert maxW="400" status="error">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: "coolGray.800",
                  }}
                >
                  {error.message}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: "coolGray.600",
                }}
                onPress={() => setShow(false)}
              />
            </HStack>
          </VStack>
        </Alert>
      )}

      <Button.Group space={2}>
        <Button
          size="lg"
          minW="80px"
          isLoading={loading}
          onPress={() => {
            setLoading(true);
            setShow(false);

            updateApi(profileData)
              .then((result) => {
                setShowProfileModal(false);
                setShowSurveyModal(true);
              })
              .catch((error) => {
                setError(error);
                setShow(true);
              })
              .finally(() => {
                setLoading(false);
              });
            console.log("Chegou aqui");
          }}
        >
          Next
        </Button>
      </Button.Group>
    </Stack>
  );
}

export default function ModalOrboarding({
  showProfileModal,
  setShowProfileModal,
  setShowSurveyModal,
}) {
  console.log("ModalOrboarding");

  const [profileData, setProfileData] = useState({
    name: "Bruna",
    birthDate: new Date(1990, 6, 19),
  });

  return (
    <FullScreenModal
      useState={{
        showModal: showProfileModal,
        setShowModal: setShowProfileModal,
      }}
    >
      <Modal.Header borderBottomWidth="0" safeArea p="16" />
      <ProfileContext.Provider
        value={{
          profileData,
          setProfileData,
          setShowProfileModal,
          setShowSurveyModal,
        }}
      >
        <Modal.Body>
          <ScrollView>
            <ProfileModal />
          </ScrollView>
        </Modal.Body>
        <Modal.Footer borderTopWidth="0">
          <Center flex={1}>
            <Button.Group space={2}>
              <SubmitButton />
            </Button.Group>
          </Center>
        </Modal.Footer>
      </ProfileContext.Provider>
    </FullScreenModal>
  );
}
