import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Star, Quote, ShieldCheck, Award, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES_DATA } from '../data/mockProducts';
import { CUSTOMER_TESTIMONIALS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { products, categories, currentUser } = useShop();

  const displayCategories = categories && categories.length > 0 ? categories : CATEGORIES_DATA;
  const featuredProducts = (products || []).filter((p) => p && p.isFeatured).slice(0, 6);
  const bestSellers = (products || []).filter((p) => p && p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B1B33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Curated Fine Gold & Contemporary Luxury</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif-luxury leading-[1.1]">
                Uncompromising Luxury for the Discerning Individual.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Welcome to <span className="text-amber-300 font-semibold">BECKKYENTERPRISE</span>. Discover authentic 18K solid gold jewelry, bespoke unisex "up & down" loungewear sets, luxury footwear, tailoring, and clinically-backed skin glow formulas shipped worldwide.
              </p>

              {/* Calls to Action */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/catalog"
                  className="px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {!currentUser ? (
                  <Link
                    to="/auth?mode=signup"
                    className="px-6 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-colors"
                  >
                    Create an Account
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="px-6 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-colors"
                  >
                    View My Account
                  </Link>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div>
                  <span className="block font-bold text-white text-base">Verified Seller</span>
                  <span>Certified 18K/14K Gold</span>
                </div>
                <div>
                  <span className="block font-bold text-white text-base">Worldwide Delivery</span>
                  <span>DHL & FedEx Insured</span>
                </div>
                <div>
                  <span className="block font-bold text-white text-base">Quality Guaranteed</span>
                  <span>14-Day Free Exchange</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-amber-400/20 shadow-2xl bg-slate-900 aspect-16/10 lg:aspect-4/3">
                <img
                  src="/src/assets/images/hero_luxury_showcase_1790167560610.jpg"
                  alt="Fine 18K solid gold jewelry and luxury accessories on display"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-amber-300 text-xs font-semibold tracking-wider uppercase">
                    Signature Collection
                  </span>
                  <p className="text-white font-semibold text-sm sm:text-base mt-1">
                    18K Cuban Links, Italian Calfskin & Velvet Loungewear
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid (All 6 core categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              Curated Departments
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-bold text-[#0B1B33] hover:text-amber-600 flex items-center gap-1 group"
          >
            <span>View Complete Collection</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.filter(Boolean).map((cat) => (
            <Link
              key={cat?.id || cat?.name}
              to={`/shop?category=${encodeURIComponent(cat?.name || '')}`}
              className="group relative rounded-xl overflow-hidden bg-slate-900 aspect-16/10 border border-slate-200/60 shadow-xs hover:shadow-lg transition-all duration-300 block"
            >
              <img
                src={cat?.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'}
                alt={cat?.name || 'Department'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Department
                </span>
                <h3 className="text-lg font-bold text-white font-serif-luxury mt-0.5 group-hover:text-amber-200 transition-colors">
                  {cat?.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 mt-1">
                  {cat?.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore items</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="bg-[#F5F6F8] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
                Hand-Selected For You
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury">
                Featured Highlights
              </h2>
            </div>
            <Link
              to="/catalog"
              className="text-xs font-bold text-[#0B1B33] hover:text-amber-600 flex items-center gap-1 group"
            >
              <span>Explore Entire Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Craftsmanship & Guarantee Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0B1B33] text-white p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                The BECKKY Quality Commitment
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury leading-snug">
                Every Piece Hallmarked. Every Garment Tailored. Every Formula Pure.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                We believe true luxury is transparent and durable. When you purchase our solid gold chains and rings, you receive an official purity certificate. Our unisex "Up & Down" sets use heavyweight organic weaves, and our anti-aging supplements undergo strict third-party lab testing.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Official Gold Hallmarks</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Organic Grade Fabrics</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>GMP Lab-Tested Actives</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <Link
                to="/catalog"
                className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-md"
              >
                Experience the Quality
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              Customer Favorites
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury">
              Best-Selling Essentials
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-bold text-[#0B1B33] hover:text-amber-600 flex items-center gap-1 group"
          >
            <span>See All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F6F8] rounded-2xl p-8 sm:p-12 border border-slate-200/80 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Verified Patron Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury">
              Celebrated by Clients Worldwide
            </h2>
            <p className="text-xs text-slate-500">
              Read how patrons across London, Atlanta, Lagos, and Dubai experience our fine craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-500">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified Buyer
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0B1B33] text-amber-300 font-serif-luxury font-bold text-xs flex items-center justify-center shrink-0">
                    {test.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{test.author}</h4>
                    <p className="text-[11px] text-slate-500">{test.location}</p>
                    <p className="text-[10px] text-amber-700 font-medium">{test.productMention}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
