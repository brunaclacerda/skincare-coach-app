import { Button } from "native-base";
import { View, Text, StyleSheet } from "react-native";
import { useSession } from "../../../ctx";

export default function ProfileTab() {
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button onPress={signOut}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
