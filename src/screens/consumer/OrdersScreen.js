import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { orderStatus, useConsumer } from '../../context/ConsumerContext';
import { palette } from '../../theme/consumerTheme';
import { AppHeader, Chip, EmptyState } from '../../components/consumer/Common';
import { OrderCard } from '../../components/consumer/OrderParts';

const TABS = ['All Orders', 'Processing', 'On the Way', 'Delivered', 'Cancelled'];

export default function OrdersScreen({ navigation }) {
  const { orders } = useConsumer();
  const [tab, setTab] = useState('All Orders');
  const list = orders.filter((o) => tab === 'All Orders' || orderStatus(o) === tab);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title="My Orders" />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tabs}>
          {TABS.map((t) => <Chip key={t} label={t} active={tab === t} onPress={() => setTab(t)} />)}
        </ScrollView>
      </View>
      <FlatList
        data={list} keyExtractor={(o) => o.id}
        contentContainerStyle={{ padding: 16, paddingTop: 6 }}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onTrack={() => navigation.navigate('DeliveryTracking', { orderId: item.id })}
            onDetails={() => navigation.navigate('DeliveryTracking', { orderId: item.id })}
          />
        )}
        ListEmptyComponent={<EmptyState icon="cube-outline" title="No orders here" message={tab === 'All Orders' ? "You haven't placed any orders yet." : `You have no ${tab.toLowerCase()} orders.`} actionLabel="Shop Now" onAction={() => navigation.navigate('Search')} />}
      />
    </View>
  );
}

const s = StyleSheet.create({ tabs: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: palette.headerTint } });
