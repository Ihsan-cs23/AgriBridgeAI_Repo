import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette, radius, shadow } from '../../theme/consumerTheme';
import { FarmerBottomNav, FarmerHeader } from './FarmerChrome';

/** Standard farmer page: header + scrollable body + bottom nav. */
export function FarmerScreen({ navigation, title, active, children, back = true, showBell = true, keyboard = false, contentStyle }) {
  const body = (
    <ScrollView
      showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
      contentContainerStyle={[{ padding: 16, paddingBottom: 30 }, contentStyle]}
    >
      {children}
    </ScrollView>
  );
  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <FarmerHeader navigation={navigation} title={title} back={back} showBell={showBell} />
      {keyboard ? <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>{body}</KeyboardAvoidingView> : body}
      <FarmerBottomNav navigation={navigation} active={active} />
    </View>
  );
}

export function InfoCard({ children, style }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function MenuRow({ icon, title, detail, onPress, danger, right }) {
  const color = danger ? palette.error : palette.primaryDark;
  return (
    <Pressable onPress={onPress} style={s.menuRow} disabled={!onPress}>
      <View style={[s.iconBox, danger && { backgroundColor: '#FEE2E2' }]}><Ionicons name={icon} size={21} color={color} /></View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={[s.menuTitle, danger && { color: palette.error }]}>{title}</Text>
        {detail ? <Text style={s.menuDetail}>{detail}</Text> : null}
      </View>
      {right || (onPress ? <Ionicons name="chevron-forward" size={18} color={palette.textSecondary} /> : null)}
    </Pressable>
  );
}

export const Divider = () => <View style={{ height: 1, backgroundColor: palette.border }} />;

export function FormField({ label, icon, style, ...inputProps }) {
  return (
    <View style={[{ marginBottom: 16 }, style]}>
      <Text style={s.label}>{label}</Text>
      <View style={s.inputWrap}>
        <Ionicons name={icon} size={20} color={palette.primary} />
        <TextInput {...inputProps} placeholderTextColor={palette.textSecondary} style={s.input} />
      </View>
    </View>
  );
}

export function StatTile({ icon, label, value, color = palette.primary }) {
  return (
    <View style={s.tile}>
      <View style={s.tileIcon}><Ionicons name={icon} size={22} color={color} /></View>
      <Text style={s.tileValue} numberOfLines={1}>{value}</Text>
      <Text style={s.tileLabel}>{label}</Text>
    </View>
  );
}

export function Notice({ icon = 'information-circle', title, text }) {
  return (
    <View style={s.notice}>
      <Ionicons name={icon} size={24} color={palette.primary} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        {title ? <Text style={s.noticeTitle}>{title}</Text> : null}
        <Text style={s.noticeText}>{text}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: radius.lg, padding: 16, borderWidth: 1, borderColor: palette.border, ...shadow },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13 },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  menuTitle: { fontSize: 15.5, fontWeight: '700', color: palette.text },
  menuDetail: { marginTop: 2, fontSize: 12.5, color: palette.textSecondary },
  label: { fontSize: 13, fontWeight: '700', color: palette.textSecondary, marginBottom: 6 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: palette.border, borderRadius: radius.md, backgroundColor: palette.backgroundAlt, paddingHorizontal: 14 },
  input: { flex: 1, marginLeft: 10, paddingVertical: 13, fontSize: 15, color: palette.text },
  tile: { width: '48%', backgroundColor: palette.primaryLight, borderRadius: radius.lg, paddingVertical: 16, paddingHorizontal: 8, alignItems: 'center', marginBottom: 10 },
  tileIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  tileValue: { marginTop: 8, fontSize: 15, fontWeight: '800', color: palette.text, textAlign: 'center' },
  tileLabel: { marginTop: 2, fontSize: 12, color: palette.textSecondary, textAlign: 'center' },
  notice: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: palette.primaryLight, borderRadius: radius.lg, padding: 16, marginTop: 16 },
  noticeTitle: { fontSize: 14, fontWeight: '800', color: palette.primaryDark },
  noticeText: { marginTop: 2, fontSize: 13, lineHeight: 19, color: palette.textSecondary }
});
