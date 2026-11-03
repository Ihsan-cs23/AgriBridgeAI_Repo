import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from '../theme/colors';
import SplashScreen from '../screens/common/SplashScreen';
import WelcomeScreen from '../screens/common/WelcomeScreen';
import LoginScreen from '../screens/common/LoginScreen';
import RegisterScreen from '../screens/common/RegisterScreen';
import ForgotPasswordScreen from '../screens/common/ForgotPasswordScreen';
import RoleSelectionScreen from '../screens/common/RoleSelectionScreen';
import FarmerDashboard from '../screens/farmer/FarmerDashboard';
import ConsumerDashboard from '../screens/consumer/ConsumerDashboard';
import RiderDashboard from '../screens/rider/RiderDashboard';
import AdminDashboard from '../screens/admin/AdminDashboard';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        gestureEnabled: false
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="Farmer" component={FarmerDashboard} />
      <Stack.Screen name="Consumer" component={ConsumerDashboard} />
      <Stack.Screen name="Rider" component={RiderDashboard} />
      <Stack.Screen name="Admin" component={AdminDashboard} />
    </Stack.Navigator>
  );
}
