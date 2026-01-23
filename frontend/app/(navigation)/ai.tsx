import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

/* -------- STATIC NEARBY PLACES (FOR NOW) -------- */

const nearbyPlaces = [
  {
    id: "1",
    name: "Marina Beach",
    image: require("../../assets/images/home1.jpg"),
    rating: 4.5,
  },
  {
    id: "2",
    name: "Mahabalipuram",
    image: require("../../assets/images/home2.jpg"),
    rating: 4.3,
  },
  {
    id: "3",
    name: "Yelagiri Hills",
    image: require("../../assets/images/home3.jpg"),
    rating: 4.1,
  },
  {
    id: "4",
    name: "Pondicherry",
    image: require("../../assets/images/home4.jpg"),
    rating: 4.6,
  },
];

export default function AIPage() {
  return (
    <View style={styles.container}>
      {/* ================= CHAT CARD ================= */}
      <View style={styles.chatWrapper}>
        <View style={styles.chatCard}>
          {/* AI HEADER */}
          <View style={styles.aiHeader}>
            <View style={styles.aiIconWrap}>
              <Ionicons name="sparkles" size={18} color="#2563eb" />
            </View>
            <Text style={styles.aiTitle}>AI Assistant</Text>
          </View>

          {/* CHAT MESSAGES */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chat}
          >
            {/* AI MESSAGE */}
            <View style={styles.aiRow}>
              <View style={styles.aiBubble}>
                <Text style={styles.aiText}>
                  Hi Gokul 👋 I’m your AI travel assistant.
                  Tell me what kind of trip you’re planning 😊
                </Text>
              </View>
            </View>

            {/* USER MESSAGE */}
            <View style={styles.userRow}>
              <View style={styles.userBubble}>
                <Text style={styles.userText}>
                  I want a peaceful place nearby
                </Text>
              </View>
            </View>

            {/* AI RESPONSE */}
            <View style={styles.aiRow}>
              <View style={styles.aiBubble}>
                <Text style={styles.aiText}>
                  Got it 🌿 I’ve analyzed your request and found some nearby
                  places that match your mood. You can explore them below 👇
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* INPUT BAR */}
          <View style={styles.inputBar}>
            <TextInput
              placeholder="Type your message..."
              style={styles.input}
            />
            <TouchableOpacity style={styles.sendBtn}>
              <Ionicons name="send" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ================= PLACES SECTION ================= */}
      <View style={styles.placesSection}>
        <Text style={styles.sectionTitle}>Nearby Places 📍</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.placesRow}
        >
          {nearbyPlaces.map((place) => (
            <View key={place.id} style={styles.placeCard}>
              <Image source={place.image} style={styles.placeImage} />

              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{place.name}</Text>

                <View style={styles.ratingRow}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Ionicons
                      key={i}
                      name={
                        i <= Math.round(place.rating)
                          ? "star"
                          : "star-outline"
                      }
                      size={14}
                      color="#facc15"
                    />
                  ))}
                  <Text style={styles.ratingText}>{place.rating}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  /* CHAT CARD */
  chatWrapper: {
    height: height * 0.55,
    padding: 16,
  },
  chatCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  /* AI HEADER */
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
  },
  aiIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  aiTitle: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
  },

  chat: {
    padding: 16,
    paddingBottom: 80,
  },

  aiRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  aiBubble: {
    maxWidth: "80%",
    backgroundColor: "#e0e7ff",
    borderRadius: 16,
    padding: 12,
  },
  aiText: {
    color: "#1e293b",
    lineHeight: 20,
  },

  userRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  userBubble: {
    maxWidth: "80%",
    backgroundColor: "#2563eb",
    borderRadius: 16,
    padding: 12,
  },
  userText: {
    color: "#ffffff",
    lineHeight: 20,
  },

  /* INPUT */
  inputBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 0.5,
    borderTopColor: "#e5e7eb",
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: "#f1f5f9",
    borderRadius: 22,
    paddingHorizontal: 16,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#2563eb",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  /* PLACES */
  placesSection: {
    flex: 1,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  placesRow: {
    paddingHorizontal: 16,
    gap: 14,
  },
  placeCard: {
    width: 160,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    overflow: "hidden",
  },
  placeImage: {
    width: "100%",
    height: 110,
  },
  placeInfo: {
    padding: 10,
  },
  placeName: {
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    color: "#475569",
    marginLeft: 4,
  },
});
