import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { sections } from "../data/sections";
import { placeImages } from "../data/placeImages";

const { width } = Dimensions.get("window");

type PlaceItem = {
  name: string;
  image: any;
};

const categories = [
  { id: "1", name: "Adventure", icon: "🧗" },
  { id: "2", name: "Forest", icon: "🌲" },
  { id: "3", name: "City", icon: "🏙️" },
  { id: "4", name: "Beach", icon: "🏖️" },
  { id: "5", name: "Desert", icon: "🏜️" },
  { id: "6", name: "Snow", icon: "❄️" },
  { id: "7", name: "Island", icon: "🏝️" },
  { id: "8", name: "Mountain", icon: "⛰️" },
  { id: "9", name: "Temple", icon: "🛕" },
  { id: "10", name: "Museum", icon: "🏰" },
];

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<Record<string, PlaceItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const final: Record<string, PlaceItem[]> = {};
    for (const section of Object.keys(sections)) {
      final[section] = sections[section].map((place) => ({
        name: place,
        image: placeImages[place] || placeImages.default,
      }));
    }
    setData(final);
    setLoading(false);
  }, []);

  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (!search) return data;
    const result: Record<string, PlaceItem[]> = {};
    Object.keys(data).forEach((section) => {
      const filteredItems = data[section].filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredItems.length > 0) result[section] = filteredItems;
    });
    return result;
  }, [search, data]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      
      {/* FIXED HEADER & SEARCH SECTION */}
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello Gokul 👋</Text>
            <Text style={styles.subtitle}>Where to next?</Text>
          </View>
          <TouchableOpacity 
            style={styles.avatarBtn}
            onPress={() => router.push("/(navigation)/setting")}
          >
            <Ionicons name="notifications-outline" size={22} color="#1e293b" />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#94a3b8" />
            <TextInput
              placeholder="Search destinations..."
              placeholderTextColor="#94a3b8"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* CATEGORIES */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalPadding}
        >
          {categories.map((item) => (
            <TouchableOpacity key={item.id} style={styles.catItem}>
              <View style={styles.catIconWrap}>
                <Text style={styles.catEmoji}>{item.icon}</Text>
              </View>
              <Text style={styles.catLabel}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* PLACES SECTIONS */}
        {loading ? (
          <ActivityIndicator size="large" color="#0ea5e9" style={{ marginTop: 50 }} />
        ) : (
          Object.entries(filteredData).map(([title, items]) => (
            <View key={title} style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitleNoMargin}>{title}</Text>
                <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalPadding}
              >
                {items.map((place, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    style={styles.card}
                    onPress={() =>
                      router.push({
                        pathname: "/(navigation)/place-details",
                        params: { name: place.name, section: title },
                      })
                    }
                  >
                    <Image source={place.image} style={styles.cardImg} />
                    <View style={styles.cardInfo}>
                      <Text numberOfLines={1} style={styles.cardName}>{place.name}</Text>
                      <View style={styles.locRow}>
                        <Ionicons name="location-sharp" size={12} color="#0ea5e9" />
                        <Text style={styles.locText}>Travel Guide</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))
        )}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  topContainer: { paddingHorizontal: 20, paddingTop: 10 },
  
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: 20 
  },
  greeting: { fontSize: 24, fontWeight: "800", color: "#1e293b", letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: "#64748b" },
  avatarBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  dot: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#fff',
  },

  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 15,
    height: 56,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#1e293b' },
  filterBtn: {
    backgroundColor: '#0ea5e9',
    width: 56,
    height: 56,
    borderRadius: 18,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContent: { paddingBottom: 40 },
  horizontalPadding: { paddingLeft: 20, paddingRight: 4, paddingBottom: 20 }, // Added paddingBottom to prevent shadow overlap

  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "700", 
    color: "#1e293b", 
    marginHorizontal: 20, 
    marginBottom: 15 
  },
  sectionTitleNoMargin: { fontSize: 20, fontWeight: "700", color: "#1e293b" },
  
  sectionContainer: { marginBottom: 10 }, // Space between the sections
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginHorizontal: 20, 
    marginBottom: 12 
  },
  seeAll: { color: '#0ea5e9', fontWeight: '600' },

  catItem: { alignItems: 'center', marginRight: 20 },
  catIconWrap: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  catEmoji: { fontSize: 28 },
  catLabel: { fontSize: 13, fontWeight: '600', color: '#64748b' },

  card: {
    width: width * 0.62,
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 12,
    marginRight: 16,
    // Soft deep shadow
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
  },
  cardImg: { width: "100%", height: 180, borderRadius: 20 },
  cardInfo: { paddingVertical: 12, paddingHorizontal: 4 },
  cardName: { fontSize: 18, fontWeight: "700", color: '#1e293b' },
  locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locText: { fontSize: 13, color: '#94a3b8', marginLeft: 4 },
});