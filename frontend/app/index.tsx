import { useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";

export default function Splash() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  // 1. Animation Refs (Pro-tier physics)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // 🚨 Prevent logic from running until navigation is mounted
    if (!navigationState?.key) return;

    // 2. Pro Animation Sequence: Fade, Scale-up, and Slide-up together
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Navigation Timer (set to 2s to allow animation to complete)
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    // 4. Cleanup to prevent memory leaks and warning errors
    return () => clearTimeout(timer);
    
    // Dependencies are now specific to satisfy the linter and prevent re-runs
  }, [navigationState?.key, router, fadeAnim, scaleAnim, slideUpAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Decorative background element with subtle pulse */}
      <Animated.View 
        style={[
          styles.circleDecorator, 
          { opacity: fadeAnim }
        ]} 
      />

      {/* Logo Wrapper - Smooth entrance */}
      <Animated.View 
        style={[
          styles.logoWrapper, 
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }] 
          }
        ]}
      >
        <Image
          source={require("../assets/images/Tourism-logo.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Tagline - Professional typography reveal */}
      <Animated.View 
        style={{ 
          opacity: fadeAnim, 
          transform: [{ translateY: slideUpAnim }] 
        }}
      >
        <Text style={styles.tagline}>Explore the World with Ease</Text>
      </Animated.View>

      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#FF7E5F" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
  },
  circleDecorator: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255,126,95,0.07)",
  },
  logoWrapper: {
    // Pro Shadow: Tinted and soft
    shadowColor: "#FF7E5F",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 45,
    padding: 25,
  },
  logo: {
    width: 170,
    height: 170,
  },
  tagline: {
    marginTop: 35,
    fontSize: 14,
    fontWeight: "700",
    color: "#5C5C5C",
    letterSpacing: 2.5, // High-end tracking
    textTransform: "uppercase",
    textAlign: "center",
  },
  loaderContainer: {
    position: "absolute",
    bottom: 60,
  },
});