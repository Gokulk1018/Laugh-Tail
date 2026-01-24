import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { getLocalPlaces } from "../utils/searchLocalData";
import { fetchImageForPlace } from "../services/unsplashApi";

/* ---------------- FILTER OPTIONS ---------------- */

const categories = [
  "All",
  "Beach",
  "Mountain",
  "Forest",
  "Desert",
  "Island",
  "Waterfalls",
  "Adventure",
  "City",
  "Nature",
];

const tripTypes = [
  "All",
  "Family",
  "Friends",
  "Solo",
  "Couple",
  "Group Tour",
  "Backpacking",
  "Weekend Trip",
  "Luxury",
  "Budget",
];

/* ---------------- SCREEN ---------------- */

export default function Search() {
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q?: string }>();

  const allPlaces = getLocalPlaces();

  /* 🔥 IMPORTANT: preload query from Home */
  const [query, setQuery] = useState(q ?? "");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [city, setCity] = useState("");

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FILTER + IMAGE FETCH ---------------- */

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);

      const filtered = allPlaces.filter((place) => {
        const matchQuery = place.title
          .toLowerCase()
          .includes(query.toLowerCase());

        const matchCategory =
          selectedCategory === "All" ||
          place.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchType =
          selectedType === "All" || place.type === selectedType;

        const matchCity =
          city === "" ||
          place.city.toLowerCase().includes(city.toLowerCase());

        return matchQuery && matchCategory && matchType && matchCity;
      });

      const final = [];

      for (const place of filtered) {
        const img = await fetchImageForPlace(place.title);
        if (img?.urls?.small) {
          final.push({
            ...place,
            image: img.urls.small,
            description:
              "A beautiful destination loved by travelers around the world.",
          });
        }
      }

      setResults(final);
      setLoading(false);
    };

    loadResults();
  }, [query, selectedCategory, selectedType, city]);

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 🔙 HEADER WITH BACK */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Search Destinations</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* SEARCH INPUT */}
        <TextInput
          placeholder="Search place name..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />

        {/* CITY FILTER */}
        <TextInput
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />

        {/* CATEGORY FILTER */}
        <Text style={styles.filterTitle}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterChip,
                selectedCategory === cat && styles.activeChip,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.activeChipText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* TRIP TYPE FILTER */}
        <Text style={styles.filterTitle}>Trip Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tripTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterChip,
                selectedType === type && styles.activeChip,
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedType === type && styles.activeChipText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* RESULTS */}
        <Text style={styles.resultTitle}>
          Results ({results.length})
        </Text>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 30 }} />
        ) : results.length === 0 ? (
          <Text style={styles.empty}>No destinations found</Text>
        ) : (
          results.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/(navigation)/place-details",
                  params: {
                    name: place.title,
                    image: place.image,
                    section: place.category,
                  },
                })
              }
            >
              <Image source={{ uri: place.image }} style={styles.image} />
              <View style={styles.cardInfo}>
                <Text style={styles.placeTitle}>{place.title}</Text>
                <Text style={styles.meta}>
                  {place.category} • {place.type} • {place.city}
                </Text>
                <Text style={styles.desc}>{place.description}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },

  container: {
    paddingTop: 50,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 10,
  },

  filterChip: {
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
  },

  chipText: {
    color: "#374151",
    fontWeight: "600",
  },

  activeChip: {
    backgroundColor: "#2563eb",
  },

  activeChipText: {
    color: "#fff",
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 160,
  },

  cardInfo: {
    padding: 12,
  },

  placeTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  meta: {
    color: "#64748b",
    marginTop: 4,
  },

  desc: {
    marginTop: 6,
    color: "#475569",
    fontSize: 13,
  },

  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#64748b",
  },
});