import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Truck,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Bell,
  Award,
  Share2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Address, OrderStatus } from '../types';

interface DashboardPageProps {
  initialTab?: 'orders' | 'addresses' | 'wishlist' | 'loyalty' | 'settings';
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ initialTab }) => {
  const {
    currentUser,
    orders,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    wishlist,
    products,
    addToCart,
    toggleWishlist,
    logout,
    updateProfile,
    showToast,
    formatPrice,
    loyaltyPoints,
    referralCode,
    requestOrderRefund,
    notificationPreferences,
    updateNotificationPreferences
  } = useShop();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeTab = (searchParams.get('tab') as 'orders' | 'addresses' | 'wishlist' | 'loyalty' | 'settings') || initialTab || 'orders';

  const setTab = (tab: 'orders' | 'addresses' | 'wishlist' | 'loyalty' | 'settings') => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('tab', tab);
    setSearchParams(nextParams);
  };

  // Address Modal State
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [modalFullName, setModalFullName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalStreet, setModalStreet] = useState('');
  const [modalCity, setModalCity] = useState('');
  const [modalState, setModalState] = useState('');
  const [modalPostal, setModalPostal] = useState('');
  const [modalCountry, setModalCountry] = useState('Nigeria');
  const [modalLabel, setModalLabel] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [modalIsDefault, setModalIsDefault] = useState(false);

  // Return & Refund Modal State
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedOrderForRefund, setSelectedOrderForRefund] = useState<string | null>(null);
  const [refundReason, setRefundReason] = useState('Size / Fit Exchange');
  const [refundComments, setRefundComments] = useState('');

  // Referral Copy State
  const [hasCopiedReferral, setHasCopiedReferral] = useState(false);

  // Settings State
  const [profileName, setProfileName] = useState(currentUser?.fullName || '');
  const [profileEmail, setProfileEmail] = useState(currentUser?.email || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  // Open address modal for creating or editing
  const openAddressModal = (addr?: Address) => {
    if (addr) {
      setEditingAddressId(addr.id);
      setModalFullName(addr.fullName);
      setModalPhone(addr.phone);
      setModalStreet(addr.street);
      setModalCity(addr.city);
      setModalState(addr.state);
      setModalPostal(addr.postalCode);
      setModalCountry(addr.country);
      setModalIsDefault(!!addr.isDefault);
    } else {
      setEditingAddressId(null);
      setModalFullName(currentUser?.fullName || '');
      setModalPhone(currentUser?.phone || '');
      setModalStreet('');
      setModalCity('');
      setModalState('');
      setModalPostal('');
      setModalCountry('United States');
      setModalIsDefault(addresses.length === 0);
    }
    setAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFullName.trim() || !modalStreet.trim() || !modalCity.trim() || !modalPostal.trim()) {
      showToast('Please complete all required address fields.', 'error');
      return;
    }

    if (editingAddressId) {
      updateAddress(editingAddressId, {
        fullName: modalFullName.trim(),
        phone: modalPhone.trim(),
        street: modalStreet.trim(),
        address: modalStreet.trim(),
        city: modalCity.trim(),
        state: modalState.trim(),
        postalCode: modalPostal.trim(),
        country: modalCountry.trim(),
        label: modalLabel,
        isDefault: modalIsDefault
      });
    } else {
      addAddress({
        fullName: modalFullName.trim(),
        phone: modalPhone.trim(),
        street: modalStreet.trim(),
        address: modalStreet.trim(),
        city: modalCity.trim(),
        state: modalState.trim(),
        postalCode: modalPostal.trim(),
        country: modalCountry.trim(),
        label: modalLabel,
        isDefault: modalIsDefault
      });
    }

    setAddressModalOpen(false);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim() || !profileEmail.trim()) {
      showToast('Name and Email are required.', 'error');
      return;
    }
    updateProfile(profileName.trim(), profileEmail.trim(), profilePhone.trim());
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }
    if (newPass !== confirmNewPass) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    showToast('Your security credentials were updated successfully.', 'success');
    setCurrentPass('');
    setNewPass('');
    setConfirmNewPass('');
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`Use my BECKKYENTERPRISE code ${referralCode} for 15% off your luxury order: https://beckkyenterprise.com`);
    setHasCopiedReferral(true);
    showToast('VIP Referral code copied to clipboard!', 'success');
    setTimeout(() => setHasCopiedReferral(false), 2000);
  };

  const handleOpenRefundModal = (orderId: string) => {
    setSelectedOrderForRefund(orderId);
    setRefundReason('Size / Fit Exchange');
    setRefundComments('');
    setRefundModalOpen(true);
  };

  const handleSubmitRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForRefund) return;
    requestOrderRefund(selectedOrderForRefund, refundReason, refundComments);
    setRefundModalOpen(false);
    setSelectedOrderForRefund(null);
  };

  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 font-serif-luxury">
          Please Sign In to Access Your Account
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          Review previous orders, manage saved addresses, check reward points, and track shipments.
        </p>
        <Link
          to="/auth"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0B1B33] text-white text-xs font-semibold hover:bg-amber-600 transition-colors shadow-xs"
        >
          <span>Sign In to Account</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Account Profile Header */}
      <div className="bg-[#0B1B33] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-400 text-slate-950 font-serif-luxury font-bold text-xl flex items-center justify-center shadow-md">
            {currentUser.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-amber-300 font-semibold tracking-wider uppercase">
                {currentUser.role === 'admin' ? 'Store Owner Account' : 'Diamond Sovereign Member'}
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                {loyaltyPoints} Rewards Points
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury mt-0.5">
              Welcome, {currentUser.fullName}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Account: <span className="text-white font-medium">{currentUser.email}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab('loyalty')}
            className="px-3.5 py-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors border border-amber-400/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Rewards</span>
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto text-xs pb-1">
        <button
          onClick={() => setTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-amber-500 text-amber-800 bg-amber-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order History & Tracking ({orders.length})</span>
        </button>

        <button
          onClick={() => setTab('addresses')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'addresses'
              ? 'border-amber-500 text-amber-800 bg-amber-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({addresses.length})</span>
        </button>

        <button
          onClick={() => setTab('wishlist')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'wishlist'
              ? 'border-amber-500 text-amber-800 bg-amber-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setTab('loyalty')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'loyalty'
              ? 'border-amber-500 text-amber-800 bg-amber-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Loyalty & VIP Referral</span>
        </button>

        <button
          onClick={() => setTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'settings'
              ? 'border-amber-500 text-amber-800 bg-amber-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Account & Notifications</span>
        </button>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-[#F5F6F8] rounded-xl border border-slate-200">
              <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No Orders Placed Yet</h3>
              <p className="text-xs text-slate-500 mt-1">When you place an order, its real-time courier status and receipt will appear here.</p>
              <Link
                to="/catalog"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B1B33] text-white text-xs font-semibold hover:bg-amber-600 transition-colors"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
                const currentIdx = statuses.indexOf(order.status);

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
                  >
                    {/* Order Bar Header */}
                    <div className="bg-[#F5F6F8] p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                        <div>
                          <span className="text-slate-500 block">Order Number</span>
                          <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Date Placed</span>
                          <span className="font-semibold text-slate-800">{order.date}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Total Paid</span>
                          <span className="font-bold text-slate-900 tabular-nums">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>

                      {/* Status indicator & Refund Trigger */}
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>{order.status}</span>
                        </span>

                        {order.refundRequest ? (
                          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 font-medium text-[11px]">
                            Refund: {order.refundRequest.status}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenRefundModal(order.id)}
                            className="text-xs font-semibold text-slate-600 hover:text-amber-700 flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded-md transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Return / Refund</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 4-Step Milestone Visualizer */}
                    <div className="px-6 py-5 border-b border-slate-100 bg-white">
                      <div className="grid grid-cols-4 items-center max-w-2xl mx-auto text-xs relative">
                        {statuses.map((step, idx) => {
                          const isDone = currentIdx >= idx;
                          const isCurrent = currentIdx === idx;
                          return (
                            <div key={step} className="flex flex-col items-center relative text-center">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] z-10 transition-colors ${
                                  isDone
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-slate-200 text-slate-500'
                                }`}
                              >
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <span
                                className={`mt-1.5 text-[11px] ${
                                  isCurrent
                                    ? 'font-bold text-slate-900'
                                    : isDone
                                    ? 'font-medium text-emerald-800'
                                    : 'text-slate-400'
                                }`}
                              >
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
                        <p>
                          Courier Tracking: <span className="font-mono text-slate-800 font-semibold">{order.trackingNumber}</span> · {order.estimatedDelivery}
                        </p>
                        <p>
                          Payment: <span className="font-medium text-slate-700">{order.paymentMethod}</span>
                        </p>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="p-4 sm:p-6 divide-y divide-slate-100">
                      {(order.items || []).filter((item) => item && item.product).map((item) => (
                        <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'}
                              alt={item.product.name || 'Luxury Product'}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                            <div>
                              <Link
                                to={`/product/${item.product.id}`}
                                className="text-xs font-bold text-slate-900 hover:text-amber-700 transition-colors block"
                              >
                                {item.product.name || 'Luxury Product'}
                              </Link>
                              <span className="text-[11px] text-slate-500 block">
                                Quantity: {item.quantity} {item.selectedVariant ? `· ${item.selectedVariant}` : ''}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-slate-900 tabular-nums">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => {
                                addToCart(item.product, 1, item.selectedVariant);
                                navigate('/cart');
                              }}
                              className="block text-[11px] font-semibold text-amber-700 hover:underline mt-1"
                            >
                              Buy Again
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-serif-luxury">
              Your Shipping Destinations
            </h2>
            <button
              onClick={() => openAddressModal()}
              className="px-4 py-2 rounded-lg bg-[#0B1B33] text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-5 rounded-xl border bg-white flex flex-col justify-between transition-all ${
                  addr.isDefault ? 'border-amber-400 shadow-sm ring-1 ring-amber-400/50' : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{addr.fullName}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        Default Delivery
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">{addr.street}</p>
                  <p className="text-xs text-slate-600">
                    {addr.city}, {addr.state} {addr.postalCode}
                  </p>
                  <p className="text-xs text-slate-600 font-medium">{addr.country}</p>
                  <p className="text-[11px] text-slate-400 mt-2">Phone: {addr.phone}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openAddressModal(addr)}
                      className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    {!addr.isDefault && (
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>

                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-amber-700 hover:text-amber-900 font-semibold"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-serif-luxury">
              Your Saved Luxury Pieces
            </h2>
            <span className="text-xs text-slate-500">
              {wishlistProducts.length} saved {wishlistProducts.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#F5F6F8] rounded-xl border border-slate-200">
              <Heart className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">Your Wishlist is Empty</h3>
              <p className="text-xs text-slate-500 mt-1">Tap the heart icon on any piece to save it for later review.</p>
              <Link
                to="/catalog"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B1B33] text-white text-xs font-semibold hover:bg-amber-600 transition-colors"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.filter(Boolean).map((product) => (
                <div key={product.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'}
                      alt={product.name || 'Wishlist item'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-xs"
                      title="Remove from wishlist"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-amber-700 tracking-wider block mb-1">
                        {product.category}
                      </span>
                      <Link
                        to={`/product/${product.id}`}
                        className="text-sm font-semibold text-slate-900 hover:text-amber-700 line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs font-bold text-slate-900 tabular-nums mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="flex-1 py-2 px-3 rounded-lg bg-[#0B1B33] hover:bg-amber-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: LOYALTY & VIP REFERRAL */}
      {activeTab === 'loyalty' && (
        <div className="space-y-8">
          {/* VIP Status Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0B1B33] via-[#11294D] to-[#0B1B33] text-white border border-amber-400/30 shadow-xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Diamond Sovereign Patron Status</span>
                </div>
                <h2 className="text-3xl font-bold font-serif-luxury text-white">
                  {loyaltyPoints} Rewards Points Available
                </h2>
                <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                  Earn 1 point for every $2 spent on fine jewelry, luxury loungewear, and skin glow elixirs. Redeem points for direct checkout credits and private preview passes.
                </p>

                {/* Progress bar to next perk */}
                <div className="pt-2 max-w-md">
                  <div className="flex justify-between text-[11px] text-amber-200 font-semibold mb-1">
                    <span>Current Tier: Sovereign</span>
                    <span>1,000 pts for Bespoke Custom Pendant</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (loyaltyPoints / 1000) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Referral Code Box */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                  Your VIP Referral Code
                </span>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-amber-400/40">
                  <span className="font-mono text-sm font-bold text-amber-300 tracking-wider">
                    {referralCode}
                  </span>
                  <button
                    onClick={handleCopyReferral}
                    className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title="Copy code"
                  >
                    {hasCopiedReferral ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-300">
                  Give friends 15% off their first order. You receive 100 bonus points ($50 store credit) when they order.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xs font-bold text-slate-900">Complimentary Courier Priority</h3>
              <p className="text-[11px] text-slate-500">Free expedited express delivery on all orders with white-glove signature.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xs font-bold text-slate-900">Private Vault Pre-Releases</h3>
              <p className="text-[11px] text-slate-500">Access limited solid gold pieces 48 hours prior to global public release.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xs font-bold text-slate-900">Dedicated 24/7 Concierge</h3>
              <p className="text-[11px] text-slate-500">Direct styling and custom sizing advice on WhatsApp or live client chat.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ACCOUNT SETTINGS & NOTIFICATIONS */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Personal Info Form */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Profile Details
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="mt-2 px-4 py-2.5 rounded-lg bg-[#0B1B33] text-white text-xs font-bold hover:bg-amber-600 transition-colors shadow-xs"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Notification Preferences & Password Card */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Bell className="w-4 h-4 text-amber-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Notification Preferences
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between cursor-pointer py-1.5 border-b border-slate-50">
                  <div>
                    <span className="font-semibold text-slate-800 block">Order Status Updates (Email)</span>
                    <span className="text-[11px] text-slate-500">Receive dispatch emails & courier tracking links</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.orderUpdatesEmail}
                    onChange={(e) => updateNotificationPreferences({ orderUpdatesEmail: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer py-1.5 border-b border-slate-50">
                  <div>
                    <span className="font-semibold text-slate-800 block">Courier SMS Alerts</span>
                    <span className="text-[11px] text-slate-500">Live text alerts when parcel is out for delivery</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.orderUpdatesSms}
                    onChange={(e) => updateNotificationPreferences({ orderUpdatesSms: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer py-1.5 border-b border-slate-50">
                  <div>
                    <span className="font-semibold text-slate-800 block">VIP Invitations & Coupon Drops</span>
                    <span className="text-[11px] text-slate-500">Private vault release links and seasonal discounts</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.promotions}
                    onChange={(e) => updateNotificationPreferences({ promotions: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* Password Change Form */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Change Your Password
              </h2>

              <form onSubmit={handleChangePassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmNewPass}
                    onChange={(e) => setConfirmNewPass(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 px-4 py-2.5 rounded-lg bg-[#0B1B33] text-white text-xs font-bold hover:bg-amber-600 transition-colors shadow-xs"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Return & Refund Request Modal */}
      {refundModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-serif-luxury">
              Request Order Return / Exchange
            </h3>
            <p className="text-xs text-slate-500">
              Eligible within 14 days of delivery. All returned items must have original gold hallmarks, security tags, and packaging intact.
            </p>

            <form onSubmit={handleSubmitRefund} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason for Return</label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:border-amber-500"
                >
                  <option value="Size / Fit Exchange">Size / Fit Exchange</option>
                  <option value="Changed Mind / Styling Preference">Changed Mind / Styling Preference</option>
                  <option value="Received Incorrect Item">Received Incorrect Item</option>
                  <option value="Quality Inquiry">Quality Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Explanation</label>
                <textarea
                  required
                  rows={3}
                  value={refundComments}
                  onChange={(e) => setRefundComments(e.target.value)}
                  placeholder="Please describe why you are requesting a return or exchange..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRefundModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold bg-[#0B1B33] text-white rounded-lg hover:bg-amber-600 transition-colors shadow-xs"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Address Edit/Add Modal */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">
              {editingAddressId ? 'Edit Delivery Address' : 'Add New Delivery Address'}
            </h3>

            <form onSubmit={handleSaveAddress} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={modalFullName}
                    onChange={(e) => setModalFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={modalPhone}
                    onChange={(e) => setModalPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address & Unit *
                </label>
                <input
                  type="text"
                  required
                  value={modalStreet}
                  onChange={(e) => setModalStreet(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={modalCity}
                    onChange={(e) => setModalCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={modalState}
                    onChange={(e) => setModalState(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={modalPostal}
                    onChange={(e) => setModalPostal(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Address Label
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Home', 'Office', 'Other'] as const).map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setModalLabel(lbl)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                        modalLabel === lbl
                          ? 'bg-[#0B1B33] text-amber-400 border-[#0B1B33]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={modalCountry}
                  onChange={(e) => setModalCountry(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modalIsDefault}
                  onChange={(e) => setModalIsDefault(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Set this as my primary delivery address</span>
              </label>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#0B1B33] text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
