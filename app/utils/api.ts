import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:8000';
const TOKEN_KEY = 'access_token';
// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ Cho phép gửi cookie HttpOnly
  headers: {
    'Content-Type': 'application/json',
    credentials: 'include'
  },
});

// Optional: interceptor response nếu muốn xử lý 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'; // hoặc xử lý khác
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Authentication
  login: '/token',
  register: '/api/user/create_user',
  logout: '/auth/logout',
  
  // Dashboard data
  getpostsStats: '/api/face_book/search_post',
  getcommentsStats: '/api/face_book/search_comments',
  getgroups: '/api/face_book/search_group',
  addgroups: '/api/face_book/add_new_group',
  
  analyticsData: '/analytics/data',
  performanceMetrics: '/performance/metrics',
  users: '/users',
  
  // Reports
  reports: '/reports',
  generateReport: '/reports/generate',
};

// API methods
export const apiService = {
  // Get methods
  get: (url: string, params = {}) => api.get(url, { params }),
  
  // Post methods
  post: (url: string, data = {}) => api.post(url, data),
  
  // Put methods
  put: (url: string, data = {}) => api.put(url, data),
  
  // Delete methods
  delete: (url: string) => api.delete(url),
  
  // Authentication methods
  login: (credentials: { email: string; password: string }) => 
    api.post(
      endpoints.login, 
      credentials,
      {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        
      },
      withCredentials: true
    }
    ),
  
  register: (userData: { username: string; email: string; password: string }) => 
    api.post(endpoints.register, userData),
  
  logout: () => api.post(endpoints.logout),
  
  // Dashboard methods
  getpostsStats: async (params: any) => {
  const res = await api.post(endpoints.getpostsStats, params, { withCredentials: true });
  return res.data;
  },
  getcommentsStats: async (params: any) => {
  const res = await api.post(endpoints.getcommentsStats, params, { withCredentials: true });
  return res.data;
  },
  getgroups: async (params: any) => {
  const res = await api.post(endpoints.getgroups, params, { withCredentials: true });
  return res.data;
  },
  addgroups: async (params: any) => {
  const res = await api.post(endpoints.addgroups, params, { withCredentials: true });
  return res.data;
  },
  getAnalyticsData: (params = {}) => api.get(endpoints.analyticsData, { params }),
  getPerformanceMetrics: (params = {}) => api.get(endpoints.performanceMetrics, { params }),
  
  // User methods
  getUsers: (params = {}) => api.get(endpoints.users, { params }),
  createUser: (userData: any) => api.post(endpoints.users, userData),
  updateUser: (id: string, userData: any) => api.put(`${endpoints.users}/${id}`, userData),
  deleteUser: (id: string) => api.delete(`${endpoints.users}/${id}`),
  
  // Report methods
  getReports: (params = {}) => api.get(endpoints.reports, { params }),
  generateReport: (reportConfig: any) => api.post(endpoints.generateReport, reportConfig),
};

export default apiService; 