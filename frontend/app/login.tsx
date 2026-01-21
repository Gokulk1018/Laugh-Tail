import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function Login() {
  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground
        source={require("../assets/images/login.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Dark overlay */}
        <View style={styles.overlay} />

        {/* White Card */}
        <View style={styles.card}>
          <Text style={styles.heading}>Sign in options</Text>

          <TouchableOpacity style={styles.emailBtn}>
            <Text style={styles.emailText}>Continue with Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialText}>Sign in with Apple ID</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={styles.signup}>Sign Up</Text>
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000",
  },

  background: {
    flex: 1,
    justifyContent: "flex-end", // card sticks to bottom
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)", // makes card readable
  },

  /* WHITE CARD */
  card: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 22,
    color: "#0f172a",
  },

  emailBtn: {
    backgroundColor: "#0f172a",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  emailText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  socialBtn: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 14,
  },
  socialText: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "500",
  },

  footerText: {
    marginTop: 12,
    textAlign: "center",
    color: "#64748b",
    fontSize: 14,
  },
  signup: {
    color: "#2563eb",
    fontWeight: "600",
  },
});
