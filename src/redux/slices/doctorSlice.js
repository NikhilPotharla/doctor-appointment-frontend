import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctors: [],
    selectedDoctor: null,
    filters: {
        specialization: '',
        location: '',
        availability: '',
        rating: 0,
        maxFee: null,
    },
    loading: false,
    error: null,
};

const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        fetchDoctorsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDoctorsSuccess: (state, action) => {
            state.loading = false;
            state.doctors = action.payload;
        },
        fetchDoctorsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setSelectedDoctor: (state, action) => {
            state.selectedDoctor = action.payload;
        },
        updateFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
    },
});

export const {
    fetchDoctorsStart,
    fetchDoctorsSuccess,
    fetchDoctorsFailure,
    setSelectedDoctor,
    updateFilters,
    clearFilters,
} = doctorSlice.actions;

export default doctorSlice.reducer;
