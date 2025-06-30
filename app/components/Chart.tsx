"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  type: 'line' | 'bar';
  data: ChartData<'line' | 'bar'>;
  options?: ChartOptions<'line' | 'bar'>;
  title?: string;
  className?: string;
}

const Chart = ({ type, data, options, title, className = '' }: ChartProps) => {
  const defaultOptions: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: !!title,
        text: title || '',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className={`card h-80 ${className}`}>
      {type === 'line' ? (
        <Line data={data} options={mergedOptions} />
      ) : (
        <Bar data={data} options={mergedOptions} />
      )}
    </div>
  );
};

export default Chart; 