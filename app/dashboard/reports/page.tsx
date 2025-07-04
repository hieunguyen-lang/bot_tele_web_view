"use client";

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FiUsers, FiActivity, FiBarChart2, FiDatabase, FiAlertCircle, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { apiService } from '../../utils/api';
import { Stat, ChartData, TableCommentsData } from '../../types';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import Select from "react-select";
import ReportDashboard from '../../components/reports/ReportDashboard';
import CommissionChart from '../../components/reports/CommissionChart';
import CalendarView from '../../components/reports/CalendarView';

interface OptionType {
  value: number
  label: string
}
const customStylesSelects = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '8px',
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 1px #4F46E5',
      minHeight: '40px',
      '&:hover': {
        borderColor: '#4338CA',
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#EEF2FF',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#4F46E5',
      fontWeight: 600,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#E0E7FF' : 'white',
      color: state.isFocused ? '#4338CA' : 'black',
      cursor: 'pointer',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9CA3AF',
      fontStyle: 'italic',
    }),
  };
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('summary');

  const tabs = [
    {
      id: 'summary',
      label: 'Tổng quan',
      icon: <FiBarChart2 className="w-4 h-4" />,
      component: <ReportDashboard />
    },
    {
      id: 'commission',
      label: 'Hoa hồng',
      icon: <FiDollarSign className="w-4 h-4" />,
      component: <CommissionChart />
    },
    {
      id: 'calendar',
      label: 'Lịch kết toán',
      icon: <FiCalendar className="w-4 h-4" />,
      component: <CalendarView />
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>
    </DashboardLayout>
  );
} 