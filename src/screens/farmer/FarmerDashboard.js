import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';

export default function FarmerDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Farmer Dashboard</Text>
      <Text style={styles.subtitle}>Monitor crops and manage disease detection.</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Disease Detection</Text>
        <Text style={styles.cardText}>Scan a crop to identify possible diseases with AI.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 22, backgroundColor: colors.background },
  title: { marginTop: 24, color: colors.primaryDark, fontSize: 28, fontWeight: '800' },
  subtitle: { marginTop: 8, color: colors.textSecondary, fontSize: 15 },
  card: {
    marginTop: 22,
    padding: 18,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  cardText: { marginTop: 8, color: colors.textSecondary, fontSize: 14, lineHeight: 20 }
});
