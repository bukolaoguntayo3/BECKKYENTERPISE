import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ForgotPasswordPage: React.FC = () => {
  const { requestPasswordReset, showToast } = useShop();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      showToast('Please provide a valid registered email address.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      requestPasswordReset(email);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#0B1B33] text-amber-300 font-serif-luxury font-bold text-lg flex items-center justify-center shadow-md">
              B
            </div>
            <span className="text-xl font-bold tracking-widest text-[#0B1B33] font-serif-luxury uppercase">
              BECKKYENTERPRISE
            </span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold font-serif-luxury text-slate-900">
            Forgot Your Password?
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Enter the email address registered with your patron account to receive a secure password reset link.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-7 shadow-xs border border-slate-200/80">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif-luxury">
                Reset Link Dispatched
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an account exists for <span className="font-semibold text-slate-900">{email}</span>, we have transmitted password reset instructions.
              </p>

              <div className="pt-2 space-y-2">
                <Link
                  to={`/reset-password?email=${encodeURIComponent(email)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0B1B33] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all shadow-sm"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Enter New Password Now</span>
                </Link>

                <Link
                  to="/signin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. patron@beckkyenterprise.com"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-[#0B1B33] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all shadow-sm active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? 'Transmitting Instructions...' : 'Transmit Password Reset Instructions'}
              </button>

              <div className="pt-2 text-center">
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#0B1B33] font-medium transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Protected by 256-bit encrypted patron authentication</span>
        </div>
      </div>
    </div>
  );
};
