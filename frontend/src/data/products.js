export const ALL_PRODUCTS = [
  {
    id: 'mango', name: 'Sindhri Mangoes', emoji: '🥭',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80',
    price5kg: 850, price10kg: 1600,
    category: 'seasonal', season: 'summer',
    description: "Pakistan's finest Sindhri mangoes, sweet and aromatic.",
    origin: 'Sindh, Pakistan', available: true, featured: true,
    rating: 4.9, reviews: 324
  },
  {
    id: 'strawberry', name: 'Strawberries', emoji: '🍓',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80',
    price5kg: 1200, price10kg: 2200,
    category: 'seasonal', season: 'winter',
    description: 'Fresh, juicy strawberries from Swat Valley.',
    origin: 'Swat, Pakistan', available: true, featured: true,
    rating: 4.8, reviews: 218
  },
  {
    id: 'grapes', name: 'Green Grapes', emoji: '🍇',
    image: 'https://images.unsplash.com/photo-1515779122185-2390ccdf060b?w=400&q=80',
    price5kg: 950, price10kg: 1800,
    category: 'seasonal', season: 'autumn',
    description: 'Sweet seedless green grapes from Balochistan.',
    origin: 'Quetta, Pakistan', available: true, featured: false,
    rating: 4.7, reviews: 156
  },
  {
    id: 'orange', name: 'Blood Oranges', emoji: '🍊',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80',
    price5kg: 600, price10kg: 1100,
    category: 'seasonal', season: 'winter',
    description: 'Kinnow oranges from Punjab, rich in Vitamin C.',
    origin: 'Sargodha, Pakistan', available: true, featured: false,
    rating: 4.6, reviews: 189
  },
  {
    id: 'apple', name: 'Kashmiri Apples', emoji: '🍎',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80',
    price5kg: 750, price10kg: 1400,
    category: 'seasonal', season: 'autumn',
    description: 'Premium Kashmiri apples, crisp and perfectly sweet.',
    origin: 'AJK, Pakistan', available: true, featured: true,
    rating: 4.8, reviews: 267
  },
  {
    id: 'banana', name: 'Bananas', emoji: '🍌',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&q=80',
    price5kg: 400, price10kg: 750,
    category: 'tropical', season: 'all-year',
    description: 'Fresh ripe bananas available year-round.',
    origin: 'Sindh, Pakistan', available: true, featured: false,
    rating: 4.5, reviews: 143
  },
  {
    id: 'watermelon', name: 'Watermelon', emoji: '🍉',
    image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&q=80',
    price5kg: 350, price10kg: 650,
    category: 'seasonal', season: 'summer',
    description: 'Juicy summer watermelons, perfect for hot days.',
    origin: 'Punjab, Pakistan', available: true, featured: true,
    rating: 4.7, reviews: 198
  },
  {
    id: 'pomegranate', name: 'Pomegranate', emoji: '🍎',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
    price5kg: 900, price10kg: 1700,
    category: 'seasonal', season: 'autumn',
    description: 'Rich antioxidant-packed pomegranates from Kandahar region.',
    origin: 'Balochistan, Pakistan', available: true, featured: false,
    rating: 4.8, reviews: 112
  },
  {
    id: 'peach', name: 'Peaches', emoji: '🍑',
    image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=400&q=80',
    price5kg: 700, price10kg: 1300,
    category: 'seasonal', season: 'summer',
    description: 'Sweet and fragrant peaches from the Northern areas.',
    origin: 'Gilgit-Baltistan, Pakistan', available: true, featured: false,
    rating: 4.6, reviews: 87
  },
  {
    id: 'kiwi', name: 'Kiwi', emoji: '🥝',
    image: 'https://images.unsplash.com/photo-1618897996318-5a901fa0ca71?w=400&q=80',
    price5kg: 1500, price10kg: 2800,
    category: 'exotic', season: 'all-year',
    description: 'Premium New Zealand kiwi, vitamin C powerhouse.',
    origin: 'Imported', available: true, featured: false,
    rating: 4.7, reviews: 93
  },
  {
    id: 'pineapple', name: 'Pineapple', emoji: '🍍',
    image: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=400&q=80',
    price5kg: 1100, price10kg: 2000,
    category: 'exotic', season: 'all-year',
    description: 'Sweet tropical pineapples, freshly imported.',
    origin: 'Imported', available: true, featured: true,
    rating: 4.5, reviews: 76
  },
  {
    id: 'lychee', name: 'Lychee', emoji: '🍒',
    image: 'https://images.unsplash.com/photo-1598512199776-e91e5e8e5f37?w=400&q=80',
    price5kg: 1800, price10kg: 3400,
    category: 'exotic', season: 'summer',
    description: 'Sweet and fragrant lychees, a tropical delicacy.',
    origin: 'Punjab, Pakistan', available: true, featured: true,
    rating: 4.9, reviews: 134
  },
];

export const SEASONAL_PRODUCTS = ALL_PRODUCTS.filter(p => p.category === 'seasonal');
export const EXOTIC_PRODUCTS = ALL_PRODUCTS.filter(p => p.category === 'exotic');
export const TROPICAL_PRODUCTS = ALL_PRODUCTS.filter(p => p.category === 'tropical');
export const FEATURED_PRODUCTS = ALL_PRODUCTS.filter(p => p.featured);

export const BOX_TYPES = [
  { id: '5kg', label: '5kg Box', price: 1800, description: 'Perfect for a small family', fruits: '5-6 varieties' },
  { id: '10kg', label: '10kg Box', price: 3200, description: 'Great for a large family', fruits: '8-10 varieties' },
  { id: 'custom', label: 'Custom Box', price: 0, description: 'Mix & match your favourites', fruits: 'Your choice' },
];

export const SEASONS = [
  { id: 'summer', label: 'Summer Fruits', color: '#f97316', icon: '☀️', months: 'Apr – Sep' },
  { id: 'winter', label: 'Winter Fruits', color: '#3b82f6', icon: '❄️', months: 'Nov – Feb' },
  { id: 'autumn', label: 'Autumn Fruits', color: '#f59e0b', icon: '🍂', months: 'Sep – Nov' },
  { id: 'all-year', label: 'Year Round', color: '#10b981', icon: '🌿', months: 'All Year' },
];
