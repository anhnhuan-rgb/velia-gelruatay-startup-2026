import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BookOpen, Calendar, Clock, User, X, ArrowRight, Share2 } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-16 md:py-24 bg-[#FAF9F5] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase flex items-center justify-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kiến Thức Sống Xanh & Góc Khởi Nghiệp</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight text-balance">
            Cẩm Nang Chăm Sóc Đôi Tay & Hành Trình Đổi Mới Sáng Tạo
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Những chia sẻ khoa học từ đội ngũ sinh viên ĐH Sài Gòn và câu chuyện thực chiến xây dựng thương hiệu gel xà phòng khô đầu tiên tại Việt Nam.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-stone-200/80 p-6 flex flex-col justify-between hover:shadow-lg hover:border-emerald-300 transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="space-y-3">
                {/* Quiet unboxed metadata */}
                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <span className="text-emerald-800 font-semibold">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Author & Read CTA */}
              <div className="pt-4 border-t border-stone-100 mt-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-800">{post.author}</div>
                  <div className="text-[11px] text-stone-400">{post.authorRole}</div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 group-hover:translate-x-1 transition-transform">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 text-left relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Header Info */}
              <div className="space-y-2 border-b border-stone-200 pb-5">
                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <span className="text-emerald-800 font-semibold">{selectedPost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPost.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPost.date}</span>
                </div>

                <h3 className="text-2xl font-bold text-stone-900 leading-snug">
                  {selectedPost.title}
                </h3>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{selectedPost.author}</div>
                    <div className="text-[11px] text-stone-500">{selectedPost.authorRole}</div>
                  </div>
                </div>
              </div>

              {/* Article Content Paragraphs */}
              <div className="space-y-4 text-stone-700 text-sm leading-relaxed">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Tags & Share */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-stone-700">Chủ đề:</span>
                  {selectedPost.tags.map((tag, idx) => (
                    <span key={idx} className="bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: selectedPost.title, url: window.location.href });
                    }
                  }}
                  className="flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-medium"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Chia sẻ bài viết</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
