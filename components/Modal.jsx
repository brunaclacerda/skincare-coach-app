import React, { useState } from 'react';
import { Modal, Button, Box, Input, Text, ScrollView, Spinner, Center} from 'native-base';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

//TO DO create .env for url
async function fetchSurvey(){
    try{ 
        const response = await
            fetch('http://10.0.2.2:3000/survey', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        
        if (!response.ok) throw new Error(data.failureMsg)

        const data = await response.json() 

        return data

      } catch (error) {
        // console.log(error)
        return { failure: true, message: error}
        
      }
}

export default function SurveyModal() {
  const [showProfileModal, setShowProfileModal] = useState(true);
  const [showModalSurvey, setShowModalSurvey] = useState(false);
  const [surveyData, setSurveyData] = useState({});
  const [profileData, setProfileData] = useState({
    name: "",
    birthDate: new Date()
  })
  const formatDate = (date) => {
    // Format date as "day / month / year"
    if (date){
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
  };

  const handleInputChange = (fnSet, data, field, value) => {
    fnSet({ ...data, [field]: value }); 
    console.log(value)
    console.log("teste", profileData)
  };
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const setProfileChange = handleInputChange.bind(this, setProfileData, profileData)

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false)
    if (selectedDate !== undefined) setProfileChange('birthDate', selectedDate)}

  const handleProfileSubmit = () => {
    // Handle form submission
    console.log('Profile Submitted:', profileData);
    setShowProfileModal(false);
    setShowModalSurvey(true)
  };

  const result = fetchSurvey()
            .then((data) => {console.log(data)})
            .catch((error) => {
                console.log(error)
            })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Modal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} size="full">
        <Modal.Content width="100%" height="100%" maxWidth="100%" maxHeight="100%">
            {/* For MVP closeButton option is disabled */}
          {/* <Modal.CloseButton />*/}
          {/* <Modal.Header>Questionnaire</Modal.Header> */}
          <Modal.Body>
            <ScrollView>
            
              <Box>
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
                  value={formatDate(profileData.birthDate)}
                  onPress={() => {setShowDatePicker(true)}}
                //   onChangeText={(text) => setProfileChange('birthDate', text)}
                />
                {showDatePicker && (
                    <DateTimePicker value={new Date()} 
                        display='default' 
                        mode="date" 
                        onChange={onDateChange} />)}
              </Box>

            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              {/* <Button onPress={() => setShowProfileModal(false)} colorScheme="muted">
                Cancel
              </Button> */
              console.log("tste", result)
              }
              <Button onPress={handleProfileSubmit}>
                Next
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

<Modal isOpen={showModalSurvey} onClose={() => setShowModalSurvey(false)} size="full">
  <Modal.Content   width="100%" height="100%" maxWidth="100%" maxHeight="100%">
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
  </Modal.Content>
</Modal>
    </View>
  );
}
