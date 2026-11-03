
import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';

import colors from '../../theme/colors';

export default function SplashScreen({ navigation }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(25)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),

      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();

    // App name and tagline animation
    Animated.sequence([
      Animated.delay(450),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),

        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Loading progress animation
    Animated.timing(progress, {
      toValue: 1,
      duration: 2800,
      useNativeDriver: true,
    }).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#F5F8F2"
        barStyle="dark-content"
      />

      {/* Decorative background circles */}
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />
      <View style={styles.circleThree} />

      {/* Main logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <View style={styles.logoFrame}>
          <Image
            source={require('../../../assets/images/Vibrant Splashing Fresh Vegetable Salad.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
      </Animated.View>

      {/* App title and tagline */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        <Text style={styles.appName}>
          AgriBridge <Text style={styles.aiText}>AI</Text>
        </Text>

        <Text style={styles.tagline}>
          Smart Agriculture, Better Future
        </Text>

        <Text style={styles.description}>
          Empowering agriculture through intelligent technology.
        </Text>
      </Animated.View>

      {/* Loading progress bar */}
      <View style={styles.loadingContainer}>
        <View style={styles.progressBackground}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                transform: [{ scaleX: progress }],
              },
            ]}
          />
        </View>

        <Text style={styles.loadingText}>
          Growing a smarter future...
        </Text>
      </View>

      {/* Bottom decoration */}
      <View style={styles.bottomDecoration}>
        <View style={styles.hillOne} />
        <View style={styles.hillTwo} />
        <View style={styles.hillThree} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  circleOne: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#224e0a',
    top: -100,
    right: -100,
  },

  circleTwo: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#53ec0c',
    bottom: 90,
    left: -90,
    opacity: 0.65,
  },

  circleThree: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#9ed370',
    top: 100,
    left: -50,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  logoFrame: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    backgroundColor: '#E8F4E1',
  },

  logo: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  appName: {
    fontSize: 34,
    fontWeight: '900',
    color: '#174B30',
    letterSpacing: -1,
  },

  aiText: {
    color: '#5d9e2c',
  },

  tagline: {
    fontSize: 16,
    fontWeight: '700',
    color: '#176B43',
    marginTop: 10,
    textAlign: 'center',
  },

  description: {
    fontSize: 12,
    color: '#718071',
    marginTop: 12,
    textAlign: 'center',
  },

  loadingContainer: {
    position: 'absolute',
    bottom: 105,
    width: '65%',
    alignItems: 'center',
  },

  progressBackground: {
    width: '100%',
    height: 5,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#176B43',
    borderRadius: 10,
    transformOrigin: 'left',
  },

  loadingText: {
    fontSize: 11,
    color: '#6B806E',
    marginTop: 12,
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
    bottom: -58,
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
    backgroundColor: '#6eba54',
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
