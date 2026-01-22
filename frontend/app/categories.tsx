import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";

const categoriesData = [
  { id: "1", title: "Dream Beach", image: require("../assets/images/home1.jpg") },
  { id: "2", title: "Rocky Mountains", image: require("../assets/images/home2.jpg") },
  { id: "3", title: "Snow Hills", image: require("../assets/images/home3.jpg") },
  { id: "4", title: "Adventure Park", image: require("../assets/images/home4.jpg") },
  { id: "5", title: "Forest Escape", image: require("../assets/images/home5.jpg") },
  { id: "6", title: "Desert Safari", image: require("../assets/images/home6.jpg") },
  { id: "7", title: "Island View", image: require("../assets/images/home7.jpg") },
  { id: "8", title: "City Lights", image: require("../assets/images/home8.jpg") },
];

export default function Categories() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categoriesData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textBox}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>
                Explore beautiful destinations
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  textBox: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 4,
  },
});
