import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctors: [],
    selectedDoctor: null,
    filters: {
        specialization: [],
        minExperience: 0,
        maxFee: 10000,
        rating: 0,
        search: ''
    },
    sortBy: 'rating', // rating, experience, fee_asc, fee_desc
    loading: false,
    error: null,
    totalDoctors: 0,
    currentPage: 1,
    pageSize: 12
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
            state.doctors = action.payload.doctors || action.payload;
            state.totalDoctors = action.payload.total || (action.payload.doctors?.length || action.payload.length);
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
            state.currentPage = 1; // Reset to first page when filters change
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
            state.currentPage = 1;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        clearDoctors: (state) => {
            state.doctors = [];
            state.selectedDoctor = null;
            state.totalDoctors = 0;
        }
    },
});

export const {
    fetchDoctorsStart,
    fetchDoctorsSuccess,
    fetchDoctorsFailure,
    setSelectedDoctor,
    updateFilters,
    clearFilters,
    setSortBy,
    setCurrentPage,
    clearDoctors
} = doctorSlice.actions;

export default doctorSlice.reducer;
