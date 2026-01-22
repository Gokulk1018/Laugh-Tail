import { View, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
  const timer = setTimeout(() => {
    router.replace("/login");
  }, 3000);

  return () => {
    clearTimeout(timer);
  };
}, [])

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Tourism-logo.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 220,
  },
});
