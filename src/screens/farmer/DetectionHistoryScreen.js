
import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import {
  Screen,
  TopBar,
  Eyebrow,
  Heading,
  Subheading,
  Panel,
  Tag,
  Icon,
} from '../../components/farmer/FarmerUI';

import { farmerColors as C } from '../../theme/farmerTheme';

export default function DetectionHistoryScreen({ navigation }) {
  return (
    <Screen>
      <TopBar
        title="Scan records"
        subtitle="YOUR ACTIVITY"
        onBack={() => navigation.goBack()}
      />

      <Eyebrow>FARM HEALTH LOG</Eyebrow>

      <Heading>
        Detection history
      </Heading>

      <Subheading>
        Your previous plant checks will appear here
        after real scans are saved.
      </Subheading>

      <Panel style={{
        marginTop: 22,
        alignItems: 'center',
        paddingVertical: 35,
      }}>
        <View style={{
          width: 64,
          height: 64,
          borderRadius: 22,
          backgroundColor: C.sage,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon name="scan" size={30} color={C.forest} />
        </View>

        <Text style={{
          color: C.ink,
          fontSize: 17,
          fontWeight: '900',
          marginTop: 17,
        }}>
          No scans recorded yet
        </Text>

        <Text style={{
          color: C.muted,
          fontSize: 12,
          lineHeight: 19,
          textAlign: 'center',
          marginTop: 7,
        }}>
          Start your first plant health scan.
          Saved results will appear here when
          history storage is connected.
        </Text>
      </Panel>

      <View style={{
        marginTop: 22,
        backgroundColor: '#E9EFE5',
        borderRadius: 18,
        padding: 16,
      }}>
        <Tag>NOTE</Tag>

        <Text style={{
          color: C.forest,
          fontSize: 12,
          lineHeight: 18,
          marginTop: 10,
        }}>
          History is currently a UI placeholder.
          Connect local storage or your backend
          to persist scan records.
        </Text>
      </View>
    </Screen>
  );
}
