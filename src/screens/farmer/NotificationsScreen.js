import React from 'react';
import { Text, View } from 'react-native';

import {
  Screen,
  TopBar,
  Eyebrow,
  Heading,
  Subheading,
  Panel,
} from '../../components/farmer/FarmerUI';
import { farmerColors as C } from '../../theme/farmerTheme';

export default function NotificationsScreen({ navigation }) {
  return (
    <Screen>
      <TopBar
        title="Notifications"
        subtitle="FARM UPDATES"
        onBack={() => navigation.goBack()}
      />

      <Eyebrow>YOUR ALERTS</Eyebrow>
      <Heading>Notifications</Heading>
      <Subheading>
        Stay up to date with crop health and farm activity.
      </Subheading>

      <Panel style={{ marginTop: 22 }}>
        <View style={{ paddingVertical: 8 }}>
          <Text style={{ color: C.ink, fontSize: 15, fontWeight: '900' }}>
            No new notifications
          </Text>
          <Text style={{ color: C.muted, fontSize: 12, marginTop: 6 }}>
            New scan results and farm updates will appear here.
          </Text>
        </View>
      </Panel>
    </Screen>
  );
}