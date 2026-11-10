import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from '../theme/colors';
import SplashScreen from '../screens/common/SplashScreen';
import WelcomeScreen from '../screens/common/WelcomeScreen';
import LoginScreen from '../screens/common/LoginScreen';
import RegisterScreen from '../screens/common/RegisterScreen';
import ForgotPasswordScreen from '../screens/common/ForgotPasswordScreen';
import RoleSelectionScreen from '../screens/common/RoleSelectionScreen';
import FarmerNavigator from './FarmerNavigator';
import ConsumerNavigator from './ConsumerNavigator';
import RiderDashboard from '../screens/rider/RiderDashboard';
import AdminDashboard from '../screens/admin/AdminDashboard';

const Stack = createNativeStackNavigator();

function ConsumerEntry({ navigation }) {
  const signOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return <ConsumerNavigator onLogout={() => signOut()} />;
}

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
      <Stack.Screen name="Farmer" component={FarmerNavigator} />
      <Stack.Screen name="Consumer" component={ConsumerEntry} />
      <Stack.Screen name="Rider" component={RiderDashboard} />
      <Stack.Screen name="Admin" component={AdminDashboard} />
    </Stack.Navigator>
  );
}
