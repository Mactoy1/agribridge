import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

export const MarketplacePreviewSection: React.FC = () => {
  const { products, addToCart, toggleWishlist, isWishlisted, setQuickViewProduct, setIsCartOpen } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'quantity'>('featured');

  const categories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Organic'];
  const locations = ['All', 'Maharashtra', 'Madhya Pradesh', 'Haryana', 'Andhra Pradesh'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.fpoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchLoc = selectedLocation === 'All' || p.state === selectedLocation;
      const matchPrice = p.pricePerKg <= maxPrice;

      return matchSearch && matchCat && matchLoc && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerKg - b.pricePerKg;
      if (sortBy === 'price-high') return b.pricePerKg - a.pricePerKg;
      if (sortBy === 'rating') return b.qualityRating - a.qualityRating;
      if (sortBy === 'quantity') return b.availableQuantityTons - a.availableQuantityTons;
      return 0; // featured default
    });
  }, [products, searchQuery, selectedCategory, selectedLocation, maxPrice, sortBy]);

  return (
    <section className="py-20 bg-white border-b border-[#16A34A]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-900 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Live Farm Listings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#14532D] tracking-tight">
              Fresh From the Source
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-xl">
              100% verified single-origin produce harvested within hours. Direct fair prices for growers and buyers.
            </p>
          </div>

          <Link
            to="/marketplace"
            id="view-full-catalog-btn"
            className="inline-flex items-center space-x-2 text-sm font-extrabold text-[#16A34A] hover:text-[#14532D] transition-colors group"
          >
            <span>View All Produce & Bulk Tiers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-6 bg-[#F8FAF5] rounded-3xl border border-[#16A34A]/20 shadow-xs mb-8 space-y-4">
          {/* Top Search & Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crop, farmer, or FPO..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#16A34A]"
              />
            </div>

            {/* Location Selector */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#16A34A]"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    📍 State: {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="bg-white px-3.5 py-2 rounded-2xl border border-gray-200 flex flex-col justify-center">
              <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                <span>Max Price</span>
                <span className="text-[#14532D] font-extrabold">₹{maxPrice}/kg</span>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#16A34A] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Sorting */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#16A34A]"
              >
                <option value="featured">✨ Sort: Featured First</option>
                <option value="price-low">📉 Price: Low to High</option>
                <option value="price-high">📈 Price: High to Low</option>
                <option value="rating">⭐ Quality Rating</option>
                <option value="quantity">📦 Volume: Available Tons</option>
              </select>
            </div>
          </div>

          {/* Category Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mr-1 shrink-0">
              Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#14532D] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-[#F8FAF5] rounded-3xl border border-gray-200">
            <p className="text-gray-500 text-sm font-semibold">
              No produce matching your current filter selection. Try adjusting the price slider or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLocation('All');
                setMaxPrice(250);
              }}
              className="mt-3 px-4 py-2 bg-[#14532D] text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((product) => {
              const wish = isWishlisted(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl border border-gray-200/90 hover:border-[#16A34A]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      <span className="bg-[#14532D]/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                        {product.badge}
                      </span>
                      {product.isOrganic && (
                        <span className="bg-[#22C55E] text-[#0B1F16] text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                          Organic
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
                        wish ? 'bg-red-500 text-white shadow-md' : 'bg-white/80 text-gray-700 hover:bg-white'
                      }`}
                      title="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick View Button overlay on hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="px-4 py-2 bg-white text-[#14532D] rounded-xl text-xs font-bold shadow-lg hover:bg-[#FEFCE8] flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Location & Rating */}
                      <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                        <span className="flex items-center gap-1 font-medium truncate">
                          <MapPin className="w-3 h-3 text-[#16A34A]" /> {product.location}, {product.state}
                        </span>
                        <span className="flex items-center gap-0.5 font-bold text-amber-600 shrink-0">
                          <Star className="w-3 h-3 fill-current text-amber-500" /> {product.qualityRating}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-extrabold text-base text-[#14532D] group-hover:text-[#16A34A] transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Farmer / FPO info */}
                      <p className="text-xs text-gray-600 font-medium truncate">
                        From <strong className="text-gray-800">{product.fpoName}</strong>
                      </p>
                    </div>

                    {/* Pricing & Stock Details */}
                    <div className="pt-2 border-t border-gray-100 flex items-end justify-between">
                      <div>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-black text-[#16A34A]">
                            ₹{product.pricePerKg}
                          </span>
                          <span className="text-xs font-semibold text-gray-500">/ kg</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          Available: <strong className="text-[#14532D]">{product.availableQuantityTons} Tons</strong>
                        </div>
                      </div>

                      {/* Add / Action Button */}
                      <button
                        id={`quick-add-${product.id}`}
                        onClick={() => {
                          addToCart(product);
                          setIsCartOpen(true);
                        }}
                        className="p-2.5 rounded-2xl bg-[#14532D] text-white hover:bg-[#16A34A] transition-all shadow-xs active:scale-95"
                        title="Add to Procurement Basket"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>

                    {/* View Produce direct link */}
                    <Link
                      to={`/marketplace/${product.id}`}
                      className="block w-full py-2 text-center bg-[#F8FAF5] hover:bg-emerald-50 text-[#14532D] font-bold text-xs rounded-xl border border-gray-200 transition-colors"
                    >
                      View Produce Dossier
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
