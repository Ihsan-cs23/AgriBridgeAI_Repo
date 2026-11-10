import React from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { useConsumer } from '../../context/ConsumerContext';
import { getProduct } from '../../data/consumerData';
import { AppHeader, EmptyState } from '../../components/consumer/Common';
import { ProductCard } from '../../components/consumer/ProductCards';

export default function FavoritesScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { favorites } = useConsumer();
  const products = favorites.map(getProduct).filter(Boolean);
  const cardW = (width - 40 - 12) / 2;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title="My Favorites" />
      <FlatList
        data={products} numColumns={2} keyExtractor={(p) => p.id}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        renderItem={({ item }) => (
          <ProductCard product={item} style={{ width: cardW, marginBottom: 12 }} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })} />
        )}
        ListEmptyComponent={<EmptyState icon="heart-outline" title="No favorites yet" message="Tap the heart on any product to save it here." actionLabel="Browse Products" onAction={() => navigation.navigate('Search')} />}
      />
    </View>
  );
}
