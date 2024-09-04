// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const ICON_SOURCE = {
  ionicons: Ionicons,
  material: MaterialCommunityIcons,
};

export function TabBarIcon({ iconSource = "ionicons", style, ...rest }) {
  const Icon = ICON_SOURCE[iconSource];
  return <Icon size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
