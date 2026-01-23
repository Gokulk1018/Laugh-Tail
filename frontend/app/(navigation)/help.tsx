import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Help() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/(navigation)/profile")}>
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HELP TOPICS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Help Topics</Text>

          <View style={styles.item}>
            <Ionicons name="map-outline" size={20} color="#2563eb" />
            <Text style={styles.itemText}>
              How to discover nearby tourist places
            </Text>
          </View>

          <View style={styles.item}>
            <Ionicons name="sparkles-outline" size={20} color="#2563eb" />
            <Text style={styles.itemText}>
              Using AI travel recommendations
            </Text>
          </View>

          <View style={styles.item}>
            <Ionicons name="heart-outline" size={20} color="#2563eb" />
            <Text style={styles.itemText}>
              Saving and managing favorite places
            </Text>
          </View>

          <View style={styles.item}>
            <Ionicons name="notifications-outline" size={20} color="#2563eb" />
            <Text style={styles.itemText}>
              Understanding notifications and alerts
            </Text>
          </View>
        </View>

        {/* SUPPORT */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Support</Text>

          <View style={styles.item}>
            <Ionicons name="mail-outline" size={20} color="#16a34a" />
            <Text style={styles.itemText}>
              support@touristai.app
            </Text>
          </View>

          <View style={styles.item}>
            <Ionicons name="call-outline" size={20} color="#16a34a" />
            <Text style={styles.itemText}>
              +91 98765 43210
            </Text>
          </View>
        </View>

        {/* APP INFO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>App Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>App Version</Text>
            <Text style={styles.value}>1.0.0</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Last Updated</Text>
            <Text style={styles.value}>March 2026</Text>
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    color: "#0f172a",
    flex: 1,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: "#64748b",
  },
  value: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0f172a",
  },
});
