import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Truck, Package, ArrowRight, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, formatPrice } = useShop();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 font-serif-luxury">Order Receipt</h1>
        <p className="text-xs text-slate-500 mt-2">Could not locate order details.</p>
        <Link
          to="/catalog"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B1B33] text-white text-xs font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const earnedPoints = Math.round(order.total / 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Confirmation Header Banner */}
      <div className="text-center space-y-3 pb-8 border-b border-slate-200">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block">
          Order Successfully Placed & Verified
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif-luxury">
          Thank You For Choosing BECKKYENTERPRISE
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Your luxury pieces are being prepared by our fulfillment specialists. A confirmation receipt and courier tracking details have been generated.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full font-semibold text-slate-800">
            <span>Order Number:</span>
            <span className="font-mono text-amber-800 font-bold">{order.orderNumber}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-1.5 rounded-full font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>+{earnedPoints} Rewards Points Credited</span>
          </div>
        </div>
      </div>

      {/* Logistics & Tracking Card */}
      <div className="p-6 bg-[#0B1B33] text-white rounded-2xl shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] text-amber-400 uppercase tracking-wider font-semibold">
              Live Courier Progress
            </span>
            <div className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
              <Package className="w-5 h-5 text-amber-400" />
              <span>Status: {order.status}</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-slate-400 block">Tracking Identifier</span>
            <span className="font-mono text-sm font-bold text-amber-300">{order.trackingNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
          <div>
            <span className="text-slate-400 block">Estimated Courier Arrival:</span>
            <span className="font-semibold text-white">{order.estimatedDelivery}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Dispatch Origin:</span>
            <span className="font-semibold text-white">Atlanta Global Luxury Vault (Direct Courier)</span>
          </div>
        </div>
      </div>

      {/* Itemized Order Breakdown */}
      <div className="bg-[#F5F6F8] rounded-xl p-6 border border-slate-200 space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-3">
          Order Details & Receipt
        </h2>

        {/* Line Items */}
        <div className="divide-y divide-slate-200">
          {(order.items || []).filter((item) => item && item.product).map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'}
                  alt={item.product.name || 'Luxury Item'}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded object-cover border border-slate-200"
                />
                <div>
                  <p className="font-semibold text-slate-900">{item.product.name || 'Luxury Item'}</p>
                  <p className="text-[11px] text-slate-500">
                    Quantity: {item.quantity} {item.selectedVariant ? `· ${item.selectedVariant}` : ''}
                  </p>
                </div>
              </div>

              <span className="font-bold text-slate-900 tabular-nums">
                {formatPrice((item.product.discountPrice ?? item.product.price ?? 0) * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="pt-3 border-t border-slate-300 space-y-1.5 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {formatPrice(order.subtotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Insured Delivery</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {order.shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(order.shippingFee)}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-300 text-sm font-bold text-slate-900">
            <span>Total Paid</span>
            <span className="tabular-nums text-base">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Destination Address details */}
        <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Delivering To:</h3>
            <p className="text-slate-700 font-semibold">{order.shippingAddress.fullName}</p>
            <p className="text-slate-600">{order.shippingAddress.street}</p>
            <p className="text-slate-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p className="text-slate-600">{order.shippingAddress.country}</p>
            <p className="text-slate-500 text-[11px] mt-0.5">{order.shippingAddress.phone}</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-1">Payment Information:</h3>
            <p className="text-slate-600">{order.paymentMethod}</p>
            <p className="text-emerald-700 font-medium mt-1">Status: Paid & Authorized</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/dashboard"
          className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#0B1B33] hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <Package className="w-4 h-4 text-amber-400" />
          <span>Track Order in My Account</span>
        </Link>

        <Link
          to="/catalog"
          className="w-full sm:w-auto px-6 py-3.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};
