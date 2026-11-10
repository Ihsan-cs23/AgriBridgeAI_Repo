import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatPrice, palette, radius, shadow } from '../../theme/consumerTheme';

/** Image with a green leaf placeholder if the URL fails to load. */
export function SafeImage({ source, style, resizeMode = 'cover' }) {
  const [failed, setFailed] = useState(false);
  if (failed || !source) {
    return (
      <View style={[{ backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' }, style]}>
        <Ionicons name="leaf" size={22} color={palette.primary} />
      </View>
    );
  }
  return <Image source={source} style={style} resizeMode={resizeMode} onError={() => setFailed(true)} />;
}

export function AppHeader({ title, onBack, right, left }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.header, { paddingTop: insets.top + 8 }]}>
      <View style={s.side}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={10} style={s.iconBtn} accessibilityLabel="Go back">
            <Ionicons name="chevron-back" size={24} color={palette.text} />
          </Pressable>
        ) : left}
      </View>
      <Text style={s.headerTitle} numberOfLines={1}>{title}</Text>
      <View style={[s.side, { alignItems: 'flex-end' }]}>{right}</View>
    </View>
  );
}

export function IconButton({ name, onPress, badge, color = palette.text, style }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={[s.iconBtn, style]}>
      <Ionicons name={name} size={23} color={color} />
      {badge > 0 ? (
        <View style={s.badge}><Text style={s.badgeText}>{badge > 9 ? '9+' : badge}</Text></View>
      ) : null}
    </Pressable>
  );
}

export function PrimaryButton({ title, onPress, icon, iconRight, variant = 'solid', loading, disabled, small, style }) {
  const solid = variant === 'solid';
  const soft = variant === 'soft';
  const fg = solid ? '#fff' : palette.primary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        s.btn, small && s.btnSmall,
        solid && { backgroundColor: palette.primary },
        soft && { backgroundColor: palette.primaryLight },
        variant === 'outline' && { borderWidth: 1.5, borderColor: palette.primary, backgroundColor: '#fff' },
        variant === 'danger' && { borderWidth: 1.5, borderColor: palette.error, backgroundColor: '#fff' },
        (disabled || loading) && { opacity: 0.6 },
        pressed && { opacity: 0.85 },
        style
      ]}
    >
      {loading ? <ActivityIndicator color={fg} /> : (
        <>
          {icon ? <Ionicons name={icon} size={small ? 15 : 18} color={variant === 'danger' ? palette.error : fg} style={{ marginRight: 6 }} /> : null}
          <Text style={[s.btnText, small && { fontSize: 13 }, { color: variant === 'danger' ? palette.error : fg }]}>{title}</Text>
          {iconRight ? <Ionicons name={iconRight} size={small ? 15 : 18} color={fg} style={{ marginLeft: 6 }} /> : null}
        </>
      )}
    </Pressable>
  );
}

export function SectionHeader({ title, actionLabel, onAction, style }) {
  return (
    <View style={[s.sectionRow, style]}>
      <Text style={s.sectionTitle}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onAction} hitSlop={8} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={s.sectionAction}>{actionLabel}</Text>
          <Ionicons name="arrow-forward" size={14} color={palette.primary} style={{ marginLeft: 3 }} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function SearchBar({ value, onChangeText, onSubmit, placeholder = 'Search for products...', onFilter, autoFocus, onPress, style }) {
  const body = (
    <View style={[s.search, style]}>
      <Ionicons name="search" size={19} color={palette.textSecondary} />
      {onPress ? (
        <Text style={[s.searchInput, { color: palette.textSecondary, paddingVertical: 12 }]}>{placeholder}</Text>
      ) : (
        <TextInput
          value={value} onChangeText={onChangeText} onSubmitEditing={onSubmit} autoFocus={autoFocus}
          placeholder={placeholder} placeholderTextColor={palette.textSecondary}
          returnKeyType="search" style={s.searchInput}
        />
      )}
      {!onPress && value ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}><Ionicons name="close-circle" size={18} color={palette.textSecondary} /></Pressable>
      ) : null}
      {onFilter ? (
        <Pressable onPress={onFilter} hitSlop={8} style={{ marginLeft: 10 }} accessibilityLabel="Filters">
          <Ionicons name="options-outline" size={22} color={palette.primaryDark} />
        </Pressable>
      ) : null}
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{body}</Pressable> : body;
}

export function FavoriteButton({ active, onPress, size = 20, style }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={[s.fav, style]} accessibilityLabel="Toggle favorite">
      <Ionicons name={active ? 'heart' : 'heart-outline'} size={size} color={active ? palette.primary : palette.textSecondary} />
    </Pressable>
  );
}

export function QuantitySelector({ value, onChange, min = 1, max = 99, compact }) {
  return (
    <View style={[s.qty, compact && { paddingHorizontal: 4 }]}>
      <Pressable onPress={() => value > min && onChange(value - 1)} hitSlop={6} style={s.qtyBtn} accessibilityLabel="Decrease quantity">
        <Ionicons name="remove" size={18} color={value <= min ? palette.border : palette.text} />
      </Pressable>
      <Text style={s.qtyText}>{value}</Text>
      <Pressable onPress={() => value < max && onChange(value + 1)} hitSlop={6} style={s.qtyBtn} accessibilityLabel="Increase quantity">
        <Ionicons name="add" size={18} color={palette.text} />
      </Pressable>
    </View>
  );
}

export function PriceSummary({ subtotal, deliveryFee, total, style }) {
  return (
    <View style={[s.summary, style]}>
      <View style={s.sumRow}><Text style={s.sumLabel}>Subtotal</Text><Text style={s.sumValue}>{formatPrice(subtotal)}</Text></View>
      <View style={s.sumRow}><Text style={s.sumLabel}>Delivery Fee</Text><Text style={s.sumValue}>{formatPrice(deliveryFee)}</Text></View>
      <View style={[s.sumRow, { marginTop: 4 }]}>
        <Text style={[s.sumLabel, s.sumTotal]}>Total</Text>
        <Text style={[s.sumValue, s.sumTotal]}>{formatPrice(total)}</Text>
      </View>
    </View>
  );
}

export function EmptyState({ icon = 'leaf-outline', title, message, actionLabel, onAction }) {
  return (
    <View style={s.empty}>
      <View style={s.emptyIcon}><Ionicons name={icon} size={40} color={palette.primary} /></View>
      <Text style={s.emptyTitle}>{title}</Text>
      {message ? <Text style={s.emptyMsg}>{message}</Text> : null}
      {actionLabel ? <PrimaryButton title={actionLabel} onPress={onAction} style={{ marginTop: 18, alignSelf: 'stretch' }} /> : null}
    </View>
  );
}

export function Chip({ label, active, onPress, icon }) {
  return (
    <Pressable onPress={onPress} style={[s.chip, active && s.chipActive]}>
      {icon ? <Ionicons name={icon} size={13} color={active ? '#fff' : palette.textSecondary} style={{ marginRight: 4 }} /> : null}
      <Text style={[s.chipText, active && { color: '#fff', fontWeight: '700' }]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingBottom: 10, backgroundColor: palette.headerTint },
  side: { width: 72, minHeight: 40, justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 19, fontWeight: '800', color: palette.text },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 3, right: 1, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: palette.error, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  btn: { minHeight: 50, borderRadius: radius.pill, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  btnSmall: { minHeight: 38, paddingHorizontal: 14 },
  btnText: { fontSize: 16, fontWeight: '700' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: palette.text },
  sectionAction: { fontSize: 13, fontWeight: '700', color: palette.primary },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: palette.backgroundAlt, borderRadius: radius.pill, borderWidth: 1, borderColor: palette.border, paddingHorizontal: 16, minHeight: 46 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: palette.text, paddingVertical: 8 },
  fav: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' },
  qty: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: palette.border, borderRadius: radius.pill, backgroundColor: '#fff', paddingHorizontal: 6, height: 42 },
  qtyBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  qtyText: { minWidth: 28, textAlign: 'center', fontSize: 16, fontWeight: '700', color: palette.text },
  summary: { backgroundColor: palette.backgroundAlt, borderRadius: radius.lg, padding: 16, borderWidth: 1, borderColor: palette.border },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  sumLabel: { fontSize: 15, color: palette.text, fontWeight: '500' },
  sumValue: { fontSize: 15, color: palette.text, fontWeight: '600' },
  sumTotal: { fontSize: 19, fontWeight: '800' },
  empty: { alignItems: 'center', paddingHorizontal: 32, paddingVertical: 56 },
  emptyIcon: { width: 84, height: 84, borderRadius: 42, backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { marginTop: 18, fontSize: 19, fontWeight: '800', color: palette.text, textAlign: 'center' },
  emptyMsg: { marginTop: 8, fontSize: 14, lineHeight: 20, color: palette.textSecondary, textAlign: 'center' },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 36, borderRadius: radius.pill, backgroundColor: palette.backgroundAlt, borderWidth: 1, borderColor: palette.border, marginRight: 8 },
  chipActive: { backgroundColor: palette.primary, borderColor: palette.primary },
  chipText: { fontSize: 13, color: palette.text, fontWeight: '500' }
});
