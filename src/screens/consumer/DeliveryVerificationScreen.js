import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useConsumer } from '../../context/ConsumerContext';
import { palette, radius } from '../../theme/consumerTheme';
import { AppHeader, EmptyState, PrimaryButton } from '../../components/consumer/Common';

/** The rider shows/asks for a 4-digit code; the customer enters it to confirm receipt. */
export default function DeliveryVerificationScreen({ navigation, route }) {
  const { orders, confirmDelivery, showToast } = useConsumer();
  const order = orders.find((o) => o.id === route.params?.orderId);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!order) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <AppHeader title="Verify Delivery" onBack={() => navigation.goBack()} />
        <EmptyState title="Order not found" />
      </View>
    );
  }

  const verify = () => {
    if (code === order.verificationCode) {
      confirmDelivery(order.id);
      showToast('Delivery confirmed. Thank you!');
      navigation.goBack();
    } else {
      setError('That code does not match. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title="Verify Delivery" onBack={() => navigation.goBack()} />
      <View style={s.body}>
        <View style={s.icon}><Ionicons name="key" size={38} color={palette.primary} /></View>
        <Text style={s.title}>Enter delivery code</Text>
        <Text style={s.text}>Enter the 4-digit code from your delivery partner to confirm you received order {order.id}.</Text>
        <TextInput
          value={code} onChangeText={(t) => { setCode(t.replace(/\D/g, '').slice(0, 4)); setError(''); }}
          keyboardType="number-pad" maxLength={4} placeholder="••••" placeholderTextColor={palette.border}
          style={[s.input, !!error && { borderColor: palette.error }]}
        />
        {error ? <Text style={s.error}>{error}</Text> : null}
        <PrimaryButton title="Verify & Confirm" onPress={verify} disabled={code.length !== 4} style={{ alignSelf: 'stretch', marginTop: 20 }} />
        <Text style={s.demo}>Demo code for this order: {order.verificationCode}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  body: { flex: 1, alignItems: 'center', padding: 24, paddingTop: 40 },
  icon: { width: 88, height: 88, borderRadius: 44, backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  title: { marginTop: 18, fontSize: 22, fontWeight: '800', color: palette.text },
  text: { marginTop: 8, textAlign: 'center', fontSize: 14, lineHeight: 20, color: palette.textSecondary },
  input: { marginTop: 26, width: 200, textAlign: 'center', fontSize: 34, letterSpacing: 12, fontWeight: '800', color: palette.text, borderWidth: 2, borderColor: palette.primary, borderRadius: radius.lg, paddingVertical: 12, backgroundColor: palette.backgroundAlt },
  error: { marginTop: 10, color: palette.error, fontSize: 13, fontWeight: '600' },
  demo: { marginTop: 22, fontSize: 12.5, color: palette.textSecondary }
});
