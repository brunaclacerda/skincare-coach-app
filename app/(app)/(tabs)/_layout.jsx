import { Redirect, Tabs } from "expo-router";
import { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIconJs";
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

import { useSession } from "../../../ctx";

export default function TabLayout() {
  console.log("TabLayout");
  const { user } = useSession();
  // JUST FOR TESTING
  // if (user.isNew) {
  //   console.log(user);
  //   return <Redirect href="/modal" />;
  // }
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mySkin"
        options={{
          title: "My Skin",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconSource="material"
              name={
                focused ? "face-woman-shimmer" : "face-woman-shimmer-outline"
              }
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconSource="material"
              name={focused ? "account-circle" : "account-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
