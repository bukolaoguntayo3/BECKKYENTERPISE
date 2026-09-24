import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, ArrowUpDown, PackageOpen, History, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { ProductCategory } from '../types';

const ALL_CATEGORIES: ProductCategory[] = [
  "Gold & Jewelry",
  "Men's Wear",
  "Ladies' Tops & Jeans",
  "Unisex 'Up & Down' Sets",
  "Luxury Bags & Shoes",
  "Supplements (body glow & anti-aging)"
];

export const CatalogPage: React.FC = () => {
  const { products, recentlyViewedIds, formatPrice } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'All';
  const urlSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Sync state if URL search param changes
  React.useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  const handleCategorySelect = (category: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', category);
    }
    setSearchParams(nextParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      nextParams.set('search', searchQuery.trim());
    } else {
      nextParams.delete('search');
    }
    setSearchParams(nextParams);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setOnlyInStock(false);
    setSelectedSort('featured');
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (currentCategory !== 'All' && product.category !== currentCategory) {
        return false;
      }
      // Stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') {
        return a.price - b.price;
      }
      if (selectedSort === 'price-high') {
        return b.price - a.price;
      }
      if (selectedSort === 'rating') {
        return b.rating - a.rating;
      }
      // Default: featured first, then bestsellers
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [products, currentCategory, searchQuery, onlyInStock, selectedSort]);

  // Retrieve recently viewed product models
  const recentlyViewedProducts = useMemo(() => {
    return recentlyViewedIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is typeof products[0] => !!p)
      .slice(0, 4);
  }, [recentlyViewedIds, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs & Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Store Catalog</span>
          {currentCategory !== 'All' && (
            <>
              <span>/</span>
              <span className="text-amber-700 font-semibold">{currentCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif-luxury">
              {currentCategory === 'All' ? 'Complete Collection' : currentCategory}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Showing <span className="font-semibold text-slate-800 tabular-nums">{filteredProducts.length}</span> curated luxury items
            </p>
          </div>

          {/* Quick Active Filter Pills / Reset */}
          {(currentCategory !== 'All' || searchQuery || onlyInStock) && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-md bg-amber-50 border border-amber-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Filter and Search Control Bar */}
      <div className="bg-[#F5F6F8] rounded-xl p-4 border border-slate-200/80 space-y-4">
        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <input
              type="text"
              placeholder="Search by keyword, material, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-300 focus:border-amber-500 rounded-lg outline-none transition-all placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  const nextParams = new URLSearchParams(searchParams);
                  nextParams.delete('search');
                  setSearchParams(nextParams);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Sort & In-Stock Toggles */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="bg-transparent text-slate-800 font-medium outline-none cursor-pointer text-xs"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-50 transition-colors select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="whitespace-nowrap">In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Category Tabs / Segmented Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => handleCategorySelect('All')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentCategory === 'All'
                ? 'bg-[#0B1B33] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            All Products
          </button>

          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                currentCategory === cat
                  ? 'bg-[#0B1B33] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid / Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#F5F6F8] rounded-2xl border border-slate-200 max-w-2xl mx-auto p-8">
          <div className="w-16 h-16 rounded-full bg-slate-200/80 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-serif-luxury">No Products Found</h3>
          <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
            We couldn't find any items matching "{searchQuery || currentCategory}". Try checking your spelling or clearing active filters to browse all inventory.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-6 px-5 py-2.5 rounded-lg bg-[#0B1B33] text-white text-xs font-semibold hover:bg-amber-600 transition-colors shadow-xs"
          >
            Clear All Filters & Show Everything
          </button>
        </div>
      )}

      {/* Recently Viewed Strip */}
      {recentlyViewedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900 font-serif-luxury">
                Recently Viewed by You
              </h2>
            </div>
            <span className="text-xs text-slate-500">Persisted from your session</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentlyViewedProducts.filter(Boolean).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-amber-400 transition-all"
              >
                <Link to={`/product/${p.id}`} className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={p.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'}
                    alt={p.name || 'Product'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-amber-700 font-semibold block uppercase truncate">
                    {p.category}
                  </span>
                  <Link
                    to={`/product/${p.id}`}
                    className="text-xs font-bold text-slate-900 hover:text-amber-700 block truncate"
                  >
                    {p.name}
                  </Link>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {formatPrice(p.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
