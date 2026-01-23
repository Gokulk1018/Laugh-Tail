import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { placesData } from "../data/places";

/* ---------------- CATEGORIES (UI ONLY) ---------------- */

const categories = [
  { id: "1", name: "Beach", icon: "🏖️" },
  { id: "2", name: "Mountains", icon: "⛰️" },
  { id: "3", name: "Snow", icon: "❄️" },
  { id: "4", name: "Adventure", icon: "🧗" },
  { id: "5", name: "Forest", icon: "🌲" },
  { id: "6", name: "Desert", icon: "🏜️" },
  { id: "7", name: "Island", icon: "🏝️" },
  { id: "8", name: "City", icon: "🏙️" },
];

export default function Home() {
  const router = useRouter();

  const renderSection = (sectionTitle: string) => {
    const data = placesData[sectionTitle] || [];

    if (!data.length) return null;

    return (
      <>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.placeCard}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/place-details",
                  params: { section: sectionTitle, index },
                })
              }
            >
              <Image source={item.image} style={styles.placeImage} />
              <Text style={styles.placeTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello Gokul 👋</Text>
            <Text style={styles.subtitle}>Explore the world</Text>
          </View>

          <TouchableOpacity
            style={styles.avatar}
            onPress={() => router.push("/(navigation)/setting")}
          >
            <Ionicons name="settings-outline" size={22} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search destinations..."
            style={styles.searchInput}
          />
        </View>

        {/* CATEGORIES (UI ONLY FOR NOW) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <View key={item.id} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 🔥 ALL SECTIONS FROM places.ts */}
        {renderSection("Nearby Places")}
        {renderSection("Famous Waterfalls")}
        {renderSection("Beaches")}
        {renderSection("Cold Places")}
        {renderSection("Desert Destinations")}
        {renderSection("Amusement Parks")}

        {/* Bottom spacing for tab bar */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 80,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    color: "#64748b",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginVertical: 16,
    paddingHorizontal: 14,
  },
  searchInput: {
    height: 44,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  categoryCard: {
    width: 90,
    height: 90,
    backgroundColor: "#040404",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 26,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6,
  },

  placeCard: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 10,
    marginRight: 14,
  },
  placeImage: {
    width: "100%",
    height: 110,
    borderRadius: 14,
  },
  placeTitle: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
  },
});
