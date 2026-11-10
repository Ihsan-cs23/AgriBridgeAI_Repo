import React from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useFarmer } from '../../context/FarmerContext';
import { palette, radius } from '../../theme/consumerTheme';
import { PrimaryButton, SectionHeader } from '../../components/consumer/Common';
import { Divider, FarmerScreen, InfoCard, MenuRow } from '../../components/farmer/FarmerParts';

const FARM_MENU = [
  { icon: 'business', title: 'Farm details', detail: 'Location, land and crop information', screen: 'FarmDetails' },
  { icon: 'scan', title: 'Detection history', detail: 'Review your previous plant scans', screen: 'DetectionHistory' },
  { icon: 'leaf', title: 'List vegetables', detail: 'Add produce, prices and available quantity', screen: 'VegetableListing' }
];
const APP_MENU = [
  { icon: 'settings', title: 'Settings', detail: 'Notifications and account preferences', screen: 'FarmerSettings' }
];

const FarmerProfileScreen = ({ navigation }) => {
  const { profileImageUri, setProfileImageUri } = useFarmer();

  const chooseProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return Alert.alert('Photo permission', 'Allow photo access to choose a profile image.');
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 });
    if (!result.canceled && result.assets?.[0]?.uri) setProfileImageUri(result.assets[0].uri);
  };

  const renderMenu = (items) => items.map((item, i) => (
    <View key={item.title}>
      {i > 0 ? <Divider /> : null}
      <MenuRow icon={item.icon} title={item.title} detail={item.detail} onPress={() => navigation.navigate(item.screen)} />
    </View>
  ));

  return (
    <FarmerScreen navigation={navigation} title="Profile" active="Profile" back={false}>
      <InfoCard style={{ alignItems: 'center', paddingVertical: 24 }}>
        <View style={s.ring}>
          {profileImageUri ? (
            <Image source={{ uri: profileImageUri }} style={s.avatar} />
          ) : (
            <View style={[s.avatar, s.empty]}><Ionicons name="person" size={46} color={palette.primary} /></View>
          )}
        </View>
        <Text style={s.name}>Farmer account</Text>
        <Text style={s.sub}>Add your name and contact details</Text>
        <PrimaryButton title={profileImageUri ? 'Change photo' : 'Upload profile photo'} icon="camera" small onPress={chooseProfileImage} style={{ marginTop: 16 }} />
        <PrimaryButton title="Edit account details" icon="create-outline" small variant="soft" onPress={() => navigation.navigate('EditProfile')} style={{ marginTop: 10 }} />
      </InfoCard>

      <SectionHeader title="Farm Management" />
      <InfoCard style={{ paddingVertical: 4 }}>{renderMenu(FARM_MENU)}</InfoCard>

      <SectionHeader title="App" />
      <InfoCard style={{ paddingVertical: 4 }}>{renderMenu(APP_MENU)}</InfoCard>
    </FarmerScreen>
  );
};

export default FarmerProfileScreen;

const s = StyleSheet.create({
  ring: { width: 112, height: 112, borderRadius: 56, borderWidth: 3, borderColor: palette.primaryLight, padding: 3 },
  avatar: { width: '100%', height: '100%', borderRadius: 52 },
  empty: { backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  name: { marginTop: 14, fontSize: 21, fontWeight: '800', color: palette.text },
  sub: { marginTop: 4, fontSize: 13, color: palette.textSecondary }
});
