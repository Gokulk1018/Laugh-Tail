import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TRAVEL_PREFERENCES = [
  "🏖 Beach",
  "⛰ Mountains",
  "❄ Snow",
  "🌲 Forest",
  "🏜 Desert",
  "🎢 Amusement Parks",
  "👨‍👩‍👧 Family",
  "🎒 Solo",
  "👯 Friends",
  "🧗 Adventure",
  "🏕 Nature",
];

export default function EditProfile() {
  const router = useRouter();

  const [name, setName] = useState("Gokul K.");
  const [bio, setBio] = useState("Explorer | Mountains & Beaches");
  const [location, setLocation] = useState("Tamil Nadu, India");
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([
    "🏖 Beach",
    "⛰ Mountains",
  ]);

  // ✅ TOAST STATE
  const [showToast, setShowToast] = useState(false);

  const togglePreference = (item: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const goBackToProfile = () => {
    router.push("/(navigation)/profile");
  };

  const handleSave = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      goBackToProfile();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBackToProfile}>
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PROFILE PHOTO */}
        <View style={styles.photoSection}>
          <Image
            source={require("../../assets/images/profile.jpg")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.photoBtn}>
            <Text style={styles.photoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* BASIC INFO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Basic Information</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            style={styles.input}
          />

          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
            multiline
            style={[styles.input, styles.multiline]}
          />

          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            style={styles.input}
          />
        </View>

        {/* TRAVEL PREFERENCES */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Travel Preferences</Text>

          <View style={styles.chips}>
            {TRAVEL_PREFERENCES.map((item) => {
              const selected = selectedPrefs.includes(item);
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => togglePreference(item)}
                  style={[
                    styles.chip,
                    selected && styles.chipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selected && styles.chipTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={goBackToProfile}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
          >
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ✅ SUCCESS TOAST */}
      {showToast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Changes updated</Text>
        </View>
      )}
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

  photoSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  photoBtn: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  photoText: {
    fontWeight: "600",
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

  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 12,
  },
  multiline: {
    height: 70,
    textAlignVertical: "top",
    paddingTop: 10,
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: "#2563eb",
  },
  chipText: {
    fontSize: 13,
    color: "#0f172a",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    padding: 14,
    borderRadius: 14,
    marginRight: 8,
    alignItems: "center",
  },
  cancelText: {
    fontWeight: "600",
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 14,
    marginLeft: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* TOAST */
  toast: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#2f3130",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    opacity: 0.95,
  },
  toastText: {
    color: "#fff",
    fontWeight: "600",
  },
}); 