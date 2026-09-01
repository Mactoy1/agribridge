import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Thermometer, 
  Droplets, 
  Calendar, 
  Scale, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Share2, 
  QrCode, 
  Truck, 
  Leaf, 
  DollarSign, 
  Layers, 
  Info,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isWishlisted, addToCompare, setIsCartOpen, showToast } = useApp();

  const product = products.find((p) => p.id === id) || products[0];
  const [selectedKg, setSelectedKg] = useState<number>(product.minOrderKg || 25);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const wish = isWishlisted(product.id);

  // Dynamic bulk rate calculation based on tiers
  const activeBulkTier = product.bulkTiers.reduce((prev, curr) => {
    return selectedKg >= curr.minKg ? curr : prev;
  }, product.bulkTiers[0]);

  const unitPrice = activeBulkTier ? activeBulkTier.pricePerKg : product.pricePerKg;
  const totalPrice = unitPrice * selectedKg;
  const traditionalCost = product.marketPricePerKg * selectedKg;
  const totalSavings = traditionalCost - totalPrice;

  const handleAddToCart = () => {
    addToCart(product, selectedKg);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Product link copied to clipboard for sharing', 'success');
  };

  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAF5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back and Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Link to="/marketplace" className="inline-flex items-center gap-1 hover:text-[#16A34A] font-bold">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Marketplace
            </Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-[#14532D] font-extrabold">{product.name}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => addToCompare(product)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5 text-amber-600" /> Compare
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-black"
              title="Share dossier"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Overview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Imagery & Lab Badges */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-gray-900 shadow-xl border border-[#16A34A]/20">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#14532D]/90 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                  {product.badge}
                </span>
                {product.isOrganic && (
                  <span className="bg-[#22C55E] text-[#0B1F16] text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                    Certified Organic (NPOP)
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                  wish ? 'bg-red-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${wish ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Farm Verification & QR Block */}
            <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-[#F8FAF5] rounded-2xl border border-gray-200">
                  <QrCode className="w-8 h-8 text-[#14532D]" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#14532D] uppercase tracking-wider">
                    Lot Blockchain Traceability
                  </h4>
                  <p className="text-xs text-gray-600 font-mono mt-0.5">
                    Batch #AG-2026-{product.id.toUpperCase()}-7X
                  </p>
                  <span className="text-[10px] text-[#16A34A] font-bold">
                    ✓ Verified GPS Origin & Soil Health Card
                  </span>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="text-gray-400 block">Harvested</span>
                <span className="font-bold text-gray-800">{product.harvestDate}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details, Dynamic Bulk Pricing & Order */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1.5">
                <span className="font-bold text-[#16A34A]">{product.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> {product.location}, {product.state}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-500" /> {product.qualityRating} / 5.0 Grade A
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-[#14532D] leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Farmer Lead Information Box */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-[#14532D] text-white flex items-center justify-center font-bold text-base">
                  {product.farmerName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-[#14532D]">{product.farmerName}</h4>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3 text-[#16A34A]" /> Verified Grower
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Member of <strong>{product.fpoName}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-gray-400 font-bold block">Available Stock</span>
                <span className="text-sm font-black text-[#14532D]">{product.availableQuantityTons} Tons</span>
              </div>
            </div>

            {/* Wholesale Pricing Tier Matrix */}
            <div className="p-5 bg-white rounded-3xl border border-[#16A34A]/20 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                    Transparent Wholesale Pricing
                  </span>
                  <div className="flex items-baseline space-x-2 mt-0.5">
                    <span className="text-3xl font-black text-[#16A34A]">₹{unitPrice}</span>
                    <span className="text-xs font-semibold text-gray-500">/ kg</span>
                    <span className="text-xs text-gray-400 line-through">₹{product.marketPricePerKg} Mandi</span>
                  </div>
                </div>

                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3 py-1.5 rounded-xl">
                  Save {Math.round(((product.marketPricePerKg - unitPrice) / product.marketPricePerKg) * 100)}% Direct
                </span>
              </div>

              {/* Tiers display */}
              <div className="grid grid-cols-3 gap-2">
                {product.bulkTiers.map((tier, idx) => {
                  const isActive = selectedKg >= tier.minKg && (!product.bulkTiers[idx + 1] || selectedKg < product.bulkTiers[idx + 1].minKg);
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedKg(tier.minKg)}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        isActive
                          ? 'border-[#16A34A] bg-[#16A34A]/10 shadow-xs'
                          : 'border-gray-200 bg-[#F8FAF5] hover:border-gray-300'
                      }`}
                    >
                      <div className="text-[10px] font-bold text-gray-500">{tier.minKg}+ kg Bulk</div>
                      <div className="text-sm font-black text-[#14532D]">₹{tier.pricePerKg}/kg</div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Quantity Selector */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-700">Procurement Quantity:</span>
                  <span className="text-[#14532D] font-black text-sm">{selectedKg} kg ({ (selectedKg / 1000).toFixed(2) } Tons)</span>
                </div>
                <input
                  type="range"
                  min={product.minOrderKg || 10}
                  max="2000"
                  step="25"
                  value={selectedKg}
                  onChange={(e) => setSelectedKg(Number(e.target.value))}
                  className="w-full accent-[#16A34A] h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>Min: {product.minOrderKg} kg</span>
                  <span>500 kg</span>
                  <span>1000 kg</span>
                  <span>2000 kg</span>
                </div>
              </div>

              {/* Total Calculation & Order Button */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-500 font-medium block">Total Procurement Cost</span>
                  <div className="text-2xl font-black text-[#14532D]">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-[#16A34A] font-bold">
                    You save ₹{Math.round(totalSavings).toLocaleString('en-IN')} vs APMC Mandi
                  </span>
                </div>

                <button
                  id="detail-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto px-8 py-4 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-[#16A34A]/25 transition-all flex items-center justify-center space-x-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {selectedKg}kg to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Specs Dossier & Price Breakdown Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Produce Lab Specifications */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-gray-100">
              <Leaf className="w-5 h-5 text-[#16A34A]" />
              <h3 className="text-lg font-black text-[#14532D]">Certified Lab Dossier & Metrics</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-[#F8FAF5] rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold block">Brix Sweetness Score</span>
                <span className="text-lg font-black text-[#14532D]">{product.brixScore || '14.2°'}</span>
                <span className="text-[9px] text-[#16A34A] font-semibold block">Natural High Sugar</span>
              </div>

              <div className="p-3.5 bg-[#F8FAF5] rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold block">Moisture Content</span>
                <span className="text-lg font-black text-[#14532D]">{product.moisturePercentage || '84.5%'}</span>
                <span className="text-[9px] text-blue-600 font-semibold block">Optimal Crispness</span>
              </div>

              <div className="p-3.5 bg-[#F8FAF5] rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold block">Pesticide Residue</span>
                <span className="text-lg font-black text-[#16A34A]">0.00 ppm</span>
                <span className="text-[9px] text-[#16A34A] font-semibold block">NABL Audited</span>
              </div>

              <div className="p-3.5 bg-[#F8FAF5] rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold block">Cold Chain Temp</span>
                <span className="text-lg font-black text-gray-800">{product.temperatureRequired}</span>
                <span className="text-[9px] text-gray-500 font-semibold block">Active Reefer</span>
              </div>

              <div className="p-3.5 bg-[#F8FAF5] rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold block">Tested Shelf Life</span>
                <span className="text-lg font-black text-gray-800">{product.shelfLifeDays} Days</span>
                <span className="text-[9px] text-gray-500 font-semibold block">From Delivery</span>
              </div>

              <div className="p-3.5 bg-[#F8FAF5] rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold block">Grading Standard</span>
                <span className="text-lg font-black text-[#14532D]">Grade A Export</span>
                <span className="text-[9px] text-[#16A34A] font-semibold block">Uniform Caliber</span>
              </div>
            </div>
          </div>

          {/* Price Breakdown Transparency Visual */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#0B1F16] to-[#14532D] text-white rounded-3xl p-6 sm:p-8 border border-[#22C55E]/30 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-[#22C55E]" />
                <h3 className="text-lg font-black text-white">Price Realization Transparency</h3>
              </div>
              <span className="text-xs font-extrabold text-[#22C55E] bg-[#22C55E]/20 px-2.5 py-1 rounded-full">
                ₹{product.pricePerKg} / kg Total
              </span>
            </div>

            <p className="text-xs text-gray-300">
              Every rupee is tracked in escrow. Here is the exact breakdown for this harvest lot:
            </p>

            <div className="space-y-3">
              {/* Farmer share */}
              <div className="p-3.5 rounded-2xl bg-[#14532D]/70 border border-[#22C55E]/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-white block">Farmer Direct Share (80%)</span>
                  <span className="text-[10px] text-emerald-300">Transferred direct to {product.farmerName}'s bank</span>
                </div>
                <span className="text-lg font-black text-[#22C55E]">₹{product.priceBreakdown.farmerShare}</span>
              </div>

              {/* Logistics share */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-200 block">Cold-Chain Transit & Pre-cooling (12%)</span>
                  <span className="text-[10px] text-gray-400">Reefer fuel, GPS telemetry & hub sorting</span>
                </div>
                <span className="text-base font-bold text-gray-200">₹{product.priceBreakdown.logisticsShare}</span>
              </div>

              {/* Platform share */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-200 block">AgriBridge Platform & Escrow (8%)</span>
                  <span className="text-[10px] text-gray-400">Quality audit, AI demand server & insurance</span>
                </div>
                <span className="text-base font-bold text-gray-200">₹{product.priceBreakdown.platformFee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Produce Recommendations */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-xl font-black text-[#14532D] mb-6">
              More Fresh {product.category} from Neighboring FPOs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-3xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all flex space-x-4 items-center">
                  <img src={p.image} alt={p.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-extrabold text-sm text-[#14532D] line-clamp-1">{p.name}</h4>
                    <p className="text-xs text-gray-500">{p.fpoName}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black text-[#16A34A] text-sm">₹{p.pricePerKg}/kg</span>
                      <Link
                        to={`/marketplace/${p.id}`}
                        className="text-xs font-bold text-[#14532D] hover:underline"
                      >
                        View Dossier
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
