import React from 'react';
import { ShieldCheck, Leaf, Heart, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTracker }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 text-left pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-extrabold tracking-tight text-white font-display">
              VELIA
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Dự án khởi nghiệp đổi mới sáng tạo tiên phong phát triển dòng gel xà phòng rửa tay khô sinh học kết hợp mô hình Gamification thẻ bài sưu tầm Veli-Heroes, bảo vệ sức khỏe cho thế hệ trẻ Việt Nam.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Kháng khuẩn 99.9%
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Leaf className="w-4 h-4" /> 100% Cồn thực vật
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Khám Phá</div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">
                  Trang Chủ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Dự Án Khởi Nghiệp
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors">
                  Cửa Hàng Sản Phẩm
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cards')} className="hover:text-white transition-colors">
                  Bộ Thẻ Bài Veli-Heroes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Kiến Thức Sống Xanh
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Tracking */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Hỗ Trợ Khách Hàng</div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={onOpenTracker} className="hover:text-emerald-400 transition-colors font-medium">
                  Tra Cứu Vận Đơn Real-Time
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Chính Sách Đổi Trả 7 Ngày
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Đặt Mua Số Lượng Lớn (B2B)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Chương Trình Đổi Vỏ Thu Refill
                </button>
              </li>
            </ul>
          </div>

          {/* Startup Info */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Dự Án Khởi Nghiệp</div>
            <div className="text-xs text-stone-400 space-y-1.5 leading-relaxed">
              <p>Cuộc thi SV Khởi nghiệp ĐMST 2026</p>
              <p>ĐH Sài Gòn</p>
              <p>Hotline: 0938 123 835</p>
              <p>Email: startup.velia.vn@gmail.com</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 Dự án Khởi nghiệp VELIA. Bản quyền thuộc về Nhóm tác giả sinh viên.
          </div>
          <div className="flex items-center gap-4">
            <span>Bảo vệ sức khỏe bằng trái tim Việt</span>
            <span>·</span>
            <span>Đổi mới sáng tạo vì cộng đồng</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
