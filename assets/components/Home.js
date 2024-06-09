import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "./Footer";

const Home = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(32);
  const [comments, setComments] = useState(8);
  const [isReportVisible, setReportVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  const [feedItems, setFeedItems] = useState([
    {
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD_Qv266dCfV8ycWawhkFCczeU1YN0gOT4bg&s",
      username: "SCollins",
      subtitle: "Saucy",
      feedImage:
        "https://media.30seconds.com/tip_image/lg/Harissa-Chicken-Recipe-12152-aafe8d5a17-1646063271.jpg",
      title: "Harissa Chicken",
      location: "Lakeside",
      description:
        "The harissa chicken was cooked fine (similarly not dry or moist) and it had a decent flavor, the sauce helped. The Brussels sprouts weren’t great, they’re definitely better when roasted.",
      rating: 3,
      likes: 1,
      comments: 2,
      commentsList: [
        { id: 1, username: "steevie", profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFJ0ZLvVBKQq86XdPRiyBarPJnuQeWjIg3xQ&s", text: "They ran out of chicken by the time I got there at 7:30", liked: false },
        { id: 2, username: "isabellaNgu", profileImage: "https://pbs.twimg.com/media/GG9tjD3a0AAiJbp.jpg:large", text: "@steevie same at Stern", liked: false },
      ],
    },
    {
      profileImage: "https://i.pinimg.com/1200x/71/24/b4/7124b4b4b403715bdf38f08375824e1d.jpg",
      username: "Otterbottle",
      subtitle: "Yum!",
      feedImage: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mango-lassi_1-6049b30.jpg?quality=90&resize=440,400",
      title: "Mango Lassi",
      location: "Caspar",
      description: "It’s okay, but be warned it’s been out for a couple of hours now and has begun to harden. Mine was very thick.",
      rating: 3,
      likes: 2,
      comments: 0,
      commentsList: [],
    },
    {
      profileImage: "https://shopzoki.com/cdn/shop/files/StrawberryCowRugShopzoki_741fc696-1bc7-4b5a-b83e-1a085f66bfd7.jpg?v=1687277446",
      username: "twili",
      subtitle: "Edward <3",
      feedImage: "https://www.culinaryhill.com/wp-content/uploads/2023/05/Ice-Cream-Sundae-Bar-Culinary-Hill-LR-07-500x500.jpg",
      title: "Sundae Bar (whoop whoop)",
      location: "Wilbur",
      description: "Not a ton of options, but a great amount of candy! There’s still a lot left but a ~5 minute wait, I would definitely recommend it if anyone is in the mood.",
      rating: 4,
      likes: 4,
      comments: 4,
      commentsList: [
        { id: 1, username: "isabellaNgu", profileImage: "https://pbs.twimg.com/media/GG9tjD3a0AAiJbp.jpg:large", text: "Is it better than the usual softserve at lakeside or llaga", liked: false },
        { id: 2, username: "latteLiz", profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThBpHsmwzyEpKIULLfcgZ4_5N3a3LSjuIKOA&s", text: "@IsabellaNgu I’d say so, it’s more ben & jerry’s style lol. Better toppings too.", liked: true },
        { id: 3, username: "donkiJote", profileImage: "https://i.pinimg.com/736x/02/d5/d4/02d5d44558b049ae90364dcff3595744.jpg", text: "@latteLiz +1, lowkey is saving me from the trenches", liked: true },
        { id: 4, username: "isabellaNgu", profileImage: "https://pbs.twimg.com/media/GG9tjD3a0AAiJbp.jpg:large", text: "ty, i'll head there now", liked: false },
      ],
    },
  ]);
  
  useEffect(() => {
    if (route.params?.newPost) {
      setFeedItems((prevFeedItems) => [route.params.newPost, ...prevFeedItems]);
    }
  }, [route.params?.newPost]);

  const handleLikePress = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleFlagPress = () => {
    setReportVisible(true);
  };

  const submitReport = () => {
    setReportVisible(false);
    // Add functionality to submit the report
  };

  const handleItemPress = (item) => {
    navigation.navigate("FoodDetail", { item });
  };

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

  const filteredFeedItems = feedItems.filter((item) =>
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <FontAwesome5
            name="search"
            size={20}
            color="grey"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Location"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <Text style={styles.sectionTitle}>Popular</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollView}
        >
          <View style={styles.card}>
            <Image
              source={{ uri: "https://stanforddaily.com/wp-content/uploads/2021/10/Wilbur-Dining-Hall.jpeg" }}
              style={styles.image}
            />
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>4/5</Text>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Wilbur</Text>
              <View style={styles.cardSubtitleContainer}>
                <FontAwesome5 name="fire" size={12} color="#FF6347" />
                <Text style={styles.cardSubtitle}>Trending</Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Image
              source={{ uri: "https://fastly.4sqi.net/img/general/200x200/10094511_-SEnL7LXhydsKn2WzH-jwrf_3qyOeTuRdVf7xB68BEY.jpg" }}
              style={styles.image}
            />
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>3/5</Text>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Lakeside</Text>
              <View style={styles.cardSubtitleContainer}>
                <FontAwesome5 name="fire" size={12} color="#FF6347" />
                <Text style={styles.cardSubtitle}>Trending</Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Image
              source={{ uri: "https://stanforddaily.com/wp-content/uploads/2018/07/image1.jpg" }}
              style={styles.image}
            />
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>4/5</Text>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Arillaga</Text>
              <View style={styles.cardSubtitleContainer}>
                <FontAwesome5 name="fire" size={12} color="#FF6347" />
                <Text style={styles.cardSubtitle}>Trending</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <Text style={[styles.sectionTitle, styles.globalFeedTitle]}>
          Global Feed
        </Text>
        <ScrollView style={styles.globalFeedContainer}>
          {filteredFeedItems.map((feedItem, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleItemPress(feedItem)}
            >
              <View style={styles.feedItem}>
                <View style={styles.feedHeader}>
                  <Image
                    source={{ uri: feedItem.profileImage }}
                    style={styles.profileImage}
                  />
                  <View>
                    <Text style={styles.username}>{feedItem.username}</Text>
                    <Text style={styles.profileSubtitle}>
                      {feedItem.subtitle}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={handleFlagPress}
                    style={styles.flagIcon}
                  >
                    <FontAwesome5 name="flag" size={20} color="grey" />
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: feedItem.feedImage }}
                  style={styles.feedImage}
                />
                <View style={styles.feedTitleContainer}>
                  <Text style={styles.feedTitle}>{feedItem.title}</Text>
                  <View style={styles.starsContainer}>
                    {renderStars(feedItem.rating)}
                  </View>
                </View>
                <Text style={styles.feedLocation}>{feedItem.location}</Text>
                <Text style={styles.feedDescription}>
                  {feedItem.description}
                </Text>
                <View style={styles.feedFooter}>
                  <TouchableOpacity
                    onPress={handleLikePress}
                    style={styles.iconContainer}
                  >
                    <FontAwesome5 name="heart" size={20} color="grey" />
                    <Text style={styles.feedFooterText}>{feedItem.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconContainer}>
                    <FontAwesome5 name="comment" size={20} color="grey" />
                    <Text style={styles.feedFooterText}>
                      {feedItem.comments}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconContainer}>
                    <FontAwesome5 name="share" size={20} color="grey" />
                    <Text style={styles.feedFooterText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Modal isVisible={isReportVisible}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.modalTitle}>Report Content</Text>
              <Text style={styles.modalText}>
                Please provide the reason for reporting this content.
              </Text>
              <TextInput
                style={styles.reportInput}
                placeholder="Enter your report here"
                multiline
              />
            </ScrollView>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitReport}
            >
              <Text style={styles.submitButtonText}>Submit Report</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFF5EB",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF5EB",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 32,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    padding: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 15,
  },
  globalFeedTitle: {
    marginTop: -350,
  },
  horizontalScrollView: {
    paddingLeft: 20,
  },
  card: {
    backgroundColor: "#FFE5CC",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#FED6B0",
    width: 180,
    height: 150,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 90,
    borderRadius: 10,
  },
  ratingContainer: {
    position: "absolute",
    bottom: 32,
    right: 20,
    backgroundColor: "#f4400e",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "white",
    flexDirection: "row",
  },
  rating: {
    color: "white",
    fontSize: 12,
  },
  cardTextContainer: {
    alignItems: "flex-start",
    marginTop: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  cardSubtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "gray",
    marginLeft: 5,
    fontFamily: "Inter-Light",
  },
  verticalScrollView: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  globalFeedContainer: {
    flex: 1,
    marginHorizontal: 20, // Add margin to adjust the feedItem container
  },
  feedItem: {
    backgroundColor: "#FFE5CC",
    borderRadius: 10,
    borderColor: "#FED6B0",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
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
  flagIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalView: {
    backgroundColor: "#FFF1DF",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    marginBottom: 20,
    textAlign: "center",
  },
  reportInput: {
    borderWidth: 0,
    backgroundColor: "white",
    borderRadius: 32,
    padding: 10,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    marginBottom: 10,
    paddingLeft: 10,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FD6030",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 32,
    marginTop: 10,
  },
  submitButtonText: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "white",
  },
});

export default Home;
