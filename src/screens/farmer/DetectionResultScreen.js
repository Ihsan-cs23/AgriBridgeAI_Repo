
import React from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';

import {
  Screen,
  TopBar,
  Eyebrow,
  Heading,
  Subheading,
  Panel,
  PrimaryButton,
  Tag,
} from '../../components/farmer/FarmerUI';

import { farmerColors as C } from '../../theme/farmerTheme';

export default function DetectionResultScreen({
  navigation,
  route,
}) {
  const imageUri = route?.params?.imageUri;

  return (
    <Screen>
      <TopBar
        title="Scan overview"
        subtitle="DETECTION RESULT"
        onBack={() => navigation.goBack()}
      />

      <Eyebrow>IMAGE RECEIVED</Eyebrow>

      <Heading>
        Your scan is ready.
      </Heading>

      <Subheading>
        This is a preview of the result layout.
        It is not an actual AI diagnosis.
      </Subheading>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: '100%',
            height: 205,
            borderRadius: 22,
            marginTop: 20,
            backgroundColor: C.sage,
          }}
          resizeMode="cover"
        />
      )}

      <Panel style={{ marginTop: 17 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{
            color: C.muted,
            fontSize: 11,
            fontWeight: '800',
          }}>
            ANALYSIS STATUS
          </Text>

          <Tag tone="amber">
            Demo preview
          </Tag>
        </View>

        <Text style={{
          color: C.ink,
          fontSize: 22,
          fontWeight: '900',
          marginTop: 15,
        }}>
          Prediction unavailable
        </Text>

        <Text style={{
          color: C.muted,
          fontSize: 13,
          lineHeight: 20,
          marginTop: 7,
        }}>
          Connect your trained vegetable disease detection
          model or backend API to display the detected crop,
          disease, confidence score and next steps.
        </Text>

        <View style={{
          height: 1,
          backgroundColor: C.line,
          marginVertical: 17,
        }} />

        {[
          ['Crop detected', 'Not available'],
          ['Disease detected', 'Not available'],
          ['Confidence', '—'],
        ].map(([label, value]) => (
          <View
            key={label}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}
          >
            <Text style={{
              color: C.muted,
              fontSize: 12,
            }}>
              {label}
            </Text>

            <Text style={{
              color: C.ink,
              fontSize: 12,
              fontWeight: '800',
            }}>
              {value}
            </Text>
          </View>
        ))}
      </Panel>

      <View style={{ marginTop: 20 }}>
        <PrimaryButton
          title="Scan another plant"
          onPress={() =>
            navigation.replace('DiseaseDetection')
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
        Do not use this demo preview to make
        crop-treatment decisions.
      </Text>
    </Screen>
  );
}
