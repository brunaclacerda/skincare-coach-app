import { router } from 'expo-router';
import { View } from 'react-native';
import { Button, Input, Icon, Pressable, Text, VStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

import { useSession } from '../ctx';

export default function SignIn() {
  const { signIn } = useSession();
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState("bruna@hotmail.com")
  const [password, setPassword] = React.useState("Ab12345678910-")

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <VStack space={4} alignItems="center">
        <Input 
          value={username}
          onChangeText={text => setUsername(text)} 
          w={{base: "75%", md: "25%"}} 
          InputLeftElement={
            <Icon as={
              <MaterialIcons name="person" />} 
            size={5} 
            ml="2" 
            color="muted.400" />} 
          placeholder="Name" />
        <Input 
          value={password}
          onChangeText={text => setPassword(text)} 
          w={{base: "75%",md: "25%"}} 
          type={show ? "text" : "password"} 
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon 
                as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} 
                size={5} mr="2" 
                color="muted.400" />
            </Pressable>} 
          placeholder="Password" />
        <Button onPress={ () => {
          signIn(username, password)
          .then((result) => {
            if(result && result.failure) alert(result.message) //TODO failure msg on component 
              // Navigate after signing in. You may want to tweak this to ensure sign-in is
              // successful before navigating.
              router.replace('/');
          })
          .catch((error) => {
            console.log(error.message)
          })
          }}
        >
          <Text>Sign in</Text>

        </Button>
      </VStack>

    </View> 
  );
}
