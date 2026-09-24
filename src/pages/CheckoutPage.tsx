import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, CheckCircle2, Lock, ArrowLeft, Loader2, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Address } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    appliedCoupon,
    discountAmount,
    finalCartTotal,
    addresses,
    createOrder,
    currentUser,
    addAddress,
    formatPrice
  } = useShop();
  const navigate = useNavigate();

  // Redirect if cart is empty
  React.useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];

  const [selectedAddressId, setSelectedAddressId] = useState<string>(defaultAddr ? defaultAddr.id : 'new');
  const [useNewAddress, setUseNewAddress] = useState(!defaultAddr);

  // Address form fields
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [saveToAccount, setSaveToAccount] = useState(true);

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const shippingFee = cartTotal >= 150 ? 0 : shippingMethod === 'express' ? 25 : 15;

  // Payment method simulation
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'delivery'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const finalDueAmount = finalCartTotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    let finalAddress: Address;

    if (!useNewAddress && selectedAddressId !== 'new') {
      const found = addresses.find((a) => a.id === selectedAddressId);
      if (!found) {
        setErrorMsg('Please select or enter a valid shipping address.');
        return;
      }
      finalAddress = found;
    } else {
      // Validate address fields
      if (!fullName.trim() || !street.trim() || !city.trim() || !postalCode.trim() || !phone.trim()) {
        setErrorMsg('Please fill in all required shipping address fields.');
        return;
      }

      finalAddress = {
        id: `addr-${Date.now()}`,
        label: 'Home',
        fullName: fullName.trim(),
        phone: phone.trim(),
        street: street.trim(),
        city: city.trim(),
        state: state.trim() || 'Lagos',
        postalCode: postalCode.trim(),
        country: country.trim() || 'Nigeria',
        isDefault: addresses.length === 0
      };

      if (saveToAccount) {
        addAddress(finalAddress);
      }
    }

    setIsSubmitting(true);

    // Simulate luxury order processing latency
    setTimeout(() => {
      const paymentDesc =
        paymentMethod === 'card'
          ? `Credit Card (${cardNumber.slice(-4)})`
          : paymentMethod === 'apple'
          ? 'Apple Pay / Digital Wallet'
          : 'Payment upon Delivery';

      const order = createOrder(finalAddress, paymentDesc, shippingFee);
      setIsSubmitting(false);
      navigate(`/order-confirmation/${order.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Checkout Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/cart" className="hover:text-slate-900 flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Bag</span>
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Checkout</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif-luxury">
            Secure Luxury Checkout
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit SSL Encrypted Session</span>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Interactive Checkout Steps */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Shipping Address */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-[#0B1B33] text-amber-300 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="text-base font-bold text-slate-900 font-serif-luxury">
                Shipping Destination
              </h2>
            </div>

            {/* Existing Addresses radio cards */}
            {addresses.length > 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddressId(addr.id);
                        setUseNewAddress(false);
                      }}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                        !useNewAddress && selectedAddressId === addr.id
                          ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {addr.street}, {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
                      </p>
                      <span className="text-[11px] text-slate-400 mt-2 block">{addr.phone}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUseNewAddress(true);
                      setSelectedAddressId('new');
                    }}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                      useNewAddress
                        ? 'bg-[#0B1B33] text-white border-[#0B1B33]'
                        : 'text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    + Ship to a New Address
                  </button>
                </div>
              </div>
            )}

            {/* New Address Form Fields */}
            {useNewAddress && (
              <div className="space-y-4 pt-3 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Bukola Oguntayo"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number (for Courier SMS Tracking) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address & Suite / Apt *
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="742 Evergreen Boulevard, Suite 4B"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Atlanta"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="GA"
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
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="30301"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country / Territory *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-amber-500 bg-white"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Canada">Canada</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Ghana">Ghana</option>
                  </select>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={saveToAccount}
                    onChange={(e) => setSaveToAccount(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Save this address to my profile for future orders</span>
                </label>
              </div>
            )}
          </div>

          {/* Step 2: Shipping Method */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-[#0B1B33] text-amber-300 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-bold text-slate-900 font-serif-luxury">
                Delivery Courier Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`p-4 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                  shippingMethod === 'standard'
                    ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-bold text-slate-900">Standard Insured Courier</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {cartTotal >= 150 ? 'FREE' : formatPrice(15)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Estimated 3–5 Business Days via DHL Express / FedEx Priority. Tracking included.
                </p>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`p-4 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                  shippingMethod === 'express'
                    ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-slate-900">Priority VIP Rush Courier</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {formatPrice(25)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Estimated 1–2 Business Days with armored courier dispatch and adult signature.
                </p>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-[#0B1B33] text-amber-300 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h2 className="text-base font-bold text-slate-900 font-serif-luxury">
                Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold text-slate-900">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple')}
                className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'apple'
                    ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-4 h-4 rounded bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center">
                  
                </div>
                <span className="text-xs font-bold text-slate-900">Digital Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('delivery')}
                className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'delivery'
                    ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Truck className="w-4 h-4 text-slate-700" />
                <span className="text-xs font-bold text-slate-900">Pay on Delivery</span>
              </button>
            </div>

            {/* Simulated Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  🔒 Prototype simulation mode active. Safe test checkout.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-[#F5F6F8] rounded-xl p-6 border border-slate-200 space-y-5 sticky top-24">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200 font-serif-luxury">
            Your Order ({cart.length} {cart.length === 1 ? 'item' : 'items'})
          </h2>

          {/* Compact item list */}
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-200 pr-1 space-y-3">
            {cart.filter((item) => item && item.product).map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'}
                    alt={item.product.name || 'Luxury Item'}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{item.product.name || 'Luxury Item'}</p>
                    <p className="text-[11px] text-slate-500">
                      Qty: {item.quantity} {item.selectedVariant ? `· ${item.selectedVariant}` : ''}
                    </p>
                  </div>
                </div>

                <span className="font-bold text-slate-900 tabular-nums shrink-0">
                  {formatPrice((item.product.discountPrice ?? item.product.price ?? 0) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {formatPrice(cartTotal)}
              </span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>Promo Voucher ({appliedCoupon.code})</span>
                </span>
                <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Luxury Duty & Packaging</span>
              <span className="font-semibold text-emerald-700">Included ($0.00)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between items-baseline">
            <span className="text-sm font-bold text-slate-900">Total Due</span>
            <span className="text-2xl font-black text-slate-900 tabular-nums">
              {formatPrice(finalDueAmount)}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-4 rounded-lg bg-[#0B1B33] hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                <span>Authorizing Order & Packaging...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Place Order ({formatPrice(finalDueAmount)})</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-500">
            By clicking Place Order, you confirm your purchase with BECKKYENTERPRISE and agree to our 14-day return terms.
          </p>
        </div>
      </form>
    </div>
  );
};
