import apiClient from './api';

export const appointmentService = {
    // Get all appointments for patient
    getPatientAppointments: async () => {
        const response = await apiClient.get('/patients/appointments');
        return response.data;
    },

    // Book appointment
    bookAppointment: async (appointmentData) => {
        const response = await apiClient.post('/appointments', appointmentData);
        return response.data;
    },

    // Get appointment by ID
    getAppointmentById: async (id) => {
        const response = await apiClient.get(`/appointments/${id}`);
        return response.data;
    },

    // Update appointment
    updateAppointment: async (id, updateData) => {
        const response = await apiClient.put(`/appointments/${id}`, updateData);
        return response.data;
    },

    // Cancel appointment
    cancelAppointment: async (id) => {
        const response = await apiClient.delete(`/appointments/${id}`);
        return response.data;
    },

    // Reschedule appointment
    rescheduleAppointment: async (id, newDateTime) => {
        const response = await apiClient.put(`/appointments/${id}`, {
            appointment_date: newDateTime.date,
            start_time: newDateTime.startTime,
            end_time: newDateTime.endTime,
        });
        return response.data;
    },
};

export default appointmentService;
