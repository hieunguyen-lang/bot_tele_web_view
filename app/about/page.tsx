import React from 'react';
import { FiTarget, FiCpu, FiBarChart2, FiFolder, FiSettings, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';
import Navbar from '../components/Navbar';
export default function About() {
  const features = [
    {
      title: 'Nhận diện thông minh',
      description: 'Trích xuất dữ liệu hóa đơn từ ảnh với độ chính xác cao nhờ AI, giảm thiểu sai sót thủ công.',
      icon: <FiCpu className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'Tổng hợp & Tính phí tự động',
      description: 'Tự động tổng hợp hoa hồng, tính phí, phân nhóm Đáo/Rút, cảnh báo lệnh treo, thống kê doanh số.',
      icon: <FiBarChart2 className="h-8 w-8 text-green-600" />,
    },
    {
      title: 'Lưu trữ tập trung',
      description: 'Kết nối Google Sheet, MySQL, tạo Dashboard báo cáo chi tiết, truy xuất dữ liệu mọi lúc mọi nơi.',
      icon: <FiFolder className="h-8 w-8 text-purple-600" />,
    },
    {
      title: 'Tích hợp linh hoạt',
      description: 'Dễ dàng sử dụng qua bot Telegram, không cần cài đặt phần mềm phức tạp, mở rộng linh hoạt.',
      icon: <FiSettings className="h-8 w-8 text-orange-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-600 py-16 md:py-24" style={{ backgroundImage: 'url("/background.png")' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span role="img" aria-label="invoice">🧾</span> Trợ Lý Hóa Đơn
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Nền tảng quản lý hóa đơn thế hệ mới – tự động, chính xác, minh bạch và dễ sử dụng cho doanh nghiệp, cá nhân, nhóm tài chính.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tính năng nổi bật</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi giúp bạn xử lý hóa đơn nhanh chóng, tổng hợp thông minh, lưu trữ an toàn và tích hợp linh hoạt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 flex items-start gap-4 hover:shadow-lg transition">
                <div>{f.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-2">
              <FiTarget className="h-8 w-8 text-blue-700" /> Sứ mệnh
            </h2>
            <p className="text-lg text-gray-700">
              Mang lại giải pháp quản lý hóa đơn thông minh, minh bạch và hiệu quả, hỗ trợ doanh nghiệp và cá nhân ra quyết định tài chính chính xác – ngay cả khi không có đội ngũ kế toán chuyên sâu.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 text-center text-blue-900 font-medium">
            Chúng tôi cam kết xây dựng một công cụ đơn giản – nhưng mạnh mẽ, giúp bạn giảm áp lực thủ công, tăng hiệu suất quản lý tài chính, và dễ dàng mở rộng hệ thống khi quy mô tăng trưởng.
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-2">
              <span role="img" aria-label="contact">💬</span> Liên hệ với chúng tôi
            </h2>
            <p className="text-gray-700 text-lg">
              Đội ngũ Trợ Lý Hóa Đơn luôn sẵn sàng hỗ trợ bạn!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
            <div className="flex items-center gap-3 justify-center">
              <FiPhone className="h-6 w-6 text-blue-600" />
              <span>Hotline: <a href="tel:0356600737" className="text-blue-700 hover:underline font-semibold">0356 600 737</a></span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <FiMail className="h-6 w-6 text-blue-600" />
              <span>Email: <a href="mailto:hieu0356600737@gmail.com" className="text-blue-700 hover:underline font-semibold">hieu0356600737@gmail.com</a></span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <FiGlobe className="h-6 w-6 text-blue-600" />
              <span>Website: <a href="https://tralyhoadon.vn" className="text-blue-700 hover:underline font-semibold">tralyhoadon.vn</a></span>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>

  );
} 