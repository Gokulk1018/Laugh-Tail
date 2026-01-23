import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AIPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="sparkles-outline" size={26} color="#2563eb" />
        <Text style={styles.title}>AI Travel Assistant</Text>
        <Text style={styles.subtitle}>
          Plan smarter, travel better ✨
        </Text>
      </View>

      {/* INPUT CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ask AI</Text>

        <TextInput
          placeholder="Enter destination or mood (e.g. beach, adventure)"
          style={styles.input}
        />

        <View style={styles.row}>
          <TextInput placeholder="Season" style={styles.smallInput} />
          <TextInput placeholder="Budget" style={styles.smallInput} />
        </View>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="sparkles" size={18} color="#fff" />
          <Text style={styles.buttonText}>Generate Plan</Text>
        </TouchableOpacity>
      </View>

      {/* AI SUGGESTIONS */}
      <Text style={styles.sectionTitle}>AI Suggestions</Text>

      <View style={styles.suggestionCard}>
        <Text style={styles.placeName}>🏝️ Andaman Islands</Text>
        <Text style={styles.reason}>
          Best for summer, beaches, and budget-friendly travel.
        </Text>
      </View>

      <View style={styles.suggestionCard}>
        <Text style={styles.placeName}>⛰️ Manali</Text>
        <Text style={styles.reason}>
          Ideal for adventure and mountain lovers.
        </Text>
      </View>

      {/* AI PLAN */}
      <Text style={styles.sectionTitle}>Your AI Travel Plan</Text>

      <View style={styles.planCard}>
        <Text style={styles.planDay}>Day 1</Text>
        <Text style={styles.planText}>
          Arrival, hotel check-in, local sightseeing
        </Text>

        <Text style={styles.planDay}>Day 2</Text>
        <Text style={styles.planText}>
          Adventure activities and nature exploration
        </Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 6,
  },
  subtitle: {
    color: "#64748b",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  smallInput: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    borderRadius: 14,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  suggestionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "700",
  },
  reason: {
    color: "#475569",
    marginTop: 4,
  },
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
  },
  planDay: {
    fontWeight: "700",
    marginTop: 8,
  },
  planText: {
    color: "#475569",
    marginBottom: 6,
  },
});
