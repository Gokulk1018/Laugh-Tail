import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const categories = [
  { id: "1", name: "Beach", icon: "🏖️" },
  { id: "2", name: "Mountains", icon: "⛰️" },
  { id: "3", name: "Snow", icon: "❄️" },
  { id: "4", name: "Adventure", icon: "🧗" },
  { id: "5", name: "Forest", icon: "🌲" },
  { id: "6", name: "Desert", icon: "🏜️" },
  { id: "7", name: "Island", icon: "🏝️" },
  { id: "8", name: "City", icon: "🏙️" },
];

const places = [
  { id: "1", title: "Dream Beach", image: require("../../assets/images/home1.jpg") },
  { id: "2", title: "Rocky Mountains", image: require("../../assets/images/home2.jpg") },
  { id: "3", title: "Snow Hills", image: require("../../assets/images/home3.jpg") },
  { id: "4", title: "Adventure Park", image: require("../../assets/images/home4.jpg") },
  { id: "5", title: "Forest Escape", image: require("../../assets/images/home5.jpg") },
  { id: "6", title: "Desert Safari", image: require("../../assets/images/home6.jpg") },
  { id: "7", title: "Island View", image: require("../../assets/images/home7.jpg") },
  { id: "8", title: "City Lights", image: require("../../assets/images/home8.jpg") },
];

const falls = [...places];

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello 👋</Text>
            <Text style={styles.subtitle}>Explore the world</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput placeholder="Search destinations..." style={styles.searchInput} />
        </View>

        {/* CATEGORIES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => router.push("/categories")}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <View key={item.id} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* POPULAR PLACES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Places</Text>
          <TouchableOpacity onPress={() => router.push("/(navigation)/categories")}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {places.map((place) => (
            <TouchableOpacity key={place.id} style={styles.placeCard}>
              <Image source={place.image} style={styles.placeImage} />
              <Text style={styles.placeTitle}>{place.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FALLS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Falls</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {falls.map((fall) => (
            <TouchableOpacity key={fall.id} style={styles.placeCard}>
              <Image source={fall.image} style={styles.placeImage} />
              <Text style={styles.placeTitle}>{fall.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 30 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { fontSize: 22, fontWeight: "700", color: "#0f172a" },
  subtitle: { color: "#64748b" },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#e2e8f0", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 18 },
  searchBox: { backgroundColor: "#fff", borderRadius: 14, marginVertical: 16, paddingHorizontal: 14 },
  searchInput: { height: 44 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  viewAll: { color: "#2563eb", fontWeight: "600" },
  categoryCard: { width: 90, height: 90, backgroundColor: "#2563eb", borderRadius: 45, justifyContent: "center", alignItems: "center", marginRight: 12 },
  categoryIcon: { fontSize: 26 },
  categoryText: { color: "#fff", fontSize: 12, marginTop: 6 },
  placeCard: { width: 170, backgroundColor: "#fff", borderRadius: 18, padding: 10, marginRight: 14 },
  placeImage: { width: "100%", height: 110, borderRadius: 14 },
  placeTitle: { marginTop: 8, fontSize: 15, fontWeight: "600" },
});
