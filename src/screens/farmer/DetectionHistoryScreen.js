import React from 'react';
import { EmptyState } from '../../components/consumer/Common';
import { FarmerScreen, InfoCard, Notice } from '../../components/farmer/FarmerParts';

const DetectionHistoryScreen = ({ navigation }) => (
  <FarmerScreen navigation={navigation} title="Detection History" active="Analytics" back={false}>
    <InfoCard>
      <EmptyState
        icon="scan-outline" title="No scans recorded yet"
        message="Start your first plant health scan. Saved results will appear here when history storage is connected."
        actionLabel="Start Scanning" onAction={() => navigation.navigate('DiseaseDetection')}
      />
    </InfoCard>
    <Notice
      title="Note"
      text="History is currently a UI placeholder. Connect local storage or your backend to persist scan records."
    />
  </FarmerScreen>
);

export default DetectionHistoryScreen;
