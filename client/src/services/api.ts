import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth Services
export const authService = {
    signup: (data: any) => apiClient.post('/auth/signup', data),
    signin: (data: any) => apiClient.post('/auth/signin', data),
    logout: () => apiClient.post('/auth/logout'),
};

// Class Services
export const classService = {
    getClasses: () => apiClient.get('/classes'),
    getClassById: (id: string) => apiClient.get(`/classes/${id}`),
    createClass: (data: any) => apiClient.post('/classes', data),
    updateClass: (id: string, data: any) => apiClient.put(`/classes/${id}`, data),
    deleteClass: (id: string) => apiClient.delete(`/classes/${id}`),
};

// Student Services
export const studentService = {
    getStudents: (classId?: string) => 
        apiClient.get('/students', { params: { classId } }),
    getStudentById: (id: string) => apiClient.get(`/students/${id}`),
    createStudent: (data: any) => apiClient.post('/students', data),
    updateStudent: (id: string, data: any) => apiClient.put(`/students/${id}`, data),
    deleteStudent: (id: string) => apiClient.delete(`/students/${id}`),
    uploadFaceEncoding: (id: string, faceData: any) => 
        apiClient.post(`/students/${id}/face`, faceData),
};

// Attendance Services
export const attendanceService = {
    getAttendance: (classId?: string, date?: string) => 
        apiClient.get('/attendance', { params: { classId, date } }),
    markAttendance: (data: any) => apiClient.post('/attendance', data),
    getStudentAttendance: (studentId: string) => 
        apiClient.get(`/attendance/student/${studentId}`),
};

// Attention Services
export const attentionService = {
    getAttention: (classId?: string, date?: string) => 
        apiClient.get('/attention', { params: { classId, date } }),
    recordAttention: (data: any) => apiClient.post('/attention', data),
    getStudentAttention: (studentId: string) => 
        apiClient.get(`/attention/student/${studentId}`),
};

// Session Services
export const sessionService = {
    initializeSession: (data: any) => apiClient.post('/sessions', data),
    endSession: (id: string) => apiClient.put(`/sessions/${id}/end`, {}),
    getSessions: () => apiClient.get('/sessions'),
};

export default apiClient;