import React, { useState, useEffect } from 'react';
import { Users, FolderOpen, DollarSign, CreditCard } from 'lucide-react';
import { HoaDonGroup } from '../types';
import StatsCard from './StatsCard';
import HoaDonTable from './HoaDonTable';
import { getHoaDonList } from '../api/hoaDonApi';

const Dashboard: React.FC = () => {
  const [hoaDonGroups, setHoaDonGroups] = useState<HoaDonGroup[]>([]);
  const [stats, setStats] = useState({ totalRecords: 0, totalBatches: 0, totalAmount: 0, totalFee: 0 });
  const [loading, setLoading] = useState(false);

  const reloadData = async () => {
    setLoading(true);
    try {
      const data = await getHoaDonList();
      setHoaDonGroups(data.data);
      setStats({
        totalRecords: data.data.reduce((sum, g) => sum + g.records.length, 0),
        totalBatches: data.total,
        totalAmount: data.data.reduce((sum, g) => sum + g.records.reduce((s, h) => s + parseInt(h.tong_so_tien), 0), 0),
        totalFee: data.data.reduce((sum, g) => sum + g.records.reduce((s, h) => s + parseInt(h.tien_phi), 0), 0),
      });
    } catch (e) {
      alert('Không thể tải dữ liệu hóa đơn!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <div className="w-screen px-2 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Hóa Đơn</h1>
          <p className="text-gray-600 mt-2">
            Quản lý và theo dõi hóa đơn giao dịch theo batch
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Tổng Hóa Đơn"
            value={stats.totalRecords}
            icon={<Users className="w-8 h-8" />}
            color="border-blue-500"
          />
          <StatsCard
            title="Tổng Batch"
            value={stats.totalBatches}
            icon={<FolderOpen className="w-8 h-8" />}
            color="border-green-500"
          />
          <StatsCard
            title="Tổng Tiền"
            value={stats.totalAmount}
            icon={<DollarSign className="w-8 h-8" />}
            color="border-emerald-500"
            isCurrency={true}
          />
          <StatsCard
            title="Tổng Phí"
            value={stats.totalFee}
            icon={<CreditCard className="w-8 h-8" />}
            color="border-red-500"
            isCurrency={true}
          />
        </div>

        {/* Table hóa đơn dạng group by batch_id */}
        {loading ? (
          <div className="text-center text-gray-500 py-10 text-lg">Đang tải dữ liệu...</div>
        ) : (
          <HoaDonTable hoaDonGroups={hoaDonGroups} onReload={reloadData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard; 