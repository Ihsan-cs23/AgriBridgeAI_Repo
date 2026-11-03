
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function AuthHeader({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/agribridge-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 125,
    height: 100,
    marginBottom: 12,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
  },
});
