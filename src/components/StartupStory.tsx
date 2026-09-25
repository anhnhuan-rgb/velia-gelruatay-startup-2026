import React, { useState } from 'react';
import { Target, Users, Sparkles, Award, FileText, CheckCircle2, ChevronRight, X } from 'lucide-react';

export const StartupStory: React.FC = () => {
  const [pitchDeckModalOpen, setPitchDeckModalOpen] = useState(false);

  const teamMembers = [
    {
      name: 'Từ Tú Linh',
      role: 'Đồng sáng lập',
    },
    {
      name: 'Trần Ánh Nhuận',
      role: 'Đồng sáng lập',
    },
    {
      name: 'Dương Thị Ngọc Mai',
      role: 'Đồng sáng lập',
    },
    {
      name: 'Nguyễn Thị Lệ Chi',
      role: 'Đồng sáng lập',
    },
    {
      name: 'Nguyễn Thị Hảo',
      role: 'Đồng sáng lập',
    },
    {
      name: 'TS. Trần Ngọc Tú',
      role: 'Cố vấn chuyên môn',
      isAdvisor: true,
    },
  ];

  const getInitial = (name: string) => {
    const parts = name.trim().split(/\s+/);
    return parts[parts.length - 1]?.charAt(0) || name.charAt(0);
  };

  const milestones = [
    {
      phase: '01. Ý Tưởng & Khảo Sát',
      time: 'Tháng 10/2025',
      desc: 'Khảo sát 1.200 học sinh - sinh viên tại TP.HCM. Phát hiện 78% bỏ qua rửa tay vì cồn thông thường gây khô ráp da và có mùi nồng gắt.',
    },
    {
      phase: '02. R&D & 120 Mẫu Thử',
      time: 'Tháng 12/2025',
      desc: 'Nghiên cứu thành công công thức kết hợp EGCG Trà Xanh, Chiết xuất Sen Tây Hồ và Cồn thực vật 70 độ. Đạt chứng nhận kháng khuẩn 99.9%.',
    },
    {
      phase: '03. Gamification Đột Phá',
      time: 'Tháng 02/2026',
      desc: 'Tích hợp bộ 6 thẻ bài Veli-Heroes kèm móc khóa silicon. Thử nghiệm trên 500 bạn trẻ ghi nhận tần suất rửa tay tăng 350%.',
    },
    {
      phase: '04. Chung Kết Khởi Nghiệp',
      time: 'Tháng 03/2026',
      desc: 'Lọt vào TOP 3 Dự án Đổi Mới Sáng Tạo Sinh Viên Toàn Quốc và nhận tài trợ vòng hạt giống để thương mại hóa.',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase">
            Hồ Sơ Dự Án Khởi Nghiệp Sinh Viên
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight text-balance">
            Từ Phòng Thí Nghiệm Giảng Đường Đến Khát Vọng Thay Đổi Thói Quen Vệ Sinh Giới Trẻ
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            VELIA không đơn thuần là một chai nước rửa tay khô. Chúng tôi kiến tạo một giải pháp chăm sóc sức khỏe chủ động, thẩm mỹ và gắn liền với phong cách sống năng động của thế hệ trẻ.
          </p>
        </div>

        {/* 3 Pillars of Innovation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">Công Thức Xanh Bản Địa</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              100% cồn thực vật chưng cất tự nhiên từ mía đường Việt Nam kết hợp chiết xuất thảo mộc quê hương (Sen Tây Hồ, Bưởi Năm Roi, Trà Xanh Tam Đảo) và Vitamin E dưỡng ẩm mềm mịn.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">Gamification Đổi Mới</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Ứng dụng cơ chế thẻ bài linh vật Veli-Heroes (Blind Box) tạo thói quen bảo vệ đôi bàn tay thông qua sở thích sưu tầm, trao đổi thẻ hiếm và nâng cấp skin độc quyền.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">Kinh Tế Tuần Hoàn (Eco-Refill)</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Móc silicon thời trang bền bỉ tái sử dụng trọn đời, kết hợp túi nạp Refill 250ml giúp giảm 80% rác thải nhựa và tiết kiệm hơn 50% chi phí cho học sinh, sinh viên.
            </p>
          </div>
        </div>

        {/* Milestones timeline */}
        <div className="bg-[#FAF9F5] rounded-2xl p-8 border border-stone-200/80 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-bold text-stone-900">Lộ Trình Phát Triển & Thành Tựu</h3>
              <p className="text-xs text-stone-500 mt-1">Các cột mốc quan trọng trong cuộc thi Khởi nghiệp ĐMST 2026</p>
            </div>
            <button
              onClick={() => setPitchDeckModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors whitespace-nowrap self-start"
            >
              <FileText className="w-4 h-4" />
              <span>Xem Tóm Tắt Pitch Deck (1-Pager)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="space-y-2 border-l-2 border-emerald-600 pl-4">
                <div className="text-xs font-semibold text-emerald-800">{m.time}</div>
                <div className="text-sm font-bold text-stone-900">{m.phase}</div>
                <p className="text-xs text-stone-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founding Team & Mentor */}
        <div className="space-y-6">
          <div className="text-left">
            <h3 className="text-xl font-bold text-stone-900">Đội Ngũ Sáng Lập & Giảng Viên Cố Vấn</h3>
            <p className="text-xs text-stone-500 mt-1">Dự án Khởi nghiệp Đổi mới Sáng tạo Sinh viên VELIA</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all hover:shadow-md ${
                  member.isAdvisor
                    ? 'border-amber-200 bg-amber-50/50 hover:border-amber-300'
                    : 'border-stone-200/80 bg-white hover:border-emerald-300'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base mb-3 border ${
                    member.isAdvisor
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {getInitial(member.name)}
                </div>
                <div className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                  {member.name}
                </div>
                <div
                  className={`text-xs font-semibold mt-1 leading-snug ${
                    member.isAdvisor ? 'text-amber-800' : 'text-emerald-800'
                  }`}
                >
                  {member.role}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Pitch Deck Summary Modal */}
      {pitchDeckModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Startup Executive Summary</span>
                <h3 className="text-xl font-bold text-stone-900">Bản Tóm Tắt Dự Án VELIA (Pitch Deck)</h3>
              </div>
              <button
                onClick={() => setPitchDeckModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-sm text-stone-700">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                <h4 className="font-bold text-emerald-950 mb-1">Tuyên Bố Sứ Mệnh (Mission Statement)</h4>
                <p className="text-xs leading-relaxed text-emerald-900">
                  "Biến thói quen vệ sinh tay trở thành phong cách sống hiện đại, an toàn và đầy cảm hứng cho 10 triệu thanh thiếu niên Việt Nam, thông qua công thức gel sinh học dưỡng ẩm và nghệ thuật thẻ bài sưu tầm Veli-Heroes."
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-2">1. Vấn Đề Thị Trường (Problem)</h4>
                <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                  <li>82% bạn trẻ thấy nước rửa tay cồn hiện nay có mùi hóa chất khó chịu và làm khô rách da tay.</li>
                  <li>Tỷ lệ người mang chai rửa tay theo người thường xuyên dưới 15% vì chai lọ thô kệch, dễ đổ vỡ.</li>
                  <li>Rác thải nhựa dùng một lần từ chai nhỏ gây ô nhiễm môi trường.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-2">2. Giải Pháp VELIA (Solution)</h4>
                <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                  <li><strong>Công thức Gel Dưỡng Ẩm Sinh Học:</strong> Cồn thực vật 70° + EGCG Trà Xanh + Sen Tây Hồ + Vitamin E.</li>
                  <li><strong>Phụ Kiện Silicon Thời Thượng:</strong> Dễ dàng móc vào balo, túi tote như một charm trang trí.</li>
                  <li><strong>Gamification Blind Box:</strong> Mỗi chai tặng kèm thẻ bài nhân vật linh thú bảo vệ đôi tay.</li>
                  <li><strong>Mô hình Eco Refill:</strong> Giảm 80% rác nhựa, tiết kiệm 50% chi phí.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-2">3. Mô Hình Kinh Doanh (Business Model)</h4>
                <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                  <li><strong>B2C:</strong> Bán trực tiếp qua website, Shopee, TikTok Shop và các kiosk tại trường đại học.</li>
                  <li><strong>B2B:</strong> Cung cấp trọn gói cho canteen trường quốc tế, nhà sách và sự kiện sinh viên.</li>
                  <li><strong>Biên lợi nhuận gộp:</strong> Dự kiến 58% nhờ chủ động nguồn nguyên liệu thảo mộc Việt Nam.</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 mt-6 flex justify-end">
              <button
                onClick={() => setPitchDeckModalOpen(false)}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold"
              >
                Đóng Tóm Tắt
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
