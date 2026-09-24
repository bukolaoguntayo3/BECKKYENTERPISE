import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, ShoppingBag } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-5 bg-[#F5F6F8] p-8 sm:p-10 rounded-2xl border border-slate-200">
        <div className="w-16 h-16 rounded-full bg-amber-100/80 text-amber-800 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block">
          404 Error · Destination Not Found
        </span>

        <h1 className="text-3xl font-bold text-slate-900 font-serif-luxury">
          Page Does Not Exist
        </h1>

        <p className="text-xs text-slate-600 leading-relaxed">
          The luxury item or page you are looking for has been retired or relocated. Let us direct you back to our curated catalog.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#0B1B33] text-white text-xs font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/catalog"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
