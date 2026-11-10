import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConsumerProvider } from '../context/ConsumerContext';
import { palette } from '../theme/consumerTheme';

import ConsumerDashboard from '../screens/consumer/ConsumerDashboard';
import OrdersScreen from '../screens/consumer/OrdersScreen';
import FavoritesScreen from '../screens/consumer/FavoritesScreen';
import ConsumerProfileScreen from '../screens/consumer/ConsumerProfileScreen';
import ProductScreen from '../screens/consumer/ProductScreen';
import ProductDetailsScreen from '../screens/consumer/ProductDetailsScreen';
import CartScreen from '../screens/consumer/CartScreen';
import CheckoutScreen from '../screens/consumer/CheckoutScreen';
import NotificationsScreen from '../screens/consumer/NotificationsScreen';
import DeliveryTrackingScreen from '../screens/consumer/DeliveryTrackingScreen';
import DeliveryVerificationScreen from '../screens/consumer/DeliveryVerificationScreen';
import FarmDetailsScreen from '../screens/farmer/FarmDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TABS = {
  Home: { label: 'Home', icon: 'home' },
  Orders: { label: 'Orders', icon: 'cube' },
  Favorites: { label: 'Favorites', icon: 'heart' },
  Profile: { label: 'Profile', icon: 'person' }
};

/** Custom bottom bar: green when active with an underline, dark gray otherwise. */
function BottomNavigation({ state, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const cfg = TABS[route.name];
        const color = focused ? palette.primary : '#4B5563';
        const onPress = () => {
          const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <Pressable key={route.key} onPress={onPress} style={s.tab} accessibilityRole="button" accessibilityState={{ selected: focused }}>
            <Ionicons name={focused ? cfg.icon : `${cfg.icon}-outline`} size={24} color={color} />
            <Text style={[s.label, { color, fontWeight: focused ? '700' : '500' }]}>{cfg.label}</Text>
            <View style={[s.underline, { backgroundColor: focused ? palette.primary : 'transparent' }]} />
          </Pressable>
        );
      })}
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={ConsumerDashboard} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ConsumerProfileScreen} />
    </Tab.Navigator>
  );
}

/**
 * Drop-in consumer flow. Render it inside your existing NavigationContainer / role switch.
 * Optional: pass `onLogout` to hook the Log Out button into your auth flow.
 */
export default function ConsumerNavigator({ onLogout }) {
  return (
    <ConsumerProvider onLogout={onLogout}>
      <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Search" component={ProductScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="FarmerDetails" component={FarmDetailsScreen} />
        <Stack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
        <Stack.Screen name="DeliveryVerification" component={DeliveryVerificationScreen} />
      </Stack.Navigator>
    </ConsumerProvider>
  );
}

const s = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: palette.border, paddingTop: 8 },
  tab: { flex: 1, alignItems: 'center' },
  label: { marginTop: 2, fontSize: 11.5 },
  underline: { marginTop: 5, height: 3, width: 30, borderRadius: 2 }
});
