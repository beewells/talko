import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.smallText}>Stanford</Text>
      <Text style={styles.mainText}>Talko</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
    backgroundColor: '#FCD5AF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingTop: 45, // Adjust this value if you need more space for the status bar
  },
  smallText: {
    position: 'absolute',
    left: 20, // Adjust this value to move "Stanford" to the left
    fontSize: 14,
    color: '#F4400E',
    fontFamily: 'Regular',
    paddingTop: 45,
  },
  mainText: {
    fontSize: 35,
    color: '#F4400E',
    fontFamily: 'Modak',
    marginBottom: 5, // Adjust this value to reduce space underneath the text
  },
});

export default Header;

