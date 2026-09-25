import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles, Truck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenTracker,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Trang Chủ' },
    { id: 'about', label: 'Dự Án' },
    { id: 'products', label: 'Cửa Hàng' },
    { id: 'cards', label: 'Thẻ Bài Veli' },
    { id: 'blog', label: 'Góc Khởi Nghiệp' },
    { id: 'contact', label: 'Liên Hệ' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="truncate">
          Dự án Khởi nghiệp Sáng tạo Sinh viên 2026 · Tặng 01 Thẻ bài Veli-Hero ngẫu nhiên cho mỗi chai gel
        </span>
      </div>

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-6 text links) — Zone 3 (1-2 primary actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavClick('hero')}
            className="text-2xl font-extrabold tracking-tight text-emerald-950 hover:text-emerald-800 transition-colors font-display"
          >
            VELIA
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`hover:text-emerald-900 transition-colors relative py-1 ${
                activeSection === link.id
                  ? 'text-emerald-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-700'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTracker}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-emerald-900 hover:bg-stone-100 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
            title="Tra cứu đơn hàng thời gian thực"
          >
            <Truck className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Theo dõi đơn</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all whitespace-nowrap active:scale-95"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-stone-900 font-bold px-1.5 py-0.2 text-[11px] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF9F5] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-950 rounded-md transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-200">
            <button
              onClick={() => {
                onOpenTracker();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 rounded-md"
            >
              <Truck className="w-4 h-4 text-emerald-700" />
              Tra cứu đơn hàng thời gian thực
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
