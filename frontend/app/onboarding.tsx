import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../assets/images/startpop1.jpg"),
    title: "Discover Places",
    desc: "Find amazing destinations around the world.",
  },
  {
    id: "2",
    image: require("../assets/images/startpop2.jpg"),
    title: "Plan Smart Trips",
    desc: "AI-powered recommendations for you.",
  },
  {
    id: "3",
    image: require("../assets/images/startpop3.jpg"),
    title: "Ready to Explore?",
    desc: "Let’s begin your journey.",
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        onScroll={(e) =>
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item }) => (
          <ImageBackground
            source={item.image}
            style={styles.image}
            resizeMode="cover"
          >
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>

              {item.id === "3" && (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => router.replace("/get-started")}
                >
                  <Text style={styles.btnText}>Let’s Explore</Text>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        )}
      />

      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index ? styles.active : styles.inactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width,
    height,
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 22,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  desc: {
    color: "#64748b",
    marginTop: 8,
  },
  btn: {
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 14,
    marginTop: 16,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  dots: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    marginHorizontal: 6,
  },
  active: {
    width: 24,
    height: 6,
    backgroundColor: "#0f172a",
    borderRadius: 3,
  },
  inactive: {
    width: 8,
    height: 8,
    backgroundColor: "#cbd5e1",
    borderRadius: 4,
  },
});
