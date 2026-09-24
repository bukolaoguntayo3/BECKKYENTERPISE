import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Award, Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { showToast, businessSettings } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed! You will receive VIP private invitations and preview codes.', 'success');
    setNewsletterEmail('');
  };

  const whatsappMessage = encodeURIComponent(
    'Hello BECKKYENTERPRISE Concierge, I would like to inquire about your fine gold jewelry and luxury collection.'
  );
  const whatsappUrl = `https://wa.me/2348061281910?text=${whatsappMessage}`;

  return (
    <footer className="bg-[#0B1B33] text-slate-300 pt-12 pb-8 border-t border-slate-800">
      {/* Trust Badges Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white">Verified Luxury Goods</h4>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  Certified
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Authentic solid gold hallmarks & laboratory assay verification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white">Nationwide & Global Delivery</h4>
                <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  Insured
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                24-48h in Lagos, 2-4 days across all 36 Nigerian states.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white">100% Quality Guaranteed</h4>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  Assayed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Pristine luxury textiles and certified body glow formulations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand & WhatsApp Button */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold font-serif-luxury text-sm flex items-center justify-center">
              B
            </div>
            <span className="text-xl font-bold tracking-wider text-white font-serif-luxury uppercase">
              {businessSettings.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Curated destination for genuine solid gold jewelry, bespoke unisex up & down sets, premium menswear, ladies’ fashion, designer accessories, and clinically-backed glow supplements.
          </p>

          {/* WhatsApp Click-to-Chat Button */}
          <div className="pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-md group"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>WhatsApp: {businessSettings.whatsapp}</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2 text-xs">
            <a
              href={`https://www.tiktok.com/@${businessSettings.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              TikTok: @{businessSettings.tiktok}
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={`https://www.instagram.com/${businessSettings.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              Instagram: @{businessSettings.instagram}
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
            Departments
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link to="/shop?category=Gold+%26+Jewelry" className="hover:text-amber-400 transition-colors">
                Solid Gold & Jewelry
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Unisex+'Up+%26+Down'+Sets" className="hover:text-amber-400 transition-colors">
                Unisex "Up & Down" Sets
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Supplements+(body+glow+%26+anti-aging)" className="hover:text-amber-400 transition-colors">
                Body Glow Supplements
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Men's+Wear" className="hover:text-amber-400 transition-colors">
                Men's Designer Wear
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Ladies'+Tops+%26+Jeans" className="hover:text-amber-400 transition-colors">
                Ladies' Tops & Jeans
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Luxury+Bags+%26+Shoes" className="hover:text-amber-400 transition-colors">
                Luxury Bags & Shoes
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link to="/contact" className="hover:text-amber-400 transition-colors font-medium text-amber-300">
                Contact Concierge
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-400 transition-colors">
                About Our Brand
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-amber-400 transition-colors">
                All Departments
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-amber-400 transition-colors">
                Track My Order
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-amber-400 transition-colors">
                Shopping Bag
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-amber-400 transition-colors">
                Saved Wishlist
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-amber-400 transition-colors">
                Staff Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup Form */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
            VIP Luxury Journal
          </h4>
          <p className="text-[11px] text-slate-400 mb-3">
            Receive private vault releases, seasonal lookbooks, and exclusive coupon codes.
          </p>

          {isSubscribed ? (
            <div className="p-3 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>You're enrolled in the VIP list!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Subscribe for VIP Access</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <a href={`tel:${businessSettings.phone}`} className="hover:text-white">
                {businessSettings.phone}
              </a>
            </p>
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <a href={`mailto:${businessSettings.email}`} className="hover:text-white break-all">
                {businessSettings.email}
              </a>
            </p>
            <p className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{businessSettings.address}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} {businessSettings.name}. All rights reserved.</p>
        <div className="flex items-center gap-4 text-[11px]">
          <Link to="/contact" className="hover:text-slate-200">Contact</Link>
          <span>·</span>
          <Link to="/about" className="hover:text-slate-200">About</Link>
          <span>·</span>
          <span>Terms of Luxury Service</span>
          <span>·</span>
          <span>Nationwide Tracked Logistics</span>
        </div>
      </div>
    </footer>
  );
};
