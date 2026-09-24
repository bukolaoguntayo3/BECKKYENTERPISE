import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Award,
  ArrowLeft,
  Plus,
  Minus,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Share2,
  Copy,
  MessageCircle,
  AlertTriangle,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { ProductImageZoom } from '../components/common/ProductImageZoom';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    recordProductView,
    formatPrice,
    currency,
    addReview,
    currentUser,
    businessSettings,
    showToast
  } = useShop();

  const product = products.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // Record product view and set defaults
  useEffect(() => {
    if (product) {
      recordProductView(product.id);
      setActiveImage(product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg');
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      } else {
        setSelectedVariant('');
      }
      setQuantity(1);
      setImageError(false);
      setShowReviewForm(false);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 font-serif-luxury">Product Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The luxury piece you are seeking may have been discontinued or moved.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1B33] text-amber-400 text-xs font-bold hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const fallbackProductImage = '/src/assets/images/hero_luxury_showcase_1790167560610.jpg';
  const inWishlist = isInWishlist(product.id);
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image || fallbackProductImage];
  const isLowStock = product.stockCount > 0 && product.stockCount <= (product.lowStockThreshold || 3);

  const handleAddToCart = () => {
    const success = addToCart(product, quantity, selectedVariant);
    if (success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    const success = addToCart(product, quantity, selectedVariant);
    if (success) {
      navigate('/checkout');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const author = newAuthor.trim() || currentUser?.fullName || 'Verified Patron';
    addReview(product.id, newRating, newComment, author);
    setNewComment('');
    setNewAuthor('');
    setShowReviewForm(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Product link copied to clipboard.', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const whatsappInquiryUrl = `https://wa.me/2348061281910?text=${encodeURIComponent(
    `Hello BECKKYENTERPRISE, I would like to inquire about "${product.name}" (SKU: ${product.sku || 'BEK-LUX'}, Price: ${formatPrice(
      product.discountPrice ?? product.price
    )}).`
  )}`;

  // Related & recently viewed products
  const relatedProducts = (products || [])
    .filter((p) => p && p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const reviewsList = product.reviews || [];

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link to="/shop" className="hover:text-slate-900">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-amber-700 font-medium"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Section: Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <ProductImageZoom
              src={activeImage || product.image || fallbackProductImage}
              alt={product.name}
              productName={product.name}
              inWishlist={inWishlist}
              onToggleWishlist={() => toggleWishlist(product.id)}
              galleryImages={galleryImages}
              activeImageIndex={galleryImages.indexOf(activeImage || product.image || fallbackProductImage)}
              onSelectImage={(idx) => setActiveImage(galleryImages[idx])}
              badges={
                <>
                  {product.discountPrice && product.discountPrice < product.price && (
                    <span className="text-[11px] font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-md shadow-xs">
                      Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="text-[11px] font-bold bg-[#0B1B33] text-amber-300 px-2.5 py-0.5 rounded-md shadow-xs">
                      Curated Collection
                    </span>
                  )}
                  {product.isNewArrival && (
                    <span className="text-[11px] font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-md shadow-xs">
                      New Season
                    </span>
                  )}
                </>
              }
            />

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img
                        ? 'border-amber-500 ring-2 ring-amber-200'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee Badges bar under photo */}
            <div className="bg-[#F5F6F8] rounded-2xl p-4 border border-slate-200/80 grid grid-cols-3 gap-2 text-center text-xs text-slate-700">
              <div className="flex flex-col items-center gap-1">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-[11px]">100% Genuine</span>
                <span className="text-[10px] text-slate-400">Assay Hallmarked</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-slate-200">
                <Truck className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-[11px]">Express Courier</span>
                <span className="text-[10px] text-slate-400">24-48h In Lagos</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-[11px]">Insured Delivery</span>
                <span className="text-[10px] text-slate-400">Transit Protected</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Meta & Purchase Options */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  {product.category}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  SKU: {product.sku || 'BEK-LUX'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1B33] font-serif-luxury mt-1.5">
                {product.name}
              </h1>

              {/* Rating / Review count anchor */}
              <div className="flex items-center gap-3 mt-2.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-bold text-slate-900 text-sm">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-slate-300">·</span>
                <a
                  href="#reviews-section"
                  className="text-xs text-slate-500 hover:text-amber-700 underline"
                >
                  {product.reviewCount} verified client reviews
                </a>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="p-4 rounded-2xl bg-[#F5F6F8] border border-slate-200/80 flex items-baseline justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Patron Price
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-bold text-[#0B1B33] font-serif-luxury tabular-nums">
                    {formatPrice(product.discountPrice ?? product.price)}
                  </span>
                  {product.discountPrice && product.discountPrice < product.price && (
                    <span className="text-base text-slate-400 line-through tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                {product.inStock && product.stockCount > 0 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <Check className="w-3.5 h-3.5" />
                    <span>In Stock ({product.stockCount} left)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    <span>Sold Out</span>
                  </span>
                )}
              </div>
            </div>

            {/* Low stock urgency alert */}
            {isLowStock && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Low stock urgency: Only {product.stockCount} units remaining in vault inventory.</span>
              </div>
            )}

            {/* Description */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Variants selector if applicable */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-900">
                  Select Size / Option:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        selectedVariant === v
                          ? 'bg-[#0B1B33] text-amber-300 border-[#0B1B33] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Quantity:
                </label>
                <div className="flex items-center border border-slate-300 rounded-xl bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2.5 text-slate-600 hover:text-slate-900 disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stockCount || 10, q + 1))}
                    className="p-2.5 text-slate-600 hover:text-slate-900 disabled:opacity-40"
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || product.stockCount <= 0}
                  className={`py-3.5 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-xs ${
                    !product.inStock || product.stockCount <= 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0B1B33] hover:bg-slate-800 text-amber-400 hover:shadow-md'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Your Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={!product.inStock || product.stockCount <= 0}
                  className="py-3.5 px-5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  <span>Express Checkout</span>
                </button>
              </div>

              {/* Direct WhatsApp Concierge CTA */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Enquire on WhatsApp (08061281910)</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Copy product link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Structured Specifications Table (Section 12) */}
            {product.specifications && (
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Technical Specifications & Hallmarks
                </h3>
                <div className="bg-[#F5F6F8] rounded-xl p-4 border border-slate-200/80">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                    {product.specifications.material && (
                      <div>
                        <dt className="text-slate-400">Material</dt>
                        <dd className="font-semibold text-slate-900">{product.specifications.material}</dd>
                      </div>
                    )}
                    {product.specifications.purity && (
                      <div>
                        <dt className="text-slate-400">Purity / Hallmark</dt>
                        <dd className="font-semibold text-slate-900">{product.specifications.purity}</dd>
                      </div>
                    )}
                    {product.specifications.weight && (
                      <div>
                        <dt className="text-slate-400">Weight</dt>
                        <dd className="font-semibold text-slate-900">{product.specifications.weight}</dd>
                      </div>
                    )}
                    {product.specifications.dimensions && (
                      <div>
                        <dt className="text-slate-400">Dimensions / Length</dt>
                        <dd className="font-semibold text-slate-900">{product.specifications.dimensions}</dd>
                      </div>
                    )}
                    {product.specifications.origin && (
                      <div>
                        <dt className="text-slate-400">Origin / Assay</dt>
                        <dd className="font-semibold text-slate-900">{product.specifications.origin}</dd>
                      </div>
                    )}
                    {product.specifications.warranty && (
                      <div>
                        <dt className="text-slate-400">Warranty</dt>
                        <dd className="font-semibold text-slate-900">{product.specifications.warranty}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            )}

            {/* Product Highlights list */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Patron Inclusions
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Star Rating Section */}
        <section id="reviews-section" className="pt-12 border-t border-slate-200 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Verified Client Opinions
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#0B1B33] mt-1">
                Patron Reviews ({reviewsList.length})
              </h2>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1B33] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-colors shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
            </button>
          </div>

          {/* Interactive Review Submission Form */}
          {showReviewForm && (
            <form
              onSubmit={handleReviewSubmit}
              className="bg-[#F5F6F8] rounded-2xl p-6 border border-slate-200/80 space-y-4 max-w-xl"
            >
              <h3 className="text-sm font-bold text-slate-900 font-serif-luxury">
                Leave Your Verified Feedback
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className={`p-1 transition-colors ${
                        s <= newRating ? 'text-amber-500' : 'text-slate-300'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {newRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder={currentUser?.fullName || 'e.g. Bukola O.'}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share details about the craftsmanship, fit, packaging, or delivery..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0B1B33] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all shadow-xs"
              >
                Submit Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#F5F6F8] rounded-2xl p-5 border border-slate-200/80 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                  {rev.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Patron</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="pt-12 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Recommended For You
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#0B1B33] mt-1">
                  You May Also Admire
                </h2>
              </div>
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-amber-700 hover:underline"
              >
                View More in Department →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard key={relProd.id} product={relProd} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
