import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Animated, // Added for Pro animations
  Easing,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function GoogleSignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // 1. Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const checkScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 2. Entrance Animation: Card fades and slides up smoothly
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const toggleRemember = () => {
    setRemember(!remember);
    // Pop animation for the checkbox
    Animated.sequence([
      Animated.timing(checkScale, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.spring(checkScale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const handleSignIn = () => {
    if (email && password) {
      router.replace("/onboarding");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/home1.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay} />

      {/* 🔙 Back Button with Elevation Animation */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.backBtn}
        onPress={() => router.replace("/login")}
      >
        <Ionicons name="arrow-back" size={22} color="#1e293b" />
      </TouchableOpacity>

      <Animated.View 
        style={[
          styles.card, 
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in with Google</Text>

        <TextInput
          placeholder="Email or Username"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.row}>
          <Pressable onPress={toggleRemember}>
            <Animated.View 
              style={[
                styles.checkbox, 
                remember && styles.checked,
                { transform: [{ scale: checkScale }] }
              ]} 
            />
          </Pressable>
          <Text style={styles.remember}>Remember me</Text>
        </View>

        <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.button} 
            onPress={handleSignIn}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </Animated.View>
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
    backgroundColor: 'rgba(0,0,0,0.3)', // Added depth to background
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
    backgroundColor: "rgba(255,255,255,0.98)", // Premium semi-opaque look
    borderRadius: 32,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 12,
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
    fontSize: 16,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
    color: "#1e293b",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
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
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  remember: {
    marginLeft: 10,
    color: "#475569",
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#000000",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});