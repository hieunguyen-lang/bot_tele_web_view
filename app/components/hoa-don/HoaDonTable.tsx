import React, { useState } from 'react';
import { HoaDon, HoaDonGroup } from '../../types/index';
import { formatCurrency } from '../../utils/groupRecords';
import { updateHoaDon, deleteHoaDon } from '../../api/hoaDonApi';

interface HoaDonTableProps {
  hoaDonGroups: HoaDonGroup[];
  onReload: () => void;
}

const PAGE_SIZE_OPTIONS = [2, 5, 10, 20]; // Số batch/trang

const HoaDonTable: React.FC<HoaDonTableProps> = ({ hoaDonGroups, onReload }) => {
  // Pagination state (theo batch)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalPages = Math.ceil(hoaDonGroups.length / pageSize);

  // Lấy batch cho trang hiện tại
  const pagedGroups = hoaDonGroups.slice((page - 1) * pageSize, page * pageSize);

  // Inline edit state
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<HoaDon>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // Handle edit
  const handleEdit = (hoaDon: HoaDon) => {
    setEditId(hoaDon.id);
    setEditData({ ...hoaDon });
  };
  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };
  const handleChange = (field: keyof HoaDon, value: string | boolean) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };
  const handleSave = async (id: number) => {
    setLoadingId(id);
    try {
      await updateHoaDon(id, editData);
      setEditId(null);
      setEditData({});
      onReload();
      alert('Cập nhật thành công!');
    } catch (e) {
      alert('Cập nhật thất bại!');
    } finally {
      setLoadingId(null);
    }
  };
  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) return;
    setLoadingId(id);
    try {
      await deleteHoaDon(id);
      onReload();
      alert('Đã xóa thành công!');
    } catch (e) {
      alert('Xóa thất bại!');
    } finally {
      setLoadingId(null);
    }
  };

  // List các trường cần hiển thị/sửa
  const fields: { key: keyof HoaDon; label: string; type?: string }[] = [
    { key: 'ngay_giao_dich', label: 'NGÀY' },
    { key: 'nguoi_gui', label: 'NGƯỜI GỬI' },
    { key: 'ten_khach', label: 'HỌ VÀ TÊN KHÁCH' },
    { key: 'so_dien_thoai', label: 'SĐT KHÁCH' },
    { key: 'type_dao_rut', label: 'ĐÁO / RÚT' },
    { key: 'tong_so_tien', label: 'SỐ TIỀN', type: 'number' },
    { key: 'ket_toan', label: 'KẾT TOÁN' },
    { key: 'so_the', label: 'SỐ THẺ ĐÁO / RÚT' },
    { key: 'tid', label: 'TID' },
    { key: 'so_lo', label: 'SỐ LÔ' },
    { key: 'so_hoa_don', label: 'SỐ HÓA ĐƠN' },
    { key: 'gio_giao_dich', label: 'GIỜ GIAO DỊCH' },
    { key: 'ten_may_pos', label: 'TÊN POS' },
    { key: 'tien_phi', label: 'PHÍ DV', type: 'number' },
    { key: 'phi_thu_khach', label: 'PHÍ Dịch VỤ', type: 'number' },
    { key: 'ck_khach_rut', label: 'CK KHÁCH RÚT'},
    { key: 'tinh_trang', label: 'TÌNH TRẠNG' },
    { key: 'dia_chi', label: 'ĐỊA CHỈ' },
    { key: 'stk_khach', label: 'STK KHÁCH' },
    { key: 'lenh_treo', label: 'LỆNH TREO' },
    { key: 'ly_do', label: 'LÝ DO' },
  ];

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
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow border w-full">
        <table className="min-w-[1800px] w-full divide-y divide-gray-200 text-xs md:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2">STT</th>
              <th className="px-2 py-2">Batch ID</th>
              {fields.map(f => (
                <th key={f.key} className="px-2 py-2">{f.label}</th>
              ))}
              <th className="px-2 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pagedGroups.map((group: HoaDonGroup, batchIdx: number) => {
              const hoaDonList = group.records;
              const batchId = group.batch_id;
              const batchTotal = hoaDonList.reduce((sum: number, h: HoaDon) => sum + parseInt(h.tong_so_tien), 0);
              return (
                <React.Fragment key={batchId}>
                  <tr className="bg-blue-50">
                    <td colSpan={fields.length + 3} className="px-2 py-2 font-semibold text-blue-800">
                      Batch ID: {batchId} &nbsp;|&nbsp; Tổng hóa đơn: {hoaDonList.length} &nbsp;|&nbsp; Tổng kết toán: {formatCurrency(batchTotal)}
                    </td>
                  </tr>
                  {hoaDonList.map((hoaDon: HoaDon, idx: number) => {
                    const isEditing = editId === hoaDon.id;
                    return (
                      <tr key={hoaDon.id} className="hover:bg-gray-50">
                        <td className="px-2 py-2 text-center">{(page - 1) * pageSize + batchIdx + 1}.{idx + 1}</td>
                        <td className="px-2 py-2 text-blue-700 font-semibold">{batchId}</td>
                        {fields.map(f => (
                          <td key={f.key} className="px-2 py-2">
                            {isEditing ? (
                              f.key === 'tinh_trang' ? (
                                <div className="flex items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    checked={editData[f.key] === 'true'}
                                    onChange={e => handleChange(f.key, e.target.checked.toString())}
                                    disabled={loadingId === hoaDon.id}
                                  />
                                </div>
                              ) : (
                                <input
                                  className="border rounded px-1 py-0.5 w-full text-xs"
                                  type={f.type || 'text'}
                                  value={editData[f.key] ?? ''}
                                  onChange={e => handleChange(f.key, e.target.value)}
                                  disabled={loadingId === hoaDon.id}
                                />
                              )
                            ) : f.key === 'tong_so_tien' || f.key === 'tien_phi' || f.key === 'phi_pos' || f.key === 'phi_thu_khach' || f.key === 'ck_khach_rut' || f.key === 'tien_ve_tk_cty' ? (
                              <span className={f.key === 'tong_so_tien' ? 'text-green-700 font-semibold' : f.key === 'tien_phi' ? 'text-red-600' : ''}>
                                {hoaDon[f.key] ? formatCurrency(Number(hoaDon[f.key])) : ''}
                              </span>
                            ) : f.key === 'tinh_trang' ? (
                              <div className="flex items-center justify-center">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                  checked={hoaDon[f.key] === 'true'}
                                  disabled
                                />
                              </div>
                            ) : (
                              hoaDon[f.key] ?? ''
                            )}
                          </td>
                        ))}
                        <td className="px-2 py-2 min-w-[120px]">
                          {isEditing ? (
                            <>
                              <button
                                className="px-2 py-1 bg-green-500 text-white rounded mr-2 text-xs"
                                onClick={() => handleSave(hoaDon.id)}
                                disabled={loadingId === hoaDon.id}
                              >
                                {loadingId === hoaDon.id ? 'Đang lưu...' : 'Lưu'}
                              </button>
                              <button
                                className="px-2 py-1 bg-gray-300 text-gray-800 rounded text-xs"
                                onClick={handleCancel}
                                disabled={loadingId === hoaDon.id}
                              >
                                Hủy
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="px-2 py-1 bg-blue-500 text-white rounded mr-2 text-xs"
                                onClick={() => handleEdit(hoaDon)}
                                disabled={loadingId !== null}
                              >
                                Sửa
                              </button>
                              <button
                                className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                                onClick={() => handleDelete(hoaDon.id)}
                                disabled={loadingId !== null}
                              >
                                Xóa
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Trang <b>{page}</b> / <b>{totalPages}</b>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Trước
          </button>
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default HoaDonTable; 