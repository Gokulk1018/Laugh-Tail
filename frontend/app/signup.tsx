import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp() {
  const router = useRouter();

  const [accepted, setAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSignUp = () => {
    if (accepted) {
      router.replace("/onboarding");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/home2.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* 🔙 BACK BUTTON */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/login")}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join and start exploring</Text>

        <TextInput placeholder="Username" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
        />

        {/* TERMS ROW */}
        <View style={styles.row}>
          <Pressable onPress={() => setAccepted(!accepted)}>
            <View style={[styles.checkbox, accepted && styles.checked]} />
          </Pressable>

          <Text style={styles.remember}>
            I agree to the{" "}
            <Text
              style={styles.link}
              onPress={() => setShowTerms(true)}
            >
              Terms & Conditions
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, !accepted && { opacity: 0.6 }]}
          disabled={!accepted}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* 📜 TERMS & CONDITIONS MODAL */}
      <Modal transparent animationType="slide" visible={showTerms}>
        <View style={styles.modalOverlay}>
          <View style={styles.termsCard}>
            <Text style={styles.termsTitle}>Terms & Conditions</Text>

            <ScrollView style={styles.termsScroll}>
              <Text style={styles.termsText}>
                Welcome to TouristAI 🌍{"\n\n"}
                By using this application, you agree to the following terms.
                This app helps users explore destinations, save places,
                and receive AI-powered travel suggestions.{"\n\n"}

                You agree not to misuse the app, submit false data,
                or attempt to disrupt services. Your preferences and
                interactions may be used to improve recommendations.{"\n\n"}

                TouristAI does not guarantee availability, pricing,
                or accuracy of third-party travel information.{"\n\n"}

                By continuing, you confirm that you are at least 13 years old
                and agree to our privacy practices.{"\n\n"}

                Scroll to the bottom to accept these terms.
              </Text>

              {/* MODAL CHECKBOX */}
              <View style={styles.modalCheckRow}>
                <Pressable onPress={() => setAccepted(!accepted)}>
                  <View
                    style={[
                      styles.checkbox,
                      accepted && styles.checked,
                    ]}
                  />
                </Pressable>
                <Text style={styles.modalCheckText}>
                  I agree to the Terms & Conditions
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowTerms(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* BACK BUTTON */
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 20,
    elevation: 5,
    zIndex: 10,
  },

  card: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 22,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 18,
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#94a3b8",
  },
  checked: {
    backgroundColor: "#2563eb",
  },
  remember: {
    marginLeft: 8,
    fontSize: 13,
    color: "#475569",
  },
  link: {
    color: "#2563eb",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
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
  termsCard: {
    width: "90%",
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
  },
  termsTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  termsScroll: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
    marginBottom: 20,
  },
  modalCheckRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  modalCheckText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#475569",
  },
  closeBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  closeText: {
    color: "#fff",
    fontWeight: "700",
  },
});
