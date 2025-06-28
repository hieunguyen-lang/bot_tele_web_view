import React from 'react';
import { TrendingUp, TrendingDown, Users, FolderOpen } from 'lucide-react';
import { formatCurrency } from '../utils/groupRecords';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: number;
  color: string;
  isCurrency?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color,
  isCurrency = false
}) => {
  const displayValue = isCurrency ? formatCurrency(value) : value.toLocaleString();

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{displayValue}</p>
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trendValue}%
              </span>
            </div>
          )}
        </div>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 