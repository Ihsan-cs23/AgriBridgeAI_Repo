import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConsumer } from '../../context/ConsumerContext';
import { PAYMENT_METHODS } from '../../data/consumerData';
import { formatPrice, palette, radius } from '../../theme/consumerTheme';
import { AppHeader, EmptyState, PriceSummary, PrimaryButton } from '../../components/consumer/Common';
import AddressModal from '../../components/consumer/AddressModal';

export default function CheckoutScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cartItems, subtotal, deliveryFee, total, addresses, selectedAddressId, placeOrder, showToast } = useConsumer();
  const [payment, setPayment] = useState('cod');
  const [addrOpen, setAddrOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const address = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const onPlace = () => {
    if (!cartItems.length || placing) return;
    if (!address) return showToast('Please add a delivery address', 'info');
    setPlacing(true);
    setTimeout(() => {
      const order = placeOrder({ paymentMethod: payment });
      setPlacing(false);
      showToast(`Order ${order.id} placed successfully`);
      // Reset so Back from the confirmation returns to Home, not the empty cart
      navigation.reset({ index: 1, routes: [{ name: 'Tabs' }, { name: 'DeliveryTracking', params: { orderId: order.id, placed: true } }] });
    }, 900);
  };

  if (!cartItems.length) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <AppHeader title="Checkout" onBack={() => navigation.goBack()} />
        <EmptyState icon="cart-outline" title="Nothing to check out" message="Add some produce to your cart first." actionLabel="Browse Products" onAction={() => navigation.navigate('Search')} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title="Checkout" onBack={() => navigation.goBack()} right={<Ionicons name="leaf" size={26} color={palette.primary} />} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View style={s.rowBetween}>
          <Text style={s.h}>Delivery Address</Text>
          <PrimaryButton title="Change" small variant="outline" onPress={() => setAddrOpen(true)} />
        </View>
        <View style={s.addr}>
          <Ionicons name="location" size={24} color={palette.primary} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            {address ? <Text style={s.addrLabel}>{address.label}</Text> : null}
            <Text style={s.addrText}>{address ? address.text : 'No address saved'}</Text>
          </View>
        </View>

        <Text style={[s.h, { marginTop: 22 }]}>Payment Method</Text>
        {PAYMENT_METHODS.map((m) => {
          const active = payment === m.id;
          return (
            <Pressable key={m.id} onPress={() => setPayment(m.id)} style={[s.pay, active && s.payActive]}>
              <Ionicons name={active ? 'radio-button-on' : 'radio-button-off'} size={22} color={active ? palette.primary : palette.textSecondary} />
              <Ionicons name={m.icon} size={22} color={palette.primaryDark} style={{ marginLeft: 14 }} />
              <Text style={s.payText}>{m.label}</Text>
            </Pressable>
          );
        })}

        <Text style={[s.h, { marginTop: 22 }]}>Order Summary</Text>
        {cartItems.map((i) => (
          <View key={i.productId} style={s.line}>
            <Text style={s.lineName} numberOfLines={1}>{i.product.name} × {i.qty}</Text>
            <Text style={s.lineVal}>{formatPrice(i.product.price * i.qty)}</Text>
          </View>
        ))}
        <PriceSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} style={{ marginTop: 10 }} />

        <View style={s.secure}>
          <Ionicons name="shield-checkmark" size={20} color={palette.primary} />
          <Text style={s.secureText}>Your order is secure and trusted</Text>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: insets.bottom + 12, borderTopWidth: 1, borderTopColor: palette.border }}>
        <PrimaryButton title={`Place Order • ${formatPrice(total)}`} onPress={onPlace} loading={placing} />
      </View>
      <AddressModal visible={addrOpen} onClose={() => setAddrOpen(false)} />
    </View>
  );
}

const s = StyleSheet.create({
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  h: { fontSize: 18, fontWeight: '800', color: palette.text, marginBottom: 10 },
  addr: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: radius.lg, backgroundColor: palette.backgroundAlt, borderWidth: 1, borderColor: palette.border },
  addrLabel: { fontSize: 14, fontWeight: '800', color: palette.text },
  addrText: { marginTop: 2, fontSize: 14, color: palette.textSecondary, lineHeight: 20 },
  pay: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: radius.md, borderWidth: 1, borderColor: palette.border, marginBottom: 10 },
  payActive: { borderColor: palette.primary, backgroundColor: palette.primaryLight },
  payText: { marginLeft: 12, fontSize: 15, fontWeight: '600', color: palette.text },
  line: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  lineName: { flex: 1, fontSize: 14, color: palette.textSecondary, marginRight: 10 },
  lineVal: { fontSize: 14, fontWeight: '600', color: palette.text },
  secure: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, padding: 12, borderRadius: radius.md, backgroundColor: palette.primaryLight },
  secureText: { marginLeft: 8, fontSize: 13.5, fontWeight: '600', color: palette.primaryDark }
});
