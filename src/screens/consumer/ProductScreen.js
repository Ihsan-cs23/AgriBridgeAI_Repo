import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConsumer } from '../../context/ConsumerContext';
import { CATEGORIES, POPULAR_SEARCHES, PRODUCTS, getFarmer } from '../../data/consumerData';
import { palette, radius } from '../../theme/consumerTheme';
import { Chip, EmptyState, IconButton, PrimaryButton, SearchBar } from '../../components/consumer/Common';
import { ProductCard } from '../../components/consumer/ProductCards';

const SORTS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'priceAsc', label: 'Price: Low to High' },
  { id: 'priceDesc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' }
];

/** Search screen (route name "Search"). Params: { query, category, farmerId, focus } */
export default function ProductScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { recentSearches, addRecentSearch, clearRecentSearches, cartCount } = useConsumer();
  const params = route.params || {};
  const [query, setQuery] = useState(params.query || '');
  const [category, setCategory] = useState(params.category || 'All');
  const [sort, setSort] = useState('relevance');
  const [topOnly, setTopOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const farmer = params.farmerId ? getFarmer(params.farmerId) : null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) =>
      (category === 'All' || p.category === category) &&
      (!params.farmerId || p.farmerId === params.farmerId) &&
      (!topOnly || p.rating >= 4.7) &&
      (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    );
    if (sort === 'priceAsc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'priceDesc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort, topOnly, params.farmerId]);

  const runSearch = (q) => { setQuery(q); addRecentSearch(q); };
  const showSuggestions = !query.trim() && category === 'All' && !params.farmerId;

  const header = (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>
        {['All', ...CATEGORIES.map((c) => c.id)].map((c) => (
          <Chip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
        ))}
      </ScrollView>
      {showSuggestions ? (
        <View>
          {recentSearches.length ? (
            <>
              <View style={s.rowBetween}>
                <Text style={s.h}>Recent Searches</Text>
                <Pressable onPress={clearRecentSearches} hitSlop={8}><Text style={s.link}>Clear</Text></Pressable>
              </View>
              <View style={s.wrap}>
                {recentSearches.map((r) => <Chip key={r} icon="time-outline" label={r} onPress={() => runSearch(r)} />)}
              </View>
            </>
          ) : null}
          <Text style={[s.h, { marginTop: 14 }]}>Popular Searches</Text>
          <View style={s.wrap}>
            {POPULAR_SEARCHES.map((r) => <Chip key={r} icon="trending-up" label={r} onPress={() => runSearch(r)} />)}
          </View>
        </View>
      ) : null}
      <Text style={[s.h, { marginTop: 14 }]}>
        {farmer ? `Products by ${farmer.name}` : 'Results'} <Text style={{ color: palette.textSecondary, fontWeight: '500' }}>({results.length})</Text>
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={[s.top, { paddingTop: insets.top + 8 }]}>
        <IconButton name="chevron-back" onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }}>
          <SearchBar
            value={query} onChangeText={setQuery} onSubmit={() => addRecentSearch(query)}
            placeholder="Search products..." autoFocus={!!params.focus} onFilter={() => setFilterOpen(true)}
          />
        </View>
        <IconButton name="cart-outline" badge={cartCount} onPress={() => navigation.navigate('Cart')} />
      </View>

      <FlatList
        data={results}
        keyExtractor={(p) => p.id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        renderItem={({ item }) => (
          <ProductCard product={item} variant="row" onPress={() => navigation.navigate('ProductDetails', { productId: item.id })} />
        )}
        ListEmptyComponent={<EmptyState icon="search-outline" title="No products found" message="Try a different keyword or category." actionLabel="Clear Filters" onAction={() => { setQuery(''); setCategory('All'); setTopOnly(false); setSort('relevance'); }} />}
      />

      <Modal visible={filterOpen} transparent animationType="slide" onRequestClose={() => setFilterOpen(false)}>
        <Pressable style={s.backdrop} onPress={() => setFilterOpen(false)} />
        <View style={s.sheet}>
          <View style={s.handle} />
          <Text style={s.sheetTitle}>Filters</Text>
          <Text style={s.h}>Sort by</Text>
          {SORTS.map((o) => (
            <Pressable key={o.id} onPress={() => setSort(o.id)} style={s.opt}>
              <Ionicons name={sort === o.id ? 'radio-button-on' : 'radio-button-off'} size={22} color={sort === o.id ? palette.primary : palette.textSecondary} />
              <Text style={s.optText}>{o.label}</Text>
            </Pressable>
          ))}
          <View style={[s.opt, { justifyContent: 'space-between', marginTop: 6 }]}>
            <Text style={s.optText}>Top rated only (4.7+)</Text>
            <Switch value={topOnly} onValueChange={setTopOnly} trackColor={{ true: palette.primary }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <PrimaryButton title="Reset" variant="soft" onPress={() => { setSort('relevance'); setTopOnly(false); }} style={{ flex: 1, marginRight: 10 }} />
            <PrimaryButton title="Apply" onPress={() => setFilterOpen(false)} style={{ flex: 1 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 8, backgroundColor: palette.headerTint },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  h: { fontSize: 16, fontWeight: '800', color: palette.text, marginBottom: 10 },
  link: { fontSize: 13, fontWeight: '700', color: palette.primary },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, paddingBottom: 34 },
  handle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: palette.border, marginBottom: 14 },
  sheetTitle: { fontSize: 20, fontWeight: '800', color: palette.text, marginBottom: 14 },
  opt: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  optText: { marginLeft: 12, fontSize: 15, color: palette.text, fontWeight: '500' }
});
