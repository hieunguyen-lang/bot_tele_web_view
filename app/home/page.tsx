import Link from 'next/link';
import Navbar from '../components/Navbar';
import { FiBarChart2, FiUser, FiLock, FiDatabase, FiSearch } from 'react-icons/fi';
import { faFacebook, faThreads, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/background.png")' }}>
        <div className="bg-primary bg-opacity-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                GIẢI PHÁP THEO DÕI MẠNG XÃ HỘI
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                 <b>SocialTrack</b> là nền tảng theo dõi mạng xã hội toàn diện, giúp doanh nghiệp giám sát từ khóa, hashtag, phân tích cảm xúc và theo dõi thương hiệu theo thời gian thực. Hỗ trợ Facebook, Threads, YouTube, Instagram và hơn thế nữa.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/dashboard" className="btn-primary">
                  Explore Dashboard
                </Link>
                <Link href="/register" className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100 transition-all inline-block text-center">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <div className="relative w-full max-w-md">
                <div className="bg-accent1/80 absolute -left-4 -top-4 rounded-lg w-full h-full"></div>
                <div className="bg-white p-4 rounded-lg shadow-xl relative z-10">
                  <img 
                    src="/dashboard-preview.png" 
                    alt="Dashboard Preview" 
                    className="rounded-md shadow-sm w-full h-auto"
                    style={{ opacity: 0.9 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tính năng đặc biệt</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our dashboard combines elegant design with powerful functionality to give you the tools you need.
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Sign up today and experience the power of our elegant dashboard solution.
            </p>
            <Link href="/register" className="btn-primary">
              Create an Account
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