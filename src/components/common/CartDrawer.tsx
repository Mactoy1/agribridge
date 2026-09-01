import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    farmerDirectPayout,
    showToast
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      showToast('Order Placed Successfully!', 'Your direct farm order #AGB-9024 has been sent to FPO collection hubs.', 'success');
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-[#16A34A]/20">
        {/* Top Header */}
        <div className="p-4 bg-[#F8FAF5] border-b border-[#16A34A]/15 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#16A34A]/15 text-[#14532D]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#14532D] text-base">Procurement Cart</h3>
              <p className="text-xs text-gray-500">{cart.length} item types in basket</p>
            </div>
          </div>

          <button
            id="close-cart-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-gray-400 hover:text-[#14532D] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderComplete ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-extrabold text-[#14532D]">Order Confirmed!</h4>
            <p className="text-sm text-gray-600 max-w-xs">
              Thank you for supporting Indian farmers directly! Your cold-chain route has been assigned.
            </p>
            <div className="p-4 bg-[#F8FAF5] rounded-2xl border border-[#16A34A]/20 w-full text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-mono font-bold text-[#14532D]">#AGB-9024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cold Chain ETA:</span>
                <span className="font-bold text-[#16A34A]">Tomorrow by 8:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Logistics Route:</span>
                <span className="font-semibold text-gray-700">FPO Hub → Cold Reefer → Direct Destination</span>
              </div>
            </div>
            <button
              onClick={() => {
                setOrderComplete(false);
                setIsCartOpen(false);
              }}
              className="w-full py-3 bg-[#14532D] text-white rounded-xl font-bold text-sm hover:bg-[#16A34A] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Your basket is empty</h4>
            <p className="text-xs text-gray-500 max-w-xs">
              Explore our farm-fresh verified catalog and support grower collectives directly.
            </p>
            <Link
              to="/marketplace"
              onClick={() => setIsCartOpen(false)}
              className="px-6 py-2.5 bg-[#14532D] text-white rounded-xl font-bold text-sm hover:bg-[#16A34A] transition-colors"
            >
              Explore Marketplace
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="p-3 bg-[#F8FAF5] rounded-2xl border border-[#16A34A]/15 flex space-x-3 items-center hover:border-[#16A34A]/30 transition-all"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-[#14532D] truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-gray-500 truncate">
                      {item.product.fpoName} • {item.product.location}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-extrabold text-[#16A34A]">
                        ₹{item.selectedTierPrice}/kg
                      </span>
                      <span className="text-[10px] text-gray-400 line-through">
                        ₹{item.product.marketPricePerKg}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex flex-col items-end space-y-1.5">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500 text-xs p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center space-x-1.5 bg-white px-2 py-1 rounded-lg border border-gray-200">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantityKg - (item.product.minOrderKg || 5))}
                        className="text-gray-600 hover:text-black p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#14532D] min-w-[28px] text-center">
                        {item.quantityKg}kg
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantityKg + (item.product.minOrderKg || 5))}
                        className="text-gray-600 hover:text-black p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Farmer Impact Badge */}
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/70 text-xs text-[#14532D] space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5 text-[#16A34A]">
                    <ShieldCheck className="w-4 h-4" /> Direct Farmer Payout:
                  </span>
                  <span className="font-extrabold text-[#14532D] text-sm">
                    ₹{Math.round(farmerDirectPayout).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Approx 78% of your order goes straight to the grower's bank account via digital escrow.
                </p>
              </div>
            </div>

            {/* Coupon & Summary Footer */}
            <div className="p-4 bg-[#F8FAF5] border-t border-[#16A34A]/15 space-y-3">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-100/60 px-3 py-2 rounded-xl text-xs font-bold text-emerald-900 border border-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#16A34A]" /> Code {appliedCoupon} (-₹300)
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon (e.g. AGRIFIRST)"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#16A34A]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#14532D] text-white rounded-xl text-xs font-bold hover:bg-[#16A34A]"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#16A34A] font-semibold">
                    <span>Direct Coupon Discount</span>
                    <span>-₹300</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-gray-400" /> Cold-Chain Logistics
                  </span>
                  <span>{cartDeliveryFee === 0 ? <span className="text-[#16A34A] font-bold">FREE (Bulk)</span> : `₹${cartDeliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#14532D] pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-base text-[#16A34A]">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="checkout-confirm-btn"
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-gradient-to-r from-[#14532D] via-[#16A34A] to-[#14532D] text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-[#16A34A]/25 hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                {isCheckingOut ? (
                  <span>Connecting to FPO Hubs...</span>
                ) : (
                  <>
                    <span>Confirm Procurement Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
