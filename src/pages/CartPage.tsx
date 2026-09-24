import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  ArrowLeft,
  Tag,
  Check,
  X
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalCartTotal,
    formatPrice
  } = useShop();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const freeShippingThreshold = 150;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingFee = isFreeShipping ? 0 : 15;
  const grandTotal = finalCartTotal + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5 text-slate-400">
          <ShoppingBag className="w-10 h-10 text-slate-400" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 font-serif-luxury">Your Shopping Cart is Empty</h1>
        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
          You haven't added any luxury pieces or glow supplements to your bag yet. Explore our curated collections to get started.
        </p>
        <Link
          to="/catalog"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0B1B33] text-white text-xs font-semibold hover:bg-amber-600 transition-colors shadow-xs"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Shopping Bag</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif-luxury">
            Review Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-rose-600 transition-colors self-start sm:self-auto"
        >
          Clear Entire Cart
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="my-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80">
        <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-2">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-600" />
            <span>
              {isFreeShipping
                ? '✨ You qualify for Complimentary Insured Worldwide Delivery!'
                : `Add $${remainingForFreeShipping.toFixed(2)} more for Complimentary Worldwide Delivery`}
            </span>
          </div>
          <span className="tabular-nums font-bold">
            {isFreeShipping ? '100%' : `${Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100))}%`}
          </span>
        </div>
        <div className="w-full h-1.5 bg-amber-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%` }}
          />
        </div>
      </div>

      {/* Main Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
            {cart.filter((item) => item && item.product).map((item) => (
              <div key={item.id} className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Product Thumbnail & Info */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 block"
                  >
                    <img
                      src={item.product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'}
                      alt={item.product.name || 'Luxury Product'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                      {item.product.category}
                    </span>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-sm font-bold text-slate-900 hover:text-amber-700 transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    {item.selectedVariant && (
                      <span className="text-xs text-slate-500 block mt-0.5">
                        Option: <strong className="text-slate-700">{item.selectedVariant}</strong>
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-900 sm:hidden mt-1 block">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Price */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-slate-600 hover:text-slate-900"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-slate-600 hover:text-slate-900"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Desktop Item Total Price */}
                  <div className="text-right min-w-[80px] hidden sm:block">
                    <span className="text-sm font-bold text-slate-900 tabular-nums block">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-[11px] text-slate-400 tabular-nums">
                        {formatPrice(item.product.price)} ea
                      </span>
                    )}
                  </div>

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-amber-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping Collection</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="lg:col-span-4 bg-[#F5F6F8] rounded-xl p-6 border border-slate-200 space-y-5">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200 font-serif-luxury">
            Order Summary
          </h2>

          {/* Coupon Code Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
              Promo or VIP Voucher
            </label>
            {!appliedCoupon ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. GOLDEN10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg uppercase outline-none focus:border-amber-500 font-mono"
                />
                <button
                  type="submit"
                  disabled={!couponInput.trim()}
                  className="px-3 py-2 bg-[#0B1B33] hover:bg-amber-600 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-800">
                <div className="flex items-center gap-1.5 font-bold font-mono">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{appliedCoupon.code}</span>
                  <span className="font-normal text-[11px] text-emerald-700">({appliedCoupon.description})</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-emerald-700 hover:text-rose-600 p-0.5"
                  title="Remove coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <p className="text-[11px] text-slate-500">
              Try <span className="font-mono font-bold text-amber-800 cursor-pointer hover:underline" onClick={() => setCouponInput('GOLDEN10')}>GOLDEN10</span> (10% off) or <span className="font-mono font-bold text-amber-800 cursor-pointer hover:underline" onClick={() => setCouponInput('BECKKY50')}>BECKKY50</span> ($50 off $200+)
            </p>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {formatPrice(cartTotal)}
              </span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>VIP Discount ({appliedCoupon.code})</span>
                <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Worldwide Tracked Shipping</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {isFreeShipping ? 'COMPLIMENTARY' : formatPrice(15)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Luxury Duties</span>
              <span className="font-semibold text-emerald-700">Included</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between items-baseline">
            <span className="text-sm font-bold text-slate-900">Estimated Total</span>
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">
              {formatPrice(grandTotal)}
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-lg bg-[#0B1B33] hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2 group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="pt-2 text-[11px] text-slate-500 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Certified SSL 256-Bit Order Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Dispatched with Signature Required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
