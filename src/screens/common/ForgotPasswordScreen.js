
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

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!email.trim()) {
      alert('Please enter your email address.');
      return;
    }

    // Demo only. Connect this action to a password-reset API later.
    alert('Password reset functionality will be connected to the backend.');
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Back to Login</Text>
          </TouchableOpacity>

          <AuthHeader
            title="Forgot Password?"
            subtitle="No worries. Enter your registered email address and we'll help you reset your password."
          />

          <View style={styles.form}>
            <View style={styles.infoIcon}>
              <Text style={styles.mailIcon}>✉</Text>
            </View>

            <Text style={styles.label}>Email Address</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>✉</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your registered email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleReset}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>Send Reset Link</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>Remember your password? Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.bottomText}>
            AgriBridge AI • Smart Agriculture, Better Future
          </Text>
         
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
    paddingVertical: 30,
  },
  container: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    paddingHorizontal: 25,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backArrow: {
    fontSize: 23,
    color: colors.primary,
    marginRight: 9,
  },
  backText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  form: {
    backgroundColor: colors.surface,
    padding: 23,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E4ECE5',
    shadowColor: '#174B30',
    shadowOpacity: 0.07,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  infoIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  mailIcon: {
    fontSize: 32,
    color: colors.primary,
  },
  label: {
    color: '#263B30',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 9,
  },
  inputContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: '#DCE6DE',
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 11,
    color: colors.primary,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: colors.text,
  },
  primaryButton: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  arrow: {
    position: 'absolute',
    right: 20,
    color: '#FFFFFF',
    fontSize: 22,
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  bottomText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 28,
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
