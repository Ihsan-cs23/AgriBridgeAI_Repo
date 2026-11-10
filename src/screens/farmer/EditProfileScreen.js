import React, { useState } from 'react';
import { Alert } from 'react-native';
import { PrimaryButton } from '../../components/consumer/Common';
import { FarmerScreen, FormField, InfoCard } from '../../components/farmer/FarmerParts';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const saveProfile = () => {
    Alert.alert('UI preview', 'Profile saving is not connected to a backend yet.');
  };

  return (
    <FarmerScreen navigation={navigation} title="Edit Profile" active="Profile" keyboard>
      <InfoCard>
        <FormField label="Full name" icon="person" value={name} onChangeText={setName} placeholder="Enter your full name" autoCapitalize="words" />
        <FormField label="Phone number" icon="call" value={phone} onChangeText={setPhone} placeholder="+92 3XX XXXXXXX" keyboardType="phone-pad" />
        <FormField label="Email address" icon="mail" value={email} onChangeText={setEmail} placeholder="name@example.com" keyboardType="email-address" autoCapitalize="none" style={{ marginBottom: 0 }} />
      </InfoCard>
      <PrimaryButton title="Save changes" icon="checkmark" onPress={saveProfile} style={{ marginTop: 22 }} />
    </FarmerScreen>
  );
};

export default EditProfileScreen;
