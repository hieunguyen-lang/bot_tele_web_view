import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('../Chart'), { ssr: false });
import { getReportSummary } from '../../api/reportApi';

const TYPE_OPTIONS = [
  { value: 'hour', label: 'Giờ' },
  { value: 'day', label: 'Ngày' },
  { value: 'week', label: 'Tuần' },
  { value: 'month', label: 'Tháng' },
  { value: 'year', label: 'Năm' },
];

const today = new Date().toISOString().slice(0, 10);
const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const ReportDashboard: React.FC = () => {
  const [type, setType] = useState<'hour'|'day'|'week'|'month'|'year'>('day');
  const [from, setFrom] = useState(lastMonth);
  const [to, setTo] = useState(today);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getReportSummary(type, from, to);
      setData(res);
    } catch (e: any) {
      setError(e.message || 'Lỗi lấy dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Chuẩn bị data cho biểu đồ chứng khoán (line chart)
  const chartData = {
    labels: data.map((d) => d.period),
    datasets: [
      {
        label: 'Tổng tiền',
        data: data.map((d) => d.total_amount),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: 'Tổng phí',
        data: data.map((d) => d.total_fee),
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: 'Số batch',
        data: data.map((d) => d.total_batches),
        borderColor: 'rgba(245, 158, 11, 1)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: 'Số hóa đơn',
        data: data.map((d) => d.total_invoices),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Báo cáo tổng hợp (dạng chứng khoán)' },
      zoom: {
        pan: { enabled: true, mode: 'x' as const },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' as const }
      }
    },
    scales: {
      y: { beginAtZero: true },
      x: {},
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Loại thống kê</label>
          <select
            className="border rounded px-2 py-1"
            value={type}
            onChange={e => setType(e.target.value as any)}
          >
            {TYPE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Từ ngày</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Đến ngày</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={fetchData}
          disabled={loading}
        >
          Xem báo cáo
        </button>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="h-96">
        <Chart data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ReportDashboard; 