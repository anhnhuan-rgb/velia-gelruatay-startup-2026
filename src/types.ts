export type Rarity = 'Common' | 'Rare' | 'Super Rare' | 'Legendary Secret';

export interface MascotCard {
  id: string;
  name: string;
  vietnameseTitle: string;
  element: string;
  rarity: Rarity;
  antibacterialPower: number; // e.g. 98
  hydrationPower: number;      // e.g. 95
  fragrancePower: number;      // e.g. 92
  story: string;
  colorTheme: string;
  badgeColor: string;
  borderColor: string;
  quote: string;
  cardImage: string;
  unlocked?: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  category: 'pocket' | 'starter-pack' | 'refill' | 'gift-box';
  volume: string;
  scent: string;
  shortDesc: string;
  fullDesc: string;
  keyIngredients: string[];
  benefits: string[];
  rating: number;
  reviewsCount: number;
  image: string;
  isBestSeller?: boolean;
  hasCardBonus?: boolean;
  inStock: boolean;
  skinType: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  readTime: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  tags: string[];
}

export type OrderStatus = 'received' | 'processing' | 'shipping' | 'delivered';

export interface OrderTimelineItem {
  title: string;
  timestamp: string;
  description: string;
  done: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  note?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: 'vietqr' | 'momo' | 'card' | 'cod';
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
  freeCardWon?: string;
  timeline: OrderTimelineItem[];
}
