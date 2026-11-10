import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Linking, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConsumer } from '../../context/ConsumerContext';
import { PAYMENT_METHODS } from '../../data/consumerData';
import { palette, radius } from '../../theme/consumerTheme';
import { IconButton, PrimaryButton, SafeImage } from '../../components/consumer/Common';
import AddressModal from '../../components/consumer/AddressModal';

export default function ConsumerProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { profile, updateProfile, logout, showToast } = useConsumer();
  const [editOpen, setEditOpen] = useState(false);
  const [addrOpen, setAddrOpen] = useState(false);
  const [form, setForm] = useState(profile);

  const openEdit = () => { setForm(profile); setEditOpen(true); };
  const save = () => {
    if (!form.name.trim()) return showToast('Name is required', 'info');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return showToast('Enter a valid email', 'info');
    updateProfile({ name: form.name.trim(), email: form.email.trim(), phone: form.phone });
    setEditOpen(false);
  };

  const items = [
    ['bag-handle', 'My Orders', () => navigation.navigate('Orders')],
    ['heart', 'My Favorites', () => navigation.navigate('Favorites')],
    ['location', 'My Addresses', () => setAddrOpen(true)],
    ['card', 'Payment Methods', () => Alert.alert('Payment Methods', PAYMENT_METHODS.map((m) => `• ${m.label}`).join('\n'))],
    ['notifications', 'Notifications', () => navigation.navigate('Notifications')],
    ['settings', 'Settings', () => Alert.alert('Settings', 'Language: English\nCurrency: Pakistani Rupee (Rs.)\nVersion 1.0.0')],
    ['help-circle', 'Help & Support', () => Linking.openURL('mailto:support@agribridge.ai').catch(() => showToast('No mail app available', 'info'))],
    ['information-circle', 'About AgriBridge AI', () => Alert.alert('AgriBridge AI', 'Fresh Produce. Healthy Life.\nConnecting farmers directly with customers.')]
  ];

  const Field = ({ label, k, keyboardType }) => (
    <View style={{ marginBottom: 12 }}>
      <Text style={s.label}>{label}</Text>
      <TextInput value={form[k]} onChangeText={(t) => setForm((f) => ({ ...f, [k]: t }))} keyboardType={keyboardType} autoCapitalize={k === 'email' ? 'none' : 'words'} style={s.input} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View style={[s.top, { paddingTop: insets.top + 12 }]}>
          <View style={{ alignItems: 'flex-end' }}>
            <IconButton name="settings" color={palette.text} onPress={() => navigation.navigate('Notifications')} />
          </View>
          <View style={s.userRow}>
            <SafeImage source={profile.avatar} style={s.avatar} />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={s.name}>{profile.name}</Text>
              <Text style={s.email}>{profile.email}</Text>
              <PrimaryButton title="Edit Profile" icon="create-outline" small variant="soft" onPress={openEdit} style={{ marginTop: 10, alignSelf: 'flex-start' }} />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          {items.map(([icon, label, onPress]) => (
            <Pressable key={label} onPress={onPress} style={s.item}>
              <View style={s.itemIcon}><Ionicons name={icon} size={19} color={palette.primaryDark} /></View>
              <Text style={s.itemText}>{label}</Text>
              <Ionicons name="chevron-forward" size={18} color={palette.textSecondary} />
            </Pressable>
          ))}
          <PrimaryButton
            title="Log Out" icon="log-out-outline" variant="soft" style={{ marginTop: 18 }}
            onPress={() => Alert.alert('Log out', 'Are you sure you want to log out?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Log Out', style: 'destructive', onPress: logout }])}
          />
        </View>
      </ScrollView>

      <Modal visible={editOpen} transparent animationType="slide" onRequestClose={() => setEditOpen(false)}>
        <Pressable style={s.backdrop} onPress={() => setEditOpen(false)} />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.sheetWrap}>
          <View style={s.sheet}>
            <View style={s.handle} />
            <Text style={s.sheetTitle}>Edit Profile</Text>
            <Field label="Full name" k="name" />
            <Field label="Email" k="email" keyboardType="email-address" />
            <Field label="Phone" k="phone" keyboardType="phone-pad" />
            <PrimaryButton title="Save Changes" onPress={save} style={{ marginTop: 6 }} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <AddressModal visible={addrOpen} onClose={() => setAddrOpen(false)} />
    </View>
  );
}

const s = StyleSheet.create({
  top: { backgroundColor: palette.headerTint, paddingHorizontal: 16, paddingBottom: 22 },
  userRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 92, height: 92, borderRadius: 46, borderWidth: 3, borderColor: '#fff' },
  name: { fontSize: 22, fontWeight: '800', color: palette.text },
  email: { marginTop: 2, fontSize: 14, color: palette.textSecondary },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: palette.border },
  itemIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  itemText: { flex: 1, marginLeft: 14, fontSize: 15.5, fontWeight: '600', color: palette.text },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheetWrap: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, paddingBottom: 32 },
  handle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: palette.border, marginBottom: 14 },
  sheetTitle: { fontSize: 19, fontWeight: '800', color: palette.text, marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '700', color: palette.textSecondary, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: palette.border, borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: palette.text, backgroundColor: palette.backgroundAlt }
});
