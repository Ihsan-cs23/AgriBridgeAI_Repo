
import React, { useState } from 'react';

import {
  View,
  Text,
  Image,
  Alert,
  Pressable,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import {
  Screen,
  TopBar,
  Eyebrow,
  Heading,
  Subheading,
  Panel,
  PrimaryButton,
  SecondaryButton,
} from '../../components/farmer/FarmerUI';

import { farmerColors as C } from '../../theme/farmerTheme';

export default function DiseaseDetectionScreen({ navigation }) {
  const [image, setImage] = useState(null);

  async function chooseImage(fromCamera) {
    try {
      let result;

      if (fromCamera) {
        const permission =
          await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
          return Alert.alert(
            'Camera permission',
            'Allow camera access to take a plant photo.'
          );
        }

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 0.85,
        });
      } else {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
          return Alert.alert(
            'Gallery permission',
            'Allow photo access to select a plant image.'
          );
        }

        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 0.85,
        });
      }

      if (!result.canceled && result.assets?.[0]?.uri) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        'Unable to open image picker',
        error.message || 'Please try again.'
      );
    }
  }

  return (
    <Screen>
      <TopBar
        title="Plant health scan"
        subtitle="DISEASE DETECTION"
        onBack={() => navigation.goBack()}
      />

      <Eyebrow>AI-ASSISTED CROP CHECK</Eyebrow>

      <Heading>
        Let's examine your plant.
      </Heading>

      <Subheading>
        Choose a clear photo of the affected leaf.
        Good lighting and a focused image help
        produce better analysis.
      </Subheading>

      {/* Image preview */}
      <Pressable
        onPress={() => chooseImage(false)}
        style={{
          marginTop: 24,
          height: 265,
          borderRadius: 24,
          borderWidth: 1.5,
          borderStyle: image ? 'solid' : 'dashed',
          borderColor: image ? C.green : '#B9C9B9',
          backgroundColor: '#EEF3EA',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : (
          <>
            <View style={{
              width: 66,
              height: 66,
              borderRadius: 22,
              backgroundColor: C.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontSize: 31,
                color: C.forest,
              }}>
                ＋
              </Text>
            </View>

            <Text style={{
              color: C.forest,
              fontSize: 16,
              fontWeight: '900',
              marginTop: 16,
            }}>
              Add a plant photo
            </Text>

            <Text style={{
              color: C.muted,
              fontSize: 12,
              marginTop: 6,
            }}>
              Tap to choose from your gallery
            </Text>
          </>
        )}
      </Pressable>

      {/* Camera and gallery buttons */}
      <View style={{
        flexDirection: 'row',
        gap: 11,
        marginTop: 14,
      }}>
        <SecondaryButton
          title="Take photo"
          onPress={() => chooseImage(true)}
          style={{ flex: 1 }}
        />

        <SecondaryButton
          title="Choose photo"
          onPress={() => chooseImage(false)}
          style={{ flex: 1 }}
        />
      </View>

      {/* Photo instructions */}
      <Panel style={{ marginTop: 22 }}>
        <Text style={{
          color: C.ink,
          fontSize: 14,
          fontWeight: '900',
        }}>
          Photo checklist
        </Text>

        {[
          'Capture the affected leaf clearly',
          'Use natural light where possible',
          'Avoid blurry or distant photos',
        ].map((item, index) => (
          <View
            key={item}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
            }}
          >
            <Text style={{
              color: C.green,
              fontWeight: '900',
              marginRight: 9,
            }}>
              0{index + 1}
            </Text>

            <Text style={{
              color: C.muted,
              fontSize: 12,
              flex: 1,
            }}>
              {item}
            </Text>
          </View>
        ))}
      </Panel>

      <View style={{ marginTop: 20 }}>
        <PrimaryButton
          title="Continue to analysis"
          disabled={!image}
          onPress={() =>
            navigation.navigate('DetectionResult', {
              imageUri: image,
            })
          }
        />
      </View>

      <Text style={{
        color: C.muted,
        fontSize: 10,
        lineHeight: 16,
        marginTop: 13,
        textAlign: 'center',
      }}>
        A trained disease-detection model must be connected
        to return actual predictions.
      </Text>
    </Screen>
  );
}
