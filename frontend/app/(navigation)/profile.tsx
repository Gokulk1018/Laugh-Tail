import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔝 HERO SECTION */}
        <ImageBackground
          source={require("../../assets/images/home1.jpg")}
          style={styles.hero}
          blurRadius={4}
        >
          <View style={styles.heroOverlay} />

          <View style={styles.profileBox}>
            <Image
              source={require("../../assets/images/profile.jpg")}
              style={styles.avatar}
            />
            <Text style={styles.name}>Gokul K.</Text>
            <Text style={styles.bio}>Explorer | Mountains & Beaches</Text>

            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* 📊 STATS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Stats</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>34</Text>
              <Text style={styles.statLabel}>Liked</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        {/* 🧠 PREFERENCES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Preferences</Text>

          <View style={styles.chips}>
            <View style={styles.chip}><Text>🏖 Beach</Text></View>
            <View style={styles.chip}><Text>⛰ Mountains</Text></View>
            <View style={styles.chip}><Text>❄ Snow</Text></View>
            <View style={styles.chip}><Text>🌲 Forest</Text></View>
          </View>
        </View>

        {/* ❤️ SAVED PLACES */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Saved Places</Text>
            <Text style={styles.link}>View all</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image
              source={require("../../assets/images/home2.jpg")}
              style={styles.placeImg}
            />
            <Image
              source={require("../../assets/images/home3.jpg")}
              style={styles.placeImg}
            />
          </ScrollView>
        </View>

        {/* ⚙️ ACCOUNT & SUPPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Support</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push("/(navigation)/account")}
          >
            <Text style={styles.settingText}>Account</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push("/(navigation)/notifications")}
          >
            <Text style={styles.settingText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push("/(navigation)/help")}
          >
            <Text style={styles.settingText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setShowLogout(true)}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* 🚪 LOGOUT CONFIRMATION MODAL */}
      <Modal transparent visible={showLogout} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowLogout(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalText}>
              Do you want to log out?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowLogout(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  setShowLogout(false);
                  router.replace("/login");
                }}
              >
                <Text style={styles.confirmText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  hero: {
    height: 280,
    justifyContent: "flex-end",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  profileBox: {
    alignItems: "center",
    paddingBottom: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 8,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  bio: {
    color: "#e5e7eb",
    marginBottom: 10,
  },
  editBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editText: {
    fontWeight: "600",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
  },
  statLabel: {
    color: "#64748b",
    fontSize: 12,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "#2563eb",
    fontWeight: "600",
  },
  placeImg: {
    width: 180,
    height: 120,
    borderRadius: 18,
    marginRight: 12,
  },

  /* SETTINGS LIST */
  settingItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingText: {
    fontSize: 15,
    fontWeight: "600",
  },

  logoutBtn: {
    marginTop: 16,
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
    marginRight: 8,
    alignItems: "center",
  },
  cancelText: {
    fontWeight: "600",
  },
  confirmBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#ef4444",
    marginLeft: 8,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700",
  },
});
