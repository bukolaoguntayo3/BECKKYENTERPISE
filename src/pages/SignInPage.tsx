import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageCircle,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Gem,
  Award,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, currentUser, showToast } = useShop();

  // Page title
  useEffect(() => {
    document.title = 'Sign In | BECKKYENTERPRISE';
  }, []);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Status & error state
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex (standard RFC 5322 compatible regex)
  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setFieldErrors({});

    const trimmedEmail = email.trim();

    // 1. Validate the email
    if (!trimmedEmail) {
      setFieldErrors((prev) => ({ ...prev, email: 'Email address is required.' }));
      setErrorMessage('Email address is required.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setFieldErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // 2. Validate the password
    if (!password) {
      setFieldErrors((prev) => ({ ...prev, password: 'Password is required.' }));
      setErrorMessage('Password is required.');
      return;
    }

    // 3. Start processing
    setIsLoading(true);

    try {
      // Simulate realistic network latency for credential verification
      await new Promise((resolve) => setTimeout(resolve, 350));

      const success = login(trimmedEmail, password, rememberMe);

      if (success) {
        // Success notification is automatically shown by login (or can show toast)
        showToast('Welcome back! You have signed in successfully.', 'success');

        // Redirect to administrator or customer dashboard
        const isAdmin =
          trimmedEmail.toLowerCase().includes('admin') ||
          (currentUser && currentUser.role === 'admin');

        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Incorrect credentials or account not found
        // Generic response prevents account-enumeration attacks
        setErrorMessage('The email or password you entered is incorrect. Please try again.');
      }
    } catch {
      // Network or unexpected system error
      setErrorMessage("We couldn't sign you in right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Quick fill demo helpers for testing
  const fillCustomerDemo = () => {
    setEmail('bukolaoguntayo3@gmail.com');
    setPassword('password123');
    setErrorMessage('');
    setFieldErrors({});
  };

  const fillAdminDemo = () => {
    setEmail('admin@beckkyenterprise.com');
    setPassword('adminpass123');
    setErrorMessage('');
    setFieldErrors({});
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Centered Two-Section Container */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
        {/* Left Section: Dark Navy Branding & Atmosphere */}
        <div className="lg:col-span-5 bg-[#0B1B33] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Background Accents */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
              title="Return to Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-serif-luxury font-extrabold text-xl flex items-center justify-center shadow-md">
                B
              </div>
              <span className="text-xl font-bold tracking-widest text-white font-serif-luxury uppercase">
                BECKKYENTERPRISE
              </span>
            </Link>

            {/* Welcoming Messages */}
            <div className="mt-8 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white leading-tight">
                Welcome back to BECKKYENTERPRISE
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Sign in to access your account, manage your orders, and continue shopping.
              </p>
            </div>
          </div>

          {/* Ecommerce-Themed Visual Showcase */}
          <div className="relative z-10 my-8 hidden sm:block">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3 shadow-inner">
              <div className="flex items-center gap-3 text-xs text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Assay-Certified Solid Gold</p>
                  <p className="text-[11px] text-slate-400">Guaranteed 18K & 22K authenticity</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Insured Priority Courier</p>
                  <p className="text-[11px] text-slate-400">Doorstep tracking across Nigeria & worldwide</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Encrypted Patron Vault</p>
                  <p className="text-[11px] text-slate-400">256-bit secure order history & checkout</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-2 text-slate-400 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Official Luxury Patron Authentication</span>
          </div>
        </div>

        {/* Right Section: Clean White Authentication Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 flex flex-col justify-center">
          {/* Form Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#0B1B33]">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Sign in to your BECKKYENTERPRISE account
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3.5 bg-red-50/90 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in duration-150"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} noValidate className="space-y-4">
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) {
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                  className={`w-full pl-10 pr-3.5 py-3 text-xs sm:text-sm rounded-xl bg-slate-50 border transition-all duration-200 outline-none text-slate-900 placeholder:text-slate-400 ${
                    fieldErrors.email
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                      : 'border-slate-300 hover:border-slate-400 focus:border-[#0B1B33] focus:bg-white focus:ring-2 focus:ring-[#0B1B33]/10'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-[11px] text-red-600 font-medium">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({ ...prev, password: undefined }));
                    }
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  className={`w-full pl-10 pr-11 py-3 text-xs sm:text-sm rounded-xl bg-slate-50 border transition-all duration-200 outline-none text-slate-900 placeholder:text-slate-400 ${
                    fieldErrors.password
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                      : 'border-slate-300 hover:border-slate-400 focus:border-[#0B1B33] focus:bg-white focus:ring-2 focus:ring-[#0B1B33]/10'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none focus:text-[#0B1B33] p-1 rounded-md"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-[11px] text-red-600 font-medium">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label
                htmlFor="rememberMe"
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-slate-300 text-[#0B1B33] focus:ring-[#0B1B33] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0B1B33] hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B1B33]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </>
                )}
              </button>
            </div>

            {/* Create Account Section */}
            <div className="pt-3 text-center">
              <p className="text-xs text-slate-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-bold text-[#0B1B33] hover:text-amber-700 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-1"
                >
                  Create an Account
                </Link>
              </p>
            </div>

            {/* Quick Test Logins for Patron & Admin Evaluation */}
            <div className="pt-4 border-t border-slate-100 text-center space-y-2">
              <p className="text-[11px] text-slate-400 font-medium">
                Quick Test Credentials (Pre-Configured Demo Accounts)
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={fillCustomerDemo}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Patron: bukolaoguntayo3@gmail.com
                </button>
                <button
                  type="button"
                  onClick={fillAdminDemo}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-lg transition-colors cursor-pointer"
                >
                  Admin: admin@beckkyenterprise.com
                </button>
              </div>
            </div>
          </form>

          {/* Social / Contact Support */}
          <div className="mt-8 pt-5 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs font-semibold text-slate-700">
              Need help? Contact BECKKYENTERPRISE
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500">
              <a
                href="tel:08061281910"
                className="hover:text-[#0B1B33] transition-colors flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-amber-600" />
                <span>08061281910</span>
              </a>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <a
                href="https://wa.me/2348061281910"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 transition-colors flex items-center gap-1 text-emerald-700 font-medium"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp: 08061281910</span>
              </a>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <a
                href="mailto:bukolaoguntayo3@gmail.com"
                className="hover:text-[#0B1B33] transition-colors flex items-center gap-1"
              >
                <Mail className="w-3 h-3 text-amber-600" />
                <span>bukolaoguntayo3@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
