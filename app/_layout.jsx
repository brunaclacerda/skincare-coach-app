import { NativeBaseProvider } from 'native-base';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SessionProvider } from '../ctx';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// async function save(key, value) {
//   await SecureStore.setItemAsync(key, value);
// }

// async function getValueFor(key) {
//   let result = await SecureStore.getItemAsync(key);
//   if (result) {
//     alert("🔐 Here's your value 🔐 \n" + result);
//   } else {
//     alert('No values stored under that key.');
//   }
// }

export default function RootLayout() {
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  
  if (!loaded) {
    return null;
  }
  return (

    <SessionProvider>

      <NativeBaseProvider>
        <Slot />
      </NativeBaseProvider>
      
    </SessionProvider>
  );
}
