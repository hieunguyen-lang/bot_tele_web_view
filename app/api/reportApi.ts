const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : '/api';

const API_URL = `${API_BASE_URL}/report`;


export async function getReportSummary(type: 'day'|'week'|'month'|'year', from: string, to: string, include?: string) {
  let url = `${API_URL}/summary?type=${type}&from=${from}&to=${to}`;
  if (include) {
    url += `&include=${encodeURIComponent(include)}`;
  }
  const res = await fetch(url, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Lỗi lấy báo cáo');
  return res.json();
} 