import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useConsumer } from '../../context/ConsumerContext';
import { palette } from '../../theme/consumerTheme';
import { AppHeader, EmptyState, IconButton, PrimaryButton } from '../../components/consumer/Common';
import { NotificationCard } from '../../components/consumer/OrderParts';

const SETTINGS = [
  ['orders', 'Order updates'],
  ['offers', 'Special offers'],
  ['products', 'New products'],
  ['farmers', 'Farmer updates']
];

export default function NotificationsScreen({ navigation }) {
  const { notifications, unreadCount, markRead, markAllRead } = useConsumer();
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState({ orders: true, offers: true, products: true, farmers: true });

  const onPress = (n) => {
    markRead(n.id);
    if (n.orderId) navigation.navigate('DeliveryTracking', { orderId: n.orderId });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title="Notifications" onBack={() => navigation.goBack()} right={<IconButton name="settings-outline" onPress={() => setOpen(true)} />} />
      {unreadCount > 0 ? (
        <View style={s.bar}>
          <Text style={s.barText}>{unreadCount} unread</Text>
          <Pressable onPress={markAllRead} hitSlop={8}><Text style={s.link}>Mark all as read</Text></Pressable>
        </View>
      ) : null}
      <FlatList
        data={notifications} keyExtractor={(n) => n.id}
        renderItem={({ item }) => <NotificationCard item={item} onPress={() => onPress(item)} onMarkRead={() => markRead(item.id)} />}
        ListEmptyComponent={<EmptyState icon="notifications-off-outline" title="No notifications" message="Order updates and offers will appear here." />}
      />
      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={s.backdrop} onPress={() => setOpen(false)} />
        <View style={s.sheet}>
          <View style={s.handle} />
          <Text style={s.title}>Notification Settings</Text>
          {SETTINGS.map(([key, label]) => (
            <View key={key} style={s.pref}>
              <Text style={s.prefText}>{label}</Text>
              <Switch value={prefs[key]} onValueChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))} trackColor={{ true: palette.primary }} />
            </View>
          ))}
          <PrimaryButton title="Done" onPress={() => setOpen(false)} style={{ marginTop: 14 }} />
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: palette.backgroundAlt },
  barText: { fontSize: 13, color: palette.textSecondary, fontWeight: '600' },
  link: { fontSize: 13, color: palette.primary, fontWeight: '800' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, paddingBottom: 34 },
  handle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: palette.border, marginBottom: 14 },
  title: { fontSize: 19, fontWeight: '800', color: palette.text, marginBottom: 8 },
  pref: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  prefText: { fontSize: 15, color: palette.text, fontWeight: '500' }
});
