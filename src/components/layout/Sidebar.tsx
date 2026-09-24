import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  Sparkles,
  Shirt,
  Layers,
  Heart,
  ShoppingCart,
  User,
  ShieldCheck,
  LogOut,
  X,
  Compass,
  Package,
  Info,
  PhoneCall,
  LayoutGrid
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Sidebar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    currentUser,
    logout,
    toggleAdminRole,
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    businessSettings
  } = useShop();

  const closeDrawer = () => setIsMobileDrawerOpen(false);

  const mainNavItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/shop', label: 'Shop All Products', icon: ShoppingBag },
    { to: '/categories', label: 'All Departments', icon: LayoutGrid },
    { to: '/shop?category=Gold+%26+Jewelry', label: 'Solid Gold & Jewelry', icon: Sparkles },
    { to: "/shop?category=Unisex+'Up+%26+Down'+Sets", label: "Unisex Sets", icon: Layers },
    { to: '/shop?category=Supplements+(body+glow+%26+anti-aging)', label: 'Glow Supplements', icon: Sparkles },
    { to: "/shop?category=Men's+Wear", label: "Men's Wear", icon: Shirt },
    { to: "/shop?category=Ladies'+Tops+%26+Jeans", label: "Ladies' Tops & Jeans", icon: Compass },
    { to: '/shop?category=Luxury+Bags+%26+Shoes', label: 'Luxury Bags & Shoes', icon: ShoppingBag },
    { to: '/cart', label: 'Shopping Bag', icon: ShoppingCart, badge: cartCount > 0 ? cartCount : undefined },
    { to: '/wishlist', label: 'My Wishlist', icon: Heart, badge: wishlist.length > 0 ? wishlist.length : undefined },
    { to: '/orders', label: 'My Orders', icon: Package },
    { to: '/about', label: 'About Brand', icon: Info },
    { to: '/contact', label: 'Contact & Concierge', icon: PhoneCall }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileDrawerOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0B1B33] text-slate-200 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileDrawerOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Pinned Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link to="/" onClick={closeDrawer} className="flex flex-col group">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-serif-luxury font-bold text-xs flex items-center justify-center">
                B
              </div>
              <span className="text-base font-bold tracking-wider text-white font-serif-luxury uppercase">
                {businessSettings.name}
              </span>
            </div>
            <span className="text-[10px] text-amber-300/80 font-medium tracking-widest pl-9">
              FINE GOLD & LUXURY GOODS
            </span>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={closeDrawer}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            Store Navigation
          </div>

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-300 border-l-3 border-amber-400 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 text-amber-400/80" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-amber-400 text-slate-950 shadow-2xs">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Pinned User & Admin Section */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
          {currentUser ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Link
                  to="/dashboard"
                  onClick={closeDrawer}
                  className="flex items-center gap-2.5 overflow-hidden group"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white group-hover:text-amber-300 truncate transition-colors">
                      {currentUser.fullName}
                    </p>
                    <p className="text-[10px] text-amber-400 font-medium">VIP Gold Patron</p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    closeDrawer();
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Sign Out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Admin Mode Toggle */}
              <button
                onClick={() => {
                  toggleAdminRole();
                  closeDrawer();
                }}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  currentUser.role === 'admin'
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>
                  {currentUser.role === 'admin' ? 'Switch to Patron View' : 'Manager Admin Portal'}
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/signin"
                onClick={closeDrawer}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
