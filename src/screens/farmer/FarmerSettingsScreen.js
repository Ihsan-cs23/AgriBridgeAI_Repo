import React, { useState } from 'react';
import { Alert, Switch } from 'react-native';
import { palette } from '../../theme/consumerTheme';
import { SectionHeader } from '../../components/consumer/Common';
import { Divider, FarmerScreen, InfoCard, MenuRow } from '../../components/farmer/FarmerParts';

const FarmerSettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);

  return (
    <FarmerScreen navigation={navigation} title="Settings" active="Profile">
      <InfoCard style={{ paddingVertical: 4 }}>
        <MenuRow
          icon="notifications" title="Notifications" detail="Receive important app updates"
          right={<Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: '#D5DDD5', true: palette.primary }} />}
        />
      </InfoCard>

      <SectionHeader title="Account" />
      <InfoCard style={{ paddingVertical: 4 }}>
        <MenuRow
          icon="information-circle" title="About AgriBridge AI" detail="Agriculture support platform"
          onPress={() => Alert.alert('AgriBridge AI', 'A farmer-focused agriculture support application.')}
        />
        <Divider />
        <MenuRow
          icon="log-out" title="Sign out" detail="Return to the account selection screen" danger
          onPress={() => Alert.alert('Sign out', 'Connect this action to your authentication flow.')}
        />
      </InfoCard>
    </FarmerScreen>
  );
};

export default FarmerSettingsScreen;
