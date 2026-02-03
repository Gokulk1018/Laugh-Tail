import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const nearbyPlaces = [
  { id: "1", name: "Marina Beach", image: require("../../assets/images/home1.jpg"), rating: 4.5, tag: "Coastal" },
  { id: "2", name: "Mahabalipuram", image: require("../../assets/images/home2.jpg"), rating: 4.3, tag: "Heritage" },
  { id: "3", name: "Yelagiri Hills", image: require("../../assets/images/home3.jpg"), rating: 4.1, tag: "Nature" },
  { id: "4", name: "Pondicherry", image: require("../../assets/images/home4.jpg"), rating: 4.6, tag: "Peaceful" },
];

export default function AIPage() {
  const [message, setMessage] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.headerSub}>Active</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="sparkles" size={20} color="#4f46e5" />
          </TouchableOpacity>
        </View>

        {/* --- CHAT SECTION --- */}
        <View style={styles.chatWrapper}>
          <View style={styles.chatCard}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.chatContent}
            >
              <View style={styles.aiRow}>
                <View style={styles.aiBubble}>
                  <Text style={styles.aiText}>
                    Hi Gokul! I curated a few peaceful spots within 100km of your location. 🌿
                  </Text>
                </View>
              </View>

              <View style={styles.userRow}>
                <LinearGradient
                  colors={["#4f46e5", "#3730a3"]}
                  style={styles.userBubble}
                >
                  <Text style={styles.userText}>I want a peaceful place nearby</Text>
                </LinearGradient>
              </View>

              <View style={styles.aiRow}>
                <View style={styles.aiBubble}>
                  <Text style={styles.aiText}>
                    Analyzing your mood... Check out these serene destinations below! 👇
                  </Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.inputArea}>
              <View style={styles.inputWrap}>
                <TextInput
                  placeholder="Message Gemini..."
                  style={styles.input}
                  value={message}
                  onChangeText={setMessage}
                  placeholderTextColor="#94a3b8"
                />
                <TouchableOpacity activeOpacity={0.7}>
                  <LinearGradient
                    colors={["#4f46e5", "#3730a3"]}
                    style={styles.sendBtn}
                  >
                    <Ionicons name="arrow-up" size={18} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* --- NEARBY PLACES (Overflow Fixed) --- */}
        <View style={styles.placesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.placesList}
            snapToInterval={210} // Snap effect for pro feel
            decelerationRate="fast"
          >
            {nearbyPlaces.map((place) => (
              <TouchableOpacity key={place.id} activeOpacity={0.9} style={styles.placeCard}>
                <Image source={place.image} style={styles.placeImage} />
                <View style={styles.glassBadge}>
                  <Text style={styles.tagText}>{place.tag}</Text>
                </View>
                
                <View style={styles.placeInfo}>
                  <Text numberOfLines={1} style={styles.placeName}>{place.name}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color="#f59e0b" />
                    <Text style={styles.ratingText}>{place.rating}</Text>
                    <Text style={styles.distanceText}>(12 km away)</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#0f172a' },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e', marginRight: 6 },
  headerSub: { fontSize: 12, color: '#64748b', fontWeight: '700', textTransform: 'uppercase' },
  iconBtn: { backgroundColor: '#fff', padding: 8, borderRadius: 12, elevation: 2, shadowOpacity: 0.05 },

  /* CHAT SECTION */
  chatWrapper: { 
    height: height * 0.42, // Adjusted to give more room below
    paddingHorizontal: 16 
  },
  chatCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden'
  },
  chatContent: { padding: 18 },
  
  aiRow: { alignItems: 'flex-start', marginBottom: 12 },
  aiBubble: { 
    backgroundColor: '#f1f5f9', 
    padding: 14, 
    borderTopRightRadius: 20, 
    borderBottomRightRadius: 20, 
    borderBottomLeftRadius: 20, 
    borderTopLeftRadius: 4,
    maxWidth: '85%' 
  },
  aiText: { color: '#334155', fontSize: 14, lineHeight: 20, fontWeight: '500' },

  userRow: { alignItems: 'flex-end', marginBottom: 12 },
  userBubble: { 
    padding: 14, 
    borderTopLeftRadius: 20, 
    borderBottomLeftRadius: 20, 
    borderTopRightRadius: 20, 
    borderBottomRightRadius: 4,
    maxWidth: '85%' 
  },
  userText: { color: '#fff', fontSize: 14, fontWeight: '600' },

  inputArea: { padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 18, paddingLeft: 12, paddingRight: 6 },
  input: { flex: 1, height: 46, fontSize: 14, color: '#0f172a' },
  sendBtn: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },

  /* PLACES SECTION (FIXED OVERFLOW) */
  placesSection: { 
    flex: 1, // Takes up remaining space
    marginTop: 20,
    paddingBottom: 10
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  seeAll: { color: '#4f46e5', fontWeight: '700', fontSize: 13 },
  
  placesList: { 
    paddingLeft: 24, 
    paddingRight: 12,
    alignItems: 'flex-start' // Ensures cards don't stretch vertically
  },

  placeCard: { 
    width: 200, 
    backgroundColor: '#fff', 
    borderRadius: 24, 
    marginRight: 16, 
    elevation: 3, 
    shadowOpacity: 0.05, 
    shadowRadius: 8,
    marginBottom: 10, // Buffer for shadow
    overflow: 'hidden'
  },
  placeImage: { width: '100%', height: 110 },
  glassBadge: { 
    position: 'absolute', top: 8, left: 8, 
    backgroundColor: 'rgba(255,255,255,0.9)', 
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 
  },
  tagText: { fontSize: 9, fontWeight: '900', color: '#4f46e5', textTransform: 'uppercase' },
  
  placeInfo: { padding: 12 },
  placeName: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, fontWeight: '800', color: '#0f172a', marginLeft: 4 },
  distanceText: { fontSize: 11, color: '#94a3b8', marginLeft: 4, fontWeight: '500' }
});