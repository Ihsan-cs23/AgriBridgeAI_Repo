
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

import colors from '../../theme/colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.background}>
        <View style={styles.overlay} />

        <View style={styles.content}>
          <Image
            source={require('../../../assets/images/agribridge-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.brand}>AgriBridge AI</Text>

          <Text style={styles.title}>
            Smart Agriculture,{'\n'}Better Future
          </Text>

          <Text style={styles.description}>
            Empowering farmers with AI-powered disease detection
            and smart delivery verification.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('RoleSelection')}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomDecoration}>
                <View style={styles.hillOne} />
                <View style={styles.hillTwo} />
                <View style={styles.hillThree} />
              </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.62)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 115,
  },
  logo: {
    width: 175,
    height: 145,
  },
  brand: {
    fontSize: 30,
    fontWeight: '900',
    color: '#174B30',
    marginBottom: 22,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#174B30',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: '#34483A',
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 310,
    marginBottom: 35,
  },
  button: {
    width: '100%',
    maxWidth: 320,
    height: 55,
    backgroundColor: '#176B43',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: -100,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  arrow: {
    position: 'absolute',
    right: 23,
    color: '#FFFFFF',
    fontSize: 22,
  },
  bottomDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    overflow: 'hidden',
  },

  hillOne: {
    position: 'absolute',
    width: '120%',
    height: 90,
    left: '-10%',
    bottom: -38,
    borderRadius: 100,
    backgroundColor: '#b0ec94',
  },

  hillTwo: {
    position: 'absolute',
    width: '120%',
    height: 85,
    left: '-10%',
    bottom: -50,
    borderRadius: 100,
    backgroundColor: '#66dd3e',
  },

  hillThree: {
    position: 'absolute',
    width: '120%',
    height: 65,
    left: '-10%',
    bottom: -47,
    borderRadius: 100,
    backgroundColor: '#0f5c37',
  },
});
