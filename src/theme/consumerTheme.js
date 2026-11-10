import { Platform } from 'react-native';

// Design tokens for the AgriBridge AI consumer experience.
// Kept separate from your existing theme/colors.js so nothing there is overwritten.
export const palette = {
  primary: '#087B20',
  primaryDark: '#075B19',
  primaryLight: '#E8F8DF',
  headerTint: '#F3FBEC',
  background: '#FFFFFF',
  backgroundAlt: '#F7F9F7',
  text: '#17202A',
  textSecondary: '#657080',
  border: '#E5E9E5',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
  info: '#2563EB'
};

export const radius = { sm: 10, md: 14, lg: 18, xl: 24, pill: 999 };

export const shadow = Platform.select({
  ios: { shadowColor: '#0B3D14', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  android: { elevation: 3 },
  default: {}
});

export const formatPrice = (n) => `Rs. ${String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

export const compactCount = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n));

export const formatDateTime = (iso) => {
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${date} • ${time}`;
};

export const timeAgo = (ts) => {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};
