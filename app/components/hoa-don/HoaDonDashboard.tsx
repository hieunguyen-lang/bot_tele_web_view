import React, { useState, useEffect } from 'react';
import { Users, FolderOpen, DollarSign, CreditCard } from 'lucide-react';
import { HoaDonGroup } from '../../types/index';
import StatsCard from './StatsCard';
import HoaDonTable from './HoaDonTable';
import { getHoaDonList } from '../../api/hoaDonApi';

interface Filters {
  so_hoa_don: string;
  so_lo: string;
  tid: string;
  mid: string;
  nguoi_gui: string;
  ten_khach: string;
  so_dien_thoai: string;
  ngay_giao_dich: string;
}

const PAGE_SIZE_OPTIONS = [50, 100, 200, 500];

const HoaDonDashboard: React.FC = () => {
  const [hoaDonGroups, setHoaDonGroups] = useState<HoaDonGroup[]>([]);
  const [stats, setStats] = useState({ totalRecords: 0, totalBatches: 0, totalAmount: 0, totalFee: 0 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    so_hoa_don: '',
    so_lo: '',
    tid: '',
    mid: '',
    nguoi_gui: '',
    ten_khach: '',
    so_dien_thoai: '',
    ngay_giao_dich: ''
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const reloadData = async (filterParams?: Filters, pageParam?: number, pageSizeParam?: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterParams) {
        Object.entries(filterParams).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
      }
      params.append('page', String(pageParam || page));
      params.append('page_size', String(pageSizeParam || pageSize));
      const data = await getHoaDonList(params.toString());
      setHoaDonGroups(data.data);
      setStats({
        totalRecords: data.data.reduce((sum: number, g: HoaDonGroup) => sum + g.records.length, 0),
        totalBatches: data.total,
        totalAmount: data.data.reduce((sum: number, g: HoaDonGroup) => sum + g.records.reduce((s: number, h: any) => s + parseInt(h.tong_so_tien), 0), 0),
        totalFee: data.data.reduce((sum: number, g: HoaDonGroup) => sum + g.records.reduce((s: number, h: any) => s + parseInt(h.tien_phi), 0), 0),
      });
      setTotalPages(Math.ceil(data.total / (pageSizeParam || pageSize)));
    } catch (e) {
      alert('Không thể tải dữ liệu hóa đơn!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadData(filters, page, pageSize);
    // eslint-disable-next-line
  }, [filters, page, pageSize]);

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPage(1); // Reset page về 1 khi filter thay đổi
  };

  const clearFilters = () => {
    setFilters({
      so_hoa_don: '',
      so_lo: '',
      tid: '',
      mid: '',
      nguoi_gui: '',
      ten_khach: '',
      so_dien_thoai: '',
      ngay_giao_dich: ''
    });
    setPage(1);
  };

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

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Bộ lọc</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số hóa đơn</label>
              <input
                type="text"
                value={filters.so_hoa_don}
                onChange={(e) => handleFilterChange('so_hoa_don', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số hóa đơn..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số lô</label>
              <input
                type="text"
                value={filters.so_lo}
                onChange={(e) => handleFilterChange('so_lo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số lô..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TID</label>
              <input
                type="text"
                value={filters.tid}
                onChange={(e) => handleFilterChange('tid', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập TID..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MID</label>
              <input
                type="text"
                value={filters.mid}
                onChange={(e) => handleFilterChange('mid', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập MID..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Người gửi</label>
              <input
                type="text"
                value={filters.nguoi_gui}
                onChange={(e) => handleFilterChange('nguoi_gui', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập người gửi..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách</label>
              <input
                type="text"
                value={filters.ten_khach}
                onChange={(e) => handleFilterChange('ten_khach', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên khách..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="text"
                value={filters.so_dien_thoai}
                onChange={(e) => handleFilterChange('so_dien_thoai', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số điện thoại..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày giao dịch</label>
              <input
                type="date"
                value={filters.ngay_giao_dich}
                onChange={(e) => handleFilterChange('ngay_giao_dich', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>

        {/* Table hóa đơn dạng group by batch_id */}
        {loading ? (
          <div className="text-center text-gray-500 py-10 text-lg">Đang tải dữ liệu...</div>
        ) : (
          <>
            <HoaDonTable 
              hoaDonGroups={hoaDonGroups} 
              onReload={() => reloadData(filters, page, pageSize)} 
            />
            {/* Pagination UI */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <span className="text-sm">Trang:</span>
                <button
                  className="px-2 py-1 border rounded disabled:opacity-50"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Trước
                </button>
                <span className="font-semibold text-blue-700">{page}</span>
                <button
                  className="px-2 py-1 border rounded disabled:opacity-50"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Sau
                </button>
                <span className="text-sm ml-4">Số dòng/trang:</span>
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  {PAGE_SIZE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-gray-600">
                Tổng số batch: <b>{stats.totalBatches}</b>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HoaDonDashboard; 