import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';
import Footer from './Footer';

const MenuScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState('Lunch');
  const [selectedRestriction, setSelectedRestriction] = useState('All');
  const [selectedDiningHall, setSelectedDiningHall] = useState('Casper');

  const menuSections = [
    {
      name: "Specials",
      items: [
        {
          name: "Chicken Tinga",
          rating: 3.5,
        },
        {
          name: "Tempura Shrimp",
          rating: 4.2,
        },
      ],
    },
    {
      name: "Everywhere",
      items: [
        {
          name: "Brown Rice Pilaf",
          rating: 3.5,
        },
        {
          name: "Taco Bar",
          rating: 4.0,
        },
        {
          name: "Chicken Soup",
          rating: 4.5,
        },
        {
          name: "Chick'n Tofu",
          rating: 2.5,
        },
      ],
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome5
          key={i}
          name="star"
          size={16}
          color={i < rating ? "#FD6030" : "gray"}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Menu</Text>

        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Menu - </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedMenu}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedMenu(itemValue)}
            >
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Brunch" value="Brunch" />
            </Picker>
          </View>
        </View>
        
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>My Restrictions - </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedRestriction}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedRestriction(itemValue)}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Gluten Free" value="Gluten Free" />
              <Picker.Item label="Vegan" value="Vegan" />
              <Picker.Item label="Vegetarian" value="Vegetarian" />
              <Picker.Item label="Halal" value="Halal" />
            </Picker>
          </View>
        </View>
        
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Dining Hall - </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDiningHall}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedDiningHall(itemValue)}
            >
              <Picker.Item label="Wilbur" value="Wilbur" />
              <Picker.Item label="Stern" value="Stern" />
              <Picker.Item label="Gerhard Casper" value="Casper" />
              <Picker.Item label="EVGR" value="EVGR" />
              <Picker.Item label="Arrillaga" value="Arrillaga" />
              <Picker.Item label="Branner" value="Branner" />
              <Picker.Item label="Florence Moore" value="Florence Moore" />
              <Picker.Item label="Lakeside" value="Lakeside" />
              <Picker.Item label="Ricker" value="Ricker" />
            </Picker>
          </View>
        </View>
        
        <ScrollView style={styles.menuList}>
          {menuSections.map((section, index) => (
            <View key={index}>
              <Text style={styles.sectionHeader}>{section.name}</Text>
              {section.items.map((item, idx) => (
                <View key={idx} style={styles.menuItem}>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>{item.name}</Text>
                    <Text style={styles.menuItemRating}>{item.rating.toFixed(1)}/5</Text>
                    <View style={styles.starsContainer}>{renderStars(item.rating)}</View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFF5EB',
  },
  container: {
    flex: 1,
    padding: 20,
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
  dropdownLabel: {
    fontSize: 16,
    fontFamily: "Regular",
  },
  pickerContainer: {
    backgroundColor: "#FFCD9D",
    borderRadius: 32,
    height: 50,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  picker: {
    flex: 1,
    height: 215,
    color: "#FD6030",
    paddingBottom: 100,
  },
  menuList: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: "Bold",
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5CC',
    borderRadius: 10,
    borderColor: '#FED6B0',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  menuItemRating: {
    color: 'gray',
    fontFamily: "Regular",
  },
  starsContainer: {
    flexDirection: 'row',
  },
});

export default MenuScreen;
