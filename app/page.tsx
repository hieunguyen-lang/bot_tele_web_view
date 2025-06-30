"use client";
import Link from 'next/link';
import Navbar from './components/Navbar';
import { FiPhone, FiMail, FiMapPin, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function Home() {
  const services = [
    {
      title: 'Đáo hạn thẻ tín dụng',
      description: 'Hỗ trợ đáo hạn thẻ tín dụng nhanh chóng, an toàn, lãi suất ưu đãi.',
      icon: <FiCheckCircle className="h-8 w-8 text-accent1" />,
    },
    {
      title: 'Vay vốn nhanh',
      description: 'Giải ngân trong ngày, thủ tục đơn giản, không cần thế chấp.',
      icon: <FiCheckCircle className="h-8 w-8 text-accent1" />,
    },
    {
      title: 'Tư vấn tài chính',
      description: 'Đội ngũ chuyên gia tư vấn tận tâm, giải pháp tối ưu cho từng khách hàng.',
      icon: <FiCheckCircle className="h-8 w-8 text-accent1" />,
    },
    {
      title: 'Đáo hạn khoản vay',
      description: 'Gia hạn khoản vay, hỗ trợ khách hàng không bị phạt quá hạn.',
      icon: <FiCheckCircle className="h-8 w-8 text-accent1" />,
    },
    {
      title: 'Thanh toán hộ',
      description: 'Thanh toán hộ các khoản vay, hóa đơn, phí dịch vụ tài chính.',
      icon: <FiCheckCircle className="h-8 w-8 text-accent1" />,
    },
    {
      title: 'Hỗ trợ nợ xấu',
      description: 'Tư vấn và hỗ trợ xử lý nợ xấu, cải thiện điểm tín dụng.',
      icon: <FiCheckCircle className="h-8 w-8 text-accent1" />,
    },
  ];
  const benefits = [
    'Thủ tục đơn giản, giải ngân nhanh trong ngày',
    'Lãi suất cạnh tranh, minh bạch',
    'Bảo mật thông tin tuyệt đối',
    'Đội ngũ tư vấn chuyên nghiệp, tận tâm',
    'Hỗ trợ khách hàng 24/7',
    'Hệ thống đối tác ngân hàng uy tín',
  ];
  const steps = [
    'Đăng ký thông tin tư vấn trực tuyến hoặc gọi hotline',
    'Nhận tư vấn và báo giá chi tiết từ chuyên viên',
    'Chuẩn bị hồ sơ theo hướng dẫn',
    'Ký hợp đồng và nhận giải ngân/vay/đáo hạn',
  ];
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent1 text-white py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6">Dịch vụ Đáo Hạn & Tài Chính Uy Tín</h1>
          <p className="text-xl mb-8 text-white/80">Giải pháp tài chính nhanh chóng, an toàn, hỗ trợ đáo hạn thẻ tín dụng, vay vốn, tư vấn tài chính chuyên nghiệp. Đăng ký ngay để được tư vấn miễn phí!</p>
          <Link href="/register" className="bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 inline-block text-lg shadow-lg transition-all">
            Đăng ký tư vấn miễn phí <FiArrowRight className="inline w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
      {/* Dịch vụ nổi bật */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dịch vụ nổi bật</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cung cấp đa dạng dịch vụ tài chính, đáp ứng mọi nhu cầu đáo hạn, vay vốn, tư vấn tài chính cho cá nhân và doanh nghiệp.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card hover:shadow-lg transition-all border-t-4 border-accent1 p-6 bg-white rounded-lg">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Lợi ích khách hàng */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Lợi ích khi chọn chúng tôi</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center text-lg text-gray-700">
                <FiCheckCircle className="text-accent1 mr-3" /> {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Quy trình đăng ký/vay */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Quy trình đăng ký/vay vốn</h2>
          <ol className="list-decimal pl-6 space-y-4 text-lg text-gray-700">
            {steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-accent1 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bạn cần hỗ trợ tài chính gấp?</h2>
          <p className="text-lg mb-8">Liên hệ ngay với chúng tôi để được tư vấn và giải pháp tài chính phù hợp nhất!</p>
          <Link href="/register" className="bg-white text-accent1 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 inline-block text-lg shadow-lg transition-all">
            Đăng ký tư vấn ngay <FiArrowRight className="inline w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
      {/* Thông tin liên hệ */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Thông tin liên hệ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700 text-lg">
            <div className="flex items-center"><FiPhone className="mr-3 text-accent1" /> Hotline: <a href="tel:0909123456" className="ml-2 text-primary font-semibold">0909 123 456</a></div>
            <div className="flex items-center"><FiMail className="mr-3 text-accent1" /> Email: <a href="mailto:contact@taichinhdaorut.vn" className="ml-2 text-primary font-semibold">contact@taichinhdaorut.vn</a></div>
            <div className="flex items-center"><FiMapPin className="mr-3 text-accent1" /> Địa chỉ: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM</div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-primary">Tài Chính<span className="text-accent1">Đáo Rút</span></span>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">Giới thiệu</Link>
              <Link href="/services" className="text-gray-600 hover:text-gray-900">Dịch vụ</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Liên hệ</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Tài Chính Đáo Rút. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 