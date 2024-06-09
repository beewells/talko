import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconContainer}>
        <FontAwesome5 name="home" size={24} color="grey" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')} style={styles.iconContainer}>
        <FontAwesome5 name="clipboard-list" size={24} color="grey" />
        <Text style={styles.iconText}>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconContainer, styles.addButtonContainer]}
        onPress={() => navigation.navigate('NewPost')}
      >
        <View style={styles.addButton}>
          <FontAwesome5 name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={styles.iconContainer}>
        <FontAwesome5 name="comment" size={24} color="grey" />
        <Text style={styles.iconText}>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconContainer}>
        <FontAwesome5 name="user" size={24} color="grey" />
        <Text style={styles.iconText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FCD5AF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#FED6B0',
    height: 70,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: 'grey',
    marginTop: 2,
  },
  addButtonContainer: {
    position: 'absolute',
    left: '48.5%',
    bottom: 20,
    transform: [{ translateX: -35 }],
  },
  addButton: {
    backgroundColor: '#FD6030',
    borderRadius: 50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default Footer;
