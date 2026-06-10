import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

const EXCHANGE_RATE = import.meta.env.VITE_EXCHANGE_RATE_UGX 
  ? parseFloat(import.meta.env.VITE_EXCHANGE_RATE_UGX) 
  : 3667;

type Currency = 'USD' | 'UGX';

interface CurrencyContextType {
  currency: Currency;
  formatPrice: (priceInUSD: number) => string;
  exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    console.log('CurrencyProvider mounted, starting interval');
    // Auto-switch currency every 5 seconds
    const interval = setInterval(() => {
      setCurrency(prev => {
        const newCurrency = prev === 'USD' ? 'UGX' : 'USD';
        console.log('🔄 Currency switched to:', newCurrency);
        return newCurrency;
      });
    }, 5000);

    return () => {
      console.log('Cleaning up interval');
      clearInterval(interval);
    };
  }, []);

  const formatPrice = useCallback((priceInUSD: number): string => {
    console.log('💰 Formatting price:', priceInUSD, 'with currency:', currency);
    
    // Calculate converted value
    let value: number;
    if (currency === 'UGX') {
      value = priceInUSD * EXCHANGE_RATE;
      console.log(`Converted ${priceInUSD} USD to ${value} UGX`);
    } else {
      value = priceInUSD;
    }
    
    if (currency === 'UGX') {
      // Format UGX with millions (M) for values >= 1,000,000
      if (value >= 1000000) {
        const millions = value / 1000000;
        const roundedMillions = Math.round(millions * 10) / 10;
        let result;
        if (roundedMillions === Math.floor(roundedMillions)) {
          result = `UGX ${Math.floor(roundedMillions)}M`;
        } else {
          result = `UGX ${roundedMillions}M`;
        }
        console.log('Formatted UGX (millions):', result);
        return result;
      }
      // For values under 1 million, show as regular number
      const result = new Intl.NumberFormat('en-UG', {
        style: 'currency',
        currency: 'UGX',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
      console.log('Formatted UGX (regular):', result);
      return result;
    }
    
    // USD formatting - whole numbers, no decimals
    const result = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
    console.log('Formatted USD:', result);
    return result;
  }, [currency]);

  console.log('CurrencyProvider rendering with currency:', currency);

  return (
    <CurrencyContext.Provider value={{ currency, formatPrice, exchangeRate: EXCHANGE_RATE }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};