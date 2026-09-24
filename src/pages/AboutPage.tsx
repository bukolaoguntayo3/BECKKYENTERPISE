import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Truck, Sparkles, Heart, ArrowRight, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { businessSettings } = useShop();

  const whatsappMessage = encodeURIComponent(
    'Hello BECKKYENTERPRISE, I would like to make an enquiry about your products.'
  );
  const whatsappUrl = `https://wa.me/2348061281910?text=${whatsappMessage}`;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-[#0B1B33] text-white py-16 sm:py-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mb-4">
            Our Heritage & Commitment
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury tracking-wide text-white leading-tight">
            The World of BECKKYENTERPRISE
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Crafting a premier luxury destination for genuine solid gold jewelry, tailored unisex casualwear, sartorial fashion, and cellular glow supplements for discerning clients in Nigeria and across the globe.
          </p>
        </div>
      </section>

      {/* Brand Narrative */}
      <section className="py-14 sm:py-20 bg-[#F5F6F8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Founder's Vision
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#0B1B33]">
                Uncompromising Quality. Authentic Hallmarks. Modern Elegance.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Founded with a resolute passion for authentic luxury, <strong>BECKKYENTERPRISE</strong> bridges world-class craftsmanship with effortless Nigerian warmth. What began as a boutique private sourcing service has blossomed into a comprehensive luxury catalog catering to individuals who demand authenticity without compromise.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether selecting an investment-grade 18-karat solid gold Cuban link chain with certified assay hallmarks, stepping out in our custom-milled unisex "Up & Down" lounge set, or rejuvenating your complexion with our marine collagen and glutathione regimens, every product in our collection is rigorously inspected for pure excellence.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1B33] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-colors shadow-sm"
                >
                  <span>Explore The Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src="/src/assets/images/hero_luxury_showcase_1790167560610.jpg"
                  alt="BECKKYENTERPRISE Luxury Collection"
                  className="w-full h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <p className="text-white font-serif-luxury font-bold text-lg">
                    Certified 100% Purity & Craftsmanship
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Every piece backed by authenticity verification and insured nationwide courier delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of BECKKYENTERPRISE */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Our Core Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#0B1B33] mt-1">
              Why Discerning Clients Choose BECKKYENTERPRISE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F6F8] rounded-2xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-serif-luxury text-[#0B1B33]">
                Certified Gold Hallmarks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All gold jewelry is certified genuine 18-karat (750) or 14-karat (585) solid gold. We stamp official assay marks and accompany each piece with a serialized Certificate of Authenticity.
              </p>
            </div>

            <div className="bg-[#F5F6F8] rounded-2xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-serif-luxury text-[#0B1B33]">
                Curated Unisex Apparel & Tailoring
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our bespoke unisex "Up & Down" two-piece sets and designer garments are cut from heavy organic cotton velours and Aegean waffle weaves, finished with custom gilded hardware.
              </p>
            </div>

            <div className="bg-[#F5F6F8] rounded-2xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-serif-luxury text-[#0B1B33]">
                Insured Express Nationwide Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enjoy 24–48 hour delivery in Lagos and fast 2–4 day express courier delivery across all 36 Nigerian states and Abuja FCT, with live milestone tracking step-by-step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-14 bg-gradient-to-r from-[#0B1B33] via-slate-900 to-[#0B1B33] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-amber-300">
            Experience True Luxury with BECKKYENTERPRISE
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Browse our new season arrivals or connect directly with our founder on WhatsApp for private bespoke inquiries.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/shop"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              Shop The Catalog
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
            >
              Contact Advisory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
