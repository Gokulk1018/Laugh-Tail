import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Switch,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Account() {
  const router = useRouter();

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // 🔐 ACCOUNT TOGGLES
  const [isPublicProfile, setIsPublicProfile] = useState(true);
  const [showProfileViews, setShowProfileViews] = useState(true);
  const [allowReplies, setAllowReplies] = useState(true);

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/(navigation)/profile")}>
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Account</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ACCOUNT DETAILS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Details</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Account ID</Text>
            <Text style={styles.value}>#USR10294</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>gokul@example.com</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Login Method</Text>
            <Text style={styles.value}>Email & Password</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, styles.active]}>Active</Text>
          </View>
        </View>

        {/* SECURITY */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security</Text>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => setShowPasswordModal(true)}
          >
            <Text style={styles.actionText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* 🔐 PRIVACY & VISIBILITY */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Privacy & Visibility</Text>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Public Profile</Text>
            <Switch
              value={isPublicProfile}
              onValueChange={setIsPublicProfile}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Show Profile View Count</Text>
            <Switch
              value={showProfileViews}
              onValueChange={setShowProfileViews}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Allow Replies to My Reviews</Text>
            <Switch
              value={allowReplies}
              onValueChange={setAllowReplies}
            />
          </View>
        </View>

        {/* DATA INFO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Privacy & Data</Text>

          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#2563eb" />
            <Text style={styles.infoText}>
              Your data is securely stored and protected.
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* CHANGE PASSWORD MODAL */}
      <Modal transparent visible={showPasswordModal} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowPasswordModal(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              placeholder="Current password"
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              placeholder="New password"
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              placeholder="Confirm new password"
              secureTextEntry
              style={styles.input}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowPasswordModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmBtn}>
                <Text style={styles.confirmText}>Update</Text>
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

  row: {
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
  active: {
    color: "#16a34a",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  toggleText: {
    fontSize: 14,
    color: "#0f172a",
  },

  infoRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  infoText: {
    fontSize: 13,
    color: "#475569",
    flex: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
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
  confirmBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 14,
    marginLeft: 8,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700",
  },
});
