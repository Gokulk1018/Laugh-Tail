import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NavigationLayout() {
  return (
    // ✅ Transparent safe area – adapts to page background
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "transparent" }}
      edges={["top"]}
    >
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
            // 👤 PROFILE TAB
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
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="ai" options={{ title: "AI" }} />
        <Tabs.Screen name="search" options={{ title: "Search" }} />
        <Tabs.Screen name="favorite" options={{ title: "Liked" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />

        {/* hidden */}
        <Tabs.Screen name="setting" options={{ href: null }} />
        <Tabs.Screen name="notifications" options={{ href: null }} />
        <Tabs.Screen name="account" options={{ href: null }} />
        <Tabs.Screen name="help" options={{ href: null }} />
        <Tabs.Screen name="edit-profile" options={{ href: null }} />
        <Tabs.Screen name="place-details" options={{ href: null }} />
      </Tabs>
    </SafeAreaView>
  );
}
