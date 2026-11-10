import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { palette, radius } from '../../theme/consumerTheme';
import { PrimaryButton, SafeImage, SectionHeader } from '../../components/consumer/Common';
import { FarmerScreen, FormField, InfoCard } from '../../components/farmer/FarmerParts';

const VegetableListingScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [listings, setListings] = useState([]);

  const chooseVegetableImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return Alert.alert('Photo permission', 'Allow photo access to choose a vegetable image.');
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, quality: 0.85 });
    if (!result.canceled && result.assets?.[0]?.uri) setImageUri(result.assets[0].uri);
  };

  const addListing = () => {
    if (!imageUri || !name.trim() || !price.trim() || !quantity.trim()) {
      return Alert.alert('Complete your listing', 'Add a vegetable image, name, price and quantity before saving.');
    }
    setListings((cur) => [...cur, { id: `${Date.now()}-${name}`, imageUri, name: name.trim(), price: price.trim(), quantity: quantity.trim() }]);
    setImageUri(null); setName(''); setPrice(''); setQuantity('');
  };

  const removeListing = (id) => setListings((cur) => cur.filter((l) => l.id !== id));

  return (
    <FarmerScreen navigation={navigation} title="Market Listings" active="Market" back={false} keyboard>
      <Text style={s.intro}>Add a clear image and details so buyers know what is available.</Text>

      <InfoCard>
        <Pressable onPress={chooseVegetableImage} style={[s.drop, imageUri && s.dropFilled]}>
          {imageUri ? (
            <SafeImage source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <>
              <View style={s.dropIcon}><Ionicons name="image" size={28} color={palette.primary} /></View>
              <Text style={s.dropText}>Upload vegetable image</Text>
            </>
          )}
        </Pressable>

        <View style={{ height: 16 }} />
        <FormField label="Vegetable name" icon="leaf" value={name} onChangeText={setName} placeholder="e.g. Fresh tomatoes" />
        <FormField label="Price (Rs.)" icon="pricetag" value={price} onChangeText={setPrice} placeholder="e.g. 250 per kg" keyboardType="numeric" />
        <FormField label="Available quantity" icon="cube" value={quantity} onChangeText={setQuantity} placeholder="e.g. 50 kg" keyboardType="numeric" style={{ marginBottom: 0 }} />

        <PrimaryButton title="Add vegetable listing" icon="add" onPress={addListing} style={{ marginTop: 20 }} />
      </InfoCard>

      {listings.length > 0 ? (
        <>
          <SectionHeader title="Your Listings" />
          {listings.map((l) => (
            <View key={l.id} style={s.listing}>
              <SafeImage source={{ uri: l.imageUri }} style={s.listingImg} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={s.listingName}>{l.name}</Text>
                <Text style={s.listingPrice}>{l.price}</Text>
                <Text style={s.listingQty}>Available: {l.quantity}</Text>
              </View>
              <Pressable onPress={() => removeListing(l.id)} hitSlop={10} accessibilityLabel="Remove listing">
                <Ionicons name="trash" size={21} color={palette.error} />
              </Pressable>
            </View>
          ))}
        </>
      ) : null}
    </FarmerScreen>
  );
};

export default VegetableListingScreen;

const s = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, color: palette.textSecondary, marginBottom: 16 },
  drop: { height: 160, borderRadius: radius.lg, borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#9CC9A4', backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  dropFilled: { borderStyle: 'solid', borderColor: palette.primary },
  dropIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  dropText: { marginTop: 10, fontSize: 14, fontWeight: '700', color: palette.primaryDark },
  listing: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: radius.lg, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: palette.border },
  listingImg: { width: 72, height: 72, borderRadius: radius.md },
  listingName: { fontSize: 15, fontWeight: '800', color: palette.text },
  listingPrice: { marginTop: 3, fontSize: 14, fontWeight: '700', color: palette.primaryDark },
  listingQty: { marginTop: 3, fontSize: 12.5, color: palette.textSecondary }
});
