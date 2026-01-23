import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const [smartAI, setSmartAI] = useState(true);
  const [useLocation, setUseLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [lowData, setLowData] = useState(false);
  const [offlineData, setOfflineData] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* PAGE TITLE */}
      <Text style={styles.title}>Settings ⚙️</Text>

      {/* SMART ASSISTANCE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Smart Assistance</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Smart Recommendations</Text>
          <Switch value={smartAI} onValueChange={setSmartAI} />
        </View>
      </View>

      {/* LOCATION & NAVIGATION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location & Navigation</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Use My Location</Text>
          <Switch value={useLocation} onValueChange={setUseLocation} />
        </View>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.label}>Map View</Text>
          <Ionicons name="chevron-forward" size={20} color="#64748b" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.label}>Navigation Mode</Text>
          <Ionicons name="chevron-forward" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* APP APPEARANCE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Appearance</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.label}>Language</Text>
          <Ionicons name="chevron-forward" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* DATA & STORAGE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Storage</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Low Data Mode</Text>
          <Switch value={lowData} onValueChange={setLowData} />
        </View>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.label}>Clear Cache</Text>
          <Ionicons name="chevron-forward" size={20} color="#64748b" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.label}>Offline Data</Text>
          <Switch value={offlineData} onValueChange={setOfflineData} />
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 50,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#0f172a",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
  },
  label: {
    fontSize: 15,
    color: "#111827",
  },
});
