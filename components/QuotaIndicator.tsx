
import React from 'react';
import { MAX_MONTHLY_CALLS } from '../constants';

interface QuotaIndicatorProps {
  count: number;
}

const QuotaIndicator: React.FC<QuotaIndicatorProps> = ({ count }) => {
  const remaining = Math.max(0, MAX_MONTHLY_CALLS - count);
  const percentage = (count / MAX_MONTHLY_CALLS) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs mb-1 font-medium opacity-80" style={{ color: 'var(--text-secondary)' }}>
        <span>Abonnement : {count} / {MAX_MONTHLY_CALLS} appels ce mois</span>
        <span>{remaining} restants</span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
        <div 
          className="h-full transition-all duration-500 ease-out"
          style={{ 
            width: `${Math.min(100, percentage)}%`, 
            backgroundColor: count >= MAX_MONTHLY_CALLS ? '#f87171' : 'var(--text-secondary)' 
          }}
        />
      </div>
    </div>
  );
};

export default QuotaIndicator;
