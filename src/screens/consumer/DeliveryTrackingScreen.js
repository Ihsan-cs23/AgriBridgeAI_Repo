import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { orderStatus, useConsumer } from '../../context/ConsumerContext';
import { PAYMENT_METHODS, getProduct } from '../../data/consumerData';
import { formatDateTime, formatPrice, palette, radius, shadow } from '../../theme/consumerTheme';
import { AppHeader, EmptyState, PriceSummary, PrimaryButton, SafeImage } from '../../components/consumer/Common';
import { DeliveryProgressTracker, OrderStatusBadge } from '../../components/consumer/OrderParts';

const MESSAGES = [
  ['checkmark-circle', 'Order confirmed', 'The farmer has received your order.'],
  ['nutrition', 'Preparing your produce', 'Your fresh items are being picked and packed.'],
  ['bicycle', 'Out for delivery', 'Your rider is on the way — estimated 30 minutes.'],
  ['gift', 'Delivered', 'Enjoy your fresh produce!']
];

/** Doubles as the order confirmation, order details, and tracking screen. Params: { orderId, placed } */
export default function DeliveryTrackingScreen({ navigation, route }) {
  const { orders, advanceOrder, cancelOrder } = useConsumer();
  const order = orders.find((o) => o.id === route.params?.orderId);
  const back = () => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Tabs'));

  if (!order) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <AppHeader title="Order Details" onBack={back} />
        <EmptyState icon="cube-outline" title="Order not found" actionLabel="My Orders" onAction={() => navigation.navigate('Tabs', { screen: 'Orders' })} />
      </View>
    );
  }

  const status = orderStatus(order);
  const [icon, title, text] = order.cancelled ? ['close-circle', 'Order cancelled', 'This order was cancelled.'] : MESSAGES[order.step];
  const pay = PAYMENT_METHODS.find((m) => m.id === order.paymentMethod);
  const active = !order.cancelled && order.step < 3;

  const confirmCancel = () =>
    Alert.alert('Cancel order?', `Cancel ${order.id}? This cannot be undone.`, [
      { text: 'Keep Order', style: 'cancel' },
      { text: 'Cancel Order', style: 'destructive', onPress: () => cancelOrder(order.id) }
    ]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title={order.id} onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {route.params?.placed ? (
          <View style={s.success}>
            <Ionicons name="checkmark-circle" size={30} color="#fff" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={s.successTitle}>Order placed successfully!</Text>
              <Text style={s.successText}>Thank you for supporting local farmers.</Text>
            </View>
          </View>
        ) : null}

        <View style={s.card}>
          <View style={s.rowBetween}>
            <Text style={s.date}>{formatDateTime(order.createdAt)}</Text>
            <OrderStatusBadge status={status} />
          </View>
          <View style={s.statusBox}>
            <View style={s.statusIcon}><Ionicons name={icon} size={26} color={order.cancelled ? palette.error : palette.primary} /></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={s.statusTitle}>{title}</Text>
              <Text style={s.statusText}>{text}</Text>
            </View>
          </View>
          <DeliveryProgressTracker step={order.step} cancelled={order.cancelled} />
        </View>

        <Text style={s.h}>Items</Text>
        {order.items.map((it) => {
          const p = getProduct(it.productId);
          return (
            <View key={it.productId} style={s.item}>
              <SafeImage source={p?.image} style={s.img} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={s.itemName}>{p?.name}</Text>
                <Text style={s.date}>{formatPrice(it.price)} × {it.qty}</Text>
              </View>
              <Text style={s.itemTotal}>{formatPrice(it.price * it.qty)}</Text>
            </View>
          );
        })}

        <Text style={s.h}>Delivery & Payment</Text>
        <View style={s.card}>
          <View style={s.infoRow}><Ionicons name="location" size={20} color={palette.primary} /><Text style={s.infoText}>{order.address}</Text></View>
          <View style={s.infoRow}><Ionicons name={pay?.icon || 'cash-outline'} size={20} color={palette.primary} /><Text style={s.infoText}>{pay?.label || 'Cash on Delivery'}</Text></View>
        </View>

        <PriceSummary subtotal={order.subtotal} deliveryFee={order.deliveryFee} total={order.total} style={{ marginTop: 14 }} />

        {order.step === 2 && !order.cancelled ? (
          <PrimaryButton title="Confirm Delivery" icon="key-outline" onPress={() => navigation.navigate('DeliveryVerification', { orderId: order.id })} style={{ marginTop: 16 }} />
        ) : null}
        {!order.cancelled && order.step < 2 ? (
          <PrimaryButton title="Cancel Order" variant="danger" onPress={confirmCancel} style={{ marginTop: 16 }} />
        ) : null}
        {active ? (
          <PrimaryButton title="Simulate next status (demo)" variant="soft" small onPress={() => advanceOrder(order.id)} style={{ marginTop: 12 }} />
        ) : null}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  success: { flexDirection: 'row', alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.lg, padding: 16, marginBottom: 14 },
  successTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  successText: { color: '#E8F8DF', fontSize: 13, marginTop: 2 },
  card: { backgroundColor: '#fff', borderRadius: radius.lg, padding: 14, borderWidth: 1, borderColor: palette.border, ...shadow },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 13, color: palette.textSecondary },
  statusBox: { flexDirection: 'row', alignItems: 'center', marginVertical: 14 },
  statusIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  statusTitle: { fontSize: 16, fontWeight: '800', color: palette.text },
  statusText: { marginTop: 2, fontSize: 13, color: palette.textSecondary, lineHeight: 18 },
  h: { fontSize: 17, fontWeight: '800', color: palette.text, marginTop: 20, marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  img: { width: 52, height: 52, borderRadius: radius.sm },
  itemName: { fontSize: 15, fontWeight: '700', color: palette.text },
  itemTotal: { fontSize: 15, fontWeight: '800', color: palette.text },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  infoText: { flex: 1, marginLeft: 10, fontSize: 14, color: palette.text }
});
