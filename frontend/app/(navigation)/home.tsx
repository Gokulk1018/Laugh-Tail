import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { fetchPlacesByCategory } from "../services/unsplashApi";

/* ---------------- CATEGORIES (UI ONLY) ---------------- */

const categories = [
  { id: "1", name: "Beach", query: "beach", icon: "🏖️" },
  { id: "2", name: "Mountains", query: "mountain", icon: "⛰️" },
  { id: "3", name: "Snow", query: "snow", icon: "❄️" },
  { id: "4", name: "Adventure", query: "adventure travel", icon: "🧗" },
  { id: "5", name: "Forest", query: "forest", icon: "🌲" },
  { id: "6", name: "Desert", query: "desert", icon: "🏜️" },
  { id: "7", name: "Island", query: "island", icon: "🏝️" },
  { id: "8", name: "City", query: "city travel", icon: "🏙️" },
];

export default function Home() {
  const router = useRouter();

  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("beach");

  /* ---------------- FETCH FROM UNSPLASH ---------------- */

  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      console.log("HOME SCREEN LOADED");
      const data = await fetchPlacesByCategory(activeCategory);
      console.log("DATA IN HOME:", data);
      setPlaces(data);
      setLoading(false);
    };

    loadPlaces();
  }, [activeCategory]);

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

        {/* CATEGORIES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryCard,
                activeCategory === item.query && styles.activeCategory,
              ]}
              onPress={() => setActiveCategory(item.query)}
            >
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* PLACES FROM API */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Places</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 30 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {places.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.placeCard}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: "/place-details",
                    params: {
                      image: item.urls.regular,
                      title: item.alt_description || "Beautiful place",
                    },
                  })
                }
              >
                <Image
                  source={{ uri: item.urls.small }}
                  style={styles.placeImage}
                />
                <Text numberOfLines={1} style={styles.placeTitle}>
                  {item.alt_description || "Beautiful place"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

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
    opacity: 0.6,
  },
  activeCategory: {
    opacity: 1,
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
    fontSize: 14,
    fontWeight: "600",
  },
});