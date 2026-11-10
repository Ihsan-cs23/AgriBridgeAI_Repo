import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FarmerDashboard from '../screens/farmer/FarmerDashboard';
import DiseaseDetectionScreen from '../screens/farmer/DiseaseDetectionScreen';
import DetectionResultScreen from '../screens/farmer/DetectionResultScreen';
import DetectionHistoryScreen from '../screens/farmer/DetectionHistoryScreen';
import FarmerProfileScreen from '../screens/farmer/FarmerProfileScreen';
import EditProfileScreen from '../screens/farmer/EditProfileScreen';
import FarmDetailsScreen from '../screens/farmer/FarmDetailsScreen';
import FarmerSettingsScreen from '../screens/farmer/FarmerSettingsScreen';
import VegetableListingScreen from '../screens/farmer/VegetableListingScreen';
import NotificationsScreen from '../screens/farmer/NotificationsScreen';
import { FarmerProvider } from '../context/FarmerContext';

const Stack = createNativeStackNavigator();

export default function FarmerNavigator() {
  return (
    <FarmerProvider>
      <Stack.Navigator
        initialRouteName="FarmerDashboard"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} />
        <Stack.Screen name="DiseaseDetection" component={DiseaseDetectionScreen} />
        <Stack.Screen name="DetectionResult" component={DetectionResultScreen} />
        <Stack.Screen name="DetectionHistory" component={DetectionHistoryScreen} />
        <Stack.Screen name="FarmerProfile" component={FarmerProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="FarmDetails" component={FarmDetailsScreen} />
        <Stack.Screen name="FarmProfile" component={FarmDetailsScreen} />
        <Stack.Screen name="FarmerSettings" component={FarmerSettingsScreen} />
        <Stack.Screen name="VegetableListing" component={VegetableListingScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </FarmerProvider>
  );
}
