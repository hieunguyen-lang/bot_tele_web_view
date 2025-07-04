"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React,{ useState,useEffect  } from 'react';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  FiHome,
  FiPieChart,
  FiBarChart2,
  FiActivity,
  FiUsers,
  FiSettings,
  FiDatabase,
  FiFileText,
  FiLogOut
} from 'react-icons/fi';
import apiService from '../utils/api';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const menuItems = [
    // {
    //   name: 'Facebook', path: '/dashboard',
    //   icon: <FontAwesomeIcon icon={faFacebook} className="text-blue-600 w-5 h-5 mr-2" />,
    //   children: [
    //     { name: 'Group Posts', path: '/dashboard/facebookgroup/posts' },
    //     { name: 'Group Comments', path: '/dashboard/facebookgroup/comments' },
    //     { name: 'List Groups', path: '/dashboard/facebookgroup/listgroups' },
    //   ]
    // },
    { name: 'Hóa đơn', path: '/dashboard/hoa-don', icon: <FiPieChart className="w-5 h-5" /> },
    { name: 'Báo cáo', path: '/dashboard/reports', icon: <FiBarChart2 className="w-5 h-5" /> },
    { name: 'Người dùng', path: '/dashboard/users', icon: <FiUsers className="w-5 h-5" /> },
    { name: 'Dữ liệu', path: '/dashboard/data', icon: <FiDatabase className="w-5 h-5" /> },
    { name: 'Tài liệu', path: '/dashboard/documents', icon: <FiFileText className="w-5 h-5" /> },
  ];

  const bottomMenuItems = [
    { name: 'Settings', path: '/dashboard/settings', icon: <FiSettings className="w-5 h-5" /> },
    { name: 'Logout', path: '/logout', icon: <FiLogOut className="w-5 h-5" /> },
  ];
  // ✅ Auto mở submenu nếu pathname là route con
  // useEffect(() => {
  //   const matchedParent = menuItems.find(item => 
  //     item.children?.some(child => pathname === child.path)
  //   );

  //   if (matchedParent) {
  //     setOpenSubmenu(matchedParent.name);
  //   }
  // }, [pathname]);
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      <div className="h-full flex flex-col justify-between">
        <div className="p-4">
          <div className="py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          </div>
          <nav className="mt-4 space-y-1">
            {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const isOpen = openSubmenu === item.name;

            return (
              <div key={item.name}>
                <button
                  onClick={() => {
                    window.location.href = item.path;
                  }}
                  className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md
                    ${isActive ? 'bg-accent1/10 text-accent1' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <span className={`${isActive ? 'text-accent1' : 'text-gray-500'} mr-3`}>
                    {item.icon}
                  </span>
                  <span className="flex-1 text-left">{item.name}</span>
                 
                </button>

                
              </div>
            );
          })}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <nav className="space-y-1">
            {bottomMenuItems.map((item) =>
              item.name === 'Logout' ? (
                <button
                  key={item.name}
                  onClick={() => {
                    apiService.post('/logout');
                    window.location.href = '/login';
                  }}
                  className={`text-red-500 group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-red-50 hover:text-red-700`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`${pathname === item.path
                    ? 'bg-accent1/10 text-accent1'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
                >
                  <span className={`${pathname === item.path ? 'text-accent1' : 'text-gray-500'} mr-3`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
          </nav>
        </div>
      </div>
      </aside>
    </>
  );
};

export default Sidebar; 