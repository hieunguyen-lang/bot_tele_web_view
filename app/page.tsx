"use client";
import Link from 'next/link';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { FiBarChart2, FiUser, FiLock, FiDatabase, FiSearch } from 'react-icons/fi';
import { faFacebook, faThreads, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mockPosts } from './components/mockdata/postcardlist';
import PostCardList from './components/PostCardList';
import { TablePostData } from './types';
export default function Home() {
  const features = [
    {
      title: 'Facebook',
      description: 'Theo dõi các group page,nhận cảnh báo theo từ khóa',
      icon: <FontAwesomeIcon icon={faFacebook} className="text-gray-900 w-8 h-8 mr-2" />,
    },
    {
      title: 'Threads',
      description: 'Comprehensive tools to manage and track user activity.',
      icon: <FontAwesomeIcon icon={faThreads} className="text-gray-900 w-8 h-8 mr-2" />,
    },
    {
      title: 'Instagram',
      description: 'Enterprise-grade security measures to protect your data.',
      icon: <FontAwesomeIcon icon={faInstagram} className="text-gray-900 w-8 h-8 mr-2" />,
    },
    {
      title: 'Data Collection',
      description: 'Easily collect and organize data from multiple sources.',
      icon: <FiDatabase className="h-8 w-8" />,
    },
    {
      title: 'Intelligent Search',
      description: 'Find what you need quickly with our powerful search engine.',
      icon: <FiSearch className="h-8 w-8" />,
    },
  ];
  const [tableData, setTableData] = useState<TablePostData[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const handleSearch = e => {
    e.preventDefault();
    fetchNextPage()
  };
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const fetchNextPage = async () => { 
      try {
            const response = mockPosts;
            
            if (Array.isArray(response)) {
              const processed = response.map((post: any) => ({
                posturl: post.post_url,
                name: post.name,
                content: post.content,
                content_created: post.content_created,
                created_at: post.created_at,
                hours_diff: post.hours_diff,
                reaction_count: post.reaction_count,
                comment_count: post.comment_count,
                share_count: post.share_count,
                image_url: post.image_url,
                type: post.type,
              }));
              console.log(processed)
              setTableData(prev => [...prev, ...processed]);
              
            }
      } catch (error) {
            console.error("Error fetching next page:", error);
      } finally {
            setIsFetchingMore(false);
      }
  };
  return (
     <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Emphasized Search */}
      <section className="relative bg-gradient-to-br from-primary to-accent1 text-white py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6">Tìm kiếm mạng xã hội theo thời gian thực</h1>
          <p className="text-xl mb-8 text-white/80">Dùng thử công cụ tìm kiếm tích hợp AI thông minh tìm kiếm khách hàng tiềm năng từ Facebook, Threads, Instagram và hơn thế nữa.</p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="text"
              placeholder="Nhập từ khóa..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full sm:w-2/3 px-4 py-3 text-gray-800 rounded-lg focus:outline-none"
            />
            <button type="submit" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100">
              <FiSearch className="inline w-5 h-5 mr-1" /> Tìm kiếm
            </button>
          </form> 
        </div>
        <div className='py-24'>
        {/* Thay vì map trực tiếp PostCard, bạn dùng PostCardList */}
          <PostCardList 
                  posts={tableData}
                  fetchNextPage={fetchNextPage}
                  hasMore={false} 
        />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tính năng đặc biệt</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dashboard hiện đại tích hợp khả năng theo dõi mạng xã hội mạnh mẽ và trực quan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-all border-t-4 border-accent1">
                <div className="text-accent1 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sẵn sàng để bắt đầu?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Đăng ký ngay và trải nghiệm nền tảng theo dõi mạng xã hội mạnh mẽ.
            </p>
            <Link href="/register" className="btn-primary">
              Tạo tài khoản
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-primary">Elegant<span className="text-accent1">Dashboard</span></span>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ElegantDashboard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 