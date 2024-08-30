
import { Box, useSafeArea, Text } from 'native-base';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { LogBox } from 'react-native';
// import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '../../ctx';

LogBox.ignoreLogs(['WARN: ...']); 

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 4
  });

  const colorScheme = useColorScheme();
  
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }
  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Box {...safeAreaProps}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="+not-found" /> */}
          </Stack>
        </Box>
    </ThemeProvider>
  );
}
