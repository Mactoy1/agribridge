import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Thermometer, 
  Calendar, 
  Scale, 
  ShoppingBag, 
  Heart, 
  Sparkles,
  Check,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    addToCompare,
    setIsCartOpen 
  } = useApp();

  const [quantity, setQuantity] = useState<number>(25);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wish = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 border border-[#16A34A]/20">
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-700 hover:text-black shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="relative bg-[#0B1F16] min-h-[300px] md:min-h-[420px] overflow-hidden flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="bg-[#14532D]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                {product.badge}
              </span>
              {product.isOrganic && (
                <span className="bg-[#22C55E] text-[#0B1F16] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                  Certified Organic
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-[#0B1F16]/85 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-white text-xs flex justify-between items-center">
              <div>
                <p className="text-gray-300 text-[10px]">Quality Score</p>
                <p className="font-bold text-[#22C55E] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current text-[#FACC15]" /> {product.qualityRating} / 5.0 Grade A
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-[10px]">Shelf Life</p>
                <p className="font-bold text-white">{product.shelfLifeDays} Days Tested</p>
              </div>
            </div>
          </div>

          {/* Product Info Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
                <span className="font-semibold text-[#16A34A]">{product.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gray-400" /> {product.location}, {product.state}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#14532D] leading-tight">
                {product.name}
              </h3>

              <p className="text-xs text-gray-600 mt-1 font-medium">
                Grown by <strong className="text-gray-800">{product.farmerName}</strong> • {product.fpoName}
              </p>

              {/* Price & savings */}
              <div className="flex items-baseline space-x-3 my-3">
                <span className="text-3xl font-black text-[#16A34A]">
                  ₹{product.pricePerKg}
                </span>
                <span className="text-sm font-semibold text-gray-500">/ kg</span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.marketPricePerKg} Mandi
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Save {Math.round(((product.marketPricePerKg - product.pricePerKg) / product.marketPricePerKg) * 100)}%
                </span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Bulk Tiers preview */}
              <div className="mt-4 p-3 bg-[#F8FAF5] rounded-2xl border border-gray-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                  Bulk Wholesale Tiers
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  {product.bulkTiers.map((tier, i) => (
                    <div key={i} className="bg-white p-2 rounded-xl border border-gray-200">
                      <div className="text-[10px] text-gray-500">{tier.minKg}+ kg</div>
                      <div className="font-extrabold text-[#14532D]">₹{tier.pricePerKg}/kg</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-2xl bg-[#F8FAF5] px-3 py-2">
                  <span className="text-xs text-gray-500 mr-2 font-medium">Qty:</span>
                  <input
                    type="number"
                    min={product.minOrderKg || 5}
                    step="5"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.minOrderKg || 5, Number(e.target.value)))}
                    className="w-16 text-sm font-bold text-gray-800 bg-transparent focus:outline-none"
                  />
                  <span className="text-xs font-bold text-gray-500">kg</span>
                </div>

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart (₹{(quantity * product.pricePerKg).toLocaleString('en-IN')})</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-2xl border transition-colors ${
                    wish ? 'bg-red-50 text-red-500 border-red-200' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wish ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => addToCompare(product)}
                  className="text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Scale className="w-3.5 h-3.5" /> Add to Comparison
                </button>

                <Link
                  to={`/marketplace/${product.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-[#16A34A] hover:text-[#14532D] font-bold flex items-center gap-1"
                >
                  <span>Full Produce Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
