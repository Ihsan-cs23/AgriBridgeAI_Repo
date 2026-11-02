
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

export default function App() {

  return (
    <View style={styles.container}>

      {/* AgriBridge AI Logo */}
      <Image
        source={require('./assets/images/agribridge-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Welcome Heading */}
      <Text style={styles.title}>
        Welcome to AgriBridge AI
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Smart Agriculture Mobile Application
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Welcome to AgriBridge AI!')}
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F8F2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  logo: {
    width: 280,
    height: 280,
    marginBottom: 20
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#228B22',
    marginBottom: 12,
    textAlign: 'center'
  },

  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    textAlign: 'center'
  },

  button: {
    backgroundColor: '#228B22',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }

});
