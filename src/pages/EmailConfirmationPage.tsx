import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const EmailConfirmationPage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);

      const tokenHash = params.get('token_hash');
      const type = params.get('type');

      if (!tokenHash) {
        setStatus('error');
        setMessage('Verification link is missing or invalid.');
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: (type as 'email' | 'recovery' | 'invite' | 'email_change') || 'email',
      });

      if (error) {
        console.error('Email verification error:', error);
        setStatus('error');
        setMessage(error.message);
        return;
      }

      setStatus('success');

      // Remove the token from the browser URL
      window.history.replaceState(
        {},
        document.title,
        '/auth/confirm'
      );
    };

    verifyEmail();
  }, []);

  const handleContinue = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">

        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 mx-auto text-[#16A34A] animate-spin" />

            <h1 className="mt-6 text-2xl font-black text-[#14532D]">
              Verifying Your Email
            </h1>

            <p className="mt-3 text-gray-600">
              Please wait while we confirm your email address...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-20 h-20 mx-auto text-[#16A34A]" />

            <h1 className="mt-6 text-3xl font-black text-[#14532D]">
              Email Verified Successfully
            </h1>

            <p className="mt-4 text-gray-600">
              Your email has been verified. You can now continue to login.
            </p>

            <button
              onClick={handleContinue}
              className="mt-8 w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3.5 px-6 rounded-xl transition-all"
            >
              Continue to Login
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-20 h-20 mx-auto text-red-500" />

            <h1 className="mt-6 text-2xl font-black text-[#14532D]">
              Verification Failed
            </h1>

            <p className="mt-4 text-gray-600">
              {message}
            </p>

            <button
              onClick={handleContinue}
              className="mt-8 w-full bg-[#14532D] hover:bg-[#166534] text-white font-bold py-3.5 px-6 rounded-xl transition-all"
            >
              Back to AgriBridge
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default EmailConfirmationPage;