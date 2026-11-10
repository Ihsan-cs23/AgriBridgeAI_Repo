import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader, IconButton } from '../consumer/Common';
import { palette } from '../../theme/consumerTheme';

// Same API as before (FarmerHeader / FarmerBottomNav) so existing screens keep working,
// but now built on the shared consumer design system.

const TABS = [
  { icon: 'home', label: 'Home', screen: 'FarmerDashboard' },
  { icon: 'leaf', label: 'My Farm', screen: 'FarmDetails' },
  { icon: 'bag-handle', label: 'Market', screen: 'VegetableListing' },
  { icon: 'bar-chart', label: 'Analytics', screen: 'DetectionHistory' },
  { icon: 'person', label: 'Profile', screen: 'FarmerProfile' }
];

export function FarmerHeader({ navigation, title = 'AgriBridge AI', back = true, showBell = true }) {
  const canBack = back && navigation?.canGoBack?.();
  return (
    <AppHeader
      title={title}
      onBack={canBack ? () => navigation.goBack() : undefined}
      right={showBell ? (
        <IconButton name="notifications-outline" color={palette.primaryDark} onPress={() => navigation?.navigate?.('Notifications')} />
      ) : null}
    />
  );
}

export function FarmerBottomNav({ navigation, active = 'My Farm' }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TABS.map((tab) => {
        const focused = tab.label === active;
        const color = focused ? palette.primary : '#4B5563';
        return (
          <Pressable
            key={tab.label} style={s.tab}
            onPress={() => !focused && navigation?.navigate?.(tab.screen)}
            accessibilityRole="button" accessibilityState={{ selected: focused }}
          >
            <Ionicons name={focused ? tab.icon : `${tab.icon}-outline`} size={24} color={color} />
            <Text style={[s.label, { color, fontWeight: focused ? '700' : '500' }]} numberOfLines={1}>{tab.label}</Text>
            <View style={[s.underline, { backgroundColor: focused ? palette.primary : 'transparent' }]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: palette.border, paddingTop: 8 },
  tab: { flex: 1, alignItems: 'center' },
  label: { marginTop: 2, fontSize: 11.5 },
  underline: { marginTop: 5, height: 3, width: 30, borderRadius: 2 }
});
