import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';
import Footer from './Footer';

export default function NewPost({ route }) {
  const { user } = route.params || {};
  const [selectedDiningHall, setSelectedDiningHall] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    const newPost = {
      profileImage: user?.profileImage || "https://via.placeholder.com/40",
      username: user?.username || "Guest",
      subtitle: user?.bio || "This is a guest profile.",
      feedImage: imageUri || "https://via.placeholder.com/150",
      title,
      location: selectedDiningHall,
      description: review,
      rating,
      likes: 0,
      comments: 0,
    };

    navigation.navigate('Home', { newPost });
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>New Post</Text>

        <View style={styles.dropdownContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDiningHall}
              onValueChange={(itemValue) => setSelectedDiningHall(itemValue)}
              style={styles.picker}
              mode="dropdown" // Ensures the dropdown opens correctly on Android
            >
              <Picker.Item label="Select Dining Hall" value="" />
              <Picker.Item label="Lakeside" value="Lakeside" />
              <Picker.Item label="Ricker" value="Ricker" />
              <Picker.Item label="FloMo" value="FloMo" />
              <Picker.Item label="Arrillaga" value="Arrillaga" />
              <Picker.Item label="Wilbur" value="Wilbur" />
              <Picker.Item label="Casper" value="Casper" />
              <Picker.Item label="Stern" value="Stern" />
              <Picker.Item label="Branner" value="Branner" />
            </Picker>
            <Ionicons
              name="chevron-down"
              size={24}
              color="#FD6030"
              style={styles.dropdownIcon}
            />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleImagePicker}
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Ionicons name="image-outline" size={50} color="#FD6030" />
            )}
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.titleInput}
              placeholder="Insert Title"
              placeholderTextColor="#FD6030"
              onChangeText={setTitle}
              value={title}
            />
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < rating ? "star" : "star-outline"}
                  size={24}
                  color={index < rating ? "#FD6030" : "gray"}
                  onPress={() => setRating(index + 1)}
                />
              ))}
            </View>
          </View>

          <TextInput
            style={styles.reviewInput}
            placeholder="Type Your Review Here..."
            placeholderTextColor="#FD6030"
            multiline
            onChangeText={setReview}
            value={review}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "#FFF5EB",
  },
  container: {
    padding: 20,
    marginTop: -15,
  },
  header: {
    fontSize: 24,
    fontFamily: "Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: "#FFCD9D",
    borderRadius: 32,
    height: 50,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: -10,
  },
  picker: {
    flex: 1,
    height: Platform.OS === "android" ? 50 : undefined,
    color: "#FD6030",
  },
  dropdownIcon: {
    marginRight: 10,
  },
  contentContainer: {
    backgroundColor: "#FFCD9D",
    borderRadius: 40,
    padding: 20,
  },
  imageContainer: {
    backgroundColor: "#FFECEF",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
  },
  inputContainer: {
    backgroundColor: "#FFECEF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    marginTop: -10,
    width: 315,
  },
  titleInput: {
    fontSize: 18,
    fontFamily: "Regular",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  reviewInput: {
    backgroundColor: "#FFECEF",
    borderRadius: 16,
    height: 125,
    padding: 30,
    fontSize: 16,
    fontFamily: "Regular",
    marginBottom: 20,
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -10, 
  },
  postButton: {
    backgroundColor: "#FD6030",
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 32,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Regular",
    color: "white",
  },
});
