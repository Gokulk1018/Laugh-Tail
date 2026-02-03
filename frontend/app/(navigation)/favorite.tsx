import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

/* ---------------- FULL DATA RESTORED ---------------- */
const users = {
  me: { name: "Gokul", avatar: require("../../assets/images/profile.jpg") },
  rahul: { name: "Rahul", avatar: require("../../assets/images/user3.jpg") },
  anita: { name: "Anita", avatar: require("../../assets/images/user2.jpg") },
  arjun: { name: "Arjun", avatar: require("../../assets/images/user4.jpg") },
  preethi: { name: "Preethi", avatar: require("../../assets/images/user1.jpg") },
};

const likedPlaces = [
  { id: "1", name: "Dream Beach", image: require("../../assets/images/home1.jpg"), rating: 4.5 },
  { id: "2", name: "Forest Escape", image: require("../../assets/images/home5.jpg"), rating: 4.0 },
  { id: "3", name: "Desert Safari", image: require("../../assets/images/home6.jpg"), rating: 3.5 },
];

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
  // {
  //   id: "f4",
  //   user: users.me,
  //   time: "Last week",
  //   place: "Dream Beach",
  //   rating: 5,
  //   placeImage: require("../../assets/images/home1.jpg"),
  //   comment: "Best family vacation spot. Kids loved it ❤️",
  //   likes: 20,
  //   replies: [
  //     { user: users.anita, text: "Great for kids indeed!" },
  //     { user: users.rahul, text: "Very safe beach" },
  //   ],
  // },
];

export default function Favorite() {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  const toggleReplies = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleLike = (id: string) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Favorites</Text>
          <TouchableOpacity style={styles.topIcon}>
            <Ionicons name="heart" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* --- LIKED PLACES SECTION --- */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollPadding}
        >
          {likedPlaces.map((place) => (
            <TouchableOpacity key={place.id} activeOpacity={0.9} style={styles.placeCard}>
              <Image source={place.image} style={styles.placeImage} />
              <View style={styles.glassRating}>
                <Ionicons name="star" size={12} color="#fbbf24" />
                <Text style={styles.ratingText}>{place.rating}</Text>
              </View>
              <Text numberOfLines={1} style={styles.placeName}>{place.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- FEEDBACK SECTION --- */}
        <View style={styles.feedHeaderRow}>
          <Text style={styles.feedTitle}>Your Activity Feed</Text>
          <View style={styles.countBadge}><Text style={styles.countText}>{feedbackData.length}</Text></View>
        </View>

        {feedbackData.map((item) => {
          const isLiked = liked[item.id];
          const showAll = expanded[item.id];
          const replies = showAll ? item.replies : item.replies.slice(0, 2);

          return (
            <View key={item.id} style={styles.feedCard}>
              {/* USER HEADER */}
              <View style={styles.userInfoRow}>
                <Image source={item.user.avatar} style={styles.avatar} />
                <View style={styles.nameContainer}>
                  <Text style={styles.username}>{item.user.name}</Text>
                  <Text style={styles.time}>{item.time} • <Text style={styles.placeTag}>{item.place}</Text></Text>
                </View>
                <View style={styles.starRow}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Ionicons key={i} name={i <= item.rating ? "star" : "star-outline"} size={12} color="#fbbf24" />
                    ))}
                </View>
              </View>

              <Text style={styles.commentText}>{item.comment}</Text>
              <Image source={item.placeImage} style={styles.feedImage} />

              {/* ACTION BAR */}
              <View style={styles.actionBar}>
                <TouchableOpacity 
                  style={[styles.actionBtn, isLiked && styles.likedBtnActive]} 
                  onPress={() => toggleLike(item.id)}
                >
                  <Ionicons name={isLiked ? "heart" : "heart-outline"} size={18} color={isLiked ? "#fff" : "#64748b"} />
                  <Text style={[styles.actionLabel, isLiked && styles.activeLabelText]}>
                    {item.likes + (isLiked ? 1 : 0)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="chatbubble-outline" size={18} color="#64748b" />
                  <Text style={styles.actionLabel}>{item.replies.length}</Text>
                </TouchableOpacity>
              </View>

              {/* REPLIES AREA */}
              <View style={styles.replyBox}>
                {replies.map((reply, index) => (
                  <View key={index} style={styles.replyItem}>
                    <Image source={reply.user.avatar} style={styles.replyAvatar} />
                    <View style={styles.replyContent}>
                      <Text style={styles.replyName}>{reply.user.name}</Text>
                      <Text style={styles.replyText}>{reply.text}</Text>
                    </View>
                  </View>
                ))}

                {item.replies.length > 2 && (
                  <TouchableOpacity onPress={() => toggleReplies(item.id)}>
                    <Text style={styles.viewMoreText}>
                      {showAll ? "Show less" : `View all ${item.replies.length} replies`}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  container: { flex: 1 },
  pageHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 15, marginBottom: 20 },
  pageTitle: { fontSize: 32, fontWeight: "900", color: "#0f172a", letterSpacing: -1.5 },
  topIcon: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 3, shadowOpacity: 0.1 },

  horizontalScrollPadding: { paddingLeft: 20, paddingRight: 8, paddingBottom: 10 },
  placeCard: { width: 165, backgroundColor: "#fff", borderRadius: 28, padding: 8, marginRight: 16, elevation: 6, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12 },
  placeImage: { width: "100%", height: 110, borderRadius: 22 },
  glassRating: { position: 'absolute', top: 15, left: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.92)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  ratingText: { fontSize: 11, fontWeight: '800', marginLeft: 3, color: '#1e293b' },
  placeName: { fontWeight: "800", fontSize: 14, color: "#1e293b", marginTop: 10, paddingLeft: 6 },

  feedHeaderRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 35, marginBottom: 15 },
  feedTitle: { fontSize: 22, fontWeight: "800", color: "#0f172a" },
  countBadge: { backgroundColor: '#4f46e5', width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  countText: { color: '#fff', fontSize: 12, fontWeight: '800' },

  feedCard: { backgroundColor: "#fff", borderRadius: 32, padding: 18, marginHorizontal: 20, marginBottom: 24, elevation: 4, shadowOpacity: 0.05 },
  userInfoRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  avatar: { width: 50, height: 50, borderRadius: 18, marginRight: 12 },
  nameContainer: { flex: 1 },
  username: { fontWeight: "800", fontSize: 17, color: '#1e293b' },
  time: { fontSize: 12, color: "#94a3b8", fontWeight: '600' },
  placeTag: { color: '#4f46e5', fontWeight: '800' },
  starRow: { flexDirection: 'row' },

  commentText: { fontSize: 16, color: "#475569", lineHeight: 24, marginBottom: 15, fontWeight: '500' },
  feedImage: { width: "100%", height: 200, borderRadius: 24, marginBottom: 18 },

  actionBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 18, marginBottom: 18 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, marginRight: 12 },
  likedBtnActive: { backgroundColor: '#ef4444' },
  actionLabel: { marginLeft: 8, fontSize: 14, fontWeight: '700', color: '#64748b' },
  activeLabelText: { color: '#fff' },

  replyBox: { backgroundColor: '#f8fafc', borderRadius: 24, padding: 14 },
  replyItem: { flexDirection: "row", marginBottom: 15 },
  replyAvatar: { width: 34, height: 34, borderRadius: 12, marginRight: 12 },
  replyContent: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 18, borderTopLeftRadius: 2 },
  replyName: { fontWeight: "800", fontSize: 13, color: '#1e293b', marginBottom: 2 },
  replyText: { fontSize: 13, color: "#64748b", lineHeight: 19 },
  viewMoreText: { color: "#4f46e5", fontWeight: "800", fontSize: 13, textAlign: 'center', marginTop: 5 },
});