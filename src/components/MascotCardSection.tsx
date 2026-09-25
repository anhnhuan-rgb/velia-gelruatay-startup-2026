import React, { useState } from 'react';
import { MascotCard } from '../types';
import { Sparkles, Shield, Droplets, Wind, RotateCw, Gift, Check, Trophy, ExternalLink } from 'lucide-react';

interface MascotCardSectionProps {
  cards: MascotCard[];
  onOpenMysteryPack: () => void;
}

export const MascotCardSection: React.FC<MascotCardSectionProps> = ({ cards, onOpenMysteryPack }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredCards = activeFilter === 'all'
    ? cards
    : cards.filter(c => c.rarity.toLowerCase().includes(activeFilter.toLowerCase()));

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Legendary Secret':
        return 'bg-amber-400 text-stone-900 border-amber-300 font-extrabold shadow-sm';
      case 'Super Rare':
        return 'bg-purple-100 text-purple-900 border-purple-300 font-bold';
      case 'Rare':
        return 'bg-blue-100 text-blue-900 border-blue-300 font-medium';
      default:
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-medium';
    }
  };

  return (
    <section id="cards" className="py-16 md:py-24 bg-white border-b border-stone-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-2 max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Vũ Trụ Nhân Vật Sưu Tầm Độc Quyền</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Bộ Thẻ Bài Linh Vật Veli-Heroes
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Mỗi chai Velia đi kèm 01 thẻ bài nhân vật mang sức mạnh bảo vệ đôi bàn tay. 
              Nhấp vào thẻ để lật xem chỉ số kháng khuẩn & cốt truyện đặc sắc.
            </p>
          </div>

          {/* Interactive Action: Open Blind Box & Filter tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenMysteryPack}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition-all hover:scale-102 active:scale-98 whitespace-nowrap"
            >
              <Gift className="w-4 h-4 animate-bounce" />
              <span>Xé Gói Thẻ Bí Mật (Thử Vận May)</span>
            </button>
          </div>
        </div>

        {/* Filter Rarity Segmented Control */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <span className="text-xs font-semibold text-stone-500 mr-2">Độ hiếm:</span>
          {[
            { id: 'all', label: 'Tất Cả Thẻ (6)' },
            { id: 'common', label: 'Common (Cơ Bản)' },
            { id: 'rare', label: 'Rare (Hiếm)' },
            { id: 'super', label: 'Super Rare (Cực Hiếm)' },
            { id: 'legendary', label: 'Legendary Secret (Thần Thoại)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3D Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map((card) => {
            const isFlipped = !!flippedCards[card.id];
            const isLegendary = card.rarity === 'Legendary Secret';
            const isSuper = card.rarity === 'Super Rare';

            return (
              <div
                key={card.id}
                className="perspective-1000 h-[480px] w-full cursor-pointer select-none group"
                onClick={() => toggleFlip(card.id)}
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white border-2 border-stone-200/90 shadow-md p-4 flex flex-col justify-between overflow-hidden group-hover:shadow-xl group-hover:border-emerald-400 transition-all">
                    
                    {/* Holo shimmer overlay for rare/legendary */}
                    {(isLegendary || isSuper) && (
                      <div className="absolute inset-0 holo-shimmer opacity-35 pointer-events-none z-10" />
                    )}

                    {/* Card Header */}
                    <div className="flex items-center justify-between z-20">
                      <div>
                        <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">{card.element}</div>
                        <h3 className="text-lg font-extrabold text-stone-900">{card.name}</h3>
                        <div className="text-xs text-emerald-800 font-semibold">{card.vietnameseTitle}</div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getRarityBadge(card.rarity)}`}>
                        {card.rarity}
                      </span>
                    </div>

                    {/* Card Artwork */}
                    <div className="relative my-3 flex-1 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center">
                      <img
                        src={card.cardImage}
                        alt={card.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Element Badge */}
                      <div className="absolute bottom-2 left-2 bg-stone-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                        <span>Linh Vệ Đôi Tay</span>
                      </div>
                    </div>

                    {/* Card Quick Preview Stats */}
                    <div className="space-y-2 z-20 pt-2 border-t border-stone-100">
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-stone-50 p-1.5 rounded-lg border border-stone-200/60">
                          <div className="text-[10px] text-stone-500 font-medium flex items-center justify-center gap-1">
                            <Shield className="w-3 h-3 text-emerald-600" />
                            <span>Kháng Khuẩn</span>
                          </div>
                          <div className="font-bold text-stone-900 tabular-nums">{card.antibacterialPower}%</div>
                        </div>

                        <div className="bg-stone-50 p-1.5 rounded-lg border border-stone-200/60">
                          <div className="text-[10px] text-stone-500 font-medium flex items-center justify-center gap-1">
                            <Droplets className="w-3 h-3 text-cyan-600" />
                            <span>Dưỡng Ẩm</span>
                          </div>
                          <div className="font-bold text-stone-900 tabular-nums">{card.hydrationPower}%</div>
                        </div>

                        <div className="bg-stone-50 p-1.5 rounded-lg border border-stone-200/60">
                          <div className="text-[10px] text-stone-500 font-medium flex items-center justify-center gap-1">
                            <Wind className="w-3 h-3 text-purple-600" />
                            <span>Hương Thơm</span>
                          </div>
                          <div className="font-bold text-stone-900 tabular-nums">{card.fragrancePower}%</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                        <span className="flex items-center gap-1 text-emerald-700 font-medium">
                          <RotateCw className="w-3 h-3" />
                          Nhấp để lật mặt sau
                        </span>
                        <span>Mã: #{card.id}</span>
                      </div>
                    </div>

                  </div>

                  {/* BACK SIDE (Rotated 180deg) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-[#14231E] border-2 border-emerald-600/50 shadow-xl p-5 flex flex-col justify-between text-left text-white">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
                        <div>
                          <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Hồ Sơ Linh Thú</div>
                          <h4 className="text-lg font-bold text-emerald-50">{card.name}</h4>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getRarityBadge(card.rarity)}`}>
                          {card.rarity}
                        </span>
                      </div>

                      {/* Lore Story */}
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">Truyền Thuyết Sức Mạnh:</div>
                        <p className="text-xs text-stone-300 leading-relaxed italic">
                          {card.story}
                        </p>
                      </div>

                      {/* Detailed Skill Bars */}
                      <div className="space-y-2.5 pt-2">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-stone-300">
                            <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> Kháng Khuẩn Sinh Học</span>
                            <span className="font-bold tabular-nums text-emerald-400">{card.antibacterialPower}/100</span>
                          </div>
                          <div className="w-full bg-emerald-950 rounded-full h-2 overflow-hidden border border-emerald-800">
                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: `${card.antibacterialPower}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-stone-300">
                            <span className="flex items-center gap-1"><Droplets className="w-3 h-3 text-cyan-400" /> Cấp Ẩm Chuyên Sâu</span>
                            <span className="font-bold tabular-nums text-cyan-400">{card.hydrationPower}/100</span>
                          </div>
                          <div className="w-full bg-emerald-950 rounded-full h-2 overflow-hidden border border-emerald-800">
                            <div className="bg-cyan-500 h-full rounded-full transition-all duration-700" style={{ width: `${card.hydrationPower}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-stone-300">
                            <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-purple-400" /> Lưu Hương Tự Nhiên</span>
                            <span className="font-bold tabular-nums text-purple-400">{card.fragrancePower}/100</span>
                          </div>
                          <div className="w-full bg-emerald-950 rounded-full h-2 overflow-hidden border border-emerald-800">
                            <div className="bg-purple-500 h-full rounded-full transition-all duration-700" style={{ width: `${card.fragrancePower}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Character Quote */}
                      <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-800/80 text-[11px] text-emerald-200">
                        {card.quote}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-emerald-800/80 flex items-center justify-between text-[11px] text-emerald-400">
                      <span className="flex items-center gap-1">
                        <RotateCw className="w-3 h-3" />
                        Nhấp để lật lại mặt trước
                      </span>
                      <span className="text-[10px] text-stone-400">© 2026 VELIA Universe</span>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Gamification Explanation Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>Chương Trình Đổi Quà Học Bổng Veli Collector</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Sưu tầm đủ bộ 6 thẻ bài nhận ngay Hộp quà Khởi Nghiệp trị giá 500.000₫
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed max-w-2xl">
              Quét mã QR ở mặt sau thẻ bài để đăng ký vào Veli Fanclub, tham gia bình chọn linh vật được yêu thích nhất và đổi vé tham dự Gala Khởi Nghiệp Sinh Viên Toàn Quốc 2026!
            </p>
          </div>

          <button
            onClick={onOpenMysteryPack}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-900 rounded-xl text-xs font-extrabold shadow-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
          >
            Mở Gói Thẻ Ngẫu Nhiên
          </button>
        </div>

      </div>
    </section>
  );
};
