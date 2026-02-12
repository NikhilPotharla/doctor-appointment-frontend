import apiClient from './api';

export const authService = {
    // Patient Registration
    registerPatient: async (userData) => {
        const response = await apiClient.post('/auth/register', { ...userData, role: 'patient' });
        return response.data;
    },

    // Doctor Registration
    registerDoctor: async (doctorData) => {
        const response = await apiClient.post('/auth/register', { ...doctorData, role: 'doctor' });
        return response.data;
    },

    // Login
    login: async (credentials) => {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    },

    // Verify Email
    verifyEmail: async (token) => {
        const response = await apiClient.post('/auth/verify-email', { token });
        return response.data;
    },

    // Forgot Password
    forgotPassword: async (email) => {
        const response = await apiClient.post('/auth/forgot-password', { email });
        return response.data;
    },

    // Reset Password
    resetPassword: async (token, newPassword) => {
        const response = await apiClient.post('/auth/reset-password', { token, newPassword });
        return response.data;
    },

    // Get Current User
    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
};

export default authService;
