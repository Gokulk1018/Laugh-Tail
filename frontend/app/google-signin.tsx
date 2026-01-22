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

export default function GoogleSignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

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
      {/* 🔙 Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/login")}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in with Google</Text>

        <TextInput
          placeholder="Email or Username"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.row}>
          <Pressable onPress={() => setRemember(!remember)}>
            <View style={[styles.checkbox, remember && styles.checked]} />
          </Pressable>
          <Text style={styles.remember}>Remember me</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
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
    width: "88%",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 22,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
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
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#94a3b8",
  },
  checked: {
    backgroundColor: "#0e0f12",
  },
  remember: {
    marginLeft: 8,
    color: "#475569",
    fontSize: 13,
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
