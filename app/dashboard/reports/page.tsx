"use client";

import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FiUsers, FiActivity, FiBarChart2, FiDatabase, FiAlertCircle } from 'react-icons/fi';
import { useEffect, useState, useCallback } from 'react';
import { apiService } from '../../utils/api';
import { Stat, ChartData, TableCommentsData } from '../../types';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import Select from "react-select";
import ReportDashboard from '../../components/reports/ReportDashboard';

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
  return (
    <DashboardLayout>
      <ReportDashboard />
    </DashboardLayout>
  );
} 