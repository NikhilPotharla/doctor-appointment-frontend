import apiClient from './api';

export const authService = {
    // Patient Registration
    registerPatient: async (userData) => {
        const response = await apiClient.post('/auth/register', { 
            ...userData, 
            role: 'PATIENT' // Backend expects uppercase
        });
        
        // Save token and user data if registration is successful
        if (response.data.success && response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        
        return response.data;
    },

    // Doctor Registration (Now automatic with user registration)
    registerDoctor: async (doctorData) => {
        // Single step registration - doctor profile is created automatically
        const response = await apiClient.post('/auth/register', { 
            email: doctorData.email,
            password: doctorData.password,
            firstName: doctorData.firstName,
            lastName: doctorData.lastName,
            phone: doctorData.phone,
            role: 'DOCTOR', // Backend expects uppercase
            // Doctor-specific fields
            specializationId: doctorData.specialization?.toLowerCase() || 'general-medicine',
            qualification: [doctorData.qualification || 'MBBS'],
            experienceYears: parseInt(doctorData.experienceYears) || 0,
            licenseNumber: doctorData.licenseNumber,
            consultationFee: parseFloat(doctorData.consultationFee) || 500,
            about: doctorData.about || `${doctorData.specialization || 'General'} practitioner with ${doctorData.experienceYears || 0} years of experience`,
        });
        
        // Save token and user data if registration is successful
        if (response.data.success && response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        
        return response.data;
    },

    // Login (works for both patients and doctors)
    login: async (credentials) => {
        const response = await apiClient.post('/auth/login', credentials);
        
        // Save token and user data if login is successful
        if (response.data.success && response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        
        return response.data.data; // Return { user, token }
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
        const response = await apiClient.post('/auth/reset-password', { 
            token, 
            newPassword 
        });
        return response.data;
    },

    // Get Current User
    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data.data; // Return the user object
    },

    // Logout
    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
};

export default authService;