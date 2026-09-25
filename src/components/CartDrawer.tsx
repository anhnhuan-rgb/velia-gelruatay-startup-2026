import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ArrowRight, Sparkles, Tag, Check, ShoppingBag, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
  discountCode: string;
  onApplyDiscount: (code: string) => boolean;
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  discountCode,
  onApplyDiscount,
  discountAmount,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 150000;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalBottleCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeededForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 25000;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = onApplyDiscount(promoInput.trim().toUpperCase());
    if (ok) {
      setPromoMessage({ text: 'Áp dụng mã ưu đãi thành công!', success: true });
    } else {
      setPromoMessage({ text: 'Mã không hợp lệ hoặc đã hết lượt. Thử: STARTUP50 hoặc VELIASV', success: false });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between text-left">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <h3 className="text-base font-bold text-stone-900">Giỏ Hàng Của Bạn</h3>
              <span className="text-xs font-semibold text-stone-500 tabular-nums">
                ({items.length} món)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3.5 bg-emerald-50/70 border-b border-emerald-100 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-950">
                <Truck className="w-4 h-4 text-emerald-700" />
                {amountNeededForFreeShip > 0 ? (
                  <>Mua thêm <strong className="tabular-nums text-emerald-800">{formatPrice(amountNeededForFreeShip)}</strong> để FREESHIP</>
                ) : (
                  <span className="font-bold text-emerald-800">🎉 Đã đạt điều kiện Miễn Phí Vận Chuyển!</span>
                )}
              </span>
              <span className="text-[11px] font-bold text-emerald-800 tabular-nums">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-emerald-200/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div className="text-sm font-bold text-stone-700">Giỏ hàng đang trống</div>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Hãy chọn một chai gel Velia thơm mát để nhận ngay thẻ bài linh thú bí mật nhé!
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors"
                >
                  Mua sắm ngay
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{item.selectedVolume}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 hover:bg-stone-200 rounded-l transition-colors"
                        >
                          <Minus className="w-3 h-3 text-stone-600" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 hover:bg-stone-200 rounded-r transition-colors"
                        >
                          <Plus className="w-3 h-3 text-stone-600" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-xs font-bold text-stone-900 tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-[#FAF9F5] space-y-4">
              
              {/* Mascot Bonus Banner */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-xs text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-[11px]">
                  Đơn hàng của bạn sẽ được tặng kèm <strong>{totalBottleCount} Thẻ bài Veli Mascot bí mật</strong>!
                </span>
              </div>

              {/* Promo input */}
              <form onSubmit={handleApplyCode} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Mã giảm giá (VD: STARTUP50)"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white uppercase font-mono"
                    />
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>
                {promoMessage && (
                  <div className={`text-[11px] font-medium ${promoMessage.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {promoMessage.text}
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="tabular-nums font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Mã giảm giá ({discountCode})</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="tabular-nums font-semibold text-stone-900">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-bold">MIỄN PHÍ</span> : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Tổng thanh toán</span>
                  <span className="tabular-nums text-emerald-950 text-base">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
                className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/15 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Tiến Hành Thanh Toán</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
