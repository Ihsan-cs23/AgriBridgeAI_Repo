// All remote images live here so they can be swapped for local assets later:
//   image: require('../../assets/products/tomatoes.png')
// (SafeImage accepts either a { uri } object or a require()'d asset.)
const u = (id, w = 600) => ({ uri: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70` });

export const IMAGES = {
  tomato: u('photo-1546094096-0df4bcaaa337'),
  onion: u('photo-1618512496248-a07fe83aa8cb'),
  potato: u('photo-1518977676601-b53f82aba655'),
  spinach: u('photo-1576045057995-568f588f82fb'),
  carrot: u('photo-1598170845058-32b9d6a5da37'),
  apple: u('photo-1560806887-1e4cd0b6cbd6'),
  banana: u('photo-1571771894821-ce9b6c11b08e'),
  mango: u('photo-1553279768-865429fa0078'),
  wheat: u('photo-1574323347407-f5e1ad6d020b'),
  rice: u('photo-1586201375761-83865001e31c'),
  honey: u('photo-1587049352846-4a222e784d38'),
  eggs: u('photo-1582722872445-44dc5f7e3c8f'),
  farm: u('photo-1500937386664-56d1dfef3854', 1000),
  hero: u('photo-1595855759920-86582396756a', 1000)
};

export const CATEGORIES = [
  { id: 'Vegetables', label: 'Vegetables', image: IMAGES.tomato },
  { id: 'Fruits', label: 'Fruits', image: IMAGES.apple },
  { id: 'Grains', label: 'Grains', image: IMAGES.wheat },
  { id: 'Others', label: 'Others', image: IMAGES.honey }
];

export const FARMERS = [
  { id: 'f1', name: 'Ali Khan', location: 'Faisalabad, Punjab', experience: '12 years', rating: 4.8, reviews: 320,
    avatar: { uri: 'https://i.pravatar.cc/200?img=12' }, cover: IMAGES.farm,
    about: 'Third-generation farmer growing vegetables and wheat using water-saving irrigation and natural fertilizers. Every harvest is hand-picked and delivered within 24 hours.' },
  { id: 'f2', name: 'Bilal Ahmed', location: 'Multan, Punjab', experience: '9 years', rating: 4.7, reviews: 210,
    avatar: { uri: 'https://i.pravatar.cc/200?img=33' }, cover: IMAGES.farm,
    about: 'Specialises in root vegetables. Bilal rotates crops every season to keep the soil healthy and the produce flavourful.' },
  { id: 'f3', name: 'Sana Malik', location: 'Swat, Khyber Pakhtunkhwa', experience: '7 years', rating: 4.9, reviews: 185,
    avatar: { uri: 'https://i.pravatar.cc/200?img=47' }, cover: IMAGES.farm,
    about: 'Organic greens and mountain honey from the Swat valley, grown without synthetic pesticides.' },
  { id: 'f4', name: 'Imran Shah', location: 'Sukkur, Sindh', experience: '15 years', rating: 4.8, reviews: 402,
    avatar: { uri: 'https://i.pravatar.cc/200?img=15' }, cover: IMAGES.farm,
    about: 'Orchard owner known for sweet Sindhri mangoes, bananas and crisp apples sourced from trusted growers.' },
  { id: 'f5', name: 'Hira Noor', location: 'Kasur, Punjab', experience: '10 years', rating: 4.7, reviews: 158,
    avatar: { uri: 'https://i.pravatar.cc/200?img=45' }, cover: IMAGES.farm,
    about: 'Premium basmati rice and free-range farm eggs, packed fresh and delivered straight from the farm.' }
];

const desc = (name) => `Fresh and organic ${name.toLowerCase()}, directly from local farmers. Carefully harvested, hand-sorted and delivered fresh to your door.`;

const P = (id, name, category, price, rating, reviews, image, farmerId, stock, unit = 'kg') => ({
  id, name, category, price, rating, reviews, image, images: [image, IMAGES.farm], farmerId, stock, unit,
  description: desc(name), freshness: 'Harvested within 24 hours'
});

export const PRODUCTS = [
  P('p1', 'Fresh Tomatoes', 'Vegetables', 120, 4.8, 2340, IMAGES.tomato, 'f1', 250),
  P('p2', 'Red Onions', 'Vegetables', 100, 4.7, 1500, IMAGES.onion, 'f2', 400),
  P('p3', 'Potatoes', 'Vegetables', 80, 4.6, 1000, IMAGES.potato, 'f2', 600),
  P('p4', 'Fresh Spinach', 'Vegetables', 60, 4.7, 800, IMAGES.spinach, 'f3', 90),
  P('p5', 'Carrots', 'Vegetables', 70, 4.6, 700, IMAGES.carrot, 'f3', 180),
  P('p6', 'Red Apples', 'Fruits', 250, 4.8, 900, IMAGES.apple, 'f4', 120),
  P('p7', 'Bananas', 'Fruits', 140, 4.5, 650, IMAGES.banana, 'f4', 200),
  P('p8', 'Sindhri Mangoes', 'Fruits', 320, 4.9, 1200, IMAGES.mango, 'f4', 150),
  P('p9', 'Whole Wheat', 'Grains', 95, 4.5, 600, IMAGES.wheat, 'f1', 900),
  P('p10', 'Basmati Rice', 'Grains', 280, 4.8, 1100, IMAGES.rice, 'f5', 500),
  P('p11', 'Pure Honey', 'Others', 1200, 4.9, 450, IMAGES.honey, 'f3', 40),
  P('p12', 'Farm Eggs', 'Others', 360, 4.7, 380, IMAGES.eggs, 'f5', 100, 'dozen')
];

export const POPULAR_SEARCHES = ['Tomatoes', 'Mangoes', 'Spinach', 'Rice', 'Honey', 'Onions'];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const getFarmer = (id) => FARMERS.find((f) => f.id === id);

export const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: 'cash-outline' },
  { id: 'card', label: 'Credit / Debit Card', icon: 'card-outline' },
  { id: 'jazzcash', label: 'JazzCash', icon: 'phone-portrait-outline' },
  { id: 'easypaisa', label: 'EasyPaisa', icon: 'wallet-outline' }
];

export const DELIVERY_FEE = 50;

export const SEED_PROFILE = {
  name: 'Ihsan Ahmed',
  email: 'ihsan@example.com',
  phone: '+92 300 1234567',
  avatar: { uri: 'https://i.pravatar.cc/300?img=68' }
};

export const SEED_ADDRESSES = [
  { id: 'a1', label: 'Home', text: '123 Green Valley, Islamabad, Pakistan' },
  { id: 'a2', label: 'Office', text: 'Office 5, Blue Area, Islamabad, Pakistan' }
];

const mkOrder = (id, createdAt, step, items, paymentMethod = 'cod', code = '4821') => {
  const lines = items.map(([productId, qty]) => ({ productId, qty, price: getProduct(productId).price }));
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  return { id, createdAt, step, cancelled: false, items: lines, subtotal, deliveryFee: DELIVERY_FEE,
    total: subtotal + DELIVERY_FEE, paymentMethod, address: SEED_ADDRESSES[0].text, verificationCode: code };
};

export const buildSeedOrders = () => [
  mkOrder('#AGB12345', '2026-10-30T14:30:00', 3, [['p1', 1], ['p2', 2], ['p3', 1]]),
  mkOrder('#AGB12344', '2026-10-29T17:15:00', 2, [['p2', 2], ['p5', 1]], 'jazzcash', '4821'),
  mkOrder('#AGB12343', '2026-10-27T13:20:00', 3, [['p4', 4], ['p5', 3]])
];

export const buildSeedNotifications = () => {
  const now = Date.now();
  const h = 3600000;
  return [
    { id: 'n1', type: 'delivered', title: 'Your order #AGB12345', body: 'has been delivered.', createdAt: now - 2 * h, read: false, orderId: '#AGB12345' },
    { id: 'n2', type: 'onway', title: 'Your order #AGB12344', body: 'is on the way.', createdAt: now - 26 * h, read: false, orderId: '#AGB12344' },
    { id: 'n3', type: 'offer', title: 'Special Offer!', body: 'Get 20% off on fresh vegetables.', createdAt: now - 50 * h, read: false },
    { id: 'n4', type: 'product', title: 'New arrivals!', body: 'Fresh organic greens are now available.', createdAt: now - 74 * h, read: true },
    { id: 'n5', type: 'farmer', title: 'Ali Khan posted an update', body: 'New tomato harvest is ready for order.', createdAt: now - 80 * h, read: true },
    { id: 'n6', type: 'account', title: 'Account updated', body: 'Your profile has been updated.', createdAt: now - 98 * h, read: true }
  ];
};
