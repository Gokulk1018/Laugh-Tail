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
import { Ionicons } from "@expo/vector-icons";

/* ---------------- CATEGORIES ---------------- */

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

/* ---------------- NEARBY PLACES ---------------- */

const nearbyPlaces = [
  { id: "1", title: "Marina Beach", image: require("../../assets/images/marina.jpg") }, // TN
  { id: "2", title: "Mahabalipuram", image: require("../../assets/images/mahabalipuram.jpg") }, // TN
  { id: "3", title: "Pondicherry", image: require("../../assets/images/pondicherry.jpg") }, // India
  { id: "4", title: "Goa Beach", image: require("../../assets/images/goa.jpg") }, // India
  { id: "5", title: "Bali", image: require("../../assets/images/bali.jpg") }, // World
  { id: "6", title: "Phuket", image: require("../../assets/images/phuket.jpg") }, // World
];

/* ---------------- FALLS ---------------- */

const falls = [
  { id: "1", title: "Courtallam Falls", image: require("../../assets/images/courtallam.jpg") }, // TN
  { id: "2", title: "Hogenakkal Falls", image: require("../../assets/images/hogenakkal.jpg") }, // TN
  { id: "3", title: "Jog Falls", image: require("../../assets/images/jogfalls.jpg") }, // India
  { id: "4", title: "Athirappilly Falls", image: require("../../assets/images/athirappilly.jpg") }, // India
  { id: "5", title: "Niagara Falls", image: require("../../assets/images/niagara.jpg") }, // World
  { id: "6", title: "Victoria Falls", image: require("../../assets/images/victoria.jpg") }, // World
];

/* ---------------- BEACHES ---------------- */

const beaches = [
  { id: "1", title: "Rameswaram Beach", image: require("../../assets/images/rameswaram.jpg") },
  { id: "2", title: "Kanyakumari Beach", image: require("../../assets/images/kanyakumari.jpg") },
  { id: "3", title: "Varkala Beach", image: require("../../assets/images/varkala.jpg") },
  { id: "4", title: "Baga Beach", image: require("../../assets/images/baga.jpg") },
  { id: "5", title: "Bondi Beach", image: require("../../assets/images/bondi.jpg") },
  { id: "6", title: "Copacabana", image: require("../../assets/images/copacabana.jpg") },
];

/* ---------------- COLD PLACES ---------------- */

const coldPlaces = [
  { id: "1", title: "Ooty", image: require("../../assets/images/ooty.jpg") },
  { id: "2", title: "Kodaikanal", image: require("../../assets/images/kodaikanal.jpg") },
  { id: "3", title: "Manali", image: require("../../assets/images/manali.jpg") },
  { id: "4", title: "Gulmarg", image: require("../../assets/images/gulmarg.jpg") },
  { id: "5", title: "Swiss Alps", image: require("../../assets/images/swiss.jpg") },
  { id: "6", title: "Reykjavik", image: require("../../assets/images/reykjavik.jpg") },
];

/* ---------------- DESERT ---------------- */

const deserts = [
  { id: "1", title: "Rameswaram Dunes", image: require("../../assets/images/rameswaramdunes.jpg") },
  { id: "2", title: "Dhanushkodi Sands", image: require("../../assets/images/dhanushkodi.jpg") },
  { id: "3", title: "Thar Desert", image: require("../../assets/images/thar.jpg") },
  { id: "4", title: "Jaisalmer Safari", image: require("../../assets/images/jaisalmer.jpg") },
  { id: "5", title: "Sahara Desert", image: require("../../assets/images/sahara.jpg") },
  { id: "6", title: "Dubai Desert", image: require("../../assets/images/dubai_desert.jpg") },
];

/* ---------------- AMUSEMENT PARK ---------------- */

const amusementParks = [
  { id: "1", title: "Queens Land", image: require("../../assets/images/queensland.jpg") },
  { id: "2", title: "Black Thunder", image: require("../../assets/images/blackthunder.jpg") },
  { id: "3", title: "Wonderla", image: require("../../assets/images/wonderla.jpg") },
  { id: "4", title: "Imagicaa", image: require("../../assets/images/imagicaa.jpg") },
  { id: "5", title: "Disneyland", image: require("../../assets/images/disneyland.jpg") },
  { id: "6", title: "Universal Studios", image: require("../../assets/images/universal.jpg") },
];

/* ---------------- CHILD FAVORITES ---------------- */

const kidsFavorites = [
  { id: "1", title: "VGP Marine Kingdom", image: require("../../assets/images/vgp.jpg") },
  { id: "2", title: "Arignar Anna Zoo", image: require("../../assets/images/zoo.jpg") },
  { id: "3", title: "Mysore Zoo", image: require("../../assets/images/mysorezoo.jpg") },
  { id: "4", title: "Nehru Planetarium", image: require("../../assets/images/planetarium.jpg") },
  { id: "5", title: "Legoland", image: require("../../assets/images/legoland.jpg") },
  { id: "6", title: "Sentosa Island", image: require("../../assets/images/sentosa.jpg") },
];

export default function Home() {
  const router = useRouter();

  const renderSection = (title: string, data: any[]) => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <TouchableOpacity key={item.id} style={styles.placeCard}>
            <Image source={item.image} style={styles.placeImage} />
            <Text style={styles.placeTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello Gokul 👋</Text>
            <Text style={styles.subtitle}>Explore the world</Text>
          </View>

          <TouchableOpacity
            style={styles.avatar}
            onPress={() => router.push("/(navigation)/setting")}
          >
            <Ionicons name="settings-outline" size={22} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput placeholder="Search destinations..." style={styles.searchInput} />
        </View>

        {/* CATEGORIES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <View key={item.id} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>

        {renderSection("Nearby Places", nearbyPlaces)}
        {renderSection("Famous Waterfalls", falls)}
        {renderSection("Beaches", beaches)}
        {renderSection("Cold Places", coldPlaces)}
        {renderSection("Desert Destinations", deserts)}
        {renderSection("Amusement Parks", amusementParks)}
        {renderSection("Kids & Family Favorites", kidsFavorites)}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES (UNCHANGED) ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 50 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { fontSize: 22, fontWeight: "700", color: "#0f172a" },
  subtitle: { color: "#64748b" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: { backgroundColor: "#fff", borderRadius: 14, marginVertical: 16, paddingHorizontal: 14 },
  searchInput: { height: 44 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  categoryCard: {
    width: 90,
    height: 90,
    backgroundColor: "#040404",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryIcon: { fontSize: 26 },
  categoryText: { color: "#fff", fontSize: 12, marginTop: 6 },
  placeCard: { width: 170, backgroundColor: "#fff", borderRadius: 18, padding: 10, marginRight: 14 },
  placeImage: { width: "100%", height: 110, borderRadius: 14 },
  placeTitle: { marginTop: 8, fontSize: 15, fontWeight: "600" },
});
