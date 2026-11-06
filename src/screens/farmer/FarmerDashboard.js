
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import {
  Bell,
  Sprout,
  ScanLine,
  ClipboardCheck,
  Warehouse,
  ChartNoAxesCombined,
  Leaf,
  ChevronRight,
  Clock3,
  ShoppingCart,
  CheckCircle2,
  Home,
  Store,
  Settings,
  UserRound,
  BarChart3,
} from 'lucide-react-native';

const GREEN = '#087A35';
const DARK_GREEN = '#064B2B';
const LIGHT_GREEN = '#EAF6E4';
const TEXT = '#173D2B';
const MUTED = '#667085';

const FarmerDashboard = ({ navigation }) => {
  const { width } = useWindowDimensions();

  const quickActions = [
    { title: 'Detect\nDisease', icon: ScanLine, screen: 'DiseaseDetection' },
    { title: 'Farmer\nDetails', icon: ClipboardCheck, screen: 'FarmerProfile' },
    { title: 'Farm\nDetails', icon: Warehouse, screen: 'FarmDetails' },
    { title: 'View Insights', icon: ChartNoAxesCombined, screen: 'DetectionHistory' },
  ];

  const stats = [
    { value: '2.5 Acres', label: 'Total Land', icon: Leaf },
    { value: '4 Crops', label: 'Growing', icon: Sprout },
    { value: 'Good', label: 'Crop Health', icon: CheckCircle2 },
  ];

  const activities = [
    {
      title: 'Disease Scan Completed',
      subtitle: 'Tomato Leaf - Healthy',
      time: '2 hours ago',
      icon: ScanLine,
    },
    {
      title: 'New Order Placed',
      subtitle: 'For 20 kg Tomatoes',
      time: 'Yesterday',
      icon: ShoppingCart,
    },
  ];

  const handleNavigate = (screen) => {
    if (navigation && screen) {
      navigation.navigate(screen);
    }
  };

  const ActionCard = ({ item }) => {
    const Icon = item.icon;

    return (
      <TouchableOpacity
        style={styles.actionCard}
        activeOpacity={0.8}
        onPress={() => handleNavigate(item.screen)}
      >
        <Icon size={36} color={GREEN} strokeWidth={2.2} />
        <Text style={styles.actionText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F7FBF3" barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <ImageBackground          source={require('../../../assets/images/Imgae01.png')}
          imageStyle={styles.headerImage}
          style={styles.headerBackground}
        >
          <View style={styles.headerOverlay}>
            <View style={styles.topHeader}>
              <View style={styles.brandContainer}>
                <Sprout size={43} color={GREEN} strokeWidth={2.5} />
                <View>
                  <Text style={styles.brandName}>AgriBridge AI</Text>
                  <Text style={styles.brandTagline}>
                    Farm Smart • Grow Better
                  </Text>
                </View>
              </View>

              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.notificationButton}
                  onPress={() => handleNavigate('Notifications')}
                >
                  <Bell size={25} color={DARK_GREEN} />
                  <View style={styles.notificationBadge}>
                    <Text style={styles.badgeText}>2</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleNavigate('FarmerProfile')}>
                  <Image
                    source={require('../../../assets/images/agribridge_farmer_circle.png')}
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome Back,</Text>
              <Text style={styles.farmerName}>Muhammad Ali 👋</Text>
              <Text style={styles.welcomeSubtitle}>
                Let's grow together for a better tomorrow
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* FARM HEALTH CARD */}
        <TouchableOpacity
          style={styles.healthCard}
          activeOpacity={0.8}
          onPress={() => handleNavigate('DetectionHistory')}
        >
          <Sprout size={48} color={GREEN} />

          <View style={styles.healthTextContainer}>
            <Text style={styles.healthTitle}>Your Farm is Healthy!</Text>
            <Text style={styles.healthSubtitle}>
              No major issues found
            </Text>
          </View>

          <CheckCircle2 size={34} color="#20B66A" />
          <ChevronRight size={25} color={TEXT} />
        </TouchableOpacity>

        {/* QUICK ACTIONS */}
        <View style={styles.actionsContainer}>
          {quickActions.map((item, index) => (
            <ActionCard key={index} item={item} />
          ))}
        </View>

        {/* FARM OVERVIEW */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sprout size={29} color={GREEN} />
              <Text style={styles.sectionTitle}>Farm Overview</Text>
            </View>

            <TouchableOpacity
              style={styles.viewDetails}
              onPress={() => handleNavigate('FarmDetails')}
            >
              <Text style={styles.viewDetailsText}>View Details</Text>
              <ChevronRight size={20} color={GREEN} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <View style={styles.statItem} key={index}>
                  <Icon size={37} color={GREEN} />
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* AI DISEASE SCANNING BANNER */}
       <ImageBackground
  source={require('../../../assets/images/Leaf Disease Diagnostic Infographic.png')}
  style={styles.scanBanner}
  imageStyle={styles.scanImage}
>
  {/* Disease scanning content */}

          <View style={styles.scanOverlay}>
            <View style={styles.scanContent}>
              <Text style={styles.scanTitle}>
                Scan Your Crops{'\n'}for Diseases
              </Text>

              <Text style={styles.scanSubtitle}>
                Get instant AI powered results
              </Text>

              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => handleNavigate('DiseaseDetection')}
              >
                <Text style={styles.scanButtonText}>Start Scanning</Text>
                <ChevronRight size={21} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <ScanLine size={75} color="#FFFFFF" />
          </View>
        </ImageBackground>

        {/* RECENT ACTIVITY */}
        <View style={styles.activityCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Clock3 size={25} color={TEXT} />
              <Text style={styles.sectionTitle}>Recent Activity</Text>
            </View>

            <TouchableOpacity onPress={() => handleNavigate('ActivityHistory')}>
              <Text style={styles.viewDetailsText}>See All →</Text>
            </TouchableOpacity>
          </View>

          {activities.map((item, index) => {
            const Icon = item.icon;

            return (
              <View style={styles.activityItem} key={index}>
                <View style={styles.activityIcon}>
                  <Icon size={27} color={GREEN} />
                </View>

                <View style={styles.activityTextContainer}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activitySubtitle}>
                    {item.subtitle}
                  </Text>
                </View>

                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigate('FarmerDashboard')}
        >
          <Home size={25} color={GREEN} fill={GREEN} />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          <View style={styles.activeLine} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigate('DetectionHistory')}
        >
          <BarChart3 size={25} color="#667085" />
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.scanNavButton}
          onPress={() => handleNavigate('DiseaseDetection')}
        >
          <ScanLine size={35} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigate('VegetableListing')}
        >
          <Store size={25} color="#667085" />
          <Text style={styles.navText}>Market</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigate('FarmerSettings')}
        >
          <Settings size={25} color="#667085" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FarmerDashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4fff4',
  },

  scrollContent: {
    paddingBottom: 25,
  },

  headerBackground: {
    minHeight: 250,
    justifyContent: 'space-between',
  },

  headerImage: {
    opacity: 1,
  },

  headerOverlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 69,
    paddingBottom: 25,
    backgroundColor: 'rgba(244,255,244,0.25)',
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  brandName: {
    fontSize: 22,
    fontWeight: '900',
    color: DARK_GREEN,
  },

  brandTagline: {
    fontSize: 12,
    color: DARK_GREEN,
    fontWeight: '600',
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },

  notificationButton: {
    position: 'relative',
    padding: 10,
  },

  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#E53935',
    height: 18,
    width: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: GREEN,
  },

  welcomeContainer: {
    marginTop: 65,
  },

  welcomeText: {
    fontSize: 20,
    color: DARK_GREEN,
    fontWeight: '700',
  },

  farmerName: {
    fontSize: 28,
    fontWeight: '800',
    color: DARK_GREEN,
    marginTop: 7,
  },

  welcomeSubtitle: {
    fontSize: 14,
    color: '#053601',
    marginTop: 20,
  },

  healthCard: {
    backgroundColor: '#e4f2e6',
    marginHorizontal: 18,
    marginTop: -2,
    borderRadius: 23,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  healthTextContainer: {
    flex: 1,
  },

  healthTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: DARK_GREEN,
  },

  healthSubtitle: {
    fontSize: 13,
    color: MUTED,
    marginTop: 5,
  },

  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 32,
    gap: 20,
  },

  actionCard: {
    width: '25%',
    minWidth: 78,
    flexGrow: 1,
    backgroundColor: LIGHT_GREEN,
    borderRadius: 22,
    minHeight: 140,
    paddingVertical: 27,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionText: {
    color: '#142B1E',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },

  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: 22,
    padding: 17,
    borderRadius: 23,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  sectionTitle: {
    color: DARK_GREEN,
    fontSize: 19,
    fontWeight: '800',
  },

  viewDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewDetailsText: {
    color: GREEN,
    fontSize: 13,
    fontWeight: '700',
  },

  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    paddingHorizontal: 3,
  },

  statValue: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 9,
  },

  statLabel: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },

  scanBanner: {
    marginHorizontal: 18,
    marginTop: 20,
    height: 190,
    borderRadius: 23,
    overflow: 'hidden',
  },

  scanImage: {
    borderRadius: 23,
  },

  scanOverlay: {
    flex: 1,
    backgroundColor: 'rgba(218,242,194,0.65)',
    padding: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  scanContent: {
    flex: 1,
  },

  scanTitle: {
    fontSize: 21,
    color: DARK_GREEN,
    fontWeight: '800',
  },

  scanSubtitle: {
    fontSize: 13,
    color: DARK_GREEN,
    marginTop: 8,
    marginBottom: 12,
  },

  scanButton: {
    backgroundColor: DARK_GREEN,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    gap: 7,
  },

  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  activityCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: 20,
    padding: 17,
    borderRadius: 23,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 17,
    marginTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#EEF0ED',
    gap: 11,
  },

  activityIcon: {
    width: 47,
    height: 47,
    borderRadius: 13,
    backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activityTextContainer: {
    flex: 1,
  },

  activityTitle: {
    color: '#202B25',
    fontSize: 13,
    fontWeight: '700',
  },

  activitySubtitle: {
    color: MUTED,
    fontSize: 12,
    marginTop: 5,
  },

  activityTime: {
    color: MUTED,
    fontSize: 11,
  },

  bottomNavigation: {
    height: 76,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 4,
  },

  navText: {
    color: '#667085',
    fontSize: 11,
    fontWeight: '600',
  },

  activeNavText: {
    color: GREEN,
  },

  activeLine: {
    position: 'absolute',
    bottom: 0,
    width: 42,
    height: 3,
    borderRadius: 3,
    backgroundColor: GREEN,
  },

  scanNavButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    elevation: 6,
  },
});
