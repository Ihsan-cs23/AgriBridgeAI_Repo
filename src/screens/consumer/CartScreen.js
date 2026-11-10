import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConsumer } from '../../context/ConsumerContext';
import { formatPrice, palette, radius, shadow } from '../../theme/consumerTheme';
import { AppHeader, EmptyState, IconButton, PriceSummary, PrimaryButton, QuantitySelector, SafeImage } from '../../components/consumer/Common';

export default function CartScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cartItems, subtotal, deliveryFee, total, updateQty, removeFromCart, clearCart } = useConsumer();

  const confirmClear = () =>
    Alert.alert('Clear cart?', 'All items will be removed from your cart.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearCart }
    ]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader
        title="My Cart" onBack={() => navigation.goBack()}
        right={cartItems.length ? <IconButton name="trash-outline" onPress={confirmClear} /> : null}
      />
      {cartItems.length === 0 ? (
        <EmptyState
          icon="cart-outline" title="Your cart is empty"
          message="Browse fresh produce from local farmers and add your favourites."
          actionLabel="Start Shopping" onAction={() => navigation.navigate('Search')}
        />
      ) : (
        <>
          <FlatList
            data={cartItems} keyExtractor={(i) => i.productId}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <View style={s.item}>
                <Pressable onPress={() => navigation.navigate('ProductDetails', { productId: item.productId })}>
                  <SafeImage source={item.product.image} style={s.img} />
                </Pressable>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={s.name} numberOfLines={1}>{item.product.name}</Text>
                  <Text style={s.price}>{formatPrice(item.product.price)}/{item.product.unit}</Text>
                  <Text style={s.line}>{formatPrice(item.product.price * item.qty)}</Text>
                </View>
                <QuantitySelector compact value={item.qty} onChange={(q) => updateQty(item.productId, q)} />
                <Pressable onPress={() => removeFromCart(item.productId)} hitSlop={10} style={{ marginLeft: 10 }} accessibilityLabel="Remove item">
                  <Ionicons name="trash" size={22} color={palette.error} />
                </Pressable>
              </View>
            )}
          />
          <View style={[s.footer, { paddingBottom: insets.bottom + 14 }]}>
            <PriceSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
            <PrimaryButton title="Proceed to Checkout" iconRight="arrow-forward" onPress={() => navigation.navigate('Checkout')} style={{ marginTop: 14 }} />
          </View>
        </>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', padding: 10, marginBottom: 12, backgroundColor: '#fff', borderRadius: radius.lg, borderWidth: 1, borderColor: palette.border, ...shadow },
  img: { width: 68, height: 68, borderRadius: radius.md },
  name: { fontSize: 15, fontWeight: '700', color: palette.text },
  price: { marginTop: 2, fontSize: 12.5, color: palette.textSecondary },
  line: { marginTop: 4, fontSize: 14, fontWeight: '800', color: palette.primaryDark },
  footer: { paddingHorizontal: 16, paddingTop: 14, borderTopWidth: 1, borderTopColor: palette.border, backgroundColor: '#fff' }
});
