
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

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const saveProfile = () => {
    Alert.alert(
      'UI preview',
      'Profile saving is not connected to a backend yet.'
    );
  };

  return (
    <Screen>
      <TopBar
        title="Personal details"
        subtitle="EDIT PROFILE"
        onBack={() => navigation.goBack()}
      />

      <Eyebrow>YOUR INFORMATION</Eyebrow>

      <Heading>Update your profile.</Heading>

      <Subheading>
        Keep your contact information up to date.
      </Subheading>

      <Panel style={{ marginTop: 20 }}>
        <Field
          label="Full name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
        />

        <Field
          label="Phone number"
          value={phone}
          onChangeText={setPhone}
          placeholder="+92 3XX XXXXXXX"
          keyboardType="phone-pad"
        />

        <Field
          label="Email address"
          value={email}
          onChangeText={setEmail}
          placeholder="name@example.com"
          keyboardType="email-address"
        />
      </Panel>

      <PrimaryButton
        title="Save changes"
        style={{ marginTop: 20 }}
        onPress={saveProfile}
      />
    </Screen>
  );
}
