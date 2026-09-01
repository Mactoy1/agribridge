import React, { useState } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  Coins, 
  PackageCheck, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertCircle, 
  Calendar, 
  Sparkles, 
  X, 
  DollarSign, 
  Layers 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const FarmerDashboardPage: React.FC = () => {
  const { products, addProduct, showToast } = useApp();

  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'payouts'>('inventory');

  // Form state for new produce listing
  const [newCropName, setNewCropName] = useState('');
  const [newCategory, setNewCategory] = useState<'Fruits' | 'Vegetables' | 'Grains' | 'Organic'>('Vegetables');
  const [newQuantity, setNewQuantity] = useState<number>(5);
  const [newPrice, setNewPrice] = useState<number>(32);
  const [newLocation, setNewLocation] = useState('Nashik, Maharashtra');
  const [newOrganic, setNewOrganic] = useState(false);

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropName.trim()) return;

    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name: newCropName,
      category: newCategory,
      image: newCategory === 'Fruits' 
        ? 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      farmerName: 'Ramesh Patil',
      fpoName: 'Sahyadri Farmers Producer Co.',
      location: newLocation.split(',')[0] || 'Nashik',
      state: 'Maharashtra',
      pricePerKg: newPrice,
      marketPricePerKg: Math.round(newPrice * 1.35),
      availableQuantityTons: newQuantity,
      minOrderKg: 25,
      harvestDate: new Date().toISOString().split('T')[0],
      shelfLifeDays: 10,
      qualityRating: 4.9,
      isOrganic: newOrganic,
      moisturePercentage: 82.0,
      temperatureRequired: '12°C to 15°C',
      badge: newOrganic ? 'Organic' : 'Fresh Harvest',
      description: `Direct farmgate lot harvested from ${newLocation}. Tested for zero harmful chemical residues and packaged in breathable crates.`,
      farmerStory: {
        experienceYears: 16,
        farmSizeAcres: 12,
        soilType: 'Alluvial Loam',
        waterSource: 'Drip Well Irrigation',
        verifiedDate: 'Feb 2026',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        quote: 'Listing directly gives us predictable revenue within 24 hours of harvest.'
      },
      priceBreakdown: {
        farmerShare: Math.round(newPrice * 0.8),
        agriBridgeFee: Math.round(newPrice * 0.08),
        coldChainLogistics: Math.round(newPrice * 0.08),
        qualityTestingPackaging: Math.round(newPrice * 0.04),
        totalConsumerPrice: newPrice,
        traditionalPrice: Math.round(newPrice * 1.35)
      },
      demandTrend: [
        { month: 'Apr', marketDemand: 500, priceForecast: newPrice },
        { month: 'May', marketDemand: 620, priceForecast: newPrice + 2 }
      ],
      bulkTiers: [
        { minKg: 50, discountPercent: 0, pricePerKg: newPrice },
        { minKg: 200, discountPercent: 8, pricePerKg: Math.max(10, newPrice - 3) },
        { minKg: 500, discountPercent: 15, pricePerKg: Math.max(8, newPrice - 6) }
      ],
      logisticsRoute: {
        origin: newLocation,
        collectionCenter: 'Nashik Sorting Center',
        hub: 'Mumbai Distribution Bay',
        estimatedHours: 4.0,
        tempControl: '12°C Chilled'
      }
    };

    addProduct(newProduct);
    setIsListingModalOpen(false);
    setNewCropName('');
    showToast('Produce Listed Successfully', `${newCropName} is now live on the marketplace.`, 'success');
  };

  // Mock incoming orders
  const [incomingOrders, setIncomingOrders] = useState([
    { id: 'ORD-8921', buyer: 'Trattoria Bella (Restaurant)', produce: 'Ratnagiri Alphonso Mango', qty: '250 kg', amount: '₹45,000', status: 'In Pre-cooling', date: 'Today, 08:30 AM' },
    { id: 'ORD-8919', buyer: 'Nature Fresh Supermarkets', produce: 'Nashik Red Onions', qty: '1.2 Tons', amount: '₹40,800', status: 'Confirmed', date: 'Today, 06:15 AM' },
    { id: 'ORD-8902', buyer: 'Taj Culinary Kitchens', produce: 'Organic Roma Tomatoes', qty: '150 kg', amount: '₹4,200', status: 'Dispatched', date: 'Yesterday' }
  ]);

  const updateOrderStatus = (orderId: string, nextStatus: string) => {
    setIncomingOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
    showToast('Order Status Updated', `Order ${orderId} moved to "${nextStatus}"`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
              <span className="font-bold text-[#16A34A]">FPO Portal</span>
              <span>•</span>
              <span className="text-gray-800 font-semibold">Sahyadri Farmers Producer Co.</span>
            </div>
            <h1 className="text-3xl font-black text-[#14532D]">Farmer & Producer Suite</h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Manage live farmgate listings, track bulk buyer orders, and monitor instant escrow bank payouts.
            </p>
          </div>

          <button
            id="open-listing-modal-btn"
            onClick={() => setIsListingModalOpen(true)}
            className="px-6 py-3.5 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-[#16A34A]/25 transition-all flex items-center space-x-2 active:scale-95"
          >
            <Plus className="w-4 h-4 text-[#22C55E]" />
            <span>List New Produce Harvest</span>
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold">Active Listings</span>
              <Sprout className="w-5 h-5 text-[#16A34A]" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-black text-[#14532D]">{products.length} Lots</div>
              <p className="text-xs text-gray-500 mt-0.5">38.4 Total Tons Committed</p>
            </div>
            <div className="text-[11px] text-[#16A34A] font-bold">100% Quality Audited</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold">Total Transacted</span>
              <Coins className="w-5 h-5 text-amber-600" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-black text-gray-900">₹4,82,400</div>
              <p className="text-xs text-gray-500 mt-0.5">This Month Payout</p>
            </div>
            <div className="text-[11px] text-emerald-700 font-bold">Direct to Bank RTGS</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold">Realization Boost</span>
              <TrendingUp className="w-5 h-5 text-[#16A34A]" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-black text-[#16A34A]">+27.4%</div>
              <p className="text-xs text-gray-500 mt-0.5">vs APMC Mandi Rates</p>
            </div>
            <div className="text-[11px] text-[#16A34A] font-bold">Zero commission cut</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold">Pending Escrow</span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-black text-blue-900">₹89,200</div>
              <p className="text-xs text-gray-500 mt-0.5">Auto-releases on delivery</p>
            </div>
            <div className="text-[11px] text-blue-700 font-bold">2 orders in transit</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
          {[
            { key: 'inventory', label: 'Produce Inventory & Lots' },
            { key: 'orders', label: 'Incoming Buyer Orders (3)' },
            { key: 'payouts', label: 'Escrow Settlements & Bank Log' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === tab.key
                  ? 'bg-[#14532D] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#14532D]">Active Listed Produce Batches</h3>
              <span className="text-xs text-gray-500">Auto-synced with buyer search algorithms</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF5] text-gray-500 font-bold uppercase tracking-wider border-b">
                  <tr>
                    <th className="py-3.5 px-4">Crop Name</th>
                    <th className="py-3.5 px-4">Batch ID</th>
                    <th className="py-3.5 px-4">Direct Rate</th>
                    <th className="py-3.5 px-4">Stock Left</th>
                    <th className="py-3.5 px-4">Quality & Brix</th>
                    <th className="py-3.5 px-4">Harvest Date</th>
                    <th className="py-3.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#14532D]">
                        <div className="flex items-center space-x-2">
                          <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                          <span>{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">#{p.id}</td>
                      <td className="py-3.5 px-4 font-black text-[#16A34A]">₹{p.pricePerKg}/kg</td>
                      <td className="py-3.5 px-4 font-bold text-gray-800">{p.availableQuantityTons} Tons</td>
                      <td className="py-3.5 px-4 text-gray-600">⭐ {p.qualityRating} Grade A</td>
                      <td className="py-3.5 px-4 text-gray-500">{p.harvestDate}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[10px]">
                          Live On-Market
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Table */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#14532D]">Commercial Procurement Orders</h3>
              <span className="text-xs text-gray-500">Fulfill directly to collection centers</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF5] text-gray-500 font-bold uppercase tracking-wider border-b">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Buyer Name</th>
                    <th className="py-3.5 px-4">Produce</th>
                    <th className="py-3.5 px-4">Volume</th>
                    <th className="py-3.5 px-4">Escrow Value</th>
                    <th className="py-3.5 px-4">Current Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {incomingOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#14532D]">{ord.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-gray-800">{ord.buyer}</td>
                      <td className="py-3.5 px-4 text-gray-700">{ord.produce}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">{ord.qty}</td>
                      <td className="py-3.5 px-4 font-black text-[#16A34A]">{ord.amount}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ord.status === 'Dispatched' ? 'bg-blue-100 text-blue-800' :
                          ord.status === 'In Pre-cooling' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        {ord.status === 'Confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'In Pre-cooling')}
                            className="px-2.5 py-1 bg-amber-600 text-white rounded-lg font-bold text-[10px] hover:bg-amber-700"
                          >
                            Mark Pre-Cooled
                          </button>
                        )}
                        {ord.status === 'In Pre-cooling' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Dispatched')}
                            className="px-2.5 py-1 bg-[#14532D] text-white rounded-lg font-bold text-[10px] hover:bg-[#16A34A]"
                          >
                            Handover To Reefer
                          </button>
                        )}
                        {ord.status === 'Dispatched' && (
                          <span className="text-[10px] text-gray-400 font-semibold">In Transit</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Payouts */}
        {activeTab === 'payouts' && (
          <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="text-lg font-black text-[#14532D]">Bank Escrow Settlement History</h3>
            <p className="text-xs text-gray-500">
              Payments are automatically released to your verified bank account (State Bank of India •••• 4912) upon recipient QC signoff.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { date: '28 Feb 2026', ref: 'TXN-984210982', amount: '₹1,24,000', produce: 'Devgad Alphonso Mangoes (800kg)', status: 'Settled' },
                { date: '24 Feb 2026', ref: 'TXN-984200412', amount: '₹68,400', produce: 'Nashik Organic Tomatoes (2.4 Tons)', status: 'Settled' },
                { date: '19 Feb 2026', ref: 'TXN-984189332', amount: '₹1,84,000', produce: 'Sharbati Wheat Consignment (4 Tons)', status: 'Settled' }
              ].map((tx, idx) => (
                <div key={idx} className="p-4 bg-[#F8FAF5] rounded-2xl border border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-extrabold text-gray-900">{tx.produce}</div>
                    <div className="text-[11px] text-gray-400 font-mono mt-0.5">Ref: {tx.ref} • {tx.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-black text-[#16A34A]">{tx.amount}</div>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      ✓ {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* List New Harvest Modal */}
      {isListingModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsListingModalOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#16A34A]/20">
            <button
              onClick={() => setIsListingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5 mb-6">
              <div className="p-2.5 rounded-2xl bg-[#14532D] text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#14532D]">List Harvest Produce</h3>
                <p className="text-xs text-gray-500">AI automatically calculates optimal floor pricing</p>
              </div>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Crop / Produce Name</label>
                <input
                  type="text"
                  required
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  placeholder="e.g. Polyhouse Cherry Tomatoes"
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF5] border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#16A34A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF5] border border-gray-200 rounded-xl font-semibold"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Organic">Organic Produce</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Harvest Volume (Tons)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF5] border border-gray-200 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Target Direct Price (₹ / kg)</label>
                  <input
                    type="number"
                    min="5"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF5] border border-gray-200 rounded-xl font-black text-[#16A34A]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Origin Farm Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF5] border border-gray-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              {/* AI Realization Insight box */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-[#14532D] space-y-1">
                <div className="flex items-center gap-1 font-extrabold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" /> AI Price Recommendation: ₹{newPrice}/kg
                </div>
                <p className="text-[10px] text-emerald-800">
                  This gives you <strong>₹{Math.round(newPrice * 0.8)}/kg</strong> direct bank realization, compared to ₹{Math.round(newPrice * 0.6)} in local APMC mandis.
                </p>
              </div>

              <label className="flex items-center space-x-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newOrganic}
                  onChange={(e) => setNewOrganic(e.target.checked)}
                  className="w-4 h-4 text-[#16A34A] accent-[#16A34A]"
                />
                <span className="font-bold text-gray-800">Certified Organic (Zero Chemical Pesticides)</span>
              </label>

              <button
                type="submit"
                id="submit-produce-listing-btn"
                className="w-full py-3.5 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-2xl font-extrabold text-xs shadow-md transition-colors"
              >
                Publish Farmgate Lot to Marketplace
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
