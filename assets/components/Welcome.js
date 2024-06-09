import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

export default function Welcome() {
  const [isGuidelinesVisible, setGuidelinesVisible] = useState(false);
  const [guidelinesAcknowledged, setGuidelinesAcknowledged] = useState(false);

  const navigation = useNavigation();

  const handleContinuePress = () => {
    setGuidelinesVisible(true);
  };

  const acknowledgeGuidelines = () => {
    setGuidelinesAcknowledged(true);
    setGuidelinesVisible(false);
    navigation.navigate('Home');
  };

  return (
    <LinearGradient
      colors={['#FA7762', '#FAA93B', '#FAD01C']}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome to Talko!</Text>
      <Text style={styles.subtitle}>The dish on on-campus dining</Text>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
        <Text style={styles.continueButtonText}>Continue to Home</Text>
      </TouchableOpacity>

      <Modal isVisible={isGuidelinesVisible}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalTitle}>Community Guidelines</Text>
            <Text style={styles.modalText}>
              Welcome to Talko! Before you go, we know that people won’t always agree, but we expect everyone on Talko to treat one another and the platform with honesty and respect. We’ve put together these general guidelines to help set the tone for discourse on Talko.
            </Text>

            <Text style={styles.guidelineHeader}>General Guidelines</Text>
            <Text style={styles.guidelineSubheader}>Relevance</Text>
            <Text style={styles.guidelineText}>
              Please make sure your contributions are appropriate to the feed and kept solely to the reviewing of food for the relevant time interval. For example, reviews aren’t the place for rants about political ideologies, opinions on a poster’s food choice, a dining hall’s employment practices, extraordinary circumstances, or other matters that don’t address the core of the consumer experience: food. Food-related rationals and justifications must be included in a review.
            </Text>

            <Text style={styles.guidelineSubheader}>Interactions</Text>
            <Text style={styles.guidelineText}>
              Talko allows for live communications between users in the Feed through commenting. Please do not use this feature to harass other users in any way. Providing unsolicited food, body, or health-related advice to others is prohibited. No specific nutritional content (such as how many calories, grams of protein, etc.) can be included in a post, unless this dietary information is explicitly provided by the school and is fact-checked.
            </Text>

            <Text style={styles.guidelineSubheader}>Inappropriate Content</Text>
            <Text style={styles.guidelineText}>
              Colorful language is fine, but there’s no place for threats, harassment, body shaming, lewdness, hate speech, or other displays of bigotry. Inappropriate photos or text will be taken down with a warning, followed by permanent suspension.
            </Text>

            <Text style={styles.guidelineSubheader}>Conflicts of Interest</Text>
            <Text style={styles.guidelineText}>
              Your contributions to Talko should be unbiased and objective. For example, you shouldn’t write reviews based on the location of the dining hall or opinions about the staff. Personal opinions of anything other than the food you consumed are not allowed. To mitigate rivalries between universities to affect reviews, only those with a school’s .edu emails can have access to the university-specific Talko community.
            </Text>

            <Text style={styles.guidelineSubheader}>Privacy</Text>
            <Text style={styles.guidelineText}>
              Don’t publicize people’s private information. For instance, please don’t post close-up photos or videos of other students or staff without their permission, and don’t post other people’s full names unless you’re referring to someone who is commonly referred to by their full name.
            </Text>

            <Text style={styles.guidelineSubheader}>Identity</Text>
            <Text style={styles.guidelineText}>
              You don’t have to use your real name in Talko, but do not impersonate an individual or entity in a misleading or deceptive manner.
            </Text>

            <Text style={styles.guidelineSubheader}>Promotional Content</Text>
            <Text style={styles.guidelineText}>
              Don’t post promotional material unless it’s in connection with a dining hall. Keep the site useful for consumers, not overrun with noise not relevant to dining halls.
            </Text>

            <Text style={styles.guidelineSubheader}>Post your own content</Text>
            <Text style={styles.guidelineText}>
              Don’t swipe content from other sites, students, or businesses. Write your own ideas and only share your own photos and commentary to ensure honest opinions and imagery.
            </Text>

            <Text style={styles.guidelineSubheader}>Keep it legal</Text>
            <Text style={styles.guidelineText}>
              Avoid posting illegal content or soliciting or facilitating illegal or prohibited transactions.
            </Text>

            <Text style={styles.guidelineSubheader}>Enforcement</Text>
            <Text style={styles.guidelineText}>
              We have a variety of ways of enforcing our rules, including, but not limited to:
              - Warning (Message explaining offense)
              - Temporary or permanent suspension of accounts
              - Removal of privileges from, or adding restrictions to, accounts (e.g. removing commenting)
              - Removal of content
              - I.P. Banning of Talko
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.acknowledgeButton} onPress={acknowledgeGuidelines}>
            <Text style={styles.acknowledgeButtonText}>I Acknowledge</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Modak',
    fontSize: 60,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Regular',
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  continueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD6030',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 32,
  },
  continueButtonText: {
    fontFamily: 'Regular',
    fontSize: 18,
    color: 'white',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Regular',
    marginBottom: 20,
  },
  guidelineHeader: {
    fontSize: 20,
    fontFamily: 'Bold',
    marginTop: 10,
    marginBottom: 5,
  },
  guidelineSubheader: {
    fontSize: 18,
    fontFamily: 'Bold',
    marginTop: 10,
    marginBottom: 5,
  },
  guidelineText: {
    fontSize: 16,
    fontFamily: 'Regular',
    marginBottom: 10,
  },
  acknowledgeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD6030',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 32,
    marginTop: 20,
  },
  acknowledgeButtonText: {
    fontFamily: 'Bold',
    fontSize: 18,
    color: 'white',
  },
});
