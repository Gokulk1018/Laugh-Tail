import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function GetStarted() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/getstart2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          Discover best{"\n"}places anywhere{"\n"}in the world
        </Text>

        <Text style={styles.subtitle}>
          Explore destinations, plan trips, and travel smarter with AI.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(navigation)/home")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#0f172a",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
