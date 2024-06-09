import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "./Footer";

export default function Profile() {
  const navigation = useNavigation();
  const route = useRoute();

  const defaultUser = {
    username: "Guest",
    profileImage: "https://via.placeholder.com/150",
    bio: "This is a guest profile.",
    reviews: 0,
    friends: 0,
  };

  const [user, setUser] = useState(defaultUser);
  const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      title: "Vegetarian Sushi Rolls",
      diningHall: "Wilbur",
      description:
        "The vegetarian sushi rolls were surprisingly good! Fresh ingredients and a nice balance of flavors.",
      imageUrl: "https://stanforddaily.com/wp-content/uploads/2022/04/Image-from-iOS-1.jpg",
      rating: 4,
      likes: 2,
      comments: 1,
    },
    {
      id: 1,
      title: "Chicken Alfredo Pasta",
      diningHall: "Caspar",
      description:
        "The chicken alfredo pasta was just okay. The sauce was a bit too thick and lacked flavor.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTYBsGdW5hJAgsDEWJOiDIXYOalEaeu_XrHg&s",
      rating: 2,
      likes: 1,
      comments: 3,
    },
  ]);

  useEffect(() => {
    if (route.params?.user) {
      setUser(route.params.user);
    }
    if (route.params?.newPost) {
      setUserPosts([route.params.newPost, ...userPosts]);
    }
  }, [route.params]);

  user.reviews = userPosts.length;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome5
          key={i}
          name="star"
          size={16}
          color={i < rating ? "#FF6347" : "gray"}
        />
      );
    }
    return stars;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>{user.reviews} Reviews</Text>
              <Text style={styles.statsText}>{user.friends} Friends</Text>
            </View>
          </View>
          <View style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="grey" />
          </View>
        </View>

        <Text style={styles.postsHeader}>Posts</Text>
        <ScrollView>
          {userPosts.map((post, index) => (
            <View key={index} style={styles.postContainer}>
              <View style={styles.postHeader}>
                <Image
                  source={{ uri: user.profileImage }}
                  style={styles.postProfileImage}
                />
                <View>
                  <Text style={styles.postUsername}>{user.username}</Text>
                  <Text style={styles.bio}>{user.bio}</Text>
                </View>
              </View>
              <Image
                source={{ uri: post.feedImage }}
                style={styles.postImage}
              />
              <View style={styles.postContent}>
                <View style={styles.postTitleContainer}>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <View style={styles.starsContainer}>
                    {renderStars(post.rating)}
                  </View>
                </View>
                <Text style={styles.postDiningHall}>{post.location}</Text>
                <Text style={styles.postDescription}>{post.description}</Text>
              </View>
              <View style={styles.postFooter}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="heart" size={20} color="grey" />
                  <Text style={styles.iconText}>{post.likes}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="comment" size={20} color="grey" />
                  <Text style={styles.iconText}>{post.comments}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="share" size={20} color="grey" />
                  <Text style={styles.iconText}>Share</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5EB",
    padding: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontFamily: "Bold",
  },
  bio: {
    fontSize: 16,
    fontFamily: "Regular",
    color: "gray",
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  statsText: {
    fontSize: 14,
    fontFamily: "Regular",
    marginRight: 20,
  },
  settingsButton: {
    padding: 10,
  },
  postsHeader: {
    fontSize: 20,
    fontFamily: "Bold",
    marginBottom: 10,
  },
  postContainer: {
    backgroundColor: "#FFE5CC",
    borderRadius: 10,
    borderColor: "#FED6B0",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  postProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUsername: {
    fontFamily: "Bold",
  },
  postDiningHall: {
    fontFamily: "Regular",
    color: "gray",
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  postContent: {
    marginBottom: 10,
  },
  postTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postTitle: {
    fontFamily: "Bold",
    fontSize: 16,
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: "row",
  },
  postDescription: {
    fontFamily: "Regular",
    fontSize: 14,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  iconText: {
    marginLeft: 5,
    fontFamily: "Regular",
  },
});
