import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";

const categories = [
  "All",
  "Beach",
  "Mountain",
  "Hill Station",
  "Forest",
  "Desert",
  "Island",
  "Waterfalls",
  "Wildlife",
  "Heritage",
  "Religious",
  "Adventure",
  "City",
  "Nature",
];

const tripTypes = [
  "All",
  "Family",
  "Friends",
  "Solo",
  "Couple",
  "Honeymoon",
  "Group Tour",
  "Backpacking",
  "Business",
  "Weekend Trip",
  "Luxury",
  "Budget",
];


const places = [
  {
    id: "1",
    title: "Dream Beach",
    category: "Beach",
    type: "Family",
    city: "Goa",
    image: require("../../assets/images/home1.jpg"),
  },
  {
    id: "2",
    title: "Rocky Mountains",
    category: "Mountain",
    type: "Friends",
    city: "Manali",
    image: require("../../assets/images/home2.jpg"),
  },
  {
    id: "3",
    title: "Forest Escape",
    category: "Forest",
    type: "Solo",
    city: "Wayanad",
    image: require("../../assets/images/home5.jpg"),
  },
  {
    id: "4",
    title: "Desert Safari",
    category: "Desert",
    type: "Friends",
    city: "Jaisalmer",
    image: require("../../assets/images/home6.jpg"),
  },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [city, setCity] = useState("");

  const filteredPlaces = places.filter((place) => {
    const matchQuery = place.title.toLowerCase().includes(query.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || place.category === selectedCategory;
    const matchType =
      selectedType === "All" || place.type === selectedType;
    const matchCity =
      city === "" || place.city.toLowerCase().includes(city.toLowerCase());

    return matchQuery && matchCategory && matchType && matchCity;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Search Destinations 🔍</Text>

      {/* SEARCH INPUT */}
      <TextInput
        placeholder="Search place name..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      {/* CITY FILTER */}
      <TextInput
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      {/* CATEGORY FILTER */}
      <Text style={styles.filterTitle}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterChip,
              selectedCategory === cat && styles.activeChip,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === cat && styles.activeChipText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TRIP TYPE FILTER */}
      <Text style={styles.filterTitle}>Trip Type</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tripTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterChip,
              selectedType === type && styles.activeChip,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.chipText,
                selectedType === type && styles.activeChipText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* RESULTS */}
      <Text style={styles.resultTitle}>
        Results ({filteredPlaces.length})
      </Text>

      {filteredPlaces.length === 0 ? (
        <Text style={styles.empty}>No destinations found</Text>
      ) : (
        filteredPlaces.map((place) => (
          <View key={place.id} style={styles.card}>
            <Image source={place.image} style={styles.image} />
            <View style={styles.cardInfo}>
              <Text style={styles.placeTitle}>{place.title}</Text>
              <Text style={styles.meta}>
                {place.category} • {place.type} • {place.city}
              </Text>
            </View>
          </View>
        ))
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 50,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 10,
  },
  filterChip: {
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
  },
  chipText: {
    color: "#374151",
    fontWeight: "600",
  },
  activeChip: {
    backgroundColor: "#2563eb",
  },
  activeChipText: {
    color: "#fff",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 140,
  },
  cardInfo: {
    padding: 10,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  meta: {
    color: "#64748b",
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#64748b",
  },
});
