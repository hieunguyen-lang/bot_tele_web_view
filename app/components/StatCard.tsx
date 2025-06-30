"use client";

import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  color?: 'primary' | 'accent1' | 'accent2' | 'accent3';
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  change,
  color = 'primary' 
}: StatCardProps) => {
  const colorClasses = {
    primary: 'text-primary',
    accent1: 'text-accent1',
    accent2: 'text-accent2',
    accent3: 'text-accent3'
  };

  const bgColorClasses = {
    primary: 'bg-primary/10',
    accent1: 'bg-accent1/10',
    accent2: 'bg-accent2/10',
    accent3: 'bg-accent3/10'
  };

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          {change && (
            <div className="mt-1 flex items-center">
              <span className={`text-sm font-medium ${change.isPositive ? 'text-green-500' : 'text-accent3'}`}>
                {change.isPositive ? '+' : ''}{change.value}
              </span>
              <span className="ml-1 text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-2 rounded-full ${bgColorClasses[color]}`}>
          <span className={colorClasses[color]}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard; 