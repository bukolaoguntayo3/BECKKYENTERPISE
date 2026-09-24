import React, { useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Printer,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  ShieldCheck,
  Phone,
  HelpCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderStatus } from '../types';

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, formatPrice, businessSettings, requestOrderRefund, cancelOrder, showToast } = useShop();
  const navigate = useNavigate();

  const order = orders.find((o) => o.id === id || o.orderNumber === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] py-16 px-4">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold font-serif-luxury text-slate-900">Order Not Located</h2>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            We could not find an order corresponding to the specified reference number.
          </p>
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B33] text-amber-400 text-xs font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Orders</span>
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // 5-step visual order workflow (Section 15: Pending -> Confirmed -> Processing -> Shipped -> Delivered)
  const steps: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
  const currentIndex = steps.indexOf(order.status as OrderStatus);

  return (
    <div className="bg-[#F5F6F8] min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs">
            <Link to="/dashboard" className="text-slate-500 hover:text-slate-900">
              Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <Link to="/orders" className="text-slate-500 hover:text-slate-900">
              My Orders
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-[#0B1B33]">{order.orderNumber}</span>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Official Receipt</span>
            </button>
            <Link
              to="/orders"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B1B33] text-amber-400 text-xs font-bold hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Orders</span>
            </Link>
          </div>
        </div>

        {/* Receipt Printable Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0B1B33] text-amber-300 font-serif-luxury font-bold text-sm flex items-center justify-center">
                  B
                </div>
                <span className="text-lg font-bold font-serif-luxury tracking-wider text-[#0B1B33] uppercase">
                  BECKKYENTERPRISE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Official Purchase Receipt & Logistics Manifest
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Order Reference</span>
              <h2 className="text-xl font-bold font-mono text-slate-900">{order.orderNumber}</h2>
              <p className="text-xs text-slate-500 flex items-center sm:justify-end gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{order.date}</span>
              </p>
            </div>
          </div>

          {/* Visual Order Timeline (Section 15) */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Order Fulfillment Timeline</span>
            </h3>

            {order.status === 'Cancelled' ? (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
                This order was cancelled.
              </div>
            ) : (
              <div className="relative">
                <div className="grid grid-cols-5 gap-2">
                  {steps.map((step, idx) => {
                    const isDone = currentIndex >= idx;
                    const isCurrent = currentIndex === idx;

                    return (
                      <div key={step} className="flex flex-col items-center text-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-all ${
                            isDone
                              ? 'bg-[#0B1B33] text-amber-400 ring-4 ring-amber-100'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-[11px] font-bold ${
                            isCurrent
                              ? 'text-[#0B1B33]'
                              : isDone
                              ? 'text-slate-700'
                              : 'text-slate-400'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-slate-600">
              <p>
                Courier Dispatch Tracking:{' '}
                <span className="font-mono font-bold text-slate-900">{order.trackingNumber}</span>
              </p>
              <p className="text-amber-800 font-semibold">
                Status: {order.status === 'Delivered' ? 'Delivered safely' : order.estimatedDelivery}
              </p>
            </div>
          </div>

          {/* Ordered Products Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Items Purchased ({order.items.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2.5 font-semibold">Item</th>
                    <th className="py-2.5 font-semibold text-center">Qty</th>
                    <th className="py-2.5 font-semibold text-right">Unit Price</th>
                    <th className="py-2.5 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(order.items || []).filter((item) => item && item.product).map((item) => {
                    const price = (item.product.discountPrice ?? item.product.price) || 0;
                    const itemTotal = price * item.quantity;
                    const prodImg = item.product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg';
                    const prodName = item.product.name || 'Luxury Item';
                    const prodSku = item.product.sku || 'BEK-LUX';

                    return (
                      <tr key={item.id}>
                        <td className="py-3 flex items-center gap-3">
                          <img
                            src={prodImg}
                            alt={prodName}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover rounded-lg border border-slate-200"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{prodName}</p>
                            <p className="text-[11px] text-slate-400">
                              SKU: {prodSku}
                              {item.selectedVariant && ` · ${item.selectedVariant}`}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 text-center font-medium text-slate-700">
                          {item.quantity}
                        </td>
                        <td className="py-3 text-right font-medium text-slate-700 tabular-nums">
                          {formatPrice(price)}
                        </td>
                        <td className="py-3 text-right font-bold text-slate-900 tabular-nums">
                          {formatPrice(itemTotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Delivery & Payment Information */}
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Delivery Address</span>
                </h4>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-600 space-y-0.5">
                  <p className="font-bold text-slate-900">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.street || order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country} · Tel: {order.shippingAddress.phone}</p>
                  {order.deliveryInstructions && (
                    <p className="text-amber-800 text-[11px] font-medium pt-1">
                      Note: {order.deliveryInstructions}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                  <span>Payment Method & Status</span>
                </h4>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{order.paymentMethod}</p>
                    <p className="text-[11px] text-slate-400">Insured Transaction Verified</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Ledger */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 text-xs space-y-2.5">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {formatPrice(order.subtotal)}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promotional Discount {order.appliedCoupon && `(${order.appliedCoupon})`}</span>
                  <span className="tabular-nums">-{formatPrice(order.discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery & Courier Logistics</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {order.deliveryFee === 0 ? 'Complimentary' : formatPrice(order.deliveryFee)}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-[#0B1B33]">
                <span>Total Amount Paid</span>
                <span className="text-base font-serif-luxury text-slate-950 tabular-nums">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Guarantee & Return Information */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified 100% genuine goods. 14-day return & exchange window.</span>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/contact" className="hover:text-slate-900 font-medium flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Contact Client Support</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
