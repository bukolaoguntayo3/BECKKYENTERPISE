import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CategoriesPage: React.FC = () => {
  const { categories, products } = useShop();

  return (
    <div className="bg-[#F5F6F8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
            Luxury Departments
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#0B1B33] mt-3">
            Explore All Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Immerse yourself in authentic solid gold jewelry, bespoke unisex sets, clinically-formulated glow supplements, and high-end fashion collections.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(categories || []).filter(Boolean).map((cat) => {
            const count = (products || []).filter((p) => p && p.category === cat.name && p.active).length;

            return (
              <Link
                key={cat.id || cat.name}
                to={`/shop?category=${encodeURIComponent(cat.name || '')}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Cover */}
                <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
                  <img
                    src={cat.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'}
                    alt={cat.name || 'Category'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    <span>{count} {count === 1 ? 'Product' : 'Products'}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-serif-luxury text-[#0B1B33] group-hover:text-amber-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B1B33] group-hover:text-amber-700 transition-colors">
                    <span>Explore Department</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-amber-600" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold font-serif-luxury text-[#0B1B33]">
              Need a Custom Commission or Sizing Consultation?
            </h4>
            <p className="text-xs text-slate-500">
              Our master jewelers and tailoring team craft bespoke solid gold pieces and personalized lounge sets.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-[#0B1B33] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-colors shrink-0 shadow-sm"
          >
            Contact Bespoke Concierge
          </Link>
        </div>
      </div>
    </div>
  );
};
