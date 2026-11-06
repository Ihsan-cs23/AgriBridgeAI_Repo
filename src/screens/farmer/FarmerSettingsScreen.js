
import React, { useState } from 'react';

import {
  View,
  Text,
  Switch,
  Alert,
} from 'react-native';

import {
  Screen,
  TopBar,
  Eyebrow,
  Heading,
  Subheading,
  Panel,
  MenuItem,
  Icon,
} from '../../components/farmer/FarmerUI';

import { farmerColors as C } from '../../theme/farmerTheme';

export default function FarmerSettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <Screen>
      <TopBar
        title="Preferences"
        subtitle="SETTINGS"
        onBack={() => navigation.goBack()}
      />

      <Eyebrow>APP PREFERENCES</Eyebrow>

      <Heading>Settings</Heading>

      <Subheading>
        Control how you use AgriBridge AI.
      </Subheading>

      {/* Notification settings */}
      <Panel style={{ marginTop: 22 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 7,
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              color: C.ink,
              fontSize: 14,
              fontWeight: '900',
            }}>
              Notifications
            </Text>

            <Text style={{
              color: C.muted,
              fontSize: 11,
              marginTop: 4,
            }}>
              Receive important app updates
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{
              false: '#D5DDD5',
              true: '#A8C99B',
            }}
            thumbColor={
              notifications ? C.forest : '#F5F5F5'
            }
          />
        </View>
      </Panel>

      {/* Account options */}
      <Text style={{
        color: C.muted,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.2,
        marginTop: 25,
        marginBottom: 8,
      }}>
        ACCOUNT
      </Text>

      <Panel>
        <MenuItem
          icon={<Icon name="info" size={19} color={C.forest} />}
          title="About AgriBridge AI"
          detail="Agriculture support platform"
          onPress={() =>
            Alert.alert(
              'AgriBridge AI',
              'A farmer-focused agriculture support application.'
            )
          }
        />

        <MenuItem
          icon={<Icon name="logout" size={19} color={C.red} />}
          title="Sign out"
          detail="Return to the account selection screen"
          danger
          onPress={() =>
            Alert.alert(
              'Sign out',
              'Connect this action to your authentication flow.'
            )
          }
        />
      </Panel>
    </Screen>
  );
}
