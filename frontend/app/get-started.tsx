import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";

export default function GetStarted() {
  const router = useRouter();

  // 1. Animation Refs
  const slideUp = useRef(new Animated.Value(300)).current; // Start deep below
  const opacityTitle = useRef(new Animated.Value(0)).current;
  const opacitySubtitle = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // 2. Pro Choreography: Card slides up, then text breathes in
    Animated.sequence([
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.back(1)), // Over-shoots slightly for premium feel
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(opacityTitle, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacitySubtitle, {
          toValue: 1,
          duration: 800,
          delay: 200, // Staggered entrance
          useNativeDriver: true,
        }),
        Animated.spring(btnScale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [slideUp, opacityTitle, opacitySubtitle, btnScale]);

  return (
    <ImageBackground
      source={require("../assets/images/getstart2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Subtle Gradient Overlay */}
      <View style={styles.vignette} />

      <Animated.View 
        style={[
          styles.card, 
          { transform: [{ translateY: slideUp }] }
        ]}
      >
        <Animated.Text style={[styles.title, { opacity: opacityTitle }]}>
          Discover best{"\n"}places anywhere{"\n"}in the world
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, { opacity: opacitySubtitle }]}>
          Explore destinations, plan trips, and travel smarter with AI.
        </Animated.Text>

        <Animated.View style={{ transform: [{ scale: btnScale }] }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => router.replace("/(navigation)/home")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)", // Darkens the image slightly for pop
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 32, // Increased padding for a spacious, high-end feel
    paddingBottom: 50,
    borderTopLeftRadius: 40, // More aggressive rounding
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  title: {
    fontSize: 32, // Increased size
    fontWeight: "800", // Extra bold
    color: "#0f172a",
    marginBottom: 16,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16, // Slightly larger
    color: "#64748b",
    marginBottom: 35, // More breathing room
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#0f172a",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    // Shadow for the button itself
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});