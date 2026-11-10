import React from 'react';
import { EmptyState } from '../../components/consumer/Common';
import { FarmerScreen, InfoCard, Notice } from '../../components/farmer/FarmerParts';

const NotificationsScreen = ({ navigation }) => (
  <FarmerScreen navigation={navigation} title="Notifications" active="Profile" showBell={false}>
    <InfoCard>
      <EmptyState
        icon="notifications-outline" title="No new notifications"
        message="New scan results and farm updates will appear here."
      />
    </InfoCard>
    <Notice icon="checkmark-circle" text="You are all caught up. Check back after your next scan." />
  </FarmerScreen>
);

export default NotificationsScreen;
