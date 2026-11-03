
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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert('Please enter your email and password.');
      return;
    }

    // Demo navigation only. Real authentication will be added with the backend.
    navigation.navigate('RoleSelection');
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
            title="Welcome Back!"
            subtitle="Login to your AgriBridge AI account"
          />

          <View style={styles.form}>
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

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
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
              style={styles.forgotButton}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>Login</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>Welcome to AgriBridge AI</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.linkText}>Create Account</Text>
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
    paddingVertical: 35,
  },
  container: {
    paddingHorizontal: 25,
    width: '100%',
    maxWidth: 520,
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
    marginTop: 12,
  },
  inputContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCE6DE',
    borderRadius: 13,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 11,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    height: '100%',
  },
  showPassword: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    paddingLeft: 8,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 13,
    marginBottom: 22,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  primaryButton: {
    height: 54,
    borderRadius: 15,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 22,
    position: 'absolute',
    right: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    color: colors.textSecondary,
    fontSize: 11,
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
