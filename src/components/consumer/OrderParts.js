import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProduct } from '../../data/consumerData';
import { orderStatus } from '../../context/ConsumerContext';
import { formatDateTime, formatPrice, palette, radius, shadow, timeAgo } from '../../theme/consumerTheme';
import { PrimaryButton, SafeImage } from './Common';

const STATUS = {
  Delivered: { fg: palette.success, bg: '#E6F6EA', icon: 'checkmark-circle' },
  Processing: { fg: '#B45309', bg: '#FEF3C7', icon: 'time' },
  'On the Way': { fg: palette.info, bg: '#E0ECFF', icon: 'bicycle' },
  Cancelled: { fg: palette.error, bg: '#FEE2E2', icon: 'close-circle' }
};

export function OrderStatusBadge({ status }) {
  const c = STATUS[status] || STATUS.Processing;
  return (
    <View style={[s.badge, { backgroundColor: c.bg }]}>
      <Ionicons name={c.icon} size={13} color={c.fg} />
      <Text style={[s.badgeText, { color: c.fg }]}>{status}</Text>
    </View>
  );
}

const STEPS = ['Confirmed', 'Preparing', 'On the Way', 'Delivered'];

export function DeliveryProgressTracker({ step = 0, cancelled }) {
  const color = palette.primary;
  return (
    <View style={s.track}>
      {STEPS.map((label, i) => {
        const done = !cancelled && i <= step;
        return (
          <View key={label} style={s.col}>
            {i > 0 ? <View style={[s.line, { backgroundColor: done ? color : palette.border }]} /> : null}
            <View style={[s.dot, done && { backgroundColor: color, borderColor: color }]}>
              {done ? <Ionicons name="checkmark" size={12} color="#fff" /> : null}
            </View>
            <Text style={[s.stepLabel, done && { color: palette.text, fontWeight: '700' }]} numberOfLines={1}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
}

export function OrderCard({ order, onTrack, onDetails }) {
  const status = orderStatus(order);
  const active = !order.cancelled && order.step < 3;
  return (
    <View style={s.card}>
      <View style={s.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={s.orderId}>{order.id}</Text>
          <Text style={s.date}>{formatDateTime(order.createdAt)}</Text>
        </View>
        <OrderStatusBadge status={status} />
      </View>
      <View style={s.midRow}>
        <View style={{ flexDirection: 'row' }}>
          {order.items.slice(0, 3).map((it, idx) => (
            <SafeImage key={it.productId} source={getProduct(it.productId)?.image} style={[s.thumb, idx > 0 && { marginLeft: -10 }]} />
          ))}
          {order.items.length > 3 ? <View style={[s.thumb, s.more, { marginLeft: -10 }]}><Text style={s.moreText}>+{order.items.length - 3}</Text></View> : null}
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={s.amount}>{formatPrice(order.total)}</Text>
          <Text style={s.date}>{order.items.length} item{order.items.length > 1 ? 's' : ''}</Text>
        </View>
      </View>
      <DeliveryProgressTracker step={order.step} cancelled={order.cancelled} />
      <View style={s.btnRow}>
        {active ? <PrimaryButton title="Track Order" small icon="navigate" onPress={onTrack} style={{ flex: 1, marginRight: 8 }} /> : null}
        <PrimaryButton title="View Details" small variant="outline" iconRight="chevron-forward" onPress={onDetails} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const NOTIF = {
  delivered: { icon: 'checkmark-circle', fg: palette.success, bg: '#E6F6EA' },
  onway: { icon: 'bicycle', fg: palette.info, bg: '#E0ECFF' },
  processing: { icon: 'time', fg: '#B45309', bg: '#FEF3C7' },
  offer: { icon: 'pricetag', fg: palette.warning, bg: '#FEF3C7' },
  product: { icon: 'leaf', fg: palette.primary, bg: palette.primaryLight },
  farmer: { icon: 'person', fg: palette.primaryDark, bg: palette.primaryLight },
  account: { icon: 'information-circle', fg: palette.info, bg: '#E0ECFF' }
};

export function NotificationCard({ item, onPress, onMarkRead }) {
  const c = NOTIF[item.type] || NOTIF.account;
  return (
    <Pressable onPress={onPress} style={[s.notif, !item.read && { backgroundColor: '#F4FBF0' }]}>
      <View style={[s.nIcon, { backgroundColor: c.bg }]}><Ionicons name={c.icon} size={22} color={c.fg} /></View>
      <View style={{ flex: 1, marginHorizontal: 12 }}>
        <Text style={[s.nTitle, !item.read && { fontWeight: '800' }]}>{item.title}</Text>
        <Text style={s.nBody}>{item.body}</Text>
        {!item.read ? (
          <Pressable onPress={onMarkRead} hitSlop={8}><Text style={s.markRead}>Mark as read</Text></Pressable>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={s.nTime}>{timeAgo(item.createdAt)}</Text>
        {!item.read ? <View style={s.unread} /> : <Ionicons name="chevron-forward" size={14} color={palette.textSecondary} style={{ marginTop: 8 }} />}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: 26, borderRadius: radius.pill },
  badgeText: { marginLeft: 4, fontSize: 12, fontWeight: '700' },
  track: { flexDirection: 'row', marginTop: 4, marginBottom: 14 },
  col: { flex: 1, alignItems: 'center' },
  line: { position: 'absolute', top: 9, left: '-50%', width: '100%', height: 2 },
  dot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: palette.border, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  stepLabel: { marginTop: 6, fontSize: 10.5, color: palette.textSecondary },
  card: { backgroundColor: '#fff', borderRadius: radius.lg, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: palette.border, ...shadow },
  topRow: { flexDirection: 'row', alignItems: 'flex-start' },
  orderId: { fontSize: 17, fontWeight: '800', color: palette.text },
  date: { marginTop: 3, fontSize: 12.5, color: palette.textSecondary },
  midRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 12 },
  thumb: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#fff' },
  more: { backgroundColor: palette.primaryLight, alignItems: 'center', justifyContent: 'center' },
  moreText: { fontSize: 12, fontWeight: '800', color: palette.primaryDark },
  amount: { fontSize: 18, fontWeight: '800', color: palette.text },
  btnRow: { flexDirection: 'row' },
  notif: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: palette.border },
  nIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  nTitle: { fontSize: 15, fontWeight: '600', color: palette.text },
  nBody: { marginTop: 2, fontSize: 13.5, color: palette.textSecondary, lineHeight: 19 },
  markRead: { marginTop: 6, fontSize: 12.5, fontWeight: '700', color: palette.primary },
  nTime: { fontSize: 12, color: palette.textSecondary },
  unread: { marginTop: 8, width: 10, height: 10, borderRadius: 5, backgroundColor: palette.primary }
});
