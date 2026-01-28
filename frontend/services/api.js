// API Service Layer
import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH ENDPOINTS ============

export const authAPI = {
  signup: (email, full_name, password) =>
    api.post('/auth/signup', { email, full_name, password }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

// ============ PROFILE ENDPOINTS ============

export const profileAPI = {
  getProfile: () => api.get('/profile'),
  
  createProfile: (profileData) =>
    api.post('/profile', profileData),
  
  updateProfile: (profileData) =>
    api.put('/profile', profileData),
};

// ============ UNIVERSITY ENDPOINTS ============

export const universitiesAPI = {
  getUniversities: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.country) params.append('country', filters.country);
    if (filters.category) params.append('category', filters.category);
    if (filters.max_tuition) params.append('max_tuition', filters.max_tuition);
    
    return api.get('/universities', { params });
  },
  
  shortlistUniversity: (universityId) =>
    api.post(`/universities/${universityId}/shortlist`),
  
  lockUniversity: (universityId) =>
    api.post(`/universities/${universityId}/lock`),
  
  unlockUniversity: (universityId) =>
    api.delete(`/universities/${universityId}/unlock`),
};

// ============ TODO ENDPOINTS ============

export const todosAPI = {
  getTodos: () => api.get('/todos'),
  
  createTodo: (todoData) =>
    api.post('/todos', todoData),
  
  updateTodo: (todoId, completed) =>
    api.patch(`/todos/${todoId}`, { completed }),
};

// ============ CHAT ENDPOINTS ============

export const chatAPI = {
  sendMessage: (message) =>
    api.post('/chat', { message }),
};

// ============ DASHBOARD ENDPOINTS ============

export const dashboardAPI = {
  getDashboard: () => api.get('/dashboard'),
};

// ============ ERROR HANDLING ============

export const handleAPIError = (error) => {
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  if (error.response?.status === 400) {
    return 'Invalid input. Please check your data.';
  }
  if (error.response?.status === 401) {
    return 'Unauthorized. Please login again.';
  }
  if (error.response?.status === 404) {
    return 'Resource not found.';
  }
  if (error.response?.status === 500) {
    return 'Server error. Please try again later.';
  }
  return error.message || 'An error occurred. Please try again.';
};

export default api;
