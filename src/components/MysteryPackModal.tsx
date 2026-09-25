import React, { useState } from 'react';
import { MascotCard } from '../types';
import { Sparkles, Gift, Check, X, Shield, Droplets, Wind, Copy } from 'lucide-react';

interface MysteryPackModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: MascotCard[];
  onApplyVoucher?: (code: string) => void;
}

export const MysteryPackModal: React.FC<MysteryPackModalProps> = ({
  isOpen,
  onClose,
  cards,
  onApplyVoucher,
}) => {
  const [packOpened, setPackOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [wonCard, setWonCard] = useState<MascotCard | null>(null);
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  if (!isOpen) return null;

  const handleOpenPack = () => {
    setIsOpening(true);
    setTimeout(() => {
      // Weighted roll: 5% legendary, 20% super rare, 35% rare, 40% common
      const rand = Math.random();
      let picked: MascotCard;
      if (rand < 0.08) {
        picked = cards.find(c => c.rarity === 'Legendary Secret') || cards[0];
      } else if (rand < 0.3) {
        picked = cards.find(c => c.rarity === 'Super Rare') || cards[0];
      } else if (rand < 0.65) {
        picked = cards.find(c => c.rarity === 'Rare') || cards[1];
      } else {
        picked = cards.find(c => c.rarity === 'Common') || cards[0];
      }

      setWonCard(picked);
      setIsOpening(false);
      setPackOpened(true);
    }, 1200);
  };

  const handleReset = () => {
    setPackOpened(false);
    setWonCard(null);
  };

  const voucherCode = 'VELIAHERO15';

  const copyVoucher = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopiedVoucher(true);
    if (onApplyVoucher) onApplyVoucher(voucherCode);
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-center relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!packOpened ? (
          /* Sealed Pack View */
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Blind Box Veli-Heroes 2026</span>
              </div>
              <h3 className="text-2xl font-extrabold text-stone-900">
                Gói Thẻ Bài Bí Mật
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Mỗi gói chứa 01 thẻ bài linh thú bất kỳ và 01 mã ưu đãi khởi nghiệp dành riêng cho bạn!
              </p>
            </div>

            {/* Foil Pack Graphic Container */}
            <div className="relative mx-auto w-56 h-72 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-900 to-stone-900 p-1 shadow-2xl border-2 border-amber-300/60 flex flex-col justify-between text-white p-5 overflow-hidden group">
              <div className="absolute inset-0 holo-shimmer opacity-40 pointer-events-none" />
              
              <div className="flex justify-between items-center text-[10px] font-bold text-amber-300 z-10">
                <span>LIMITED EDITION</span>
                <span>SERIES 01</span>
              </div>

              <div className="my-auto space-y-2 z-10">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-3xl font-extrabold text-amber-300">
                  ★
                </div>
                <div className="font-extrabold text-lg tracking-wider text-amber-200">
                  VELI-HEROES
                </div>
                <div className="text-[10px] text-emerald-200">
                  Kháng khuẩn · Cấp ẩm · Lan tỏa sống xanh
                </div>
              </div>

              <div className="text-[10px] text-stone-400 border-t border-stone-700/80 pt-2 z-10">
                Chạm nút xé bên dưới để mở
              </div>
            </div>

            <button
              onClick={handleOpenPack}
              disabled={isOpening}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-500/25 transition-all active:scale-98 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isOpening ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang xé bao bì hologram...</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  <span>Xé Bao Bì Thẻ Ngay (Miễn Phí)</span>
                </>
              )}
            </button>
          </div>
        ) : wonCard ? (
          /* Opened & Card Revealed View */
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Chúc mừng bạn đã mở trúng!
              </div>
              <h3 className="text-xl font-extrabold text-stone-900">
                {wonCard.name} · {wonCard.vietnameseTitle}
              </h3>
            </div>

            {/* Revealed Card */}
            <div className="relative mx-auto w-64 rounded-2xl bg-stone-900 border-2 border-amber-400 p-4 text-white shadow-2xl text-left space-y-3 overflow-hidden">
              <div className="absolute inset-0 holo-shimmer opacity-40 pointer-events-none" />

              <div className="flex items-center justify-between text-xs z-10 relative">
                <span className="text-[10px] font-bold text-amber-300">{wonCard.element}</span>
                <span className="text-[10px] bg-amber-400 text-stone-900 px-2 py-0.5 rounded-full font-bold">
                  {wonCard.rarity}
                </span>
              </div>

              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-800 border border-stone-700 relative z-10">
                <img
                  src={wonCard.cardImage}
                  alt={wonCard.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] z-10 relative">
                <div className="bg-stone-800/90 p-1 rounded border border-stone-700">
                  <div className="text-stone-400">Kháng khuẩn</div>
                  <div className="font-bold text-emerald-400">{wonCard.antibacterialPower}%</div>
                </div>
                <div className="bg-stone-800/90 p-1 rounded border border-stone-700">
                  <div className="text-stone-400">Dưỡng ẩm</div>
                  <div className="font-bold text-cyan-400">{wonCard.hydrationPower}%</div>
                </div>
                <div className="bg-stone-800/90 p-1 rounded border border-stone-700">
                  <div className="text-stone-400">Mùi hương</div>
                  <div className="font-bold text-purple-400">{wonCard.fragrancePower}%</div>
                </div>
              </div>

              <p className="text-[11px] text-stone-300 italic line-clamp-2 z-10 relative">
                {wonCard.quote}
              </p>
            </div>

            {/* Won Discount Coupon */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-left flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-emerald-900">Mã Quà Tặng Đính Kèm:</div>
                <div className="text-sm font-extrabold text-emerald-800 font-mono tracking-wider">{voucherCode}</div>
                <div className="text-[10px] text-stone-500">Giảm 15.000₫ cho đơn hàng tiếp theo</div>
              </div>
              <button
                onClick={copyVoucher}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {copiedVoucher ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedVoucher ? 'Đã sao chép' : 'Dùng mã'}</span>
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Mở Gói Khác
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
              >
                Xem Cửa Hàng
              </button>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};
