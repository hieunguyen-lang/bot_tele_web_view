"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FiHome, FiPieChart, FiUser, FiInfo, FiSettings, FiMenu } from 'react-icons/fi';
import { useState,useEffect } from 'react';
import { apiService } from '../utils/api';
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter()
  
  const { isLoggedIn, loading } = useAuth()
  
  if (loading) {
    // Đang check auth => bạn có thể hiện spinner, hoặc null để tránh UI nhấp nháy
    return null
  }
  const navItems = [
    { name: 'About', path: '/about', icon: <FiInfo className="w-5 h-5" /> },
    { name: 'Register', path: '/register', icon: <FiUser className="w-5 h-5" /> },
  ];
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={onMenuClick}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent1"
              >
                <FiMenu className="h-6 w-6" />
              </button>
              <Link href="/" className="text-xl font-bold text-primary ml-2 md:ml-0">
              Bill<span className="text-accent1">Manager</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems
              .filter(item => !(isLoggedIn && item.name === 'Register'))
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? 'border-accent1 text-accent1'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!isLoggedIn && (
              <>
            <Link href="/login" className="btn-primary mr-4">
              Login
            </Link>
            <Link
              href="/register"
              className="btn-primary"
            >
              Sign up
            </Link>
            </>
            )}
          </div>
          
          {/* Mobile login buttons */}
          <div className="sm:hidden flex items-center space-x-2">
            {!isLoggedIn && (
              <>
                <Link href="/login" className="btn-primary text-sm px-3 py-1">
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-sm px-3 py-1">
                  Sign up
                </Link>
              </>
            )}
          </div>
          
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`${
                pathname === item.path
                  ? 'bg-accent1/10 border-accent1 text-accent1'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium flex items-center`}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 