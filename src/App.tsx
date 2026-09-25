import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StartupStory } from './components/StartupStory';
import { ProductCatalog } from './components/ProductCatalog';
import { MascotCardSection } from './components/MascotCardSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { MysteryPackModal } from './components/MysteryPackModal';
import { PRODUCTS, MASCOT_CARDS, BLOG_POSTS, INITIAL_ORDERS } from './data/mockData';
import { Product, CartItem, Order, OrderStatus } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedVolume: PRODUCTS[0].volume,
    },
    {
      product: PRODUCTS[3], // Starter pack
      quantity: 1,
      selectedVolume: PRODUCTS[3].volume,
    }
  ]);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('VELIA-8921');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isMysteryPackOpen, setIsMysteryPackOpen] = useState(false);

  // Discount state
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Cart math
  const cartSubtotal = cartItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const shippingFee = cartSubtotal >= 150000 || cartSubtotal === 0 ? 0 : 25000;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Handlers for cart
  const handleAddToCart = (product: Product, volume?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedVolume: volume || product.volume }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleApplyPromoCode = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    if (upper === 'STARTUP50') {
      setAppliedPromo(upper);
      setDiscountAmount(50000);
      return true;
    } else if (upper === 'VELIASV') {
      setAppliedPromo(upper);
      setDiscountAmount(Math.round(cartSubtotal * 0.2));
      return true;
    } else if (upper === 'VELIAHERO15') {
      setAppliedPromo(upper);
      setDiscountAmount(15000);
      return true;
    } else if (upper === 'FREESHIP') {
      setAppliedPromo(upper);
      setDiscountAmount(25000);
      return true;
    }
    return false;
  };

  // Recalculate percentage discounts if subtotal changes
  useEffect(() => {
    if (appliedPromo === 'VELIASV') {
      setDiscountAmount(Math.round(cartSubtotal * 0.2));
    }
  }, [cartSubtotal, appliedPromo]);

  // Order creation & tracking trigger
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingId(newOrder.id);
    setCartItems([]);
    setDiscountAmount(0);
    setAppliedPromo('');
    setIsCheckoutOpen(false);
    // Open order tracker immediately so user can see real-time updates!
    setIsTrackerOpen(true);
  };

  // Advance Order Status Simulator (for startup presentation / demo)
  const handleAdvanceOrderStatus = (orderId: string) => {
    setOrders(prev => {
      return prev.map(order => {
        if (order.id !== orderId) return order;

        let nextStatus: OrderStatus = order.status;
        const now = new Date();
        const timeNow = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const updatedTimeline = order.timeline.map(t => ({ ...t }));

        if (order.status === 'received') {
          nextStatus = 'processing';
          updatedTimeline[1] = {
            ...updatedTimeline[1],
            done: true,
            current: true,
            timestamp: `Vừa xong lúc ${timeNow}`,
          };
          updatedTimeline[0].current = false;
        } else if (order.status === 'processing') {
          nextStatus = 'shipping';
          updatedTimeline[2] = {
            ...updatedTimeline[2],
            done: true,
            current: true,
            timestamp: `Shipper đã lấy kiện hàng lúc ${timeNow}`,
          };
          updatedTimeline[1].current = false;
        } else if (order.status === 'shipping') {
          nextStatus = 'delivered';
          updatedTimeline[3] = {
            ...updatedTimeline[3],
            done: true,
            current: true,
            timestamp: `Giao hàng thành công lúc ${timeNow}`,
          };
          updatedTimeline[2].current = false;
        }

        return {
          ...order,
          status: nextStatus,
          timeline: updatedTimeline,
        };
      });
    });
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-800 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main className="flex-1">
        <div id="hero">
          <Hero
            onExploreProducts={() => handleNavigate('products')}
            onExploreCards={() => handleNavigate('cards')}
          />
        </div>

        <StartupStory />

        <ProductCatalog
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
        />

        <MascotCardSection
          cards={MASCOT_CARDS}
          onOpenMysteryPack={() => setIsMysteryPackOpen(true)}
        />

        <BlogSection
          posts={BLOG_POSTS}
        />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
        discountCode={appliedPromo}
        onApplyDiscount={handleApplyPromoCode}
        discountAmount={discountAmount}
      />

      {/* Checkout Modal with VietQR Payment Integration */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        discountAmount={discountAmount}
        discountCode={appliedPromo}
        shippingFee={shippingFee}
        total={finalTotal}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Real-time Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orders={orders}
        currentTrackingId={activeTrackingId}
        onAdvanceOrderStatus={handleAdvanceOrderStatus}
      />

      {/* Mystery Blind Box Pack Simulator Modal */}
      <MysteryPackModal
        isOpen={isMysteryPackOpen}
        onClose={() => setIsMysteryPackOpen(false)}
        cards={MASCOT_CARDS}
        onApplyVoucher={(code) => {
          handleApplyPromoCode(code);
          setIsMysteryPackOpen(false);
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}
