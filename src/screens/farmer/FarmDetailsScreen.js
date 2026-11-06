
import React, { useState } from 'react';
import { Alert } from 'react-native';

import {
  Screen,
  TopBar,
  Eyebrow,
  Heading,
  Subheading,
  Panel,
  Field,
  PrimaryButton,
} from '../../components/farmer/FarmerUI';

export default function FarmDetailsScreen({ navigation }) {
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('Sindh, Pakistan');
  const [land, setLand] = useState('');
  const [crops, setCrops] = useState('');

  const saveFarmDetails = () => {
    Alert.alert(
      'UI preview',
      'Farm details are not saved yet. Connect a backend or local storage to persist them.'
    );
  };

  return (
    <Screen>
      <TopBar
        title="Farm information"
        subtitle="FARM DETAILS"
        onBack={() => navigation.goBack()}
      />

      <Eyebrow>YOUR LAND & CROPS</Eyebrow>

      <Heading>Tell us about your farm.</Heading>

      <Subheading>
        These details can help organize your crop records.
      </Subheading>

      <Panel style={{ marginTop: 20 }}>
        <Field
          label="Farm name"
          value={farmName}
          onChangeText={setFarmName}
          placeholder="e.g. Green Valley Farm"
        />

        <Field
          label="Farm location"
          value={location}
          onChangeText={setLocation}
          placeholder="District, Sindh"
        />

        <Field
          label="Land size"
          value={land}
          onChangeText={setLand}
          placeholder="e.g. 5 acres"
        />

        <Field
          label="Main crops"
          value={crops}
          onChangeText={setCrops}
          placeholder="e.g. Tomato, chilli, onion"
          multiline
        />
      </Panel>

      <PrimaryButton
        title="Save farm details"
        style={{ marginTop: 20 }}
        onPress={saveFarmDetails}
      />
    </Screen>
  );
}
