
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import colors from '../../theme/colors';
import AuthHeader from '../../components/AuthHeader';

export default function RegisterScreen({ navigation, route }) {
  const role = route.params?.role || 'Farmer';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      alert('Please complete all fields.');
      return;
    }

    const destination = role === 'Farmer' ? 'Farmer' : role;
    navigation.replace(destination);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AuthHeader
            title="Create Account"
            subtitle="Join AgriBridge AI and explore smarter agriculture"
          />

          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>●</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>✉</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>☎</Text>
              <TextInput
                style={styles.input}
                placeholder="03XXXXXXXXX"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.showPassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleRegister}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>Create Account</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login', { role })}>
                <Text style={styles.linkText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
       <View style={styles.bottomDecoration}>
        <View style={styles.hillOne} />
            <View style={styles.hillTwo} />
            <View style={styles.hillThree} />
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 25,
  },
  container: {
    paddingHorizontal: 15,
    width: '100%',
    maxWidth: 520,
    marginTop: -20,
    marginBottom: 30,
    alignSelf: 'center',
  },
  form: {
    backgroundColor: colors.surface,
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E4ECE5',
    shadowColor: '#174B30',
    shadowOpacity: 0.07,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#263B30',
    marginBottom: 8,
    marginTop: 10,
  },
  inputContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCE6DE',
    borderRadius: 13,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    fontSize: 17,
    color: colors.primary,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: colors.text,
  },
  showPassword: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    paddingLeft: 8,
  },
  primaryButton: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 22,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  arrow: {
    position: 'absolute',
    right: 20,
    color: '#FFFFFF',
    fontSize: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  linkText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
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
    bottom: -48,
    borderRadius: 100,
    backgroundColor: '#b0ec94',
  },

  hillTwo: {
    position: 'absolute',
    width: '120%',
    height: 85,
    left: '-10%',
    bottom: -58,
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
