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

const API_URL = "http://localhost:5000/home";
// ⚠️ If testing on mobile device, change localhost to your PC IP

type PlaceItem = {
  id: number;
  title: string;
  location: string;
  rating: number;
  image: string | null;
};

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<Record<string, PlaceItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadHome = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Home API error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHome();
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
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>

        {/* SECTIONS */}
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : (
          Object.entries(data).map(([sectionTitle, places]) => (
            <View key={sectionTitle}>
              <Text style={styles.sectionTitle}>{sectionTitle}</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {places.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.placeCard}
                    onPress={() =>
                      router.push({
                        pathname: "/(navigation)/place-details",
                        params: { id: p.id },
                      })
                    }
                  >
                    <Image
                      source={{
                        uri:
                          p.image ??
                          "https://via.placeholder.com/300x200?text=No+Image",
                      }}
                      style={styles.placeImage}
                    />
                    <Text numberOfLines={1} style={styles.placeTitle}>
                      {p.title}
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