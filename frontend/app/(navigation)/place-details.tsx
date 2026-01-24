import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PlaceDetails() {
  const router = useRouter();

  const { name, image, section } = useLocalSearchParams<{
    name?: string;
    image?: string;
    section?: string;
  }>();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO IMAGE */}
        {image ? (
          <Image source={{ uri: image }} style={styles.heroImage} />
        ) : (
          <View style={styles.imageFallback}>
            <Text style={{ color: "#64748b" }}>No Image Available</Text>
          </View>
        )}

        {/* BACK BUTTON */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.title}>{name ?? "Unknown Place"}</Text>
          <Text style={styles.section}>{section ?? "Tourist Destination"}</Text>

          <Text style={styles.description}>
            {name ?? "This place"} is a popular tourist destination known for its
            beauty, atmosphere, and unique travel experience. This description
            is currently static and can later be replaced with real content from
            a Places or Tourism API.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  heroImage: {
    width: "100%",
    height: 320,
  },

  imageFallback: {
    width: "100%",
    height: 320,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 20,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 6,
  },

  section: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 16,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#334155",
  },
});