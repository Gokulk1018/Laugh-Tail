import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { placesData, Place, Reply } from "../data/places";

export default function PlaceDetails() {
  const router = useRouter();
  const { section, index } = useLocalSearchParams<{
    section?: string;
    index?: string;
  }>();

  const places: Place[] = placesData[String(section)] || [];
  const place = places[Number(index)];

  /* ---------- LOCAL UI STATE ---------- */
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );

  if (!place) {
    return (
      <View style={styles.center}>
        <Text>Place not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#2563eb", marginTop: 10 }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleLike = (id: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* ---------- RENDER REPLIES (TREE) ---------- */
  const renderReplies = (replies: Reply[], level = 1) => {
    if (!replies || replies.length === 0) return null;

    return replies.map((reply, i) => (
      <View key={i} style={{ marginLeft: level * 22, marginTop: 10 }}>
        <View style={styles.replyRow}>
          <Text style={styles.replyUser}>{reply.user}</Text>
          <Text style={styles.replyText}>{reply.text}</Text>
        </View>

        {/* Reply CTA (UI only) */}
        <TouchableOpacity>
          <Text style={styles.replyBtn}>Reply</Text>
        </TouchableOpacity>

        {reply.replies && renderReplies(reply.replies, level + 1)}
      </View>
    ));
  };

  return (
    <View style={styles.screen}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{place.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- IMAGE ---------- */}
        <Image source={place.image} style={styles.image} />

        {/* ---------- TITLE ---------- */}
        <Text style={styles.title}>{place.title}</Text>

        {/* ---------- LOCATION ---------- */}
        <Text style={styles.location}>📍 {place.location}</Text>

        {/* ---------- RATING ---------- */}
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Ionicons
              key={n}
              name={n <= Math.round(place.rating) ? "star" : "star-outline"}
              size={16}
              color="#facc15"
            />
          ))}
          <Text style={styles.ratingText}>{place.rating}</Text>
        </View>

        {/* ---------- CATEGORIES ---------- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {place.categories.map((cat, i) => (
            <View key={i} style={styles.chip}>
              <Text style={styles.chipText}>{cat}</Text>
            </View>
          ))}
        </ScrollView>

        {/* ---------- DESCRIPTION ---------- */}
        <Text style={styles.description}>{place.description}</Text>

        {/* ---------- DISCUSSION ---------- */}
        <Text style={styles.sectionTitle}>Discussion 💬</Text>

        {place.discussions.length === 0 && (
          <Text style={styles.noDiscussion}>
            No discussions yet. Be the first to comment!
          </Text>
        )}

        {place.discussions.map((d) => {
          const isLiked = likedComments[d.id];

          return (
            <View key={d.id} style={styles.commentCard}>
              {/* USER + COMMENT */}
              <Text style={styles.commentUser}>{d.user}</Text>
              <Text style={styles.commentText}>{d.text}</Text>

              {/* ACTION ROW */}
              <View style={styles.actionRow}>
                <TouchableOpacity onPress={() => toggleLike(d.id)}>
                  <Ionicons
                    name={isLiked ? "heart" : "heart-outline"}
                    size={20}
                    color={isLiked ? "#ef4444" : "#64748b"}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.replyBtn}>Reply</Text>
                </TouchableOpacity>
              </View>

              {/* REPLIES */}
              {renderReplies(d.replies)}
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f8fafc" },

  header: {
    height: 56,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },

  image: { width: "100%", height: 260 },

  title: {
    fontSize: 22,
    fontWeight: "800",
    margin: 16,
    color: "#0f172a",
  },

  location: {
    marginHorizontal: 16,
    fontWeight: "600",
    color: "#475569",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 8,
    gap: 4,
  },

  ratingText: {
    marginLeft: 6,
    fontWeight: "700",
    color: "#0f172a",
  },

  chipRow: { marginTop: 12, paddingLeft: 16 },

  chip: {
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },

  chipText: { fontSize: 12, fontWeight: "600" },

  description: {
    margin: 16,
    lineHeight: 22,
    color: "#334155",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginHorizontal: 16,
    marginTop: 24,
  },

  noDiscussion: {
    marginHorizontal: 16,
    marginTop: 8,
    color: "#64748b",
  },

  commentCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
  },

  commentUser: { fontWeight: "700" },
  commentText: { marginTop: 4, color: "#374151" },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 8,
  },

  replyBtn: {
    color: "#2563eb",
    fontSize: 13,
    fontWeight: "600",
  },

  replyRow: { marginTop: 6 },
  replyUser: { fontSize: 13, fontWeight: "700" },
  replyText: { fontSize: 13, color: "#475569" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});