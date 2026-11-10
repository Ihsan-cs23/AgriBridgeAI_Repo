import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DELIVERY_FEE, SEED_ADDRESSES, SEED_PROFILE, buildSeedNotifications, buildSeedOrders, getProduct
} from '../data/consumerData';
import { palette } from '../theme/consumerTheme';

const STORAGE_KEY = 'agribridge.consumer.v1';
const ConsumerContext = createContext(null);

export const useConsumer = () => {
  const ctx = useContext(ConsumerContext);
  if (!ctx) throw new Error('useConsumer must be used inside <ConsumerProvider>');
  return ctx;
};

export const orderStatus = (o) => (o.cancelled ? 'Cancelled' : o.step >= 3 ? 'Delivered' : o.step === 2 ? 'On the Way' : 'Processing');

const buildInitial = () => ({
  cart: [],
  favorites: [],
  orders: buildSeedOrders(),
  notifications: buildSeedNotifications(),
  profile: SEED_PROFILE,
  addresses: SEED_ADDRESSES,
  selectedAddressId: SEED_ADDRESSES[0].id,
  recentSearches: ['Tomatoes', 'Onions', 'Potatoes']
});

export function ConsumerProvider({ children, onLogout }) {
  const [state, setState] = useState(buildInitial);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Load persisted data once
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
      } catch (e) { /* ignore and use defaults */ }
      setReady(true);
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);

  const patch = useCallback((fn) => setState((s) => ({ ...s, ...fn(s) })), []);

  // ---- Toast ----
  const toastAnim = useRef(new Animated.Value(0)).current;
  const toastTimer = useRef(null);
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    clearTimeout(toastTimer.current);
    Animated.timing(toastAnim, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    toastTimer.current = setTimeout(() => {
      Animated.timing(toastAnim, { toValue: 0, duration: 220, useNativeDriver: true }).start();
    }, 1800);
  }, [toastAnim]);

  // ---- Cart ----
  const addToCart = useCallback((productId, qty = 1) => {
    patch((s) => {
      const existing = s.cart.find((i) => i.productId === productId);
      return {
        cart: existing
          ? s.cart.map((i) => (i.productId === productId ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
          : [...s.cart, { productId, qty }]
      };
    });
    showToast(`${getProduct(productId)?.name} added to cart`);
  }, [patch, showToast]);

  const updateQty = useCallback((productId, qty) => {
    patch((s) => ({ cart: s.cart.map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i)) }));
  }, [patch]);

  const removeFromCart = useCallback((productId) => {
    patch((s) => ({ cart: s.cart.filter((i) => i.productId !== productId) }));
    showToast('Removed from cart', 'info');
  }, [patch, showToast]);

  const clearCart = useCallback(() => patch(() => ({ cart: [] })), [patch]);

  // ---- Favorites ----
  const toggleFavorite = useCallback((productId) => {
    const isFav = stateRef.current.favorites.includes(productId);
    patch((s) => ({ favorites: isFav ? s.favorites.filter((f) => f !== productId) : [...s.favorites, productId] }));
    showToast(isFav ? 'Removed from favorites' : 'Added to favorites', isFav ? 'info' : 'success');
  }, [patch, showToast]);

  // ---- Notifications ----
  const pushNotification = (s, n) => [{ id: `n${Date.now()}${Math.random().toString(36).slice(2, 5)}`, createdAt: Date.now(), read: false, ...n }, ...s.notifications];
  const markRead = useCallback((id) => patch((s) => ({ notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) })), [patch]);
  const markAllRead = useCallback(() => {
    patch((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
    showToast('All notifications marked as read');
  }, [patch, showToast]);

  // ---- Orders ----
  const placeOrder = useCallback(({ paymentMethod }) => {
    const s = stateRef.current;
    const lines = s.cart.map((i) => ({ productId: i.productId, qty: i.qty, price: getProduct(i.productId).price }));
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
    const maxNum = Math.max(12345, ...s.orders.map((o) => parseInt(o.id.replace(/\D/g, ''), 10) || 0));
    const address = s.addresses.find((a) => a.id === s.selectedAddressId) || s.addresses[0];
    const order = {
      id: `#AGB${maxNum + 1}`, createdAt: new Date().toISOString(), step: 0, cancelled: false,
      items: lines, subtotal, deliveryFee: DELIVERY_FEE, total: subtotal + DELIVERY_FEE, paymentMethod,
      address: address ? address.text : '', verificationCode: String(1000 + Math.floor(Math.random() * 9000))
    };
    patch((st) => ({
      orders: [order, ...st.orders],
      cart: [],
      notifications: pushNotification(st, { type: 'processing', title: `Your order ${order.id}`, body: 'has been placed and is being processed.', orderId: order.id })
    }));
    return order;
  }, [patch]);

  const advanceOrder = useCallback((id) => {
    patch((s) => {
      const o = s.orders.find((x) => x.id === id);
      if (!o || o.cancelled || o.step >= 3) return {};
      const step = o.step + 1;
      const extra = step === 2
        ? { type: 'onway', title: `Your order ${id}`, body: 'is on the way.', orderId: id }
        : step === 3 ? { type: 'delivered', title: `Your order ${id}`, body: 'has been delivered.', orderId: id }
        : { type: 'processing', title: `Your order ${id}`, body: 'is being prepared by the farmer.', orderId: id };
      return { orders: s.orders.map((x) => (x.id === id ? { ...x, step } : x)), notifications: pushNotification(s, extra) };
    });
  }, [patch]);

  const confirmDelivery = useCallback((id) => {
    patch((s) => ({
      orders: s.orders.map((x) => (x.id === id ? { ...x, step: 3 } : x)),
      notifications: pushNotification(s, { type: 'delivered', title: `Your order ${id}`, body: 'has been delivered.', orderId: id })
    }));
  }, [patch]);

  const cancelOrder = useCallback((id) => {
    patch((s) => ({ orders: s.orders.map((x) => (x.id === id && x.step < 2 ? { ...x, cancelled: true } : x)) }));
    showToast('Order cancelled', 'info');
  }, [patch, showToast]);

  // ---- Profile / addresses / searches ----
  const updateProfile = useCallback((data) => {
    patch((s) => ({ profile: { ...s.profile, ...data }, notifications: pushNotification(s, { type: 'account', title: 'Account updated', body: 'Your profile has been updated.', read: true }) }));
    showToast('Profile updated');
  }, [patch, showToast]);

  const addAddress = useCallback((label, text) => {
    const id = `a${Date.now()}`;
    patch((s) => ({ addresses: [...s.addresses, { id, label: label || 'Other', text }], selectedAddressId: id }));
    showToast('Address added');
  }, [patch, showToast]);
  const selectAddress = useCallback((id) => patch(() => ({ selectedAddressId: id })), [patch]);

  const addRecentSearch = useCallback((q) => {
    const t = q.trim();
    if (!t) return;
    patch((s) => ({ recentSearches: [t, ...s.recentSearches.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, 6) }));
  }, [patch]);
  const clearRecentSearches = useCallback(() => patch(() => ({ recentSearches: [] })), [patch]);

  const logout = useCallback(() => {
    if (onLogout) onLogout();
    else showToast('Logged out (connect onLogout to your auth flow)', 'info');
  }, [onLogout, showToast]);

  // ---- Derived ----
  const derived = useMemo(() => {
    const cartItems = state.cart.map((i) => ({ ...i, product: getProduct(i.productId) })).filter((i) => i.product);
    const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);
    const deliveryFee = cartItems.length ? DELIVERY_FEE : 0;
    return {
      cartItems, subtotal, deliveryFee, total: subtotal + deliveryFee,
      cartCount: cartItems.reduce((s, i) => s + i.qty, 0),
      unreadCount: state.notifications.filter((n) => !n.read).length
    };
  }, [state.cart, state.notifications]);

  const value = {
    ...state, ...derived, ready,
    isFavorite: (id) => state.favorites.includes(id),
    addToCart, updateQty, removeFromCart, clearCart, toggleFavorite,
    markRead, markAllRead, placeOrder, advanceOrder, confirmDelivery, cancelOrder,
    updateProfile, addAddress, selectAddress, addRecentSearch, clearRecentSearches, showToast, logout
  };

  return (
    <ConsumerContext.Provider value={value}>
      {children}
      {toast ? (
        <Animated.View pointerEvents="none" style={[styles.toastWrap, { opacity: toastAnim, transform: [{ translateY: toastAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }]}>
          <View style={[styles.toast, { backgroundColor: toast.type === 'info' ? palette.text : palette.primaryDark }]}>
            <Text style={styles.toastText}>{toast.message}</Text>
          </View>
        </Animated.View>
      ) : null}
    </ConsumerContext.Provider>
  );
}

const styles = StyleSheet.create({
  toastWrap: { position: 'absolute', left: 20, right: 20, bottom: 110, alignItems: 'center' },
  toast: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 14, maxWidth: '100%' },
  toastText: { color: '#fff', fontSize: 14, fontWeight: '600' }
});
