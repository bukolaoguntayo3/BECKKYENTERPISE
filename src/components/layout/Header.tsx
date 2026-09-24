import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, Heart, User, ShieldCheck, Globe, HelpCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CurrencyCode } from '../../types';
import { CURRENCIES } from '../../utils/currency';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    currentUser,
    searchQuery,
    setSearchQuery,
    setIsMobileDrawerOpen,
    currency,
    setCurrency
  } = useShop();

  const [inputVal, setInputVal] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputVal.trim());
    navigate(`/catalog?search=${encodeURIComponent(inputVal.trim())}`);
  };

  const currencyOptions: CurrencyCode[] = ['USD', 'GBP', 'EUR', 'NGN', 'CAD', 'AED'];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro announcement bar with currency selector and quick support */}
      <div className="bg-[#0B1B33] text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-[11px] sm:text-xs">
          <span className="text-amber-300 font-medium whitespace-nowrap">
            ✨ Verified Authentic Luxury
          </span>
          <span className="hidden md:inline text-slate-500">·</span>
          <span className="hidden md:inline text-slate-300">
            Complimentary Insured Worldwide Delivery over $150
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Support / FAQ Link */}
          <Link
            to="/support"
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-amber-300 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & FAQ</span>
          </Link>

          <span className="hidden sm:inline text-slate-600">|</span>

          {/* Currency Selector */}
          <div className="flex items-center gap-1 text-slate-200">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="bg-slate-800 text-white text-[11px] font-bold rounded px-1.5 py-0.5 border border-slate-700 outline-none cursor-pointer hover:border-amber-400 transition-colors"
              aria-label="Select currency"
            >
              {currencyOptions.map((code) => (
                <option key={code} value={code} className="bg-slate-900 text-white">
                  {code} ({CURRENCIES[code].symbol.trim()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Drawer Trigger + Brand for small screens */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="lg:hidden flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-[#0B1B33] text-amber-300 font-serif-luxury font-bold text-sm flex items-center justify-center">
              B
            </div>
            <span className="text-sm font-bold tracking-wider text-[#0B1B33] font-serif-luxury">
              BECKKYENTERPRISE
            </span>
          </Link>
        </div>

        {/* Center: Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg hidden sm:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search gold jewelry, unisex sets, silk tops, supplements..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-amber-400 rounded-lg outline-none transition-all placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </form>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin badge if active */}
          {currentUser?.role === 'admin' && (
            <Link
              to="/admin"
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Admin Portal</span>
            </Link>
          )}

          {/* Wishlist */}
          <Link
            to="/dashboard?tab=wishlist"
            className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="View Wishlist"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 text-slate-700 hover:text-amber-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
            aria-label="View Shopping Cart"
            title="Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-xs font-semibold text-slate-800">
              Bag
            </span>
          </Link>

          {/* Account */}
          <Link
            to={currentUser ? "/dashboard" : "/auth"}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-xs font-medium text-slate-800"
            aria-label="Account Profile"
          >
            <User className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">
              {currentUser ? currentUser.fullName.split(' ')[0] : 'Sign In'}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
