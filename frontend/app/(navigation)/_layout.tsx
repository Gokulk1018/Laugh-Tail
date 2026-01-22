import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export default function NavigationLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#9ca3af",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: "#000000",
          borderTopWidth: 0,
          elevation: 10,
        },

        tabBarIcon: ({ color, size, focused }) => {
          // 👤 PROFILE TAB → USER IMAGE
          if (route.name === "profile") {
            return (
              <Image
                source={require("../../assets/images/profile.jpg")}
                style={{
                  width: focused ? 26 : 24,
                  height: focused ? 26 : 24,
                  borderRadius: 13,
                  borderWidth: focused ? 2 : 1,
                  borderColor: focused ? "#ffffff" : "#9ca3af",
                }}
              />
            );
          }

          let iconName: any;

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "ai":
              iconName = focused ? "sparkles" : "sparkles-outline";
              break;
            case "search":
              iconName = focused ? "search" : "search-outline";
              break;
            case "favorite":
              iconName = focused ? "heart" : "heart-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* ✅ VISIBLE TABS */}
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="ai" options={{ title: "AI" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="favorite" options={{ title: "Liked" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />

      {/* ❌ HIDDEN FROM TAB BAR */}
      <Tabs.Screen
        name="setting"
        options={{ href: null }}
      />
    </Tabs>
  );
}
