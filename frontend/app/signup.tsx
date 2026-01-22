import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

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
      {/* 🔙 Back Button */}
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

        <View style={styles.row}>
          <Pressable onPress={() => setAccepted(!accepted)}>
            <View style={[styles.checkbox, accepted && styles.checked]} />
          </Pressable>
          <Text style={styles.remember}>
            I accept the terms & conditions
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 20,
    elevation: 5,
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
    backgroundColor: "#06192e",
  },
  remember: {
    marginLeft: 8,
    fontSize: 13,
    color: "#475569",
  },
  button: {
    backgroundColor: "#000000",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});