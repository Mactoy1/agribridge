import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  Eye, 
  Sparkles, 
  Star, 
  SlidersHorizontal,
  Scale,
  LayoutGrid,
  List,
  CheckCircle2,
  Leaf,
  Thermometer,
  Calendar,
  X,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const MarketplacePage: React.FC = () => {
  const { 
    products, 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    addToCompare, 
    setQuickViewProduct, 
    setIsCartOpen 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'volume'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Organic'];
  const states = ['All', 'Maharashtra', 'Madhya Pradesh', 'Haryana', 'Andhra Pradesh', 'Punjab', 'Karnataka'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.fpoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchState = selectedState === 'All' || p.state === selectedState;
      const matchOrganic = !organicOnly || p.isOrganic;
      const matchRating = p.qualityRating >= minRating;
      const matchPrice = p.pricePerKg <= maxPrice;

      return matchSearch && matchCat && matchState && matchOrganic && matchRating && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerKg - b.pricePerKg;
      if (sortBy === 'price-high') return b.pricePerKg - a.pricePerKg;
      if (sortBy === 'rating') return b.qualityRating - a.qualityRating;
      if (sortBy === 'volume') return b.availableQuantityTons - a.availableQuantityTons;
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedState, organicOnly, minRating, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedState('All');
    setOrganicOnly(false);
    setMinRating(0);
    setMaxPrice(250);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
            <Link to="/" className="hover:text-[#16A34A]">Home</Link>
            <span>/</span>
            <span className="text-[#14532D] font-bold">Agricultural Marketplace</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#14532D] tracking-tight">
                Farmgate Produce Exchange
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Direct trade connections with verified FPO collectives across India. Zero middlemen markup.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl border border-gray-200 shadow-xs text-xs">
              <div className="px-3 py-1 bg-emerald-50 text-emerald-900 font-extrabold rounded-xl">
                {filteredProducts.length} Lots Available
              </div>
              <div className="text-gray-500 font-medium pr-2">
                Avg Dispatch: <strong className="text-gray-800">4.2 hrs</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filters (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-[#14532D] font-extrabold text-sm">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 hover:text-red-500 font-bold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wider block mb-2.5">
                Produce Category
              </label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#14532D] text-white font-extrabold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* State / Origin Filter */}
            <div>
              <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wider block mb-2">
                Origin Region
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8FAF5] border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#16A34A]"
              >
                {states.map((s) => (
                  <option key={s} value={s}>{s === 'All' ? 'All States (India)' : s}</option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-700">Max Price / kg</span>
                <span className="text-[#16A34A] font-extrabold">₹{maxPrice}</span>
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
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹20</span>
                <span>₹250</span>
              </div>
            </div>

            {/* Minimum Quality Rating */}
            <div>
              <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wider block mb-2">
                Minimum Quality Score
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 4.0, 4.5, 4.8].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`py-1.5 text-center rounded-xl text-xs font-bold transition-all ${
                      minRating === rate
                        ? 'bg-[#16A34A] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {rate === 0 ? 'Any' : `${rate}★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Organic Certification Checkbox */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={organicOnly}
                  onChange={(e) => setOrganicOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#16A34A] focus:ring-[#16A34A] accent-[#16A34A]"
                />
                <span className="text-xs font-extrabold text-gray-800 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-[#16A34A]" /> Certified Organic Only
                </span>
              </label>
            </div>
          </div>

          {/* Right Main Catalog Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by crop, farmer, or FPO..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F8FAF5] border border-gray-200 rounded-2xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#16A34A]"
                />
              </div>

              {/* Controls: Mobile Filter Trigger, Sorting & View toggle */}
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Filter className="w-3.5 h-3.5" /> Filters
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-[#F8FAF5] border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#16A34A]"
                >
                  <option value="featured">✨ Featured First</option>
                  <option value="price-low">📉 Price: Low to High</option>
                  <option value="price-high">📈 Price: High to Low</option>
                  <option value="rating">⭐ Quality Rating</option>
                  <option value="volume">📦 Volume: Tons</option>
                </select>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center border border-gray-200 rounded-xl p-1 bg-[#F8FAF5]">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-xs text-[#14532D]' : 'text-gray-400 hover:text-gray-700'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'table' ? 'bg-white shadow-xs text-[#14532D]' : 'text-gray-400 hover:text-gray-700'
                    }`}
                    title="Table View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Output */}
            {filteredProducts.length === 0 ? (
              <div className="p-16 text-center bg-white rounded-3xl border border-gray-200">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No Produce Found</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your search criteria or resetting filters to view all farm listings.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-5 py-2.5 bg-[#14532D] text-white text-xs font-bold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const wish = isWishlisted(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-3xl border border-gray-200 hover:border-[#16A34A]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                    >
                      {/* Image Header */}
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

                        {/* Actions */}
                        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                              wish ? 'bg-red-500 text-white shadow-md' : 'bg-white/80 text-gray-700 hover:bg-white'
                            }`}
                            title="Wishlist"
                          >
                            <Heart className={`w-3.5 h-3.5 ${wish ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => addToCompare(product)}
                            className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 backdrop-blur-md transition-colors"
                            title="Compare"
                          >
                            <Scale className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Quick View Button */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="px-4 py-2 bg-white text-[#14532D] rounded-xl text-xs font-bold shadow-lg hover:bg-[#FEFCE8] flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Quick View</span>
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                            <span className="flex items-center gap-1 font-medium truncate">
                              <MapPin className="w-3 h-3 text-[#16A34A]" /> {product.location}, {product.state}
                            </span>
                            <span className="flex items-center gap-0.5 font-bold text-amber-600 shrink-0">
                              <Star className="w-3 h-3 fill-current text-amber-500" /> {product.qualityRating}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-base text-[#14532D] group-hover:text-[#16A34A] transition-colors line-clamp-1">
                            {product.name}
                          </h3>

                          <p className="text-xs text-gray-600 font-medium truncate">
                            {product.farmerName} • <strong className="text-gray-800">{product.fpoName}</strong>
                          </p>
                        </div>

                        {/* Price & Bulk info */}
                        <div className="pt-2 border-t border-gray-100 flex items-end justify-between">
                          <div>
                            <div className="flex items-baseline space-x-1">
                              <span className="text-2xl font-black text-[#16A34A]">
                                ₹{product.pricePerKg}
                              </span>
                              <span className="text-xs font-semibold text-gray-500">/ kg</span>
                            </div>
                            <div className="text-[11px] text-gray-500">
                              Available: <strong className="text-[#14532D]">{product.availableQuantityTons} Tons</strong>
                            </div>
                          </div>

                          <button
                            id={`catalog-add-${product.id}`}
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
            ) : (
              /* Table View */
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAF5] text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                      <tr>
                        <th className="py-3.5 px-4">Produce</th>
                        <th className="py-3.5 px-4">Origin & FPO</th>
                        <th className="py-3.5 px-4">Price / kg</th>
                        <th className="py-3.5 px-4">Available</th>
                        <th className="py-3.5 px-4">Quality & Shelf</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center space-x-3">
                              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                              <div>
                                <Link to={`/marketplace/${p.id}`} className="font-extrabold text-[#14532D] hover:underline">
                                  {p.name}
                                </Link>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <span className="text-[10px] text-gray-500 font-semibold">{p.category}</span>
                                  {p.isOrganic && (
                                    <span className="text-[9px] bg-[#22C55E]/20 text-[#14532D] font-extrabold px-1.5 py-0.2 rounded-sm">
                                      Organic
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-gray-800">{p.fpoName}</div>
                            <div className="text-gray-500 text-[11px]">{p.location}, {p.state}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-black text-[#16A34A] text-sm">₹{p.pricePerKg}/kg</div>
                            <div className="text-[10px] text-gray-400 line-through">₹{p.marketPricePerKg} Mandi</div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-gray-700">
                            {p.availableQuantityTons} Tons
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1 font-bold text-amber-600">
                              <Star className="w-3 h-3 fill-current" /> {p.qualityRating}
                            </div>
                            <div className="text-gray-500 text-[10px]">{p.shelfLifeDays} days shelf</div>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                addToCart(p);
                                setIsCartOpen(true);
                              }}
                              className="px-3 py-1.5 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Order</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
            onClick={() => setIsMobileFilterOpen(false)} 
          />
          <div className="relative ml-auto w-80 max-w-full bg-white h-full p-6 shadow-2xl z-10 flex flex-col justify-between">
            <div className="space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b">
                <h3 className="font-black text-lg text-[#14532D]">Filter Produce</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-extrabold text-gray-700 block mb-2">Category</label>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold ${
                        selectedCategory === c ? 'bg-[#14532D] text-white' : 'text-gray-600'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-extrabold text-gray-700 block mb-1">Max Price: ₹{maxPrice}</label>
                <input
                  type="range"
                  min="20"
                  max="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#16A34A]"
                />
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-[#14532D] text-white rounded-2xl font-bold text-xs mt-4"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
