import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useConsumer } from '../../context/ConsumerContext';
import { palette, radius } from '../../theme/consumerTheme';
import { PrimaryButton } from './Common';

/** Bottom sheet to pick or add a delivery address. Used by Checkout and Profile. */
export default function AddressModal({ visible, onClose }) {
  const { addresses, selectedAddressId, selectAddress, addAddress, showToast } = useConsumer();
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState('');
  const [text, setText] = useState('');

  const save = () => {
    if (text.trim().length < 8) return showToast('Please enter a complete address', 'info');
    addAddress(label.trim(), text.trim());
    setLabel(''); setText(''); setAdding(false); onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.sheetWrap}>
        <View style={s.sheet}>
          <View style={s.handle} />
          <Text style={s.title}>{adding ? 'Add New Address' : 'My Addresses'}</Text>
          {adding ? (
            <View>
              <TextInput value={label} onChangeText={setLabel} placeholder="Label (Home, Office…)" placeholderTextColor={palette.textSecondary} style={s.input} />
              <TextInput value={text} onChangeText={setText} placeholder="Full delivery address" placeholderTextColor={palette.textSecondary} style={[s.input, { height: 90, textAlignVertical: 'top' }]} multiline />
              <PrimaryButton title="Save Address" onPress={save} />
              <PrimaryButton title="Cancel" variant="soft" onPress={() => setAdding(false)} style={{ marginTop: 10 }} />
            </View>
          ) : (
            <>
              <ScrollView style={{ maxHeight: 320 }}>
                {addresses.map((a) => {
                  const active = a.id === selectedAddressId;
                  return (
                    <Pressable key={a.id} onPress={() => { selectAddress(a.id); onClose(); }} style={[s.item, active && s.itemActive]}>
                      <Ionicons name="location" size={22} color={palette.primary} />
                      <View style={{ flex: 1, marginHorizontal: 12 }}>
                        <Text style={s.itemLabel}>{a.label}</Text>
                        <Text style={s.itemText}>{a.text}</Text>
                      </View>
                      {active ? <Ionicons name="checkmark-circle" size={22} color={palette.primary} /> : null}
                    </Pressable>
                  );
                })}
              </ScrollView>
              <PrimaryButton title="Add New Address" icon="add" variant="outline" onPress={() => setAdding(true)} style={{ marginTop: 12 }} />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheetWrap: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, paddingBottom: 32 },
  handle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: palette.border, marginBottom: 14 },
  title: { fontSize: 19, fontWeight: '800', color: palette.text, marginBottom: 14 },
  input: { borderWidth: 1, borderColor: palette.border, borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: palette.text, marginBottom: 12, backgroundColor: palette.backgroundAlt },
  item: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: radius.md, borderWidth: 1, borderColor: palette.border, marginBottom: 10 },
  itemActive: { borderColor: palette.primary, backgroundColor: palette.primaryLight },
  itemLabel: { fontSize: 15, fontWeight: '800', color: palette.text },
  itemText: { marginTop: 2, fontSize: 13, color: palette.textSecondary }
});
