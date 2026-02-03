import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated, // Added for smooth interpolation
} from "react-native";
import { useState, useRef } from "react";
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
  const scrollX = useRef(new Animated.Value(0)).current; // Track scroll position
  const router = useRouter();

  const handleOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          handleOnScroll(e);
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item, index: i }) => {
          // Input range for this specific slide
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          
          // Animation for text card
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 0, 100],
          });

          return (
            <ImageBackground
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            >
              <View style={styles.overlay} />
              
              <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>

                {item.id === "3" && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={() => router.replace("/get-started")}
                  >
                    <Text style={styles.btnText}>Let’s Explore</Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            </ImageBackground>
          );
        }}
      />

      {/* PRO PAGINATION DOTS */}
      <View style={styles.dots}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          
          // Dot width expands when active
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: "clamp",
          });

          // Dot color transitions
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                { width: dotWidth, opacity },
                i === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)", // Subtle dimming for the image
  },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    marginBottom: 100, // Lifted for dots
    borderRadius: 30,
    padding: 24,
    // Premium shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e293b",
    letterSpacing: -0.5,
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    color: "#64748b",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#0f172a",
    padding: 18,
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dots: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff", // White dots look better on image backgrounds
  },
  inactiveDot: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});