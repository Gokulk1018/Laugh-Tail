import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();

  // 1. Animation Refs
  const slideAnim = useRef(new Animated.Value(height * 0.4)).current; // Start off-screen
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonGroupAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 2. Entrance Animation Sequence
    Animated.sequence([
      Animated.delay(100), // Wait for splash transition to settle
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // 3. Staggered Button Reveal
      Animated.spring(buttonGroupAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, fadeAnim, buttonGroupAnim]);

  // Helper for button press animation
  const scaleValue = useRef(new Animated.Value(1)).current;
  const onPressIn = () => Animated.spring(scaleValue, { toValue: 0.96, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ImageBackground
        source={require("../assets/images/login.jpg")}
        style={styles.bg}
        resizeMode="cover"
      >
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />

        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <Text style={styles.title}>Sign in options</Text>

          {/* Wrapper for staggered buttons */}
          <Animated.View style={{ opacity: buttonGroupAnim, transform: [{ scale: buttonGroupAnim }] }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              style={styles.primaryBtn}
              onPress={() => router.replace("/onboarding")}
            >
              <Text style={styles.primaryText}>Continue with Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push("/google-signin")}
            >
              <Text style={styles.secondaryText}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.replace("/onboarding")}
            >
              <Text style={styles.secondaryText}>Sign in with Apple ID</Text>
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.footer}>
            Don’t have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => router.push("/signup")}
            >
              Sign Up
            </Text>
          </Text>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)", // Darkened slightly for better text contrast
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    paddingBottom: 50, // Extra padding for modern look
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    // Soft shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 25,
    color: "#1e293b",
    textAlign: "left",
  },
  primaryBtn: {
    backgroundColor: "#0f172a",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
    // Button depth
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryBtn: {
    backgroundColor: "#f8fafc", // Lighter slate for cleaner UI
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  secondaryText: {
    color: "#334155",
    fontWeight: "600",
    fontSize: 15,
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "#64748b",
    fontSize: 14,
  },
  link: {
    color: "#0f172a", // Match primary theme
    fontWeight: "800",
  },
});