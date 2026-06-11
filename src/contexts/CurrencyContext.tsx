import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

const EXCHANGE_RATE = import.meta.env.VITE_EXCHANGE_RATE_UGX 
  ? parseFloat(import.meta.env.VITE_EXCHANGE_RATE_UGX) 
  : 3667;

type Currency = 'USD' | 'UGX';

interface CurrencyContextType {
  currency: Currency;
  formatPrice: (priceInUGX: number) => string;
  exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency] = useState<Currency>('UGX');

  const formatPrice = useCallback((priceInUGX: number): string => {
    const value = priceInUGX;
    
    if (value >= 1000000) {
      const millions = value / 1000000;
      const roundedMillions = Math.round(millions * 10) / 10;
      if (roundedMillions === Math.floor(roundedMillions)) {
        return `UGX ${Math.floor(roundedMillions)}M`;
      }
      return `UGX ${roundedMillions}M`;
    }
    
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

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