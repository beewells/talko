import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { supabase } from './supabaseClient';
import Onboarding from './Onboarding';
import { useNavigation } from '@react-navigation/native';

export default function TitleScreen() {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  const [inputFocus, setInputFocus] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigation = useNavigation();

  const handleLoginPress = () => {
    setLoginVisible(true);
  };

  const handleSignUpPress = () => {
    setSignUpVisible(true);
  };

  const closeModal = async (type) => {
    if (type === 'login') {
      const { error } = await supabase.auth.signIn({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) alert(error.message);
      else {
        setLoginVisible(false);
        navigation.navigate('Home'); // Navigate to Home screen after login
      }
    } else {
      setLoginVisible(false);
      setSignUpVisible(false);
      if (type === 'signUp') {
        navigation.navigate('Welcome'); // Navigate to Welcome screen after sign up
      }
    }
  };

  const isLoginButtonEnabled = loginEmail !== '' && loginPassword !== '';

  return (
    <LinearGradient
      colors={['#FAD01C', '#FAA93B', '#FA7762']}
      style={styles.container}
    >
      <Text style={styles.title}> Talko </Text>
      <StatusBar style="auto" />

      <TouchableOpacity style={styles.logInButton} onPress={handleLoginPress}>
        <Text style={styles.logInText}> Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
        <Text style={styles.signUpText}> Sign Up</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isLoginVisible}
        onSwipeComplete={() => closeModal('close')}
        swipeDirection="down"
        style={styles.modal}
        backdropOpacity={0}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Log in to continue your journey.</Text>
          <TextInput
            style={[styles.input, inputFocus === 'emailLogin' && styles.inputFocused]}
            placeholder="Email"
            placeholderTextColor="#FD6030"
            onFocus={() => setInputFocus('emailLogin')}
            onBlur={() => setInputFocus('')}
            onChangeText={setLoginEmail}
            value={loginEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="username"
          />
          <TextInput
            style={[styles.input, inputFocus === 'passwordLogin' && styles.inputFocused]}
            placeholder="Password"
            placeholderTextColor="#FD6030"
            secureTextEntry
            onFocus={() => setInputFocus('passwordLogin')}
            onBlur={() => setInputFocus('')}
            onChangeText={setLoginPassword}
            value={loginPassword}
            textContentType="none"
            autoCompleteType="off"
          />
          <TouchableOpacity
            style={[
              styles.modalButton,
              !isLoginButtonEnabled && { opacity: 0.5 },
            ]}
            onPress={() => closeModal('login')}
            disabled={!isLoginButtonEnabled}
          >
            <Text style={styles.modalButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Onboarding isSignUpVisible={isSignUpVisible} closeModal={() => closeModal('signUp')} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontFamily: 'Modak',
    fontSize: 108,
    color: 'white',
    marginTop: -20,
    marginBottom: 30,
  },
  logInButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD6030',
    paddingHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 32,
  },
  logInText: {
    fontFamily: 'Regular',
    fontSize: 18,
    color: 'white',
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFECEF',
    paddingHorizontal: 75,
    paddingVertical: 20,
    borderRadius: 32,
  },
  signUpText: {
    fontFamily: 'Regular',
    fontSize: 18,
    color: 'black',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0, // This ensures the modal expands to the edges of the screen
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
    backgroundColor: 'white', // Stronger peach color
    borderWidth: 2,
    borderRadius: 32,
    marginBottom: 15,
    paddingHorizontal: 30,
    fontFamily: 'Light', // Use Inter font for input text
    color: 'black', // Input text color
    borderColor: 'transparent', // Hide border when not focused
  },
  inputFocused: {
    borderColor: '#Ffc1a1', // Change border color when input is focused
  },
  modalButton: {
    backgroundColor: '#FD6030',
    borderRadius: 32, // Match button style with title screen buttons
    paddingHorizontal: 80,
    paddingVertical: 20,
    alignSelf: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Bold', // Use Inter font for button text
  },
});
