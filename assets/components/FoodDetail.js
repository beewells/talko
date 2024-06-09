import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "./Footer";

const FoodDetail = ({ route }) => {
  const { item } = route.params;
  const [comment, setComment] = useState("");
  const [inputFocus, setInputFocus] = useState("");
  const [comments, setComments] = useState(item.commentsList || []);
  const navigation = useNavigation();

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        username: "You",
        profileImage: "https://via.placeholder.com/40",
        text: comment,
        liked: false,
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setComment("");
    }
  };

  const handleLikeComment = (id) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, liked: !comment.liked };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.feedItem}>
        <View style={styles.feedHeader}>
          <Image
            source={{ uri: item.profileImage }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.profileSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
        <Image source={{ uri: item.feedImage }} style={styles.feedImage} />
        <View style={styles.feedTitleContainer}>
          <Text style={styles.feedTitle}>{item.title}</Text>
          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }).map((_, i) => (
              <FontAwesome5
                key={i}
                name="star"
                size={16}
                color={i < item.rating ? "#FF6347" : "gray"}
              />
            ))}
          </View>
        </View>
        <Text style={styles.feedLocation}>{item.location}</Text>
        <Text style={styles.feedDescription}>{item.description}</Text>
        <View style={styles.feedFooter}>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="heart" size={20} color="grey" />
            <Text style={styles.feedFooterText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="comment" size={20} color="grey" />
            <Text style={styles.feedFooterText}>{comments.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="share" size={20} color="grey" />
            <Text style={styles.feedFooterText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.commentSection}>
        <Text style={styles.commentHeader}>Comments</Text>
        <ScrollView style={styles.commentScrollView}>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentContainer}>
              <Image
                source={{ uri: comment.profileImage }}
                style={styles.commentProfileImage}
              />
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentUsername}>{comment.username}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleLikeComment(comment.id)}
                style={styles.likeComment}
              >
                <FontAwesome5
                  name="heart"
                  size={14}
                  color={comment.liked ? "red" : "grey"}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={[
            styles.commentInput,
            inputFocus === "comment" && styles.inputFocused,
          ]}
          placeholder="Leave a comment"
          placeholderTextColor="#FD6030"
          onFocus={() => setInputFocus("comment")}
          onBlur={() => setInputFocus("")}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={[
            styles.commentButton,
            comment.trim() === "" && { opacity: 0.5 },
          ]}
          onPress={handleCommentSubmit}
          disabled={comment.trim() === ""}
        >
          <Text style={styles.commentButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5EB",
  },
  backButtonContainer: {
    alignItems: "flex-start",
    margin: 10,
  },
  backButton: {
    backgroundColor: "#FD6030",
    borderRadius: 20,
    padding: 5,
  },
  feedItem: {
    backgroundColor: "#FFE5CC",
    borderRadius: 10,
    borderColor: "#FED6B0",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    alignSelf: "center",
    width: "90%",
  },
  feedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },
  profileSubtitle: {
    color: "gray",
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  feedImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  feedTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feedTitle: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  feedLocation: {
    color: "gray",
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Inter-Regular",
  },
  feedDescription: {
    marginBottom: 10,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  feedFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  feedFooterText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  commentSection: {
    padding: 10,
    backgroundColor: "#FFF5EB",
    width: "90%",
    alignSelf: "center",
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
    marginBottom: 10,
  },
  commentScrollView: {
    maxHeight: 140, // Adjust based on your preference
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFE5CC",
    borderRadius: 10,
    borderColor: "#FED6B0",
    borderWidth: 1,
    padding: 10,
    height: 60,
  },
  commentProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },
  commentText: {
    fontFamily: "Inter-Regular",
  },
  likeComment: {
    marginLeft: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
    marginHorizontal: 30,
    marginBottom: 20, 
  },
  commentInput: {
    flex: 1,
    height: 42,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 32,
    paddingHorizontal: 20,
    fontFamily: "Regular",
    color: "black",
    marginRight: 10,
    borderColor: "transparent",
  },
  inputFocused: {
    borderColor: "#Ffc1a1",
  },
  commentButton: {
    backgroundColor: "#FD6030",
    borderRadius: 32,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  commentButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
});

export default FoodDetail;
