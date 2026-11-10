import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useConsumer } from '../../context/ConsumerContext';
import { compactCount, formatPrice, palette, radius, shadow } from '../../theme/consumerTheme';
import { FavoriteButton, PrimaryButton, SafeImage } from './Common';

export function CategoryCard({ category, onPress }) {
  return (
    <Pressable onPress={onPress} style={s.cat}>
      <View style={s.catCircle}><SafeImage source={category.image} style={s.catImg} /></View>
      <Text style={s.catLabel} numberOfLines={1}>{category.label}</Text>
    </Pressable>
  );
}

/** variant: 'grid' (home / favorites) or 'row' (search results) */
export function ProductCard({ product, variant = 'grid', onPress, style }) {
  const { isFavorite, toggleFavorite, addToCart } = useConsumer();
  const fav = isFavorite(product.id);

  if (variant === 'row') {
    return (
      <Pressable onPress={onPress} style={s.row}>
        <SafeImage source={product.image} style={s.rowImg} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={s.name} numberOfLines={1}>{product.name}</Text>
          <Text style={s.price}>{formatPrice(product.price)}/{product.unit}</Text>
          <View style={s.ratingRow}>
            <Ionicons name="star" size={13} color={palette.warning} />
            <Text style={s.ratingText}>{product.rating.toFixed(1)} <Text style={{ color: palette.textSecondary, fontWeight: '400' }}>({compactCount(product.reviews)} reviews)</Text></Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', alignSelf: 'stretch' }}>
          <FavoriteButton active={fav} onPress={() => toggleFavorite(product.id)} style={{ backgroundColor: 'transparent' }} />
          <PrimaryButton title="Add" icon={undefined} iconRight="add" small onPress={() => addToCart(product.id)} />
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={[s.card, style]}>
      <View>
        <SafeImage source={product.image} style={s.cardImg} />
        <FavoriteButton active={fav} onPress={() => toggleFavorite(product.id)} style={{ position: 'absolute', top: 8, right: 8 }} />
      </View>
      <View style={{ padding: 12 }}>
        <Text style={s.name} numberOfLines={1}>{product.name}</Text>
        <Text style={s.price}>{formatPrice(product.price)}/{product.unit}</Text>
        <PrimaryButton title="Add to Cart" iconRight="add" small onPress={() => addToCart(product.id)} style={{ marginTop: 10 }} />
      </View>
    </Pressable>
  );
}

export function FarmerCard({ farmer, onViewProfile }) {
  return (
    <View style={s.farmer}>
      <SafeImage source={farmer.avatar} style={s.farmerImg} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={s.name}>{farmer.name}</Text>
        <Text style={s.sub}>Local Farmer</Text>
        <View style={s.ratingRow}>
          <Ionicons name="location-outline" size={13} color={palette.textSecondary} />
          <Text style={[s.sub, { marginLeft: 3 }]} numberOfLines={1}>{farmer.location}</Text>
        </View>
      </View>
      <PrimaryButton title="View Profile" variant="outline" small iconRight="chevron-forward" onPress={onViewProfile} />
    </View>
  );
}

const s = StyleSheet.create({
  cat: { alignItems: 'center', width: 78 },
  catCircle: { width: 66, height: 66, borderRadius: 33, backgroundColor: palette.primaryLight, overflow: 'hidden', borderWidth: 2, borderColor: '#fff', ...shadow },
  catImg: { width: '100%', height: '100%' },
  catLabel: { marginTop: 7, fontSize: 12, fontWeight: '600', color: palette.text },
  card: { backgroundColor: '#fff', borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: palette.border, ...shadow },
  cardImg: { width: '100%', height: 116 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: palette.border },
  rowImg: { width: 78, height: 78, borderRadius: radius.md },
  name: { fontSize: 15, fontWeight: '700', color: palette.text },
  price: { marginTop: 3, fontSize: 14, fontWeight: '700', color: palette.primaryDark },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { marginLeft: 4, fontSize: 12, fontWeight: '700', color: palette.text },
  sub: { fontSize: 12, color: palette.textSecondary },
  farmer: { flexDirection: 'row', alignItems: 'center', backgroundColor: palette.backgroundAlt, borderRadius: radius.lg, padding: 12, borderWidth: 1, borderColor: palette.border },
  farmerImg: { width: 54, height: 54, borderRadius: 27 }
});
