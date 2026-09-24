import { CurrencyCode, CurrencyInfo } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  NGN: { code: 'NGN', symbol: '₦', rate: 1.0, name: 'Nigerian Naira (₦)' },
  USD: { code: 'USD', symbol: '$', rate: 1 / 1550, name: 'US Dollar ($)' },
  GBP: { code: 'GBP', symbol: '£', rate: 1 / 1980, name: 'British Pound (£)' },
  EUR: { code: 'EUR', symbol: '€', rate: 1 / 1680, name: 'Euro (€)' },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1 / 1120, name: 'Canadian Dollar (CA$)' },
  AED: { code: 'AED', symbol: 'AED ', rate: 1 / 420, name: 'UAE Dirham (AED)' }
};

/**
 * Formats a monetary amount in base NGN into the chosen currency.
 * Default is Nigerian Naira (₦).
 * Examples: ₦10,000, ₦25,500, ₦100,000
 */
export const formatPrice = (amountInNGN: number, currencyCode: CurrencyCode = 'NGN'): string => {
  const safeAmount = Number.isFinite(amountInNGN) ? Math.max(0, amountInNGN) : 0;
  const curr = CURRENCIES[currencyCode] || CURRENCIES.NGN;
  const converted = safeAmount * curr.rate;

  if (currencyCode === 'NGN') {
    return `${curr.symbol}${Math.round(converted).toLocaleString('en-NG')}`;
  }

  return `${curr.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};
