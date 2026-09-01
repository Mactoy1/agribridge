import React, { useState } from 'react';
import {
  X,
  Sprout,
  Utensils,
  Building2,
  Store,
  Truck,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    loginUser,
    signUpUser
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const [selectedRole, setSelectedRole] =
    useState<UserProfile['role']>('Restaurant');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fpoOrCompany, setFpoOrCompany] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const roles: {
    role: UserProfile['role'];
    title: string;
    desc: string;
    icon: any;
    highlight: string;
  }[] = [
    {
      role: 'Farmer',
      title: 'Farmer & FPO Lead',
      desc: 'List produce, view AI crop demand forecasts & direct bank settlements',
      icon: Sprout,
      highlight: 'Get +24% Higher Realization'
    },
    {
      role: 'Restaurant',
      title: 'Restaurant & Hospitality',
      desc: 'Schedule daily farm-fresh deliveries with zero mandi markups',
      icon: Utensils,
      highlight: '100% Quality Guaranteed'
    },
    {
      role: 'Wholesaler',
      title: 'Bulk Buyer & Food Processing',
      desc: 'Lock ton-scale contracts with verified FPO grower cooperatives',
      icon: Building2,
      highlight: 'Direct Silo & Cold Hub Logistics'
    },
    {
      role: 'Buyer',
      title: 'Consumer & Co-ops',
      desc: 'Discover single-origin chemical-free fruits & vegetables',
      icon: Store,
      highlight: 'Farmgate Direct Transparency'
    },
    {
      role: 'Logistics',
      title: 'Cold Fleet & Driver Partner',
      desc: 'Access AI-optimized load pooling & IoT refrigerated routes',
      icon: Truck,
      highlight: 'Zero Deadhead Mileage'
    }
  ];

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (mode === 'login') {
        await loginUser(
          email,
          password,
          selectedRole
        );
      } else {
        await signUpUser(
          name,
          email,
          password,
          selectedRole,
          fpoOrCompany,
          location
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(prev => (prev === 'login' ? 'signup' : 'login'));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">

      {/* Background */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl z-10 border border-[#16A34A]/20">

        {/* Close */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#14532D] to-[#16A34A] flex items-center justify-center mx-auto mb-3 text-white shadow-lg shadow-[#16A34A]/30">
            <Sprout className="w-6 h-6 text-[#FEFCE8]" />
          </div>

          <h3 className="text-2xl font-black text-[#14532D]">
            {mode === 'login' ? 'Welcome Back' : 'Join AgriBridge'}
          </h3>

          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            {mode === 'login'
              ? 'Login to access your AgriBridge dashboard.'
              : 'Create your AgriBridge account and choose your stakeholder role.'}
          </p>
        </div>

        {/* Login / Signup switch */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-5">

          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
              mode === 'login'
                ? 'bg-white text-[#14532D] shadow'
                : 'text-gray-500'
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
              mode === 'signup'
                ? 'bg-white text-[#14532D] shadow'
                : 'text-gray-500'
            }`}
          >
            Sign Up
          </button>

        </div>

        {/* Signup fields */}
        {mode === 'signup' && (
          <div className="space-y-3 mb-4">

            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A34A]"
            />

            <input
              type="text"
              placeholder="FPO / Company name"
              value={fpoOrCompany}
              onChange={e => setFpoOrCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A34A]"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A34A]"
            />

          </div>
        )}

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A34A]"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A34A]"
          />
        </div>

        {/* Role */}
        <div className="mb-5">

          <p className="text-xs font-bold text-gray-500 mb-2">
            {mode === 'login'
              ? 'Login as'
              : 'Choose your stakeholder role'}
          </p>

          <div className="space-y-2">

            {roles.map(r => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.role;

              return (
                <div
                  key={r.role}
                  onClick={() => setSelectedRole(r.role)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 ${
                    isSelected
                      ? 'border-[#16A34A] bg-[#16A34A]/10 shadow-sm'
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >

                  <div
                    className={`p-2 rounded-xl ${
                      isSelected
                        ? 'bg-[#14532D] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between gap-2">

                      <h4 className="font-bold text-sm text-[#14532D]">
                        {r.title}
                      </h4>

                      <span className="hidden sm:block text-[10px] font-extrabold text-[#16A34A] bg-[#16A34A]/15 px-2 py-0.5 rounded-full">
                        {r.highlight}
                      </span>

                    </div>

                    <p className="text-xs text-gray-500 mt-0.5">
                      {r.desc}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Submit */}
        <button
          id="role-login-confirm-btn"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3.5 bg-[#14532D] hover:bg-[#16A34A] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-[#16A34A]/25 transition-all flex items-center justify-center space-x-2"
        >

          <span>
            {loading
              ? 'Please wait...'
              : mode === 'login'
                ? `Login as ${selectedRole}`
                : `Create ${selectedRole} Account`}
          </span>

          {!loading && <ArrowRight className="w-4 h-4" />}

        </button>

        {/* Footer */}
        <div className="mt-4 text-center">

          <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />

            Supabase secured authentication
          </p>

          <button
            onClick={switchMode}
            className="mt-2 text-xs font-bold text-[#16A34A] hover:underline"
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </button>

        </div>

      </div>
    </div>
  );
};