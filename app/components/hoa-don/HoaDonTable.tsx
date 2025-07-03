import React, { useState } from 'react';
import { HoaDon, HoaDonGroup } from '../../types/index';
import { formatCurrency } from '../../utils/groupRecords';
import { updateHoaDon, deleteHoaDon } from '../../api/hoaDonApi';
import { UserPlus, X } from 'lucide-react';

interface HoaDonTableProps {
  hoaDonGroups: HoaDonGroup[];
  onReload: () => void;
  fields: { key: keyof HoaDon; label: string; type?: string }[];
  visibleFields: (keyof HoaDon)[];
}

const PAGE_SIZE_OPTIONS = [2, 5, 10, 20]; // Số batch/trang

const HoaDonTable: React.FC<HoaDonTableProps> = ({ hoaDonGroups, onReload, fields, visibleFields }) => {
  // Modal edit state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<HoaDon>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle edit
  const handleEdit = (hoaDon: HoaDon) => {
    setEditId(hoaDon.id);
    setEditData({ ...hoaDon });
    setEditModalOpen(true);
  };

  const handleCancel = () => {
    setEditModalOpen(false);
    setEditId(null);
    setEditData({});
  };

  const handleChange = (field: keyof HoaDon, value: string | boolean) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      await updateHoaDon(editId, editData);
      setEditModalOpen(false);
      setEditId(null);
      setEditData({});
      onReload();
      alert('Cập nhật thành công!');
    } catch (e) {
      alert('Cập nhật thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) return;
    try {
      await deleteHoaDon(id);
      onReload();
      alert('Đã xóa thành công!');
    } catch (e) {
      alert('Xóa thất bại!');
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
        <div className="text-sm text-gray-600">
          Tổng số batch: <b>{hoaDonGroups.length}</b> | Tổng số hóa đơn: <b>{hoaDonGroups.reduce((sum: number, g: HoaDonGroup) => sum + g.records.length, 0)}</b>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Số batch/trang:</span>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={PAGE_SIZE_OPTIONS[0]}
            onChange={e => {
              // setPageSize(Number(e.target.value));
              // setPage(1);
            }}
          >
            {PAGE_SIZE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow border w-full">
        <table className="min-w-[1800px] w-full divide-y divide-gray-200 text-xs md:text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-2 py-2">STT</th>
              {fields.filter(f => visibleFields.includes(f.key)).map(f => (
                <th key={f.key} className="px-2 py-2">{f.label}</th>
              ))}
              <th className="px-2 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {hoaDonGroups.map((group: HoaDonGroup, batchIdx: number) => {
              const hoaDonList = group.records;
              const batchId = group.batch_id;
              const batchTotal = hoaDonList.reduce((sum: number, h: HoaDon) => sum + parseInt(h.tong_so_tien), 0);
              
              // Lấy thông tin tổng hợp của batch
              const uniqueCustomers = new Set(hoaDonList.map(h => h.ten_khach).filter(Boolean));
              const uniquePhones = new Set(hoaDonList.map(h => h.so_dien_thoai).filter(Boolean));
              const uniqueSenders = new Set(hoaDonList.map(h => h.nguoi_gui).filter(Boolean));
              
              return (
                <React.Fragment key={batchId}>
                  <tr className="bg-blue-50">
                    <td colSpan={fields.length + 2} className="px-2 py-2 font-semibold text-blue-800">
                      Batch ID: {batchId} &nbsp;|&nbsp; 
                      Tổng hóa đơn: {hoaDonList.length} &nbsp;|&nbsp; 
                      Tổng kết toán: {formatCurrency(batchTotal)} &nbsp;|&nbsp;
                      Khách: {Array.from(uniqueCustomers).join(', ')} &nbsp;|&nbsp;
                      SĐT: {Array.from(uniquePhones).join(', ')} &nbsp;|&nbsp;
                      Người gửi: {Array.from(uniqueSenders).join(', ')}
                    </td>
                  </tr>
                  {hoaDonList.map((hoaDon: HoaDon, idx: number) => (
                    <tr key={hoaDon.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 text-center">{batchIdx + 1}.{idx + 1}</td>
                      {fields.filter(f => visibleFields.includes(f.key)).map(f => (
                        <td key={f.key} className="px-2 py-2">
                          {f.key === 'so_the' ? (
                            hoaDon[f.key]
                              ? '**** ' + hoaDon[f.key].slice(-4)
                              : ''
                          ) : f.key === 'tong_so_tien' || f.key === 'tien_phi' || f.key === 'ck_ra' || f.key === 'ck_vao' ? (
                            <span className={f.key === 'tong_so_tien' ? 'text-green-700 font-semibold' : f.key === 'tien_phi' ? 'text-red-600' : ''}>
                              {hoaDon[f.key] ? formatCurrency(Number(hoaDon[f.key])) : ''}
                            </span>
                          ) : f.key === 'phan_tram_phi' ? (
                            (() => {
                              const val = hoaDon[f.key];
                              if (typeof val === 'string' && val === '0') return '0%';
                              if (typeof val === 'number' && val === 0) return '0%';
                              if (val) return (Number(val) * 100).toString().replace(/\.0+$/, '') + '%';
                              return '';
                            })()
                          ) : f.key === 'tinh_trang' ? (
                            <div className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                checked={hoaDon[f.key] === 'true'}
                                disabled
                              />
                            </div>
                          ) : f.key === 'ten_khach' ? (
                            <span className="flex items-center gap-1">
                              {hoaDon[f.key] ?? ''}
                              {hoaDon.khach_moi && <UserPlus className="w-4 h-4 text-emerald-500" />}
                            </span>
                          ) : (
                            hoaDon[f.key] ?? ''
                          )}
                        </td>
                      ))}
                      <td className="px-2 py-2 min-w-[120px]">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded mr-2 text-xs"
                          onClick={() => handleEdit(hoaDon)}
                          disabled={loading}
                        >
                          Sửa
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                          onClick={() => handleDelete(hoaDon.id)}
                          disabled={loading}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sửa Hóa Đơn</h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(f => (
                <div key={f.key as string} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {f.label}
                  </label>
                  {f.key === 'tinh_trang' ? (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        checked={editData[f.key] === 'true'}
                        onChange={e => handleChange(f.key, e.target.checked.toString())}
                        disabled={loading}
                      />
                      <span className="ml-2 text-sm text-gray-600">Đã xử lý</span>
                    </div>
                  ) : f.key === 'tong_so_tien' || f.key === 'tien_phi' || f.key === 'ck_ra' || f.key === 'ck_vao' ? (
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editData[f.key] ?? ''}
                      onChange={e => handleChange(f.key, e.target.value)}
                      disabled={loading}
                      placeholder={`Nhập ${f.label.toLowerCase()}`}
                    />
                  ) : f.key === 'ngay_giao_dich' ? (
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editData[f.key] ?? ''}
                      onChange={e => handleChange(f.key, e.target.value)}
                      disabled={loading}
                    />
                  ) : f.key === 'caption_goc' || f.key === 'ly_do' ? (
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      value={typeof editData[f.key] === 'boolean' || editData[f.key] == null ? '' : String(editData[f.key])}
                      onChange={e => handleChange(f.key, e.target.value)}
                      disabled={loading}
                      placeholder={`Nhập ${f.label.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type={f.type || 'text'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={typeof editData[f.key] === 'boolean' || editData[f.key] == null ? '' : String(editData[f.key])}
                      onChange={e => handleChange(f.key, e.target.value)}
                      disabled={loading}
                      placeholder={`Nhập ${f.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                {loading ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoaDonTable; 