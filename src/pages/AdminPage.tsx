import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  Check,
  X,
  AlertTriangle,
  Tag,
  CreditCard,
  Settings as SettingsIcon,
  BarChart3,
  Layers,
  FileSpreadsheet,
  ArrowUpRight,
  Eye,
  Sliders,
  Save,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory, OrderStatus, Category, Coupon, DeliveryZone } from '../types';

export type AdminTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'orders'
  | 'customers'
  | 'inventory'
  | 'promotions'
  | 'payments'
  | 'delivery'
  | 'reports'
  | 'settings';

interface AdminPageProps {
  initialTab?: AdminTab;
}

const CATEGORY_OPTIONS: ProductCategory[] = [
  'Gold & Jewelry',
  "Men's Wear",
  "Ladies' Tops & Jeans",
  "Unisex 'Up & Down' Sets",
  'Luxury Bags & Shoes',
  'Supplements (body glow & anti-aging)'
];

export const AdminPage: React.FC<AdminPageProps> = ({ initialTab }) => {
  const {
    businessSettings,
    updateBusinessSettings,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    orders,
    updateOrderStatus,
    resolveRefundRequest,
    customers,
    promotions,
    addPromotion,
    updatePromotion,
    deletePromotion,
    deliveryZones,
    updateDeliveryZone,
    payments,
    currentUser,
    toggleAdminRole,
    showToast,
    formatPrice
  } = useShop();

  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') as AdminTab;
  const [activeTab, setActiveTab] = useState<AdminTab>(tabFromUrl || initialTab || 'dashboard');

  const setTab = (tab: AdminTab) => {
    setActiveTab(tab);
    const next = new URLSearchParams(searchParams);
    next.set('tab', tab);
    setSearchParams(next);
  };

  // Product modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Gold & Jewelry');
  const [formPrice, setFormPrice] = useState<number>(50000);
  const [formDiscountPrice, setFormDiscountPrice] = useState<number>(45000);
  const [formStock, setFormStock] = useState<number>(10);
  const [formLowStock, setFormLowStock] = useState<number>(3);
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('/src/assets/images/hero_luxury_showcase_1790167560610.jpg');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formNewArrival, setFormNewArrival] = useState(false);

  // Category modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [catName, setCatName] = useState<ProductCategory>('Gold & Jewelry');
  const [catDesc, setCatDesc] = useState('');
  const [catImage, setCatImage] = useState('/src/assets/images/cat_gold_jewelry_1790167575219.jpg');

  // Promotion modal
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoType, setPromoType] = useState<'percentage' | 'fixed'>('percentage');
  const [promoValue, setPromoValue] = useState<number>(10);
  const [promoMinSpend, setPromoMinSpend] = useState<number>(25000);
  const [promoMaxDiscount, setPromoMaxDiscount] = useState<number>(50000);
  const [promoLimit, setPromoLimit] = useState<number>(100);
  const [promoDesc, setPromoDesc] = useState('');

  // Settings form state
  const [storeName, setStoreName] = useState(businessSettings.name);
  const [storeEmail, setStoreEmail] = useState(businessSettings.email);
  const [storePhone, setStorePhone] = useState(businessSettings.phone);
  const [storeWhatsApp, setStoreWhatsApp] = useState(businessSettings.whatsapp);
  const [storeAddress, setStoreAddress] = useState(businessSettings.address);
  const [storeHours, setStoreHours] = useState(businessSettings.businessHours);
  const [storeTikTok, setStoreTikTok] = useState(businessSettings.tiktok);
  const [storeInstagram, setStoreInstagram] = useState(businessSettings.instagram);
  const [storeFacebook, setStoreFacebook] = useState(businessSettings.facebook);
  const [storeFreeDelivery, setStoreFreeDelivery] = useState(businessSettings.freeDeliveryThreshold);

  // Filters & searches
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [customerSearch, setCustomerSearch] = useState('');
  const [inventorySearch, setInventorySearch] = useState('');
  const [reportTimeframe, setReportTimeframe] = useState<'today' | 'week' | 'month' | 'year'>('month');

  // Metrics calculation
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.total : sum), 0);
  }, [orders]);

  const pendingOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'Processing').length;
  }, [orders]);

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stockCount <= (p.lowStockThreshold || 3));
  }, [products]);

  // Handle open add product
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setFormName('');
    setFormSku(`BEK-PRD-${Math.floor(100 + Math.random() * 900)}`);
    setFormCategory('Gold & Jewelry');
    setFormPrice(75000);
    setFormDiscountPrice(65000);
    setFormStock(15);
    setFormLowStock(3);
    setFormDescription('');
    setFormImage('/src/assets/images/hero_luxury_showcase_1790167560610.jpg');
    setFormFeatured(false);
    setFormNewArrival(true);
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setFormName(p.name);
    setFormSku(p.sku || `BEK-${p.id.slice(-4)}`);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormDiscountPrice(p.discountPrice || p.price);
    setFormStock(p.stockCount);
    setFormLowStock(p.lowStockThreshold || 3);
    setFormDescription(p.description || '');
    setFormImage(p.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg');
    setFormFeatured(!!p.isFeatured);
    setFormNewArrival(!!p.isNewArrival);
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formPrice <= 0) {
      showToast('Please enter a valid product name and price.', 'error');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: formName.trim(),
        sku: formSku.trim(),
        category: formCategory,
        price: Number(formPrice),
        discountPrice: formDiscountPrice > 0 ? Number(formDiscountPrice) : undefined,
        stockCount: Number(formStock),
        stock: Number(formStock),
        lowStockThreshold: Number(formLowStock),
        inStock: Number(formStock) > 0,
        description: formDescription.trim(),
        image: formImage,
        isFeatured: formFeatured,
        isNewArrival: formNewArrival
      });
    } else {
      addProduct({
        sku: formSku.trim(),
        name: formName.trim(),
        category: formCategory,
        price: Number(formPrice),
        discountPrice: formDiscountPrice > 0 ? Number(formDiscountPrice) : undefined,
        stockCount: Number(formStock),
        stock: Number(formStock),
        lowStockThreshold: Number(formLowStock),
        inStock: Number(formStock) > 0,
        description: formDescription.trim(),
        image: formImage,
        images: [formImage, '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'],
        details: ['Authentic certified goods', 'Packaged in signature velvet case'],
        isFeatured: formFeatured,
        isNewArrival: formNewArrival,
        active: true
      });
    }

    setProductModalOpen(false);
  };

  // Handle Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessSettings({
      name: storeName.trim(),
      email: storeEmail.trim(),
      phone: storePhone.trim(),
      whatsapp: storeWhatsApp.trim(),
      address: storeAddress.trim(),
      businessHours: storeHours.trim(),
      tiktok: storeTikTok.trim().replace(/^@/, ''),
      instagram: storeInstagram.trim().replace(/^@/, ''),
      facebook: storeFacebook.trim(),
      freeDeliveryThreshold: Number(storeFreeDelivery)
    });
  };

  // Handle Save Promotion
  const handleSavePromotion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) {
      showToast('Please enter a promotional code.', 'error');
      return;
    }
    addPromotion({
      code: promoCode.trim().toUpperCase(),
      type: promoType,
      discountType: promoType,
      value: Number(promoValue),
      minimumOrder: Number(promoMinSpend),
      minSpend: Number(promoMinSpend),
      maximumDiscount: Number(promoMaxDiscount),
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      usageLimit: Number(promoLimit),
      active: true,
      description: promoDesc.trim() || `${promoValue}% luxury storewide discount`
    });
    setPromoModalOpen(false);
    setPromoCode('');
  };

  // Handle Export CSV
  const handleExportCSV = () => {
    const headers = 'Order Number,Date,Customer,Email,Total (NGN),Status,Payment Status\n';
    const rows = orders
      .map(
        (o) =>
          `"${o.orderNumber}","${o.date}","${o.customerName}","${o.customerEmail}",${o.total},"${o.status}","${o.paymentStatus}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BECKKY_Orders_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders report exported to CSV successfully.', 'success');
  };

  return (
    <div className="bg-[#F5F6F8] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Admin Navigation Header */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B1B33] text-amber-300 font-serif-luxury font-bold text-lg flex items-center justify-center shadow-xs">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold font-serif-luxury text-[#0B1B33]">
                  BECKKYENTERPRISE Admin Portal
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  Manager Role
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Official store management, fulfillment, catalog, and finances
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleAdminRole}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Exit to Patron View
            </button>
            <Link
              to="/shop"
              className="px-3 py-1.5 rounded-xl bg-[#0B1B33] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-colors shadow-2xs"
            >
              View Live Storefront
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs (Section 21) */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs mb-6 overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { key: 'products', label: 'Products', icon: Package },
              { key: 'categories', label: 'Categories', icon: Layers },
              { key: 'orders', label: `Orders (${orders.length})`, icon: ShoppingCart },
              { key: 'customers', label: `Customers (${customers.length})`, icon: Users },
              { key: 'inventory', label: 'Inventory', icon: Sliders },
              { key: 'promotions', label: 'Promotions', icon: Tag },
              { key: 'payments', label: 'Payments', icon: CreditCard },
              { key: 'delivery', label: 'Delivery', icon: Truck },
              { key: 'reports', label: 'Reports', icon: BarChart3 },
              { key: 'settings', label: 'Settings', icon: SettingsIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setTab(tab.key as AdminTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0B1B33] text-amber-400 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards (Section 21) */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Revenue</span>
                <p className="text-lg font-bold font-serif-luxury text-[#0B1B33] mt-1 tabular-nums">
                  {formatPrice(totalRevenue)}
                </p>
                <span className="text-[10px] text-emerald-600 font-semibold">+18.4% this month</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Orders</span>
                <p className="text-lg font-bold font-serif-luxury text-slate-900 mt-1 tabular-nums">
                  {orders.length}
                </p>
                <span className="text-[10px] text-slate-400">All channels</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Pending Orders</span>
                <p className="text-lg font-bold font-serif-luxury text-amber-700 mt-1 tabular-nums">
                  {pendingOrdersCount}
                </p>
                <span className="text-[10px] text-amber-600 font-semibold">Requires dispatch</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Active Products</span>
                <p className="text-lg font-bold font-serif-luxury text-slate-900 mt-1 tabular-nums">
                  {products.length}
                </p>
                <span className="text-[10px] text-slate-400">Across 6 categories</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Low Stock Alerts</span>
                <p className={`text-lg font-bold font-serif-luxury mt-1 tabular-nums ${lowStockProducts.length > 0 ? 'text-red-600' : 'text-slate-900'}`}>
                  {lowStockProducts.length}
                </p>
                <span className="text-[10px] text-red-500 font-semibold">Restock notice</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Registered Patrons</span>
                <p className="text-lg font-bold font-serif-luxury text-slate-900 mt-1 tabular-nums">
                  {customers.length}
                </p>
                <span className="text-[10px] text-emerald-600 font-semibold">VIP Directory</span>
              </div>
            </div>

            {/* Low stock notice banner if any */}
            {lowStockProducts.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900">Inventory Alert: Low Stock Detected</h4>
                    <p className="text-[11px] text-amber-800">
                      {lowStockProducts.map((p) => `${p.name} (${p.stockCount} left)`).join(', ')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setTab('inventory')}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold whitespace-nowrap shadow-xs"
                >
                  Manage Inventory
                </button>
              </div>
            )}

            {/* Recent Orders table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold font-serif-luxury text-slate-900">
                  Recent Store Orders
                </h3>
                <button
                  onClick={() => setTab('orders')}
                  className="text-xs font-bold text-amber-700 hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2.5 font-semibold">Order Number</th>
                      <th className="py-2.5 font-semibold">Customer</th>
                      <th className="py-2.5 font-semibold">Date</th>
                      <th className="py-2.5 font-semibold">Items</th>
                      <th className="py-2.5 font-semibold text-right">Amount</th>
                      <th className="py-2.5 font-semibold text-center">Status</th>
                      <th className="py-2.5 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/70">
                        <td className="py-3 font-mono font-bold text-[#0B1B33]">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3">
                          <p className="font-semibold text-slate-900">{ord.customerName}</p>
                          <span className="text-[11px] text-slate-400">{ord.customerEmail}</span>
                        </td>
                        <td className="py-3 text-slate-600">{ord.date}</td>
                        <td className="py-3 text-slate-700">{ord.items.length} items</td>
                        <td className="py-3 text-right font-bold text-slate-900 tabular-nums">
                          {formatPrice(ord.total)}
                        </td>
                        <td className="py-3 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'Cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <Link
                            to={`/orders/${ord.orderNumber}`}
                            className="text-xs font-bold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
                          >
                            <span>Receipt</span>
                            <Eye className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by name or SKU..."
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Categories</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1B33] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="p-3.5 font-semibold">Product</th>
                      <th className="p-3.5 font-semibold">SKU</th>
                      <th className="p-3.5 font-semibold">Category</th>
                      <th className="p-3.5 font-semibold text-right">Price</th>
                      <th className="p-3.5 font-semibold text-center">Stock</th>
                      <th className="p-3.5 font-semibold text-center">Badges</th>
                      <th className="p-3.5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products
                      .filter((p) => {
                        const matchCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
                        const matchQuery =
                          !productSearch ||
                          p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          (p.sku && p.sku.toLowerCase().includes(productSearch.toLowerCase()));
                        return matchCat && matchQuery;
                      })
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/70">
                          <td className="p-3.5 flex items-center gap-3">
                            <img
                              src={p.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'}
                              alt={p.name || 'Product'}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-slate-900 line-clamp-1">{p.name}</p>
                              <span className="text-[10px] text-slate-400">
                                {p.inStock ? 'Available' : 'Sold Out'}
                              </span>
                            </div>
                          </td>
                          <td className="p-3.5 font-mono text-slate-600">{p.sku || 'BEK-LUX'}</td>
                          <td className="p-3.5 text-slate-700">{p.category}</td>
                          <td className="p-3.5 text-right font-bold text-slate-900 tabular-nums">
                            {formatPrice(p.discountPrice ?? p.price)}
                            {p.discountPrice && p.discountPrice < p.price && (
                              <span className="block text-[10px] text-slate-400 line-through">
                                {formatPrice(p.price)}
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[11px] font-bold tabular-nums ${
                                p.stockCount <= (p.lowStockThreshold || 3)
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {p.stockCount} in stock
                            </span>
                          </td>
                          <td className="p-3.5 text-center space-x-1">
                            {p.isFeatured && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                                Featured
                              </span>
                            )}
                            {p.isNewArrival && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                                New
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-slate-600 hover:text-[#0B1B33] hover:bg-slate-100 rounded-lg"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold font-serif-luxury text-slate-900">
                  Store Departments & Categories
                </h3>
                <p className="text-xs text-slate-500">
                  Manage collections, lookbooks, and department imagery
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingCategoryId(null);
                  setCatDesc('');
                  setCategoryModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B1B33] text-amber-400 text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.name).length;

                return (
                  <div
                    key={c.id || c.name}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs flex flex-col justify-between p-4 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={c.image || '/src/assets/images/cat_gold_jewelry_1790167575219.jpg'}
                        alt={c.name || 'Category'}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 font-serif-luxury">
                          {c.name}
                        </h4>
                        <span className="text-xs text-amber-700 font-semibold">
                          {count} Products Linked
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{c.description}</p>
                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                      <Link
                        to={`/shop?category=${encodeURIComponent(c.name)}`}
                        className="text-amber-700 font-bold hover:underline"
                      >
                        View in Shop →
                      </Link>
                      <button
                        onClick={() => deleteCategory(c.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      orderStatusFilter === st
                        ? 'bg-[#0B1B33] text-amber-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="p-3.5 font-semibold">Order Number</th>
                      <th className="p-3.5 font-semibold">Customer & Delivery</th>
                      <th className="p-3.5 font-semibold">Date</th>
                      <th className="p-3.5 font-semibold text-right">Amount</th>
                      <th className="p-3.5 font-semibold text-center">Status</th>
                      <th className="p-3.5 font-semibold text-center">Advance Pipeline</th>
                      <th className="p-3.5 font-semibold text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders
                      .filter((o) => orderStatusFilter === 'All' || o.status === orderStatusFilter)
                      .map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/70">
                          <td className="p-3.5 font-mono font-bold text-[#0B1B33]">
                            {o.orderNumber}
                            {o.refundRequest && (
                              <span className="block text-[10px] font-sans font-bold text-amber-700">
                                ⚠ Return Requested
                              </span>
                            )}
                          </td>
                          <td className="p-3.5">
                            <p className="font-bold text-slate-900">{o.customerName}</p>
                            <p className="text-[11px] text-slate-500">
                              {o.shippingAddress.city}, {o.shippingAddress.state} · Tel: {o.shippingAddress.phone}
                            </p>
                          </td>
                          <td className="p-3.5 text-slate-600">{o.date}</td>
                          <td className="p-3.5 text-right font-bold text-slate-900 tabular-nums">
                            {formatPrice(o.total)}
                          </td>
                          <td className="p-3.5 text-center">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                o.status === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : o.status === 'Cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-center">
                            <select
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="px-2 py-1 text-[11px] font-semibold bg-slate-100 border border-slate-300 rounded-lg outline-none focus:border-amber-500 cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            {/* Refund Request Resolver */}
                            {o.refundRequest && o.refundRequest.status === 'Pending Review' && (
                              <div className="mt-1 flex items-center justify-center gap-1">
                                <button
                                  onClick={() => resolveRefundRequest(o.id, 'Approved')}
                                  className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                >
                                  Approve Refund
                                </button>
                                <button
                                  onClick={() => resolveRefundRequest(o.id, 'Declined')}
                                  className="px-1.5 py-0.5 text-[9px] font-bold bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                  Decline
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="p-3.5 text-right">
                            <Link
                              to={`/orders/${o.orderNumber}`}
                              className="text-xs font-bold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. CUSTOMERS TAB */}
        {activeTab === 'customers' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex justify-between items-center">
              <div className="relative w-72">
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Search customers by name, phone or email..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Total Registered Patrons: {customers.length}
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="p-3.5 font-semibold">Patron Name</th>
                      <th className="p-3.5 font-semibold">Contact Email & Phone</th>
                      <th className="p-3.5 font-semibold">VIP Tier</th>
                      <th className="p-3.5 font-semibold text-center">Orders</th>
                      <th className="p-3.5 font-semibold text-right">Total Spend</th>
                      <th className="p-3.5 font-semibold text-center">Reward Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customers
                      .filter((c) => {
                        if (!customerSearch) return true;
                        const q = customerSearch.toLowerCase();
                        return (
                          c.fullName.toLowerCase().includes(q) ||
                          c.email.toLowerCase().includes(q) ||
                          (c.phone && c.phone.includes(q))
                        );
                      })
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/70">
                          <td className="p-3.5">
                            <p className="font-bold text-slate-900">{c.fullName}</p>
                            <span className="text-[10px] text-slate-400">Country: {c.country}</span>
                          </td>
                          <td className="p-3.5">
                            <p className="text-slate-800">{c.email}</p>
                            <p className="text-[11px] text-slate-500">{c.phone}</p>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                              {c.loyaltyTier}
                            </span>
                          </td>
                          <td className="p-3.5 text-center font-bold text-slate-800 tabular-nums">
                            {c.totalOrders}
                          </td>
                          <td className="p-3.5 text-right font-bold text-slate-900 tabular-nums">
                            {formatPrice(c.totalSpend)}
                          </td>
                          <td className="p-3.5 text-center font-semibold text-amber-700 tabular-nums">
                            {c.rewardPoints ?? 250} pts
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. INVENTORY MANAGEMENT TAB (Section 24) */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex justify-between items-center">
              <div className="relative w-72">
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Search inventory by product or SKU..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-xs text-slate-500">
                Real-time stock ledger & automated out-of-stock guards
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="p-3.5 font-semibold">Product</th>
                      <th className="p-3.5 font-semibold">SKU</th>
                      <th className="p-3.5 font-semibold">Category</th>
                      <th className="p-3.5 font-semibold text-center">Current Stock</th>
                      <th className="p-3.5 font-semibold text-center">Threshold</th>
                      <th className="p-3.5 font-semibold text-center">Status</th>
                      <th className="p-3.5 font-semibold text-right">Quick Stock Adjust</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products
                      .filter((p) => {
                        if (!inventorySearch) return true;
                        const q = inventorySearch.toLowerCase();
                        return (
                          p.name.toLowerCase().includes(q) ||
                          (p.sku && p.sku.toLowerCase().includes(q))
                        );
                      })
                      .map((p) => {
                        const status =
                          p.stockCount <= 0
                            ? 'Out of Stock'
                            : p.stockCount <= (p.lowStockThreshold || 3)
                            ? 'Low Stock'
                            : 'In Stock';

                        return (
                          <tr key={p.id} className="hover:bg-slate-50/70">
                            <td className="p-3.5 flex items-center gap-2.5">
                              <img
                                src={p.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'}
                                alt={p.name || 'Product'}
                                referrerPolicy="no-referrer"
                                className="w-9 h-9 object-cover rounded-lg border border-slate-200 shrink-0"
                              />
                              <span className="font-bold text-slate-900">{p.name}</span>
                            </td>
                            <td className="p-3.5 font-mono text-slate-600">{p.sku || 'BEK-LUX'}</td>
                            <td className="p-3.5 text-slate-700">{p.category}</td>
                            <td className="p-3.5 text-center font-bold text-slate-900 text-sm tabular-nums">
                              {p.stockCount}
                            </td>
                            <td className="p-3.5 text-center text-slate-500 tabular-nums">
                              {p.lowStockThreshold || 3}
                            </td>
                            <td className="p-3.5 text-center">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  status === 'In Stock'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : status === 'Low Stock'
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right space-x-1">
                              <button
                                onClick={() =>
                                  updateProduct(p.id, {
                                    stockCount: Math.max(0, p.stockCount - 1)
                                  })
                                }
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold"
                              >
                                -1
                              </button>
                              <button
                                onClick={() =>
                                  updateProduct(p.id, {
                                    stockCount: p.stockCount + 5
                                  })
                                }
                                className="px-2 py-1 bg-[#0B1B33] hover:bg-slate-800 text-amber-400 rounded text-xs font-bold"
                              >
                                +5
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 7. PROMOTIONS TAB (Section 26) */}
        {activeTab === 'promotions' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold font-serif-luxury text-slate-900">
                  Promotions & Coupon Codes
                </h3>
                <p className="text-xs text-slate-500">
                  Configure percentage and fixed discounts with minimum spend constraints
                </p>
              </div>
              <button
                onClick={() => setPromoModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B1B33] text-amber-400 text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Promo Code</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {promotions.map((pr) => (
                <div
                  key={pr.id || pr.code}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg">
                      {pr.code}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        pr.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {pr.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {pr.type === 'percentage' ? `${pr.value}% Discount` : `${formatPrice(pr.value)} Off`}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{pr.description}</p>
                    <p className="text-[11px] text-slate-400 mt-2">
                      Min. Order: {formatPrice(pr.minSpend || pr.minimumOrder || 0)} · Uses: {pr.usageCount || 0}/{pr.usageLimit || '∞'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                    <button
                      onClick={() => updatePromotion(pr.id, { active: !pr.active })}
                      className="text-amber-700 font-bold hover:underline"
                    >
                      {pr.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deletePromotion(pr.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. PAYMENTS TAB (Section 27) */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold font-serif-luxury text-slate-900">
                  Payment Transactions Ledger
                </h3>
                <p className="text-xs text-slate-500">
                  Provider-independent transaction references, settlement logs, and verification
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Total Transactions: {payments.length}
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="p-3.5 font-semibold">Payment ID</th>
                      <th className="p-3.5 font-semibold">Order Reference</th>
                      <th className="p-3.5 font-semibold">Customer</th>
                      <th className="p-3.5 font-semibold text-right">Amount</th>
                      <th className="p-3.5 font-semibold">Provider / Gateway</th>
                      <th className="p-3.5 font-semibold text-center">Status</th>
                      <th className="p-3.5 font-semibold text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map((pay) => (
                      <tr key={pay.id} className="hover:bg-slate-50/70">
                        <td className="p-3.5 font-mono text-slate-600">{pay.id}</td>
                        <td className="p-3.5 font-mono font-bold text-[#0B1B33]">
                          {pay.orderNumber}
                        </td>
                        <td className="p-3.5">
                          <p className="font-semibold text-slate-900">{pay.customerName}</p>
                          <span className="text-[10px] text-slate-400">{pay.customerEmail}</span>
                        </td>
                        <td className="p-3.5 text-right font-bold text-slate-900 tabular-nums">
                          {formatPrice(pay.amount)}
                        </td>
                        <td className="p-3.5 text-slate-700">{pay.provider}</td>
                        <td className="p-3.5 text-center">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {pay.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right text-slate-500">{pay.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 9. DELIVERY TAB (Section 28) */}
        {activeTab === 'delivery' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold font-serif-luxury text-slate-900">
                Delivery Zones & Shipping Configuration
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configurable delivery fees, logistics timelines, and courier dispatches
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deliveryZones.map((z) => (
                <div
                  key={z.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-[#0B1B33]">{z.name}</h4>
                      <span className="font-bold text-sm font-serif-luxury text-amber-800 tabular-nums">
                        {formatPrice(z.fee)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{z.description}</p>
                    <p className="text-[11px] text-slate-400 mt-2">
                      Estimated Timeframe: <span className="font-semibold text-slate-700">{z.estimatedTime}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                    <button
                      onClick={() => {
                        const newFee = prompt(`Enter new fee in Naira for ${z.name}:`, String(z.fee));
                        if (newFee && !isNaN(Number(newFee))) {
                          updateDeliveryZone(z.id, { fee: Number(newFee) });
                        }
                      }}
                      className="text-amber-700 font-bold hover:underline"
                    >
                      Update Fee
                    </button>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        z.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {z.active ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. REPORTS TAB (Section 29) */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                {(['today', 'week', 'month', 'year'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setReportTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      reportTimeframe === tf
                        ? 'bg-[#0B1B33] text-amber-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tf === 'today' ? 'Today' : `This ${tf}`}
                  </button>
                ))}
              </div>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Download Executive CSV Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase">Gross Revenue</span>
                <p className="text-2xl font-bold font-serif-luxury text-[#0B1B33] mt-1 tabular-nums">
                  {formatPrice(totalRevenue)}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Confirmed transactions</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase">Average Order Value (AOV)</span>
                <p className="text-2xl font-bold font-serif-luxury text-slate-900 mt-1 tabular-nums">
                  {orders.length > 0 ? formatPrice(Math.round(totalRevenue / orders.length)) : '₦0'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Per completed transaction</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase">Fulfillment Success</span>
                <p className="text-2xl font-bold font-serif-luxury text-emerald-600 mt-1 tabular-nums">
                  {orders.length > 0
                    ? `${Math.round(
                        (orders.filter((o) => o.status === 'Delivered').length / orders.length) * 100
                      )}%`
                    : '100%'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">On-time door delivery</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase">Catalog Valuation</span>
                <p className="text-2xl font-bold font-serif-luxury text-slate-900 mt-1 tabular-nums">
                  {formatPrice(products.reduce((sum, p) => sum + p.price * p.stockCount, 0))}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Current on-hand inventory</p>
              </div>
            </div>
          </div>
        )}

        {/* 11. SETTINGS TAB (Section 42) */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="text-lg font-bold font-serif-luxury text-[#0B1B33] mb-1">
              Store & Business Configuration
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Centrally configure your brand identity, phone, WhatsApp hotline, showroom address, and social links.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Number (Click-to-chat)
                  </label>
                  <input
                    type="tel"
                    required
                    value={storeWhatsApp}
                    onChange={(e) => setStoreWhatsApp(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Central Business Showroom Address
                </label>
                <input
                  type="text"
                  required
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-slate-400">
                  This address displays on the Contact page, invoice headers, and footer.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={storeHours}
                  onChange={(e) => setStoreHours(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    TikTok Handle
                  </label>
                  <input
                    type="text"
                    value={storeTikTok}
                    onChange={(e) => setStoreTikTok(e.target.value)}
                    placeholder="amblessed_246"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={storeInstagram}
                    onChange={(e) => setStoreInstagram(e.target.value)}
                    placeholder="bukolanifemi2000.54"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Facebook Page Link
                  </label>
                  <input
                    type="text"
                    value={storeFacebook}
                    onChange={(e) => setStoreFacebook(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Free Delivery Threshold (₦)
                </label>
                <input
                  type="number"
                  value={storeFreeDelivery}
                  onChange={(e) => setStoreFreeDelivery(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-slate-400">
                  Orders exceeding this amount receive complimentary delivery at checkout.
                </span>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#0B1B33] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Product Add / Edit Modal */}
        {productModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 space-y-4 my-8">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold font-serif-luxury text-slate-900">
                  {editingProductId ? 'Edit Luxury Product' : 'Add New Luxury Product'}
                </h3>
                <button
                  onClick={() => setProductModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. 18K Solid Gold Cuban Chain"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">SKU Reference</label>
                    <input
                      type="text"
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value)}
                      placeholder="e.g. BEK-GLD-001"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Price (₦) *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Discount Price (₦)</label>
                    <input
                      type="number"
                      value={formDiscountPrice}
                      onChange={(e) => setFormDiscountPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formStock}
                      onChange={(e) => setFormStock(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Low Stock Threshold</label>
                    <input
                      type="number"
                      value={formLowStock}
                      onChange={(e) => setFormLowStock(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter detailed description, karat hallmark, or materials..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Mark as Featured Product</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formNewArrival}
                      onChange={(e) => setFormNewArrival(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Mark as New Arrival</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0B1B33] text-amber-400 font-bold rounded-lg hover:bg-slate-800"
                  >
                    {editingProductId ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Promotion Modal */}
        {promoModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold font-serif-luxury text-slate-900">
                  Create Promotional Code
                </h3>
                <button
                  onClick={() => setPromoModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePromotion} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="e.g. LUXURY20"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Discount Type</label>
                    <select
                      value={promoType}
                      onChange={(e) => setPromoType(e.target.value as 'percentage' | 'fixed')}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₦)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Discount Value *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={promoValue}
                      onChange={(e) => setPromoValue(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Min. Spend (₦)</label>
                    <input
                      type="number"
                      value={promoMinSpend}
                      onChange={(e) => setPromoMinSpend(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Usage Limit</label>
                    <input
                      type="number"
                      value={promoLimit}
                      onChange={(e) => setPromoLimit(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={promoDesc}
                    onChange={(e) => setPromoDesc(e.target.value)}
                    placeholder="e.g. 10% off all solid gold chains"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setPromoModalOpen(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0B1B33] text-amber-400 font-bold rounded-lg hover:bg-slate-800"
                  >
                    Activate Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
