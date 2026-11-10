import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConsumer } from '../../context/ConsumerContext';
import { CATEGORIES, IMAGES, PRODUCTS } from '../../data/consumerData';
import { palette, radius } from '../../theme/consumerTheme';
import { IconButton, PrimaryButton, SearchBar, SectionHeader } from '../../components/consumer/Common';
import { CategoryCard, ProductCard } from '../../components/consumer/ProductCards';

export default function ConsumerDashboard({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { profile, unreadCount, cartCount } = useConsumer();
  const cardW = (width - 40 - 12) / 2;
  const featured = PRODUCTS.slice(0, 6);

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScrollView contentContainerStyle={[s.container, { paddingTop: insets.top + 10 }]} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.logoRow}>
            <View style={s.logo}><Ionicons name="leaf" size={24} color={palette.primary} /></View>
            <View style={{ marginLeft: 8 }}>
              <Text style={s.brand}>AgriBridge AI</Text>
              <Text style={s.tagline}>Fresh Produce. Healthy Life.</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <IconButton name="cart-outline" badge={cartCount} onPress={() => navigation.navigate('Cart')} color={palette.primaryDark} />
            <IconButton name="notifications-outline" badge={unreadCount} onPress={() => navigation.navigate('Notifications')} color={palette.primaryDark} />
          </View>
        </View>

        <Text style={s.welcome}>Welcome back, {profile.name.split(' ')[0]}</Text>

        {/* Hero banner */}
        <ImageBackground source={IMAGES.hero} style={s.hero} imageStyle={{ borderRadius: radius.xl }}>
          <View style={s.heroOverlay}>
            <Text style={s.heroTitle}>Smart Farming{'\n'}Brighter Future</Text>
            <Text style={s.heroText}>Get fresh produce directly{'\n'}from local farmers.</Text>
            <PrimaryButton title="Explore Now" small iconRight="arrow-forward" onPress={() => navigation.navigate('Search')} style={s.heroBtn} />
          </View>
        </ImageBackground>

        <SearchBar placeholder="Search for products..." onPress={() => navigation.navigate('Search', { focus: true })} style={{ marginTop: 16 }} />

        <SectionHeader title="Categories" actionLabel="See All" onAction={() => navigation.navigate('Search')} />
        <View style={s.catRow}>
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.id} category={c} onPress={() => navigation.navigate('Search', { category: c.id })} />
          ))}
        </View>

        <SectionHeader title="Featured Products" actionLabel="See All" onAction={() => navigation.navigate('Search')} />
        <View style={s.grid}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} style={{ width: cardW, marginBottom: 12 }} onPress={() => navigation.navigate('ProductDetails', { productId: p.id })} />
          ))}
        </View>

        {/* Promo banner */}
        <View style={s.promo}>
          <View style={s.promoIcon}><Ionicons name="shield-checkmark" size={28} color="#fff" /></View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={s.promoTitle}>100% Fresh & Safe</Text>
            <Text style={s.promoText}>Every item is farm-checked, hand-picked and delivered fresh.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 42, height: 42, borderRadius: 21, backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 20, fontWeight: '800', color: palette.primary },
  tagline: { fontSize: 10.5, color: palette.text, fontWeight: '600' },
  welcome: { marginTop: 14, fontSize: 15, color: palette.textSecondary, fontWeight: '600' },
  hero: { marginTop: 12, height: 168 },
  heroOverlay: { flex: 1, borderRadius: radius.xl, backgroundColor: 'rgba(7,91,25,0.55)', padding: 18, justifyContent: 'center' },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: '800', lineHeight: 28 },
  heroText: { marginTop: 6, color: '#F0FFEA', fontSize: 12.5, lineHeight: 17 },
  heroBtn: { marginTop: 12, alignSelf: 'flex-start', backgroundColor: '#22B53F' },
  catRow: { flexDirection: 'row', justifyContent: 'space-between' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  promo: { flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 16, borderRadius: radius.xl, backgroundColor: palette.primary },
  promoIcon: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  promoTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  promoText: { marginTop: 3, color: '#E8F8DF', fontSize: 13, lineHeight: 18 }
});
