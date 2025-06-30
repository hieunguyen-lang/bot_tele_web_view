import { HoaDon } from '../types';

const API_URL = 'http://45.32.104.37:8000/api/hoa-don';

export interface HoaDonGroup {
  batch_id: string;
  records: HoaDon[];
}

export interface HoaDonListResponse {
  total: number;
  data: HoaDonGroup[];
}

// export async function getHoaDonList(skip = 0, limit = 20): Promise<HoaDonListResponse> {
//   const res = await fetch(`${API_URL}?skip=${skip}&limit=${limit}`);
//   if (!res.ok) throw new Error('Lấy danh sách hóa đơn thất bại');
//   const data = await res.json();
//   return { total: data.total, data: data.data };
// }
export const getHoaDonList = async (queryParams?: string) => {
  const url = queryParams 
    ? `${API_URL}/?${queryParams}`
    : API_URL;
    
  const response = await fetch(url);
  return response.json();
};

export async function updateHoaDon(id: number, data: Partial<HoaDon>): Promise<HoaDon> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Cập nhật hóa đơn thất bại');
  return res.json();
}

export async function deleteHoaDon(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Xóa hóa đơn thất bại');
}

export async function createHoaDon(data: Partial<HoaDon>): Promise<HoaDon> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Tạo hóa đơn thất bại');
  return res.json();
} 