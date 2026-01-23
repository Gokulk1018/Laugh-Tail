import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Notifications() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/(navigation)/profile")}>
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ACTIVITY INSIGHTS */}
        <Text style={styles.sectionTitle}>Activity Insights</Text>

        <View style={styles.card}>
          <Ionicons name="eye-outline" size={22} color="#2563eb" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Your profile was viewed 24 times
            </Text>
            <Text style={styles.cardDesc}>
              More users are checking your travel profile.
            </Text>
            <Text style={styles.time}>2 hours ago</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="heart-outline" size={22} color="#ef4444" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              New likes on your review
            </Text>
            <Text style={styles.cardDesc}>
              Your Dream Beach review received new likes.
            </Text>
            <Text style={styles.time}>Yesterday</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="chatbubble-outline" size={22} color="#16a34a" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              New replies received
            </Text>
            <Text style={styles.cardDesc}>
              People replied to your Forest Escape feedback.
            </Text>
            <Text style={styles.time}>2 days ago</Text>
          </View>
        </View>

        {/* SMART RECOMMENDATIONS */}
        <Text style={styles.sectionTitle}>Smart Recommendations</Text>

        <View style={styles.card}>
          <Ionicons name="sunny-outline" size={22} color="#f59e0b" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Summer season alert ☀️
            </Text>
            <Text style={styles.cardDesc}>
              Beach destinations near you are ideal now.
            </Text>
            <Text style={styles.time}>Today</Text>
          </View>
        </View>

        {/* PLACE HIGHLIGHT */}
        <Text style={styles.sectionTitle}>Recommended Place</Text>

        <View style={styles.placeCard}>
          <Image
            source={require("../../assets/images/home1.jpg")}
            style={styles.placeImage}
          />
          <View style={styles.placeInfo}>
            <Text style={styles.placeName}>Pondicherry</Text>
            <Text style={styles.placeDesc}>
              Matches your interest in peaceful beach destinations.
            </Text>
            <Text style={styles.time}>Recommended for you</Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 12,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 14,
  },
  cardDesc: {
    fontSize: 13,
    color: "#475569",
    marginVertical: 4,
  },
  time: {
    fontSize: 11,
    color: "#94a3b8",
  },

  placeCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
  },
  placeImage: {
    width: "100%",
    height: 140,
  },
  placeInfo: {
    padding: 12,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "800",
  },
  placeDesc: {
    fontSize: 13,
    color: "#475569",
    marginVertical: 4,
  },
});
