import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

/* ---------------- USERS ---------------- */

const users = {
  me: {
    name: "Gokul",
    avatar: require("../../assets/images/profile.jpg"),
  },
  rahul: {
    name: "Rahul",
    avatar: require("../../assets/images/user3.jpg"),
  },
  anita: {
    name: "Anita",
    avatar: require("../../assets/images/user2.jpg"),
  },
  arjun: {
    name: "Arjun",
    avatar: require("../../assets/images/user4.jpg"),
  },
  preethi: {
    name: "Preethi",
    avatar: require("../../assets/images/user1.jpg"),
  },
};

/* ---------------- LIKED PLACES ---------------- */

const likedPlaces = [
  {
    id: "1",
    name: "Dream Beach",
    image: require("../../assets/images/home1.jpg"),
    rating: 4.5,
  },
  {
    id: "2",
    name: "Forest Escape",
    image: require("../../assets/images/home5.jpg"),
    rating: 4,
  },
  {
    id: "3",
    name: "Desert Safari",
    image: require("../../assets/images/home6.jpg"),
    rating: 3.5,
  },
];

/* ---------------- FEEDBACK DATA ---------------- */

const feedbackData = [
  {
    id: "f1",
    user: users.me,
    time: "2 hours ago",
    place: "Dream Beach",
    rating: 4,
    placeImage: require("../../assets/images/home1.jpg"),
    comment: "Amazing place! Clean beach and peaceful environment 🌊",
    likes: 12,
    replies: [
      { user: users.rahul, text: "Totally agree, sunsets are amazing!" },
      { user: users.anita, text: "Best beach experience 😍" },
      { user: users.arjun, text: "Weekdays are less crowded" },
      { user: users.preethi, text: "Loved the local food stalls!" },
    ],
  },
  {
    id: "f2",
    user: users.me,
    time: "Yesterday",
    place: "Forest Escape",
    rating: 5,
    placeImage: require("../../assets/images/home5.jpg"),
    comment: "Perfect for solo travel and mental peace 🌿",
    likes: 8,
    replies: [
      { user: users.anita, text: "Wayanad is magical!" },
      { user: users.rahul, text: "Monsoon season is the best" },
    ],
  },
  {
    id: "f3",
    user: users.me,
    time: "2 days ago",
    place: "Desert Safari",
    rating: 3,
    placeImage: require("../../assets/images/home6.jpg"),
    comment: "Good experience but very hot during daytime ☀️",
    likes: 5,
    replies: [
      { user: users.arjun, text: "Evenings are better" },
      { user: users.rahul, text: "Camel ride was fun!" },
      { user: users.anita, text: "Carry enough water" },
    ],
  },
  {
    id: "f4",
    user: users.me,
    time: "Last week",
    place: "Dream Beach",
    rating: 5,
    placeImage: require("../../assets/images/home1.jpg"),
    comment: "Best family vacation spot. Kids loved it ❤️",
    likes: 20,
    replies: [
      { user: users.anita, text: "Great for kids indeed!" },
      { user: users.rahul, text: "Very safe beach" },
    ],
  },
];

export default function Favorite() {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  const toggleReplies = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* PAGE TITLE */}
      <Text style={styles.pageTitle}>Favorites ❤️</Text>

      {/* LIKED PLACES */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {likedPlaces.map((place) => (
          <View key={place.id} style={styles.placeCard}>
            <Image source={place.image} style={styles.placeImage} />
            <Text style={styles.placeName}>{place.name}</Text>

            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name={i <= Math.round(place.rating) ? "star" : "star-outline"}
                  size={14}
                  color="#facc15"
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FEEDBACK FEED */}
      <Text style={styles.feedTitle}>Your Feedback 💬</Text>

      {feedbackData.map((item) => {
        const showAll = expanded[item.id];
        const replies = showAll ? item.replies : item.replies.slice(0, 2);

        return (
          <View key={item.id} style={styles.feedCard}>
            {/* USER HEADER */}
            <View style={styles.header}>
              <Image source={item.user.avatar} style={styles.avatar} />
              <View>
                <Text style={styles.username}>{item.user.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>

            {/* PLACE + RATING */}
            <View style={styles.placeRow}>
              <Text style={styles.placeTitle}>📍 {item.place}</Text>
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Ionicons
                    key={i}
                    name={i <= item.rating ? "star" : "star-outline"}
                    size={14}
                    color="#facc15"
                  />
                ))}
              </View>
            </View>

            {/* PLACE IMAGE */}
            <Image source={item.placeImage} style={styles.feedImage} />

            {/* COMMENT + LIKE + REPLY BUTTON */}
            <View style={styles.commentRow}>
              <TouchableOpacity onPress={() => toggleLike(item.id)}>
                <Ionicons
                  name={liked[item.id] ? "heart" : "heart-outline"}
                  size={20}
                  color={liked[item.id] ? "#ef4444" : "#64748b"}
                />
                <Text style={styles.likeCount}>
                  {item.likes + (liked[item.id] ? 1 : 0)}
                </Text>
              </TouchableOpacity>

              <View style={{ flex: 1 }}>
                <Text style={styles.comment}>{item.comment}</Text>

                {/* UI ONLY REPLY BUTTON */}
                <TouchableOpacity>
                  <Text style={styles.replyBtn}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* REPLIES */}
            {replies.map((reply, index) => (
              <View key={index} style={styles.replyRow}>
                <Image source={reply.user.avatar} style={styles.replyAvatar} />
                <View>
                  <Text style={styles.replyName}>{reply.user.name}</Text>
                  <Text style={styles.replyText}>{reply.text}</Text>
                </View>
              </View>
            ))}

            {/* VIEW MORE / LESS */}
            {item.replies.length > 2 && (
              <TouchableOpacity onPress={() => toggleReplies(item.id)}>
                <Text style={styles.viewMore}>
                  {showAll ? "View less replies" : "View more replies"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 50,
    paddingHorizontal: 16,
  
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },

  placeCard: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 10,
    marginRight: 12,
  },
  placeImage: {
    width: "100%",
    height: 90,
    borderRadius: 12,
  },
  placeName: {
    fontWeight: "700",
    marginTop: 6,
  },
  starRow: {
    flexDirection: "row",
    marginTop: 4,
  },

  feedTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 16,
  },
  feedCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  username: {
    fontWeight: "700",
  },
  time: {
    fontSize: 12,
    color: "#64748b",
  },
  placeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  placeTitle: {
    fontWeight: "700",
  },
  feedImage: {
    width: "100%",
    height: 160,
    borderRadius: 14,
    marginBottom: 10,
  },

  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
  },
  likeCount: {
    fontSize: 12,
    textAlign: "center",
    color: "#64748b",
  },
  comment: {
    flex: 1,
    fontSize: 15,
    color: "#374151",
  },
  replyBtn: {
    color: "#2563eb",
    fontSize: 13,
    marginTop: 4,
  },

  replyRow: {
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 30,
  },
  replyAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  replyName: {
    fontWeight: "600",
    fontSize: 13,
  },
  replyText: {
    fontSize: 13,
    color: "#475569",
  },
  viewMore: {
    marginLeft: 30,
    marginTop: 6,
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 13,
  },
});
