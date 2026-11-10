import React from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFarmer } from '../../context/FarmerContext';
import { palette, radius } from '../../theme/consumerTheme';
import { IconButton, PrimaryButton, SectionHeader } from '../../components/consumer/Common';
import { InfoCard, MenuRow, Divider } from '../../components/farmer/FarmerParts';
import { FarmerBottomNav } from '../../components/farmer/FarmerChrome';

const QUICK_ACTIONS = [
  { title: 'Detect Disease', icon: 'camera', screen: 'DiseaseDetection' },
  { title: 'Farmer Details', icon: 'person', screen: 'FarmerProfile' },
  { title: 'Farm Details', icon: 'leaf', screen: 'FarmDetails' },
  { title: 'Insights', icon: 'bar-chart', screen: 'DetectionHistory' }
];

const STATS = [
  { value: '2.5 Acres', label: 'Total Land', icon: 'map' },
  { value: '4 Crops', label: 'Growing', icon: 'leaf' },
  { value: 'Good', label: 'Crop Health', icon: 'heart' }
];

const ACTIVITIES = [
  { title: 'Disease Scan Completed', subtitle: 'Tomato Leaf - Healthy', time: '2 hours ago', icon: 'scan' },
  { title: 'New Order Placed', subtitle: 'For 20 kg Tomatoes', time: 'Yesterday', icon: 'cart' }
];

const FarmerDashboard = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { profileImageUri } = useFarmer();
  const go = (screen) => navigation?.navigate?.(screen);
  const avatar = profileImageUri ? { uri: profileImageUri } : require('../../../assets/images/agribridge_farmer_circle.png');

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScrollView contentContainerStyle={[s.container, { paddingTop: insets.top + 10 }]} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.logoRow}>
            <View style={s.logo}><Ionicons name="leaf" size={24} color={palette.primary} /></View>
            <View style={{ marginLeft: 8 }}>
              <Text style={s.brand}>AgriBridge AI</Text>
              <Text style={s.tagline}>Farm Smart. Grow Better.</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton name="notifications-outline" color={palette.primaryDark} onPress={() => go('Notifications')} />
            <Pressable onPress={() => go('FarmerProfile')} style={{ marginLeft: 4 }}>
              <Image source={avatar} style={s.avatar} />
            </Pressable>
          </View>
        </View>

        <Text style={s.welcome}>Welcome back, Muhammad Ali</Text>

        {/* Hero: scan banner */}
        <ImageBackground source={require('../../../assets/images/Leaf Disease Diagnostic Infographic.png')} style={s.hero} imageStyle={{ borderRadius: radius.xl }}>
          <View style={s.heroOverlay}>
            <View style={{ flex: 1 }}>
              <Text style={s.heroTitle}>Scan Your Crops{'\n'}for Diseases</Text>
              <Text style={s.heroText}>Get instant AI powered results</Text>
              <PrimaryButton title="Start Scanning" small iconRight="arrow-forward" onPress={() => go('DiseaseDetection')} style={s.heroBtn} />
            </View>
            <Ionicons name="scan" size={64} color="rgba(255,255,255,0.9)" />
          </View>
        </ImageBackground>

        {/* Health card */}
        <Pressable onPress={() => go('DetectionHistory')} style={s.health}>
          <View style={s.healthIcon}><Ionicons name="leaf" size={26} color={palette.primary} /></View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.healthTitle}>Your Farm is Healthy!</Text>
            <Text style={s.healthSub}>No major issues found</Text>
          </View>
          <Ionicons name="checkmark-circle" size={28} color={palette.success} />
          <Ionicons name="chevron-forward" size={18} color={palette.textSecondary} style={{ marginLeft: 6 }} />
        </Pressable>

        {/* Quick actions */}
        <SectionHeader title="Quick Actions" />
        <View style={s.actions}>
          {QUICK_ACTIONS.map((a) => (
            <Pressable key={a.title} onPress={() => go(a.screen)} style={s.action}>
              <View style={s.actionCircle}><Ionicons name={a.icon} size={28} color={palette.primary} /></View>
              <Text style={s.actionLabel} numberOfLines={2}>{a.title}</Text>
            </Pressable>
          ))}
        </View>

        {/* Overview */}
        <SectionHeader title="Farm Overview" actionLabel="View Details" onAction={() => go('FarmDetails')} />
        <InfoCard style={{ flexDirection: 'row', paddingVertical: 18 }}>
          {STATS.map((st, i) => (
            <View key={st.label} style={[s.stat, i > 0 && { borderLeftWidth: 1, borderLeftColor: palette.border }]}>
              <Ionicons name={st.icon} size={26} color={palette.primary} />
              <Text style={s.statValue}>{st.value}</Text>
              <Text style={s.statLabel}>{st.label}</Text>
            </View>
          ))}
        </InfoCard>

        {/* Recent activity */}
        <SectionHeader title="Recent Activity" actionLabel="See All" onAction={() => go('DetectionHistory')} />
        <InfoCard style={{ paddingVertical: 4 }}>
          {ACTIVITIES.map((a, i) => (
            <View key={a.title}>
              {i > 0 ? <Divider /> : null}
              <MenuRow icon={a.icon} title={a.title} detail={a.subtitle} right={<Text style={s.time}>{a.time}</Text>} />
            </View>
          ))}
        </InfoCard>

        {/* Promo */}
        <View style={s.promo}>
          <View style={s.promoIcon}><Ionicons name="sparkles" size={26} color="#fff" /></View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={s.promoTitle}>Empowering Farmers</Text>
            <Text style={s.promoText}>with AI & Innovation — scan, list and sell your produce in one place.</Text>
          </View>
        </View>
      </ScrollView>
      <FarmerBottomNav navigation={navigation} active="Home" />
    </View>
  );
};

export default FarmerDashboard;

const s = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 42, height: 42, borderRadius: 21, backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 20, fontWeight: '800', color: palette.primary },
  tagline: { fontSize: 10.5, color: palette.text, fontWeight: '600' },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: palette.primary },
  welcome: { marginTop: 14, fontSize: 15, color: palette.textSecondary, fontWeight: '600' },
  hero: { marginTop: 12, height: 168 },
  heroOverlay: { flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: radius.xl, backgroundColor: 'rgba(7,91,25,0.6)', padding: 18 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800', lineHeight: 27 },
  heroText: { marginTop: 6, color: '#F0FFEA', fontSize: 12.5 },
  heroBtn: { marginTop: 12, alignSelf: 'flex-start', backgroundColor: '#22B53F' },
  health: { flexDirection: 'row', alignItems: 'center', marginTop: 16, padding: 14, borderRadius: radius.lg, backgroundColor: palette.primaryLight, borderWidth: 1, borderColor: '#CFE8C4' },
  healthIcon: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  healthTitle: { fontSize: 16, fontWeight: '800', color: palette.primaryDark },
  healthSub: { marginTop: 2, fontSize: 13, color: palette.textSecondary },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  action: { width: 78, alignItems: 'center' },
  actionCircle: { width: 66, height: 66, borderRadius: 33, backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  actionLabel: { marginTop: 7, fontSize: 12, fontWeight: '600', color: palette.text, textAlign: 'center' },
  stat: { flex: 1, alignItems: 'center', paddingHorizontal: 4 },
  statValue: { marginTop: 8, fontSize: 15, fontWeight: '800', color: palette.text, textAlign: 'center' },
  statLabel: { marginTop: 2, fontSize: 12, color: palette.textSecondary },
  time: { fontSize: 11.5, color: palette.textSecondary },
  promo: { flexDirection: 'row', alignItems: 'center', marginTop: 22, padding: 16, borderRadius: radius.xl, backgroundColor: palette.primary },
  promoIcon: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  promoTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  promoText: { marginTop: 3, color: '#E8F8DF', fontSize: 13, lineHeight: 18 }
});
