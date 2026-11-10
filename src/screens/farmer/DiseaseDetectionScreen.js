import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { palette, radius } from '../../theme/consumerTheme';
import { PrimaryButton } from '../../components/consumer/Common';
import { FarmerScreen, InfoCard } from '../../components/farmer/FarmerParts';

const CHECKLIST = [
  'Capture the affected leaf clearly',
  'Use natural light where possible',
  'Avoid blurry or distant photos'
];

const DiseaseDetectionScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  async function chooseImage(fromCamera) {
    try {
      let result;
      if (fromCamera) {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return Alert.alert('Camera permission', 'Allow camera access to take a plant photo.');
        result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], allowsEditing: true, quality: 0.85 });
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) return Alert.alert('Gallery permission', 'Allow photo access to select a plant image.');
        result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, quality: 0.85 });
      }
      if (!result.canceled && result.assets?.[0]?.uri) setImage(result.assets[0].uri);
    } catch (error) {
      Alert.alert('Unable to open image picker', error.message || 'Please try again.');
    }
  }

  return (
    <FarmerScreen navigation={navigation} title="Disease Detection" active="Analytics">
      <Text style={s.intro}>Choose a clear photo of the affected leaf. Good lighting and a focused image help produce better analysis.</Text>

      <Pressable onPress={() => chooseImage(false)} style={[s.drop, image && s.dropFilled]}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        ) : (
          <>
            <View style={s.dropIcon}><Ionicons name="image" size={32} color={palette.primary} /></View>
            <Text style={s.dropTitle}>Add a plant photo</Text>
            <Text style={s.dropSub}>Tap to choose from your gallery</Text>
          </>
        )}
      </Pressable>

      <View style={s.btnRow}>
        <PrimaryButton title="Take photo" icon="camera" variant="outline" onPress={() => chooseImage(true)} style={{ flex: 1, marginRight: 10 }} />
        <PrimaryButton title="Choose photo" icon="images" variant="outline" onPress={() => chooseImage(false)} style={{ flex: 1 }} />
      </View>

      <InfoCard style={{ marginTop: 20 }}>
        <Text style={s.cardTitle}>Photo checklist</Text>
        {CHECKLIST.map((item) => (
          <View key={item} style={s.checkRow}>
            <Ionicons name="checkmark-circle" size={22} color={palette.success} />
            <Text style={s.checkText}>{item}</Text>
          </View>
        ))}
      </InfoCard>

      <PrimaryButton
        title="Continue to analysis" iconRight="chevron-forward" disabled={!image}
        onPress={() => navigation.navigate('DetectionResult', { imageUri: image })}
        style={{ marginTop: 22 }}
      />
      <Text style={s.disclaimer}>A trained disease-detection model must be connected to return actual predictions.</Text>
    </FarmerScreen>
  );
};

export default DiseaseDetectionScreen;

const s = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, color: palette.textSecondary, marginBottom: 16 },
  drop: { height: 250, borderRadius: radius.xl, borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#9CC9A4', backgroundColor: palette.primaryLight, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  dropFilled: { borderStyle: 'solid', borderColor: palette.primary },
  dropIcon: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  dropTitle: { marginTop: 14, fontSize: 17, fontWeight: '800', color: palette.primaryDark },
  dropSub: { marginTop: 4, fontSize: 12.5, color: palette.textSecondary },
  btnRow: { flexDirection: 'row', marginTop: 14 },
  cardTitle: { fontSize: 17, fontWeight: '800', color: palette.text },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  checkText: { flex: 1, marginLeft: 11, fontSize: 14, color: palette.text },
  disclaimer: { marginTop: 14, fontSize: 11.5, lineHeight: 17, textAlign: 'center', color: palette.textSecondary }
});
