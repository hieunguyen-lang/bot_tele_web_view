import React, { useEffect, useState } from 'react';

interface HoaDon {
  thoi_gian: string;
  nguoi_gui: string;
  ten_khach: string;
  so_dien_thoai: string;
  type_dao_rut: string;
  ngan_hang: string;
  ngay_giao_dich: string;
  gio_giao_dich: string;
  tong_so_tien: string;
  so_the: string;
  tid: string;
  mid: string;
  so_lo: string;
  so_hoa_don: string;
  ten_may_pos: string;
  lich_canh_bao: string;
  tien_phi: string;
  batch_id: string;
  caption_goc: string | null;
  ket_toan: string | null;
  phi_pos: string | null;
  phi_thu_khach: string | null;
  ck_khach_rut: string | null;
  tien_ve_tk_cty: string | null;
  tinh_trang: string | null;
  lenh_treo: string | null;
  ly_do: string | null;
  id: number;
}

interface HoaDonGroup {
  batch_id: string;
  records: HoaDon[];
}

const HoaDonTable: React.FC = () => {
  const [data, setData] = useState<HoaDonGroup[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://127.0.0.1:8000/api/hoa-don/');
        const json = await res.json();
        setData(json.data || []);
      } catch (e) {
        alert('Không thể tải dữ liệu hóa đơn!');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Hóa Đơn theo Batch</h1>
      {data.map(group => (
        <div key={group.batch_id} className="mb-8">
          <div className="font-semibold text-blue-700 mb-2">Batch ID: {group.batch_id}</div>
          <table className="min-w-full border mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">STT</th>
                <th className="border px-2 py-1">Thời gian</th>
                <th className="border px-2 py-1">Người gửi</th>
                <th className="border px-2 py-1">Tên khách</th>
                <th className="border px-2 py-1">SĐT</th>
                <th className="border px-2 py-1">Đáo/Rút</th>
                <th className="border px-2 py-1">Ngân hàng</th>
                <th className="border px-2 py-1">Ngày GD</th>
                <th className="border px-2 py-1">Giờ GD</th>
                <th className="border px-2 py-1">Số tiền</th>
                <th className="border px-2 py-1">Số thẻ</th>
                <th className="border px-2 py-1">TID</th>
                <th className="border px-2 py-1">MID</th>
                <th className="border px-2 py-1">Số lô</th>
                <th className="border px-2 py-1">Số hóa đơn</th>
                <th className="border px-2 py-1">Tên POS</th>
                <th className="border px-2 py-1">Lịch cảnh báo</th>
                <th className="border px-2 py-1">Tiền phí</th>
              </tr>
            </thead>
            <tbody>
              {group.records.map((r, idx) => (
                <tr key={r.id}>
                  <td className="border px-2 py-1 text-center">{idx + 1}</td>
                  <td className="border px-2 py-1">{r.thoi_gian}</td>
                  <td className="border px-2 py-1">{r.nguoi_gui}</td>
                  <td className="border px-2 py-1">{r.ten_khach}</td>
                  <td className="border px-2 py-1">{r.so_dien_thoai}</td>
                  <td className="border px-2 py-1">{r.type_dao_rut}</td>
                  <td className="border px-2 py-1">{r.ngan_hang}</td>
                  <td className="border px-2 py-1">{r.ngay_giao_dich}</td>
                  <td className="border px-2 py-1">{r.gio_giao_dich}</td>
                  <td className="border px-2 py-1">{r.tong_so_tien}</td>
                  <td className="border px-2 py-1">{r.so_the}</td>
                  <td className="border px-2 py-1">{r.tid}</td>
                  <td className="border px-2 py-1">{r.mid}</td>
                  <td className="border px-2 py-1">{r.so_lo}</td>
                  <td className="border px-2 py-1">{r.so_hoa_don}</td>
                  <td className="border px-2 py-1">{r.ten_may_pos}</td>
                  <td className="border px-2 py-1">{r.lich_canh_bao}</td>
                  <td className="border px-2 py-1">{r.tien_phi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default HoaDonTable; 