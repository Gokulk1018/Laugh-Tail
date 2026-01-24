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

type PlaceItem = {
  name: string;
  image: string;
};

const categories = [
  { id: "1", name: "Adventure", icon: "🧗" },
  { id: "2", name: "Forest", icon: "🌲" },
  { id: "3", name: "City", icon: "🏙️" },
  { id: "4", name: "Beach", icon: "🏖️" },
  { id: "5", name: "Desert", icon: "🏜️" },
  { id: "6", name: "Snow", icon: "❄️" },
  { id: "7", name: "Island", icon: "🏝️" },
  { id: "8", name: "Mountain", icon: "⛰️" },
  { id: "9", name: "Temple", icon: "🛕" },
  { id: "10", name: "Museum & Forts", icon: "🏰" },
];

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<Record<string, PlaceItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const final: Record<string, PlaceItem[]> = {};

      for (const section of Object.keys(sections)) {
        const items: PlaceItem[] = [];

        for (const place of sections[section]) {
          const img = await fetchImageForPlace(place);
          if (img?.urls?.small) {
            items.push({ name: place, image: img.urls.small });
          }
        }

        final[section] = items;
      }

      setData(final);
      setLoading(false);
    };

    load();
  }, []);

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
            <Ionicons name="settings-outline" size={22} />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search destinations..."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (search.trim()) {
                router.push({
                  pathname: "/(navigation)/search",
                  params: { q: search.trim() },
                });
                setSearch("");
              }
            }}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color="#94a3b8"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* CATEGORIES */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={styles.categoryCard}
              onPress={() =>
                router.push({
                  pathname: "/(navigation)/category-details",
                  params: { category: c.name },
                })
              }
            >
              <Text style={styles.categoryIcon}>{c.icon}</Text>
              <Text style={styles.categoryText}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* SECTIONS */}
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : (
          Object.entries(data).map(([title, items]) => (
            <View key={title}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map((p, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.placeCard}
                    onPress={() =>
                      router.push({
                        pathname: "/(navigation)/place-details",
                        params: {
                          name: p.name,
                          image: p.image,
                          section: title,
                        },
                      })
                    }
                  >
                    <Image source={{ uri: p.image }} style={styles.placeImage} />
                    <Text numberOfLines={1} style={styles.placeTitle}>
                      {p.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  container: { padding: 16, paddingTop: 50 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 22, fontWeight: "700" },
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
    paddingHorizontal: 14,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: { flex: 1, height: 44 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 12,
  },

  categoryCard: {
    width: 90,
    height: 90,
    backgroundColor: "#040404",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
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
  placeTitle: { marginTop: 8, fontWeight: "600" },
});