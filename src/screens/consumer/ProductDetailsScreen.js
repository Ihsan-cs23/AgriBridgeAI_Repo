import React, { useRef, useState } from 'react';
import { FlatList, ScrollView, Share, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useConsumer } from '../../context/ConsumerContext';
import { getFarmer, getProduct } from '../../data/consumerData';
import { compactCount, formatPrice, palette, radius, shadow } from '../../theme/consumerTheme';
import { AppHeader, EmptyState, FavoriteButton, IconButton, PrimaryButton, QuantitySelector, SafeImage, SectionHeader } from '../../components/consumer/Common';
import { FarmerCard } from '../../components/consumer/ProductCards';

const TRUST = [
  { icon: 'leaf', label: '100% Fresh' },
  { icon: 'bicycle', label: 'Fast Delivery' },
  { icon: 'shield-checkmark', label: 'Trusted Farmer' }
];

export default function ProductDetailsScreen({ navigation, route }) {
  const { width } = useWindowDimensions();
  const { isFavorite, toggleFavorite, addToCart, cartCount } = useConsumer();
  const product = getProduct(route.params?.productId);
  const [qty, setQty] = useState(1);
  const [page, setPage] = useState(0);
  const imgW = width - 32;

  if (!product) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <AppHeader title="Product" onBack={() => navigation.goBack()} />
        <EmptyState title="Product not found" actionLabel="Back to Home" onAction={() => navigation.navigate('Tabs')} />
      </View>
    );
  }
  const farmer = getFarmer(product.farmerId);

  const share = () => Share.share({ message: `${product.name} — ${formatPrice(product.price)}/${product.unit} on AgriBridge AI` });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader
        title="" onBack={() => navigation.goBack()}
        right={<View style={{ flexDirection: 'row' }}>
          <IconButton name="share-social-outline" onPress={share} />
          <IconButton name="cart-outline" badge={cartCount} onPress={() => navigation.navigate('Cart')} />
        </View>}
      />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Carousel */}
        <View style={s.carousel}>
          <FlatList
            data={product.images} horizontal pagingEnabled showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => String(i)}
            onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / imgW))}
            renderItem={({ item }) => <SafeImage source={item} style={{ width: imgW, height: 240 }} />}
            getItemLayout={(_, i) => ({ length: imgW, offset: imgW * i, index: i })}
          />
          <FavoriteButton active={isFavorite(product.id)} onPress={() => toggleFavorite(product.id)} size={22} style={s.fav} />
          <View style={s.dots}>
            {product.images.map((_, i) => <View key={i} style={[s.dot, i === page && s.dotActive]} />)}
          </View>
        </View>

        <Text style={s.name}>{product.name}</Text>
        <View style={s.ratingRow}>
          <Ionicons name="star" size={16} color={palette.warning} />
          <Text style={s.rating}>{product.rating.toFixed(1)}</Text>
          <Text style={s.reviews}>({product.reviews.toLocaleString('en-US')} reviews)</Text>
        </View>
        <Text style={s.price}>{formatPrice(product.price)}<Text style={s.unit}> / {product.unit}</Text></Text>
        <Text style={s.desc}>{product.description}</Text>

        <View style={s.stockRow}>
          <View style={[s.stockDot, { backgroundColor: product.stock > 20 ? palette.success : palette.warning }]} />
          <Text style={s.stockText}>{product.stock > 20 ? 'In Stock' : 'Low Stock'} • {product.stock} {product.unit === 'kg' ? 'kg' : product.unit + 's'} available</Text>
        </View>
        <Text style={s.fresh}><Ionicons name="time-outline" size={13} /> {product.freshness}</Text>

        <View style={s.trust}>
          {TRUST.map((t, i) => (
            <View key={t.label} style={[s.trustItem, i > 0 && { borderLeftWidth: 1, borderLeftColor: '#CFE8C4' }]}>
              <Ionicons name={t.icon} size={22} color={palette.primary} />
              <Text style={s.trustText}>{t.label}</Text>
            </View>
          ))}
        </View>

        <View style={s.buyRow}>
          <QuantitySelector value={qty} onChange={setQty} max={product.stock} />
          <PrimaryButton title="Add to Cart" icon="cart-outline" onPress={() => addToCart(product.id, qty)} style={{ flex: 1, marginLeft: 12 }} />
        </View>

        <SectionHeader title="Farmer Details" />
        {farmer ? <FarmerCard farmer={farmer} onViewProfile={() => navigation.navigate('FarmerDetails', { farmerId: farmer.id })} /> : null}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  carousel: { borderRadius: radius.xl, overflow: 'hidden', ...shadow, backgroundColor: palette.primaryLight },
  fav: { position: 'absolute', top: 12, right: 12, width: 40, height: 40, borderRadius: 20 },
  dots: { position: 'absolute', bottom: 12, alignSelf: 'center', flexDirection: 'row' },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.6)', marginHorizontal: 3 },
  dotActive: { backgroundColor: '#fff', width: 20 },
  name: { marginTop: 16, fontSize: 24, fontWeight: '800', color: palette.text },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  rating: { marginLeft: 5, fontSize: 15, fontWeight: '800', color: palette.text },
  reviews: { marginLeft: 5, fontSize: 14, color: palette.textSecondary },
  price: { marginTop: 8, fontSize: 32, fontWeight: '800', color: palette.primary },
  unit: { fontSize: 18, color: palette.text, fontWeight: '700' },
  desc: { marginTop: 8, fontSize: 15, lineHeight: 22, color: palette.textSecondary },
  stockRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  stockDot: { width: 10, height: 10, borderRadius: 5 },
  stockText: { marginLeft: 8, fontSize: 14, fontWeight: '700', color: palette.text },
  fresh: { marginTop: 6, fontSize: 13, color: palette.textSecondary },
  trust: { flexDirection: 'row', marginTop: 16, backgroundColor: palette.primaryLight, borderRadius: radius.lg, paddingVertical: 14 },
  trustItem: { flex: 1, alignItems: 'center' },
  trustText: { marginTop: 5, fontSize: 12, fontWeight: '600', color: palette.text },
  buyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 }
});
