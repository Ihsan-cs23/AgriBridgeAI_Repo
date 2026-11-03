import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';

export default function AdminDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Manage users, orders, and platform activity.</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Platform Overview</Text>
        <Text style={styles.cardText}>Platform activity and management tools will appear here.</Text>
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
