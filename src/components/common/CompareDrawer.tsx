import React from 'react';
import { X, Scale, ShoppingBag, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompareDrawer: React.FC = () => {
  const { isCompareOpen, setIsCompareOpen, compareItems, removeFromCompare, clearCompare, addToCart, setIsCartOpen } = useApp();

  if (!isCompareOpen || compareItems.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCompareOpen(false)}
      />

      <div className="relative bg-white rounded-3xl max-w-5xl w-full p-6 md:p-8 shadow-2xl z-10 border border-[#16A34A]/20 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#14532D]">Produce Comparison Matrix</h3>
              <p className="text-xs text-gray-500">Evaluating quality, farm origin, cold-chain, and price realization</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={clearCompare}
              className="text-xs text-red-600 hover:underline font-semibold px-2 py-1"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-gray-400 font-bold uppercase tracking-wider w-1/4">Feature</th>
                {compareItems.map(item => (
                  <th key={item.id} className="pb-3 px-3 font-bold text-[#14532D] text-center w-1/4">
                    <div className="flex flex-col items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover mb-2 border border-gray-200" />
                      <span className="font-extrabold line-clamp-1">{item.name}</span>
                      <button
                        onClick={() => removeFromCompare(item.id)}
                        className="text-[10px] text-red-500 hover:underline mt-1 flex items-center gap-0.5"
                      >
                        <Trash2 className="w-2.5 h-2.5" /> Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 text-gray-500 font-semibold">Direct Price / kg</td>
                {compareItems.map(item => (
                  <td key={item.id} className="py-3 px-3 text-center font-extrabold text-[#16A34A] text-base">
                    ₹{item.pricePerKg}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-gray-500 font-semibold">Mandi Comparison</td>
                {compareItems.map(item => (
                  <td key={item.id} className="py-3 px-3 text-center text-gray-500">
                    ₹{item.marketPricePerKg}/kg (Save {Math.round(((item.marketPricePerKg - item.pricePerKg) / item.marketPricePerKg) * 100)}%)
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-gray-500 font-semibold">Farmer Realization</td>
                {compareItems.map(item => (
                  <td key={item.id} className="py-3 px-3 text-center font-bold text-[#14532D]">
                    ₹{item.priceBreakdown.farmerShare}/kg ({Math.round((item.priceBreakdown.farmerShare / item.pricePerKg) * 100)}%)
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-gray-500 font-semibold">Origin & Collective</td>
                {compareItems.map(item => (
                  <td key={item.id} className="py-3 px-3 text-center text-xs">
                    <span className="font-bold text-gray-800">{item.farmerName}</span>
                    <br />
                    <span className="text-gray-500">{item.fpoName} ({item.location})</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-gray-500 font-semibold">Organic Certification</td>
                {compareItems.map(item => (
                  <td key={item.id} className="py-3 px-3 text-center">
                    {item.isOrganic ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full text-xs">
                        <CheckCircle2 className="w-3 h-3" /> Certified
                      </span>
                    ) : (
                      <span className="text-gray-400">Standard GAP</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-gray-500 font-semibold">Tested Shelf Life</td>
                {compareItems.map(item => (
                  <td key={item.id} className="py-3 px-3 text-center font-semibold text-gray-700">
                    {item.shelfLifeDays} Days
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-gray-500 font-semibold">Logistics Temp Matrix</td>
                {compareItems.map(item => (
                  <td key={item.id} className="py-3 px-3 text-center text-xs text-blue-800 font-medium">
                    {item.temperatureRequired}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 text-gray-500 font-semibold">Procurement</td>
                {compareItems.map(item => (
                  <td key={item.id} className="py-4 px-3 text-center">
                    <button
                      onClick={() => {
                        addToCart(item);
                        setIsCompareOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="px-3 py-2 bg-[#14532D] text-white rounded-xl text-xs font-bold hover:bg-[#16A34A] transition-colors inline-flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order {item.minOrderKg}kg</span>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
