import React, { useState } from 'react';
import { CartItem, Order, OrderStatus } from '../types';
import { X, QrCode, CreditCard, Wallet, Truck, CheckCircle2, ShieldCheck, Copy, Check, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discountCode?: string;
  shippingFee: number;
  total: number;
  onOrderSuccess: (newOrder: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  discountCode,
  shippingFee,
  total,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: 'Nguyễn Văn Minh',
    phone: '0912 345 678',
    email: 'vanminh.student@gmail.com',
    address: 'Ký túc xá ĐH Sài Gòn, 105 Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3',
    city: 'TP. Hồ Chí Minh',
    note: 'Giao giờ hành chính, gọi trước khi đến giúp mình',
  });

  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'momo' | 'card' | 'cod'>('vietqr');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedMemo, setCopiedMemo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Generate dynamic temporary order id
  const tempOrderId = `VELIA-${Math.floor(1000 + Math.random() * 9000)}`;
  const transferMemo = `${tempOrderId} ${formData.name.split(' ').pop() || 'DH'}`;

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('0938123835');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyMemo = () => {
    navigator.clipboard.writeText(transferMemo);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      // Pick a random mascot card won for this order
      const potentialCards = [
        'Veli-Aqua (Common)',
        'Flora Pomelo (Rare)',
        'Knight GreenTea (Super Rare)',
        'Zen Lotus (Rare)',
      ];
      const wonCard = potentialCards[Math.floor(Math.random() * potentialCards.length)];

      const newOrder: Order = {
        id: tempOrderId,
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        note: formData.note,
        items: [...items],
        subtotal,
        discount: discountAmount,
        discountCode,
        shippingFee,
        total,
        paymentMethod,
        status: 'received',
        createdAt: dateStr,
        estimatedDelivery: 'Dự kiến 1-2 ngày tới',
        trackingNumber: `VL-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
        carrier: 'Giao Hàng Nhanh Express',
        freeCardWon: wonCard,
        timeline: [
          {
            title: 'Đơn hàng đã được xác nhận',
            timestamp: `${dateStr} - Hệ thống tự động ghi nhận`,
            description: paymentMethod === 'cod' 
              ? 'Xác nhận đơn hàng thanh toán khi nhận hàng COD.' 
              : 'Giao dịch thanh toán trực tuyến thành công.',
            done: true,
            current: true,
          },
          {
            title: 'Đang đóng gói & Niêm phong Thẻ bài bí mật',
            timestamp: 'Dự kiến trong 30 phút tới',
            description: `Chuẩn bị sản phẩm gel xà phòng khô và đính kèm 01 Thẻ bài ${wonCard}.`,
            done: false,
          },
          {
            title: 'Bàn giao cho đơn vị vận chuyển',
            timestamp: 'Dự kiến chiều nay',
            description: 'Kiện hàng được shipper tiếp nhận để vận chuyển.',
            done: false,
          },
          {
            title: 'Giao hàng thành công',
            timestamp: 'Dự kiến ngày mai',
            description: 'Khách hàng nhận kiện hàng và mở hộp thẻ bài may mắn.',
            done: false,
          },
        ],
      };

      setIsProcessing(false);
      onOrderSuccess(newOrder);
      onClose();
    }, 1200);
  };

  // Real VietQR dynamic image URL
  const vietQrUrl = `https://img.vietqr.io/image/MB-0938123835-compact2.png?amount=${total}&addInfo=${encodeURIComponent(transferMemo)}&accountName=DU%20AN%20VELIA%20STARTUP`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 text-left relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-stone-200 pb-4 mb-6">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Cổng Thanh Toán Trực Tuyến VELIA</div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            Hoàn Tất Đặt Hàng & Nhận Thẻ Bài Bí Mật
          </h3>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Shipping Address Form */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              1. Thông Tin Nhận Hàng
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Họ và tên người nhận *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Email (để nhận mã tra cứu vận đơn) *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Địa chỉ giao hàng chi tiết *</label>
              <input
                type="text"
                required
                placeholder="Số nhà, tên đường, ký túc xá, tòa nhà..."
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Tỉnh / Thành phố *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Ghi chú giao hàng</label>
                <input
                  type="text"
                  placeholder="VD: Giao giờ hành chính..."
                  value={formData.note}
                  onChange={e => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-white"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-4 space-y-3">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                2. Phương Thức Thanh Toán
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'vietqr', label: 'Quét VietQR', icon: QrCode, desc: 'Napas 24/7' },
                  { id: 'momo', label: 'Ví MoMo', icon: Wallet, desc: 'Quét mã ví' },
                  { id: 'card', label: 'Thẻ ATM/Visa', icon: CreditCard, desc: 'Cổng trực tuyến' },
                  { id: 'cod', label: 'Tiền mặt (COD)', icon: Truck, desc: 'Nhận hàng trả' },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-emerald-800' : 'text-stone-500'}`} />
                      <div>
                        <div className="text-xs font-bold text-stone-900">{m.label}</div>
                        <div className="text-[10px] text-stone-500">{m.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* VietQR Live Box */}
            {paymentMethod === 'vietqr' && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <QrCode className="w-4 h-4 text-emerald-800" />
                    <span>Mã VietQR Thanh Toán Tự Động</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded">
                    Khớp số tiền tự động
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3 rounded-xl border border-stone-200">
                  <div className="w-36 h-36 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200 flex items-center justify-center p-1">
                    <img
                      src={vietQrUrl}
                      alt="VietQR code"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-2 text-xs flex-1 text-stone-700 w-full">
                    <div>
                      <div className="text-[10px] text-stone-400">Ngân hàng thụ hưởng:</div>
                      <div className="font-bold text-stone-900">MBBank (Ngân hàng Quân Đội)</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-stone-400">Số tài khoản:</div>
                        <div className="font-mono font-bold text-stone-900">0938 123 835</div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] rounded flex items-center gap-1 font-medium transition-colors"
                      >
                        {copiedAccount ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedAccount ? 'Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>

                    <div>
                      <div className="text-[10px] text-stone-400">Chủ tài khoản:</div>
                      <div className="font-semibold text-stone-900">DU AN VELIA STARTUP</div>
                    </div>

                    <div className="flex items-center justify-between bg-amber-50 p-1.5 rounded border border-amber-200/60">
                      <div>
                        <div className="text-[10px] text-amber-800">Nội dung chuyển khoản:</div>
                        <div className="font-mono font-bold text-amber-950 text-xs">{transferMemo}</div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyMemo}
                        className="px-2 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 text-[11px] rounded flex items-center gap-1 font-medium transition-colors"
                      >
                        {copiedMemo ? <Check className="w-3 h-3 text-emerald-800" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedMemo ? 'Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'momo' && (
              <div className="p-4 rounded-xl bg-pink-50 border border-pink-200 text-xs text-pink-900 space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-pink-700" />
                  <span>Thanh toán Ví Điện Tử MoMo</span>
                </div>
                <p className="leading-relaxed">
                  Quét mã qua ứng dụng MoMo: Số điện thoại nhận <strong>0938 123 835</strong> (DU AN VELIA STARTUP) với nội dung <strong>{transferMemo}</strong>.
                </p>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/80 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Đơn Hàng ({items.length} Sản Phẩm)
              </h4>

              {/* Items preview */}
              <div className="max-h-48 overflow-y-auto divide-y divide-stone-200/60 pr-1 space-y-2">
                {items.map((it) => (
                  <div key={it.product.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        className="w-10 h-10 object-cover rounded-md border border-stone-200"
                      />
                      <div>
                        <div className="font-bold text-stone-900 line-clamp-1">{it.product.name}</div>
                        <div className="text-[11px] text-stone-500">Số lượng: x{it.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold text-stone-900 tabular-nums">
                      {formatPrice(it.product.price * it.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bonus Mascot Card callout */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Quà Tặng Khởi Nghiệp Kèm Theo</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Tặng 01 Thẻ bài linh thú Veli-Heroes ngẫu nhiên nguyên seal được đóng kèm trong kiện hàng này!
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Tiền hàng</span>
                  <span className="tabular-nums font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Mã giảm giá ({discountCode})</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao hàng</span>
                  <span className="tabular-nums font-semibold text-stone-900">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-bold">MIỄN PHÍ</span> : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Tổng cộng thanh toán</span>
                  <span className="tabular-nums text-emerald-950 text-lg">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="pt-4 space-y-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/15 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang xác thực đơn hàng...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác Nhận Đặt Hàng & Theo Dõi Vận Đơn</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Bảo mật thông tin khách hàng · Hỗ trợ đổi trả trong 7 ngày</span>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
