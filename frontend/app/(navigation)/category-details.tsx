import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { categoryPlaces } from "../data/categoryPlaces";
import { fetchImageForPlace } from "../services/unsplashApi";

const { width } = Dimensions.get("window");

type Item = {
  name: string;
  image: string | null;
};

export default function CategoryDetails() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string | string[] }>();

  // ✅ VERY IMPORTANT: normalize param
  const rawCategory = Array.isArray(category) ? category[0] : category;

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategory = async () => {
      if (!rawCategory) return;

      setLoading(true);

      const places = categoryPlaces[rawCategory] ?? [];
      const result: Item[] = [];

      for (const place of places) {
  const img = await fetchImageForPlace(place);

  // ✅ FILTER: only valid images
  if (img?.urls?.regular) {
    result.push({
      name: place,
      image: img.urls.regular,
    });
  }
}

// ❗ If nothing to show → go back
if (result.length === 0) {
  router.back();
  return;
}

      setItems(result);
      setLoading(false);
    };

    loadCategory();
  }, [rawCategory]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={items}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}

            {/* INFO CARD (visible like place-details) */}
            <View style={styles.infoCard}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.desc}>
                {item.name} is a popular{" "}
                {rawCategory?.toLowerCase()} destination known for its beauty,
                activities, and unforgettable travel experience.
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 20,
  },

  card: {
    width,
    padding: 16,
  },

  image: {
    width: "100%",
    height: 360,
    borderRadius: 20,
  },

  infoCard: {
    marginTop: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    elevation: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
  },

  desc: {
    marginTop: 8,
    color: "#475569",
    lineHeight: 22,
  },
});