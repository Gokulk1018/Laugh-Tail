import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function NavigationLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarIcon: ({ color, size, focused }) => {
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
            case "setting":
              iconName = focused ? "settings" : "settings-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* ✅ ONLY THESE 5 TABS EXIST */}
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="ai" options={{ title: "AI" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="favorite" options={{ title: "Liked" }} />
      <Tabs.Screen name="setting" options={{ title: "Setting" }} />

      {/* ❌ COMPLETELY DISABLE CATEGORIES */}
      <Tabs.Screen
        name="categories"
        options={{
          href: null, // THIS kills the tab & navigation
        }}
      />
    </Tabs>
  );
}
