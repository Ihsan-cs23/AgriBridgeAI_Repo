
import React from 'react';

import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {
  Screen,
  TopBar,
  Eyebrow,
  Heading,
  Subheading,
  Panel,
  MenuItem,
  Icon,
} from '../../components/farmer/FarmerUI';

import { farmerColors as C } from '../../theme/farmerTheme';
import { useFarmer } from '../../context/FarmerContext';

export default function FarmerProfileScreen({ navigation }) {
  const { profileImageUri, setProfileImageUri } = useFarmer();

  const chooseProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo permission', 'Allow photo access to choose a profile image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

  return (
    <Screen>
      <TopBar
        title="Farmer account"
        subtitle="PROFILE & PREFERENCES"
        onBack={() => navigation.goBack()}
      />

      <Eyebrow>ACCOUNT</Eyebrow>

      <Heading>
        Your profile
      </Heading>

      <Subheading>
        Manage your personal and farm information.
      </Subheading>

      {/* Profile information */}
      <Panel style={{
        marginTop: 22,
        alignItems: 'center',
        paddingVertical: 23,
      }}>
        <View style={{
          width: 76,
          height: 76,
          borderRadius: 26,
          backgroundColor: C.forest,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {profileImageUri ? (
            <Image
              source={{ uri: profileImageUri }}
              style={{ width: '100%', height: '100%', borderRadius: 26 }}
            />
          ) : (
            <Icon name="profile" size={36} color={C.lime} />
          )}
        </View>

        <Text style={{
          color: C.ink,
          fontSize: 18,
          fontWeight: '900',
          marginTop: 13,
        }}>
          Farmer account
        </Text>

        <Text style={{
          color: C.muted,
          fontSize: 12,
          marginTop: 4,
        }}>
          Add your name and contact details
        </Text>

        <Pressable
          onPress={chooseProfileImage}
          style={{
            marginTop: 15,
            backgroundColor: C.sage,
            borderRadius: 12,
            paddingHorizontal: 17,
            paddingVertical: 10,
          }}
        >
          <Text style={{
            color: C.forest,
            fontWeight: '800',
            fontSize: 12,
          }}>
            {profileImageUri ? 'Change photo' : 'Upload profile photo'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('EditProfile')}
          style={{ marginTop: 9, paddingHorizontal: 10, paddingVertical: 5 }}
        >
          <Text style={{ color: C.green, fontSize: 11, fontWeight: '800' }}>
            Edit account details
          </Text>
        </Pressable>
      </Panel>

      {/* Farm management */}
      <Text style={{
        color: C.muted,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.2,
        marginTop: 26,
        marginBottom: 7,
      }}>
        FARM MANAGEMENT
      </Text>

      <Panel>
        <MenuItem
          icon={<Icon name="farm" size={19} color={C.forest} />}
          title="Farm details"
          detail="Location, land and crop information"
          onPress={() => navigation.navigate('FarmDetails')}
        />

        <MenuItem
          icon={<Icon name="scan" size={19} color={C.forest} />}
          title="Detection history"
          detail="Review your previous plant scans"
          onPress={() => navigation.navigate('DetectionHistory')}
        />
        <MenuItem
          icon={<Icon name="leaf" size={19} color={C.forest} />}
          title="List vegetables"
          detail="Add produce, prices and available quantity"
          onPress={() => navigation.navigate('VegetableListing')}
        />
      </Panel>

      {/* App settings */}
      <Text style={{
        color: C.muted,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.2,
        marginTop: 25,
        marginBottom: 7,
      }}>
        APP
      </Text>

      <Panel>
        <MenuItem
          icon={<Icon name="settings" size={19} color={C.forest} />}
          title="Settings"
          detail="Notifications and account preferences"
          onPress={() => navigation.navigate('FarmerSettings')}
        />
      </Panel>
    </Screen>
  );
}
