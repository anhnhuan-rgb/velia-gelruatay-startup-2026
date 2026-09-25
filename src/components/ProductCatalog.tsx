import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, Star, ShieldCheck, Sparkles, X, Check } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, volume?: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tất Cả Sản Phẩm' },
    { id: 'pocket', label: 'Chai Bỏ Túi 30ml' },
    { id: 'starter-pack', label: 'Combo & Thẻ Bài' },
    { id: 'refill', label: 'Túi Nạp Refill' },
    { id: 'gift-box', label: 'Hộp Quà Cao Cấp' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1800);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-[#FAF9F5] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-2 max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase">
              Cửa Hàng Trực Tuyến VELIA
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Gel Kháng Khuẩn Dưỡng Ẩm & Quà Tặng Kèm Thẻ Bài
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Mỗi đơn hàng đều được đóng gói tỉ mỉ bằng giấy tái chế và đính kèm <strong>01 Thẻ bài Veli Mascot bí mật</strong>.
            </p>
          </div>

          {/* Interactive filter tabs (segmented control) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isAdded = justAddedId === product.id;
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle top indicator */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-xs">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Tặng kèm thẻ bài</span>
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="px-4 py-2 bg-white text-stone-900 text-xs font-semibold rounded-lg shadow-md hover:bg-stone-100 transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem chi tiết</span>
                    </button>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-1.5">
                    {/* Quiet unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                      <span>{product.volume}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-semibold">{product.scent}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="text-base font-bold text-stone-900 hover:text-emerald-800 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-base font-extrabold text-stone-900 tabular-nums">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice > product.price && (
                        <div className="text-xs text-stone-400 line-through tabular-nums">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleQuickAdd(product)}
                      disabled={isAdded}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-900 hover:bg-emerald-800 text-white shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã thêm!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Thêm vào giỏ</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 text-left relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Product Image */}
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Đặc quyền bộ sưu tập Thẻ Bài</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Sản phẩm này chứa 01 Thẻ bài nhân vật Veli Mascot ngẫu nhiên (Common/Rare/Super Rare) giúp bảo vệ và lan tỏa thông điệp sống xanh!
                  </p>
                </div>
              </div>

              {/* Right Column: Information & Actions */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                    <span>{selectedProduct.volume}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-semibold">{selectedProduct.scent}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                    {selectedProduct.name}
                  </h3>

                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-extrabold text-stone-900 tabular-nums">
                      {formatPrice(selectedProduct.price)}
                    </span>
                    {selectedProduct.originalPrice > selectedProduct.price && (
                      <span className="text-sm text-stone-400 line-through tabular-nums">
                        {formatPrice(selectedProduct.originalPrice)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {selectedProduct.fullDesc}
                  </p>

                  {/* Key Benefits */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">Ưu Điểm Nổi Bật:</div>
                    <ul className="space-y-1 text-xs text-stone-600">
                      {selectedProduct.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Ingredients */}
                  <div className="space-y-1 pt-2">
                    <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">Thành Phần Sinh Học Chính:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.keyIngredients.map((ing, idx) => (
                        <span key={idx} className="text-[11px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Purchase Button in Modal */}
                <div className="pt-4 border-t border-stone-200">
                  <button
                    onClick={() => {
                      handleQuickAdd(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Thêm Vào Giỏ Hàng · {formatPrice(selectedProduct.price)}</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
