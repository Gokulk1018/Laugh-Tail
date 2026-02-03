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
  Animated,
  Easing,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp() {
  const router = useRouter();

  const [accepted, setAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // 1. Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const checkboxScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Checkbox Pop Animation
  const toggleCheckbox = () => {
    setAccepted(!accepted);
    Animated.sequence([
      Animated.timing(checkboxScale, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.spring(checkboxScale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

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
      <View style={styles.darkOverlay} />

      {/* 🔙 BACK BUTTON - Subtle Hover Feel */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/login")}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={22} color="#1e293b" />
      </TouchableOpacity>

      <Animated.View 
        style={[
          styles.card, 
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join and start exploring</Text>

        <TextInput 
            placeholder="Username" 
            placeholderTextColor="#94a3b8" 
            style={styles.input} 
        />
        <TextInput 
            placeholder="Email" 
            placeholderTextColor="#94a3b8" 
            style={styles.input} 
            keyboardType="email-address"
        />
        <TextInput 
            placeholder="Password" 
            placeholderTextColor="#94a3b8" 
            secureTextEntry 
            style={styles.input} 
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          style={styles.input}
        />

        {/* TERMS ROW */}
        <View style={styles.row}>
          <Pressable onPress={toggleCheckbox}>
            <Animated.View 
                style={[
                    styles.checkbox, 
                    accepted && styles.checked,
                    { transform: [{ scale: checkboxScale }] }
                ]} 
            />
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
          style={[styles.button, !accepted && styles.buttonDisabled]}
          disabled={!accepted}
          onPress={handleSignUp}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 📜 TERMS & CONDITIONS MODAL */}
      <Modal transparent animationType="fade" visible={showTerms}>
        <View style={styles.modalOverlay}>
          <Animated.View style={styles.termsCard}>
            <Text style={styles.termsTitle}>Terms & Conditions</Text>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.termsScroll}>
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
                and agree to our privacy practices.
              </Text>

              <View style={styles.modalCheckRow}>
                <Pressable onPress={toggleCheckbox}>
                  <View style={[styles.checkbox, accepted && styles.checked]} />
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
              <Text style={styles.closeText}>Accept & Close</Text>
            </TouchableOpacity>
          </Animated.View>
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
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  backBtn: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "#ffffff",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  card: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.98)", // Slight transparency for premium feel
    borderRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#1e293b",
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 24,
    fontSize: 15,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
    color: "#1e293b",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
  },
  checked: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  remember: {
    marginLeft: 10,
    fontSize: 14,
    color: "#475569",
  },
  link: {
    color: "#2563eb",
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.7)", // Deep slate overlay
    justifyContent: "center",
    alignItems: "center",
  },
  termsCard: {
    width: "85%",
    height: "65%",
    backgroundColor: "#fff",
    borderRadius: 32,
    padding: 24,
  },
  termsTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 16,
  },
  termsScroll: {
    flex: 1,
  },
  termsText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  modalCheckRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  modalCheckText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  closeBtn: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 15,
  },
  closeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});