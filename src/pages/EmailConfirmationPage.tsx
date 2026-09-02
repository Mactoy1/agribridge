import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const EmailConfirmationPage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    let mounted = true;

    const verifyEmail = async () => {
      try {
        // Check if Supabase has created a session from
        // the email confirmation link.
        const { data, error } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          console.error('Email verification error:', error);
          setStatus('error');
          setMessage(error.message);
          return;
        }

        if (data.session) {
          setStatus('success');

          // Remove authentication information from the URL
          window.history.replaceState(
            {},
            document.title,
            '/auth/confirm'
          );

          return;
        }

        // Listen for the authentication session created
        // while Supabase processes the confirmation URL.
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          if (!mounted) return;

          if (
            (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') &&
            session
          ) {
            setStatus('success');

            window.history.replaceState(
              {},
              document.title,
              '/auth/confirm'
            );
          }
        });

        // Give Supabase a little time to process the URL.
        setTimeout(async () => {
          if (!mounted) return;

          const { data: sessionData } = await supabase.auth.getSession();

          if (!sessionData.session) {
            setStatus('error');
            setMessage(
              'This verification link is invalid or has expired. Please request a new verification email.'
            );
          }
        }, 2000);

        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error('Unexpected verification error:', err);

        if (mounted) {
          setStatus('error');
          setMessage(
            'Something went wrong while verifying your email. Please try again.'
          );
        }
      }
    };

    verifyEmail();

    return () => {
      mounted = false;
    };
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