import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { palette, radius } from '../../theme/consumerTheme';
import { PrimaryButton } from '../../components/consumer/Common';
import { FarmerScreen, InfoCard, Divider } from '../../components/farmer/FarmerParts';

const DetectionResultScreen = ({ navigation, route }) => {
  const imageUri = route?.params?.imageUri;
  const rows = [
    ['Crop detected', 'Not available'],
    ['Disease detected', 'Not available'],
    ['Confidence', '—']
  ];

  return (
    <FarmerScreen navigation={navigation} title="Scan Result" active="Analytics">
      {imageUri ? <Image source={{ uri: imageUri }} style={s.preview} resizeMode="cover" /> : null}

      <InfoCard>
        <View style={s.statusRow}>
          <Text style={s.statusLabel}>Analysis status</Text>
          <View style={s.tag}><Text style={s.tagText}>Demo preview</Text></View>
        </View>
        <Text style={s.title}>Prediction unavailable</Text>
        <Text style={s.text}>
          Connect your trained vegetable disease detection model or backend API to display the detected crop, disease, confidence score and next steps.
        </Text>
        <View style={{ marginVertical: 14 }}><Divider /></View>
        {rows.map(([label, value]) => (
          <View key={label} style={s.dataRow}>
            <Text style={s.dataLabel}>{label}</Text>
            <Text style={s.dataValue}>{value}</Text>
          </View>
        ))}
      </InfoCard>

      <PrimaryButton title="Scan another plant" icon="scan" onPress={() => navigation.replace('DiseaseDetection')} style={{ marginTop: 22 }} />
      <Text style={s.disclaimer}>
        This is a preview of the result layout, not an actual AI diagnosis. Do not use it to make crop-treatment decisions.
      </Text>
    </FarmerScreen>
  );
};

export default DetectionResultScreen;

const s = StyleSheet.create({
  preview: { width: '100%', height: 215, borderRadius: radius.xl, backgroundColor: palette.primaryLight, marginBottom: 16 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusLabel: { fontSize: 13, fontWeight: '700', color: palette.textSecondary },
  tag: { backgroundColor: '#FEF3C7', borderRadius: radius.pill, paddingHorizontal: 12, height: 26, justifyContent: 'center' },
  tagText: { fontSize: 12, fontWeight: '700', color: '#B45309' },
  title: { marginTop: 14, fontSize: 21, fontWeight: '800', color: palette.text },
  text: { marginTop: 8, fontSize: 13.5, lineHeight: 20, color: palette.textSecondary },
  dataRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  dataLabel: { fontSize: 14, color: palette.textSecondary },
  dataValue: { fontSize: 14, fontWeight: '800', color: palette.text },
  disclaimer: { marginTop: 14, fontSize: 11.5, lineHeight: 17, textAlign: 'center', color: palette.textSecondary }
});
