import apiClient from './api';

export const doctorService = {
    // Get all doctors with filters
    getDoctors: async (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        const response = await apiClient.get(`/doctors?${params}`);
        return response.data;
    },

    // Get doctor by ID
    getDoctorById: async (id) => {
        const response = await apiClient.get(`/doctors/${id}`);
        return response.data;
    },

    // Get doctor profile
    getDoctorProfile: async () => {
        const response = await apiClient.get('/doctors/profile');
        return response.data;
    },

    // Update doctor profile
    updateDoctorProfile: async (profileData) => {
        const response = await apiClient.put('/doctors/profile', profileData);
        return response.data;
    },

    // Get doctor appointments
    getDoctorAppointments: async () => {
        const response = await apiClient.get('/doctors/appointments');
        return response.data;
    },

    // Update appointment status
    updateAppointmentStatus: async (appointmentId, status) => {
        const response = await apiClient.put(`/doctors/appointments/${appointmentId}`, { status });
        return response.data;
    },

    // Set availability
    setAvailability: async (availabilityData) => {
        const response = await apiClient.post('/doctors/availability', availabilityData);
        return response.data;
    },

    // Get earnings
    getEarnings: async (period = 'month') => {
        const response = await apiClient.get(`/doctors/earnings?period=${period}`);
        return response.data;
    },

    // Search doctors with filters
    searchDoctors: async (query, filters = {}) => {
        const params = new URLSearchParams({ search: query, ...filters }).toString();
        const response = await apiClient.get(`/doctors?${params}`);
        return response.data;
    },

    // Get doctor availability for a specific date
    getDoctorAvailability: async (doctorId, date) => {
        const response = await apiClient.get(`/doctors/${doctorId}/availability?date=${date}`);
        return response.data;
    },

    // Get doctor reviews
    getDoctorReviews: async (doctorId) => {
        const response = await apiClient.get(`/doctors/${doctorId}/reviews`);
        return response.data;
    },
};

export default doctorService;
