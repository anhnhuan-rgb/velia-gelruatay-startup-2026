import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Award, Leaf } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onExploreCards: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onExploreCards }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-stone-200/70">
      {/* Subtle organic background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-100/50 via-teal-50/40 to-amber-50/30 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Pitch & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Quiet context kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Dự Án Khởi Nghiệp Sinh Viên Đổi Mới Sáng Tạo 2026</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 font-normal">ĐH Sài Gòn</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
              Gel Xà Phòng Rửa Tay Khô Sinh Học Tích Hợp{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-950">
                Thẻ Bài Sưu Tầm
              </span>
            </h1>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              VELIA giải quyết triệt để vấn đề da tay khô ráp và thói quen lười vệ sinh tay ở giới trẻ. 
              Công thức gel dưỡng ẩm sinh học từ cồn mía đường và thảo mộc bản địa Việt Nam, 
              kết hợp mô hình <strong>Veli-Heroes Mascot Blind Box</strong> biến mỗi lần làm sạch đôi tay thành một trải nghiệm hào hứng.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreProducts}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-900/10 transition-all hover:translate-y-[-1px] active:translate-y-[0px] whitespace-nowrap"
              >
                <span>Khám Phá Cửa Hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCards}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-xl text-sm font-semibold transition-all hover:border-emerald-700 hover:text-emerald-900 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Xem Bộ Thẻ Bài Veli (6 Nhân Vật)</span>
              </button>
            </div>

            {/* Adjacency Proof Points */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-2xl font-bold text-stone-900 tabular-nums">99.9%</div>
                <div className="text-xs text-stone-500 mt-0.5">Kháng khuẩn chuẩn viện</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-stone-900 tabular-nums">100%</div>
                <div className="text-xs text-stone-500 mt-0.5">Cồn thực vật lên men</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-stone-900 tabular-nums">01 Thẻ</div>
                <div className="text-xs text-stone-500 mt-0.5">Linh vật tặng kèm mỗi chai</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-800 tabular-nums">TOP 3</div>
                <div className="text-xs text-stone-500 mt-0.5">Khởi Nghiệp ĐMST 2026</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Product Hero Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 bg-stone-100 group">
                <img
                  src="/src/assets/images/hero_velia_sanitizer_1790258892414.jpg"
                  alt="Chai gel rửa tay khô VELIA cao cấp với móc khóa silicon và chiết xuất trà xanh"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating caption overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                  <div className="text-xs font-medium text-emerald-300">Bộ Sưu Tập Giới Hạn Khởi Nghiệp 2026</div>
                  <div className="text-sm font-semibold mt-0.5">Velia Zen Lotus & Pure Mint 30ml bỏ túi</div>
                </div>
              </div>

              {/* Accompanying card badge */}
              <div className="absolute -bottom-5 -left-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-xl p-3.5 shadow-lg max-w-[220px] hidden sm:block text-left">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Kiểm nghiệm Quatest 3</div>
                    <div className="text-[11px] text-stone-500">An toàn cho mọi làn da</div>
                  </div>
                </div>
              </div>

              {/* Mascot Mini Hint */}
              <div className="absolute -top-4 -right-3 bg-white/95 backdrop-blur-md border border-stone-200 rounded-xl p-3 shadow-lg hidden sm:flex items-center gap-2.5 text-left">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-bold">
                  ★
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Veli Mascot Cards</div>
                  <div className="text-[11px] text-stone-500">6 Nhân vật linh thú độc quyền</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
