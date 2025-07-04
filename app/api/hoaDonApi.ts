import { HoaDon } from '../types';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : '/api';

const API_URL = `${API_BASE_URL}/hoa-don`;

export interface HoaDonGroup {
  batch_id: string;
  records: HoaDon[];
}

export interface HoaDonListResponse {
  total: number;
  data: HoaDonGroup[];
}


export const getHoaDonList = async (queryParams?: string) => {
  const url = queryParams 
    ? `${API_URL}/?${queryParams}`
    : API_URL;
    
  const response = await fetch(url, {
    credentials: 'include', // ✅ Thêm dòng này để gửi cookie
  });
  if (!response.ok) throw new Error('Lấy danh sách hóa đơn thất bại');
  return response.json();
};

// Thêm function để lấy thống kê tổng hợp
export const getHoaDonStats = async () => {
  const response = await fetch(`${API_URL}/stats`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Lấy thống kê hóa đơn thất bại');
  return response.json();
};

export async function updateHoaDon(id: number, data: Partial<HoaDon>): Promise<HoaDon> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    credentials: 'include', // ✅
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Cập nhật hóa đơn thất bại');
  return res.json();
}


export async function deleteHoaDon(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include', // ✅
  });
  if (!res.ok) throw new Error('Xóa hóa đơn thất bại');
}

export const createHoaDon = async (hoaDonData: Partial<HoaDon>) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(hoaDonData),
  });
  if (!response.ok) {
    if (response.status === 422) {
      const errorData = await response.json();
      throw { status: 422, detail: errorData.detail };
    }
    throw new Error('Tạo hóa đơn thất bại');
  }
  return response.json();
};

export const exportHoaDonExcel = async (queryParams?: string) => {
  const url = queryParams
    ? `${API_URL}/export-excel?${queryParams}`
    : `${API_URL}/export-excel`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Xuất Excel thất bại');
  return response.blob();
};

