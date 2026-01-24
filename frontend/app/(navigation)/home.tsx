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

import { sections } from "../data/sections";
import { fetchImageForPlace } from "../services/unsplashApi";

/* ---------------- TYPES ---------------- */
type PlaceItem = {
  name: string;
  image: string;
};

/* ---------------- CATEGORIES (EXPANDED) ---------------- */
const categories = [
  { id: "1", name: "Adventure", icon: "🧗" },
  { id: "2", name: "Forest", icon: "🌲" },
  { id: "3", name: "City", icon: "🏙️" },
  { id: "4", name: "Beach", icon: "🏖️" },
  { id: "5", name: "Desert", icon: "🏜️" },
  { id: "6", name: "Snow", icon: "❄️" },
  { id: "7", name: "Island", icon: "🏝️" },
  { id: "8", name: "Mountain", icon: "⛰️" },
];

export default function Home() {
  const router = useRouter();

  const [data, setData] = useState<Record<string, PlaceItem[]>>({});
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD SECTIONS (FILTER NO IMAGE) ---------------- */
  useEffect(() => {
    const loadSections = async () => {
      setLoading(true);
      const finalData: Record<string, PlaceItem[]> = {};

      for (const sectionTitle of Object.keys(sections)) {
        const places = sections[sectionTitle] ?? [];
        const items: PlaceItem[] = [];

        for (const place of places) {
          const img = await fetchImageForPlace(place);

          // ✅ FILTER: only add if image exists
          if (img?.urls?.small) {
            items.push({
              name: place,
              image: img.urls.small,
            });
          }
        }

        // only keep section if it has data
        if (items.length > 0) {
          finalData[sectionTitle] = items;
        }
      }

      setData(finalData);
      setLoading(false);
    };

    loadSections();
  }, []);

  /* ---------------- RENDER SECTION ---------------- */
  const renderSection = (title: string, items: PlaceItem[]) => (
    <View key={title}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.placeCard}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/place-details",
                params: {
                  name: item.name,
                  image: item.image,
                  section: title,
                },
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.placeImage} />
            <Text numberOfLines={1} style={styles.placeTitle}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

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
              style={styles.categoryCard}
              onPress={() =>
                router.push({
                  pathname: "/category-details",
                  params: { category: item.name },
                })
              }
            >
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* SECTIONS */}
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : (
          Object.entries(data).map(([title, items]) =>
            renderSection(title, items)
          )
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 50 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 22, fontWeight: "700", color: "#0f172a" },
  subtitle: { color: "#64748b" },

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
  searchInput: { height: 44 },

  sectionHeader: { marginVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "700" },

  categoryCard: {
    width: 90,
    height: 90,
    backgroundColor: "#040404",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryIcon: { fontSize: 26 },
  categoryText: { color: "#fff", fontSize: 12, marginTop: 6 },

  placeCard: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 10,
    marginRight: 14,
  },
  placeImage: { width: "100%", height: 110, borderRadius: 14 },
  placeTitle: { marginTop: 8, fontSize: 14, fontWeight: "600" },
});