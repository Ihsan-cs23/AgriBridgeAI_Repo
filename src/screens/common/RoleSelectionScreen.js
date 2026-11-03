
import React from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import colors from '../../theme/colors';

const roles = [
  {
    name: 'Farmer',
    image: require('../../../assets/images/agribridge_farmer_circle.png'),
    description: 'Detect vegetable diseases'
  },
  {
    name: 'Consumer',
    image: require('../../../assets/images/agribridge_consumer_circle.png'),
    description: 'Manage orders and deliveries'
  },
  {
    name: 'Rider',
    image: require('../../../assets/images/AgriBridge AI Verified Delivery.png'),
    description: 'Manage assigned deliveries'
  },
  {
    name: 'Admin',
    image: require('../../../assets/images/AgriBridgeAI Admin Profile Portrait.png'),
    description: 'Manage the platform'
  }
];

export default function RoleSelectionScreen({ navigation }) {
  const handleRolePress = (roleName) => {
    navigation.navigate('Login', { role: roleName });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={require('../../../assets/images/agribridge-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Choose Your Role</Text>

      <Text style={styles.subtitle}>
        Select your account type to continue.
      </Text>

      {roles.map((role) => (

        <TouchableOpacity
          key={role.name}
          style={styles.card}
          onPress={() => handleRolePress(role.name)}
          activeOpacity={0.8}
        >

          <View style={styles.roleImageFrame}>
            <Image
              source={role.image}
              style={styles.roleImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.roleName}>{role.name}</Text>
            <Text style={styles.description}>
              {role.description}
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>

        </TouchableOpacity>

      ))}
     <View style={styles.bottomDecoration}>
        <View style={styles.hillOne} />
        <View style={styles.hillTwo} />
        <View style={styles.hillThree} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'stretch'
  },

  logo: {
    width: 150,
    height: 95,
    alignSelf: 'center',
    marginBottom: 8
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    alignSelf: 'center'
  },

  subtitle: {
    color: colors.textSecondary,
    marginTop: 10,
    marginBottom: 25,
    textAlign: 'center',
    alignSelf: 'center'
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 17,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },

  roleImageFrame: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.pale,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },

  roleImage: {
    width: 44,
    height: 44,
    borderRadius: 22
  },

  cardContent: {
    flex: 1
  },

  roleName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text
  },

  description: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 5
  },

  arrow: {
    fontSize: 28,
    color: colors.primary
  },

  bottomDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    overflow: 'hidden',
  },

  hillOne: {
    position: 'absolute',
    width: '120%',
    height: 90,
    left: '-10%',
    bottom: -38,
    borderRadius: 100,
    backgroundColor: '#b0ec94',
  },

  hillTwo: {
    position: 'absolute',
    width: '120%',
    height: 85,
    left: '-10%',
    bottom: -50,
    borderRadius: 100,
    backgroundColor: '#66dd3e',
  },

  hillThree: {
    position: 'absolute',
    width: '120%',
    height: 65,
    left: '-10%',
    bottom: -47,
    borderRadius: 100,
    backgroundColor: '#0f5c37',
  },

});
