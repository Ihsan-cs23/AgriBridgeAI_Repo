import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from './farmer/FarmerUI';
import { farmerColors as C } from '../theme/farmerTheme';

export default function BottomNavigation({
  active = 'Home',
  onHome,
  onProfile,
  onFarm,
  onScan,
  onSettings,
}) {
  const items = [
    { label: 'Home', icon: 'farm', onPress: onHome },
    { label: 'Analytics', icon: 'chart', onPress: onFarm },
    { label: 'Scan', icon: 'scan', onPress: onScan, primary: true },
    { label: 'Market', icon: 'leaf', onPress: onProfile },
    { label: 'Settings', icon: 'settings', onPress: onSettings },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={item.onPress}
          style={({ pressed }) => [
            styles.item,
            item.primary && styles.primaryItem,
            pressed && { opacity: 0.7 },
          ]}
        >
          <View style={[styles.iconWrap, item.primary && styles.primaryIcon]}>
            <Icon
              name={item.icon}
              size={item.primary ? 27 : 21}
              color={item.primary ? C.white : C.forest}
            />
          </View>
          {!item.primary && (
            <Text style={[styles.label, active === item.label && styles.activeLabel]}>
              {item.label}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: C.white,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: C.line,
    minHeight: 76,
    marginTop: 18,
    paddingHorizontal: 5,
    paddingTop: 8,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 62 },
  primaryItem: { marginTop: -25 },
  iconWrap: { height: 31, alignItems: 'center', justifyContent: 'center' },
  primaryIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: C.forest,
    borderWidth: 5,
    borderColor: C.white,
    elevation: 4,
  },
  label: { color: '#69717C', fontSize: 10, marginTop: 4, fontWeight: '700' },
  activeLabel: { color: C.forest, fontWeight: '900' },
};