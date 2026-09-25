import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'school-b2b',
    message: '',
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: 'Gel rửa tay khô VELIA có làm khô rát da tay khi dùng nhiều lần trong ngày?',
      a: 'Hoàn toàn không! VELIA ứng dụng công thức đệm dưỡng ẩm sinh học chứa EGCG Trà Xanh, Chiết xuất Sen Tây Hồ, Vitamin E và Nha đam tự nhiên. Thử nghiệm lâm sàng cho thấy độ ẩm biểu bì tăng 24% sau khi khô ráo, không để lại cảm giác nhờn rít.',
    },
    {
      q: 'Mỗi chai Velia có chắc chắn được tặng kèm thẻ bài nhân vật Veli-Heroes không?',
      a: 'Đúng vậy! 100% chai gel dung tích 30ml và các hộp quà combo đều đi kèm 01 Thẻ bài nhân vật nguyên seal ngẫu nhiên. Tỷ lệ mở thẻ hiếm (Super Rare) là 18% và thẻ Thần Thoại (Legendary Secret) là 2%!',
    },
    {
      q: 'Chính sách mua số lượng lớn cho trường học, câu lạc bộ và nhà sách thế nào?',
      a: 'Startup VELIA có chính sách ưu đãi chiết khấu đặc biệt từ 25% - 40% dành cho các đoàn thể học sinh, sinh viên, canteen trường học và nhà sách, đồng thời hỗ trợ in logo trường lên móc khóa silicon cho đơn từ 200 chai.',
    },
    {
      q: 'Chương trình Refill giảm rác thải nhựa hoạt động ra sao?',
      a: 'Bạn có thể mua Túi Nạp Tiết Kiệm Eco-Refill 250ml để tự nạp lại cho chai mini 30ml (được khoảng 8.5 lần). Ngoài ra, khi tích đủ 5 vỏ túi hoặc chai rỗng gửi về trạm thu gom của Velia, bạn sẽ được đổi 01 thẻ bài hiếm và voucher 30.000₫!',
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase flex items-center justify-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Kết Nối Dự Án Khởi Nghiệp</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight text-balance">
            Hợp Tác Phân Phối, Đầu Tư & Liên Hệ Dự Án VELIA
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe phản hồi của người dùng, kết nối cùng các nhà đầu tư thiên thần, ban giám khảo và đối tác trường học toàn quốc.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-stone-200/80 text-left">
            <h3 className="text-xl font-bold text-stone-900 mb-2">Gửi Tin Nhắn Cho Nhóm Sáng Lập</h3>
            <p className="text-xs text-stone-500 mb-6">Phản hồi sẽ được gửi qua email/Zalo của bạn trong vòng 2-4 giờ làm việc.</p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">Gửi Tin Nhắn Thành Công!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                  Cảm ơn bạn đã quan tâm đến dự án khởi nghiệp VELIA. Ban sáng lập dự án sẽ liên hệ lại trực tiếp qua thông tin bạn vừa cung cấp.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 transition-colors"
                >
                  Gửi Yêu Cầu Khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Họ và tên của bạn *</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Nguyễn Hoàng Long"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Số điện thoại / Zalo *</label>
                    <input
                      type="tel"
                      required
                      placeholder="VD: 0912 345 678"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Email liên hệ *</label>
                  <input
                    type="email"
                    required
                    placeholder="VD: hoanglong@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Mục đích kết nối *</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700 bg-white"
                  >
                    <option value="school-b2b">Đặt mua sỉ cho trường học / Canteen / CLB</option>
                    <option value="investor">Kết nối Ban Giám Khảo & Nhà Đầu Tư Thiên Thần</option>
                    <option value="retail">Đại lý phân phối & Nhà sách</option>
                    <option value="press">Báo chí & Truyền thông khởi nghiệp</option>
                    <option value="feedback">Góp ý cải tiến sản phẩm & Thẻ bài</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Nội dung chi tiết *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hãy cho chúng tôi biết về số lượng, địa điểm hoặc câu hỏi hợp tác..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Thông Tin Kết Nối</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Project Info & FAQ */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {/* Quick Contact Cards */}
            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-stone-200/80 space-y-4">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Thông Tin Dự Án Khởi Nghiệp</h4>
              
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-800">Lab R&D & Phòng Điều Hành:</strong>
                    <p className="mt-0.5">Trung tâm Khởi nghiệp & ĐMST ĐH Sài Gòn, 273 An Dương Vương, Phường 3, Quận 5, TP.HCM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-800 shrink-0" />
                  <div>
                    <strong className="text-stone-800">Hotline Dự Án:</strong>
                    <span className="ml-1.5 font-semibold text-emerald-900">0938 123 VELIA (83542)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-800 shrink-0" />
                  <div>
                    <strong className="text-stone-800">Email Khởi Nghiệp:</strong>
                    <span className="ml-1.5 font-semibold text-stone-900">startup.velia.vn@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Câu Hỏi Thường Gặp (FAQ)</h4>
              
              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-stone-200 rounded-xl overflow-hidden bg-white transition-all"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full p-3.5 text-left text-xs font-bold text-stone-900 flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-emerald-800 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-[#FAF9F5]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
