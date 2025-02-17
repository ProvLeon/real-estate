import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import icons from "@/constants/icons";

const TabIcon = (
  { focused, icon, title }: { focused: boolean; icon: object; title: string },
) => (
  <View className="flex flex-col flex-1 mt-3 items-center">
    <Image
      source={icon}
      className="size-6"
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode="contain"
    />
    <Text
      className={`${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} focused={focused} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
