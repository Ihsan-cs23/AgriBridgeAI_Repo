import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {
  Screen,
  TopBar,
  Eyebrow,
  Heading,
  Subheading,
  Panel,
  Field,
  PrimaryButton,
  Icon,
} from '../../components/farmer/FarmerUI';
import { farmerColors as C } from '../../theme/farmerTheme';

export default function VegetableListingScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [listings, setListings] = useState([]);

  const chooseVegetableImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo permission', 'Allow photo access to choose a vegetable image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.85,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const addListing = () => {
    if (!imageUri || !name.trim() || !price.trim() || !quantity.trim()) {
      Alert.alert(
        'Complete your listing',
        'Add a vegetable image, name, price and quantity before saving.'
      );
      return;
    }

    setListings((current) => [
      ...current,
      {
        id: `${Date.now()}-${name}`,
        imageUri,
        name: name.trim(),
        price: price.trim(),
        quantity: quantity.trim(),
      },
    ]);
    setImageUri(null);
    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <Screen>
      <TopBar
        title="Vegetable listings"
        subtitle="YOUR PRODUCE"
        onBack={() => navigation.goBack()}
      />

      <Eyebrow>SELL YOUR HARVEST</Eyebrow>
      <Heading>List a vegetable.</Heading>
      <Subheading>
        Add a clear image and details so buyers know what is available.
      </Subheading>

      <Panel style={{ marginTop: 20 }}>
        <Pressable
          onPress={chooseVegetableImage}
          style={{
            height: 150,
            borderRadius: 17,
            borderWidth: 1.5,
            borderStyle: imageUri ? 'solid' : 'dashed',
            borderColor: imageUri ? C.green : '#B9C9B9',
            backgroundColor: C.sage,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <>
              <Icon name="leaf" size={30} color={C.forest} />
              <Text style={{ color: C.forest, fontWeight: '800', marginTop: 9 }}>
                Upload vegetable image
              </Text>
            </>
          )}
        </Pressable>

        <Field
          label="Vegetable name"
          value={name}
          onChangeText={setName}
          placeholder="e.g. Fresh tomatoes"
        />
        <Field
          label="Price"
          value={price}
          onChangeText={setPrice}
          placeholder="e.g. 250 per kg"
          keyboardType="numeric"
        />
        <Field
          label="Available quantity"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="e.g. 50 kg"
          keyboardType="numeric"
        />

        <PrimaryButton
          title="Add vegetable listing"
          style={{ marginTop: 20 }}
          onPress={addListing}
        />
      </Panel>

      {listings.length > 0 && (
        <>
          <Text style={{
            color: C.muted,
            fontSize: 10,
            fontWeight: '900',
            letterSpacing: 1.2,
            marginTop: 27,
            marginBottom: 8,
          }}>
            YOUR LISTINGS
          </Text>

          {listings.map((listing) => (
            <Panel key={listing.id} style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              padding: 12,
            }}>
              <Image
                source={{ uri: listing.imageUri }}
                style={{ width: 68, height: 68, borderRadius: 14 }}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ color: C.ink, fontSize: 15, fontWeight: '900' }}>
                  {listing.name}
                </Text>
                <Text style={{ color: C.green, fontSize: 12, fontWeight: '800', marginTop: 4 }}>
                  {listing.price}
                </Text>
                <Text style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>
                  Available: {listing.quantity}
                </Text>
              </View>
            </Panel>
          ))}
        </>
      )}
    </Screen>
  );
}
