import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../assets/images/startpop1.jpg"),
    title: "Discover Beautiful Places",
    desc: "Find amazing destinations and hidden gems around the world.",
  },
  {
    id: "2",
    image: require("../assets/images/startpop2.jpg"),
    title: "Plan Your Perfect Trip",
    desc: "Smart recommendations based on season, mood, and interests.",
  },
  {
    id: "3",
    image: require("../assets/images/startpop3.jpg"),
    title: "Travel. Explore. Enjoy.",
    desc: "Let’s begin your journey with us.",
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);
  const router = useRouter();

  const onScroll = (e: any) => {
    const slideIndex = Math.round(
      e.nativeEvent.contentOffset.x / width
    );
    setIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <ImageBackground
            source={item.image}
            style={styles.image}
          >
            {/* Bottom Card */}
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>

              {item.id === "3" && (
                <TouchableOpacity
                  style={styles.exploreBtn}
                  onPress={() => router.replace("/")}
                >
                  <Text style={styles.exploreText}>Let’s Explore</Text>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        )}
      />

      {/* DOT INDICATOR */}
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              index === i ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  image: {
    width,
    height,
    justifyContent: "flex-end",
  },

  card: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 22,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    color: "#0f172a",
  },

  desc: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },

  exploreBtn: {
    marginTop: 20,
    backgroundColor: "#0f172a",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  exploreText: {
    color: "#ffffff",
    fontSize: 16,
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

  activeDot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0f172a",
  },

  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cbd5e1",
  },
});
