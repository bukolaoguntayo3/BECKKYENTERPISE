import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, formatPrice, currency } = useShop();
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const productImage = product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg';

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200/80 hover:border-amber-400/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200">
      {/* Product Image Slot */}
      <Link to={`/product/${product.id}`} className="relative aspect-4/3 overflow-hidden bg-slate-100 block">
        {!imageError ? (
          <img
            src={productImage}
            alt={product.name || 'Luxury Product'}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-amber-50 text-slate-400">
            <ShoppingBag className="w-10 h-10 text-amber-500/50 mb-2" />
            <span className="text-xs text-slate-500 font-medium text-center">{product.name}</span>
          </div>
        )}

        {/* Status Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {product.isBestSeller && (
            <span className="text-[11px] font-semibold tracking-wide bg-amber-500 text-white px-2 py-0.5 rounded shadow-xs">
              Best Seller
            </span>
          )}
          {!product.isBestSeller && product.isFeatured && (
            <span className="text-[11px] font-medium tracking-wide bg-slate-900 text-white px-2 py-0.5 rounded shadow-xs">
              Curated
            </span>
          )}
          {!product.inStock && (
            <span className="text-[11px] font-medium tracking-wide bg-rose-600 text-white px-2 py-0.5 rounded shadow-xs">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
            inWishlist
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white border border-slate-200/60'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </Link>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category metadata */}
          <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">
            {product.category}
          </div>

          <Link
            to={`/product/${product.id}`}
            className="text-sm font-semibold text-slate-900 hover:text-amber-700 transition-colors line-clamp-1 block mb-1.5"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-semibold text-slate-800">{product.rating.toFixed(1)}</span>
            </div>
            <span aria-hidden="true">·</span>
            <span>({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Price & Add to Cart action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
            {currency !== 'USD' && (
              <span className="text-[10px] text-slate-400 tabular-nums">
                approx. ${product.price.toFixed(2)} USD
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 shrink-0 ${
              !product.inStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0B1B33] hover:bg-amber-600 text-white shadow-xs hover:shadow'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
