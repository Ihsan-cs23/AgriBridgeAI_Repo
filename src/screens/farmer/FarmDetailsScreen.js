import React from 'react';
import { Alert, Image, ImageBackground, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette, radius } from '../../theme/consumerTheme';
import { PrimaryButton, SafeImage, SectionHeader } from '../../components/consumer/Common';
import { FarmerScreen, InfoCard, StatTile } from '../../components/farmer/FarmerParts';
import { PRODUCTS } from '../../data/consumerData';

const FARMER = { name: 'Muhammad Ali', location: 'Sindh, Pakistan', phone: '+92 300 1234567', rating: '4.8', reviews: 124 };

const FARM_INFO = [
  { icon: 'map', label: 'Farm Size', value: '2.5 Acres' },
  { icon: 'leaf', label: 'Main Crops', value: 'Tomato, Chili' },
  { icon: 'water', label: 'Irrigation', value: 'Drip System', color: '#1E88E5' },
  { icon: 'ribbon', label: 'Experience', value: '15 Years' }
];

const ACTIVITIES = [
  { icon: 'leaf', label: 'Total Crops', value: '12' },
  { icon: 'shield-checkmark', label: 'Healthy Crops', value: '10' },
  { icon: 'warning', label: 'Alerts', value: '1', color: palette.warning },
  { icon: 'cube', label: 'Harvest Yield', value: '750 kg', color: palette.warning }
];

const FARMER_PRODUCTS = PRODUCTS.filter((product) => product.farmerId === 'f1');

const FarmDetailsScreen = ({ navigation }) => {
  const go = (screen) => navigation?.navigate?.(screen);
  const phone = FARMER.phone.replace(/\s/g, '');

  const actions = [
    { icon: 'call', label: 'Call', onPress: () => Linking.openURL(`tel:${phone}`).catch(() => Alert.alert('Unable to place call')) },
    { icon: 'chatbubble', label: 'Message', onPress: () => Linking.openURL(`sms:${phone}`).catch(() => Alert.alert('Unable to open messages')) },
    { icon: 'location', label: 'View Farm', onPress: () => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(FARMER.location)}`).catch(() => {}) },
    { icon: 'people', label: 'Connect', onPress: () => Alert.alert('Connect', 'Connection requests will be available once the backend is connected.') }
  ];

  return (
    <FarmerScreen navigation={navigation} title="My Farm" active="My Farm" back={false}>
      {/* Profile */}
      <InfoCard style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <Image source={require('../../../assets/images/agribridge_farmer_circle.png')} style={s.avatar} />
          <View style={s.badge}><Ionicons name="checkmark" size={14} color="#fff" /></View>
        </View>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={s.name}>{FARMER.name}</Text>
          <View style={s.verified}><Ionicons name="checkmark-circle" size={14} color={palette.primary} /><Text style={s.verifiedText}>Verified Farmer</Text></View>
          <View style={s.meta}><Ionicons name="location" size={15} color={palette.primary} /><Text style={s.metaText}>{FARMER.location}</Text></View>
          <View style={s.meta}><Ionicons name="call" size={15} color={palette.primary} /><Text style={s.metaText}>{FARMER.phone}</Text></View>
          <View style={s.meta}>
            <Ionicons name="star" size={15} color={palette.warning} />
            <Text style={s.metaText}><Text style={{ fontWeight: '800' }}>{FARMER.rating}</Text> ({FARMER.reviews} reviews)</Text>
          </View>
        </View>
      </InfoCard>

      {/* Quick actions */}
      <View style={s.actions}>
        {actions.map((a) => (
          <Pressable key={a.label} onPress={a.onPress} style={s.action}>
            <View style={s.actionCircle}><Ionicons name={a.icon} size={24} color={palette.primary} /></View>
            <Text style={s.actionLabel}>{a.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Farm info */}
      <View style={s.headRow}>
        <Text style={s.h}>Farm Information</Text>
        <PrimaryButton title="Edit" icon="create-outline" small variant="outline" onPress={() => go('EditProfile')} />
      </View>
      <View style={s.grid}>{FARM_INFO.map((i) => <StatTile key={i.label} {...i} />)}</View>

      {/* Activities */}
      <SectionHeader title="Farm Activities" actionLabel="View All" onAction={() => go('DetectionHistory')} style={{ marginTop: 12 }} />
      <View style={s.grid}>{ACTIVITIES.map((i) => <StatTile key={i.label} {...i} />)}</View>

      {/* Recent activity */}
      <SectionHeader title="Recent Activity" actionLabel="View All" onAction={() => go('DetectionHistory')} style={{ marginTop: 12 }} />
      <InfoCard style={{ flexDirection: 'row' }}>
        <Image source={require('../../../assets/images/Leaf Disease Diagnostic Infographic.png')} style={s.recentImg} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={s.recentTitle}>Disease Scan Completed</Text>
          <Text style={s.recentDesc}>Tomato Leaf Blight detected (Needs treatment)</Text>
          <View style={s.recentFooter}>
            <Text style={s.time}>2 hours ago</Text>
            <PrimaryButton title="View Report" small onPress={() => go('DetectionResult')} />
          </View>
        </View>
      </InfoCard>

      {/* Banner */}
      <ImageBackground source={require('../../../assets/images/Imgae01.png')} style={s.banner} imageStyle={{ borderRadius: radius.xl }}>
        <View style={s.bannerOverlay}>
          <Ionicons name="leaf" size={44} color="#fff" />
          <Text style={s.bannerText}>Empowering Farmers{'\n'}with AI & Innovation</Text>
        </View>
      </ImageBackground>

      {/* Farmer products */}
      <SectionHeader title="Farmer Products" style={{ marginTop: 16 }} />
      <View style={s.productsGrid}>
        {FARMER_PRODUCTS.map((product) => (
          <View key={product.id} style={s.productCard}>
            <SafeImage source={product.image} style={s.productImage} />
            <Text style={s.productName} numberOfLines={1}>{product.name}</Text>
            <Text style={s.productPrice}>{`Rs. ${product.price}/${product.unit}`}</Text>
          </View>
        ))}
      </View>
    </FarmerScreen>
  );
};

export default FarmDetailsScreen;

const s = StyleSheet.create({
  avatar: { width: 92, height: 92, borderRadius: 46, borderWidth: 3, borderColor: palette.primaryLight },
  badge: { position: 'absolute', right: -2, bottom: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: palette.primary, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 20, fontWeight: '800', color: palette.text },
  verified: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: palette.primaryLight, borderRadius: radius.pill, paddingHorizontal: 10, height: 24, marginVertical: 6 },
  verifiedText: { marginLeft: 4, fontSize: 12, fontWeight: '700', color: palette.primaryDark },
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  metaText: { marginLeft: 6, fontSize: 13.5, color: palette.text },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 6 },
  action: { alignItems: 'center', width: 72 },
  actionCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { marginTop: 7, fontSize: 12.5, fontWeight: '600', color: palette.text },
  headRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, marginBottom: 12 },
  h: { fontSize: 18, fontWeight: '800', color: palette.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  recentImg: { width: 92, height: 92, borderRadius: radius.md },
  recentTitle: { fontSize: 15.5, fontWeight: '800', color: palette.text },
  recentDesc: { marginTop: 3, fontSize: 12.5, lineHeight: 18, color: palette.textSecondary },
  recentFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  time: { fontSize: 12, color: palette.textSecondary },
  banner: { marginTop: 22, height: 150 },
  bannerOverlay: { flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: radius.xl, backgroundColor: 'rgba(7,91,25,0.75)', paddingHorizontal: 22 },
  bannerText: { marginLeft: 16, color: '#fff', fontSize: 17, fontWeight: '800', lineHeight: 23 },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: { width: '48%', marginBottom: 10, backgroundColor: '#fff', borderRadius: radius.lg, borderWidth: 1, borderColor: palette.border, overflow: 'hidden' },
  productImage: { width: '100%', height: 100 },
  productName: { marginTop: 8, paddingHorizontal: 10, fontSize: 14, fontWeight: '700', color: palette.text },
  productPrice: { paddingHorizontal: 10, paddingBottom: 10, marginTop: 3, fontSize: 13, fontWeight: '700', color: palette.primaryDark }
});
