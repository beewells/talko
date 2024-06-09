import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding({ isSignUpVisible, closeModal }) {
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [bio, setBio] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');
  const [isOnboardingButtonEnabled, setIsOnboardingButtonEnabled] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setIsOnboardingButtonEnabled(username !== '' && imageUri !== null);
  }, [username, imageUri]);

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

  const completeOnboarding = () => {
    const user = {
      username,
      profileImage: imageUri,
      bio,
      reviews: 0,
      friends: 0,
    };
    navigation.navigate('Profile', { user });
    closeModal();
  };

  const isSignUpButtonEnabled = signUpEmail !== '' && signUpPassword !== '' && confirmPassword !== '';

  return (
    <Modal
      isVisible={isSignUpVisible}
      onSwipeComplete={() => closeModal('close')}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalView}>
        {onboardingStep === 1 ? (
          <>
            <Text style={styles.modalTitle}>Join Us!</Text>
            <Text style={styles.subtitle}>Create an account to get started.</Text>
            <TextInput
              style={[styles.input, signUpEmail && styles.inputFocused]}
              placeholder="Email"
              placeholderTextColor="#FD6030"
              onChangeText={setSignUpEmail}
              value={signUpEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="username"
            />
            <TextInput
              style={[styles.input, signUpPassword && styles.inputFocused]}
              placeholder="Password"
              placeholderTextColor="#FD6030"
              secureTextEntry
              onChangeText={setSignUpPassword}
              value={signUpPassword}
              textContentType="none"
              autoCompleteType="off"
            />
            <TextInput
              style={[styles.input, confirmPassword && styles.inputFocused]}
              placeholder="Confirm Password"
              placeholderTextColor="#FD6030"
              secureTextEntry
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              textContentType="none"
              autoCompleteType="off"
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            {rateLimitError ? <Text style={styles.errorText}>{rateLimitError}</Text> : null}
            <TouchableOpacity
              style={[styles.modalButton, !isSignUpButtonEnabled && { opacity: 0.5 }]}
              onPress={() => setOnboardingStep(2)}
              disabled={!isSignUpButtonEnabled}
            >
              <Text style={styles.modalButtonText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : onboardingStep === 2 ? (
          <>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity onPress={() => setOnboardingStep(1)} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Welcome!</Text>
            <Text style={styles.subtitle}>Pick your username and profile picture.</Text>
            <View style={styles.profilePicture}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={50} color="gray" />
                </View>
              )}
            </View>
            <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
              <Text style={styles.imagePickerText}>Pick an Image</Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.input, username && styles.inputFocused]}
              placeholder="Username"
              placeholderTextColor="#FD6030"
              onChangeText={setUsername}
              value={username}
              textContentType="username"
              autoCompleteType="off"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={[styles.modalButton, !isOnboardingButtonEnabled && { opacity: 0.5 }, isOnboardingButtonEnabled && { opacity: 1 }]}
              onPress={() => setOnboardingStep(3)}
              disabled={!isOnboardingButtonEnabled}
            >
              <Text style={styles.modalButtonText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity onPress={() => setOnboardingStep(2)} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Bio</Text>
            <Text style={styles.subtitle}>Tell us a bit about yourself.</Text>
            <View style={styles.bioContainer}>
              <TextInput
                style={[styles.input, bio && styles.inputFocused, styles.bioInput]}
                placeholder="Bio"
                placeholderTextColor="#FD6030"
                onChangeText={(text) => setBio(text.slice(0, 80))}
                value={bio}
                multiline={true}
                maxLength={80}
              />
              <Text style={styles.characterCount}>{bio.length}/80</Text>
            </View>
            <TouchableOpacity
              style={[styles.modalButton, !isOnboardingButtonEnabled && { opacity: 0.5 }]}
              onPress={completeOnboarding}
              disabled={!isOnboardingButtonEnabled}
            >
              <Text style={styles.modalButtonText}>Finish</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    width: '100%',
    height: '55%',
    backgroundColor: '#FFF0E0',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 35,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Regular',
    marginBottom: 20,
    alignSelf: 'flex-start',
    color: '#666',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 32,
    marginBottom: 15,
    paddingHorizontal: 30,
    fontFamily: 'Light',
    color: 'black',
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: '#ffc1a1',
  },
  modalButton: {
    backgroundColor: '#FD6030',
    borderRadius: 32,
    paddingHorizontal: 80,
    paddingVertical: 20,
    alignSelf: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Bold',
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD6030',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 32,
    marginBottom: 15,
  },
  imagePickerText: {
    color: 'white',
    fontFamily: 'Regular',
    fontSize: 18,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  backButtonContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#FD6030',
    borderRadius: 20,
    padding: 5,
  },
  profilePicture: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: -10,
  },
  bioContainer: {
    position: 'relative',
  },
  bioInput: {
    height: 150,
    textAlignVertical: 'top',
    padding: 15,
    fontSize: 16,
  },
  characterCount: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    color: '#666',
  },
});