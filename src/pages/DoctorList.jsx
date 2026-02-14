import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
    FaSearch,
    FaFilter,
    FaUserMd,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaBriefcase,
    FaDollarSign,
    FaTh,
    FaList,
    FaTimes
} from 'react-icons/fa';
import {
    fetchDoctorsStart,
    fetchDoctorsSuccess,
    fetchDoctorsFailure,
    updateFilters,
    clearFilters,
    setSortBy
} from '../redux/slices/doctorSlice';
import doctorService from '../services/doctorService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import FilterPanel from '../components/common/FilterPanel';
import Loader from '../components/common/Loader';

const DoctorList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { doctors, filters, sortBy, loading, error } = useSelector((state) => state.doctors);

    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [showFilters, setShowFilters] = useState(false);

    const specializations = [
        { value: 'cardiology', label: 'Cardiology', count: 12 },
        { value: 'dermatology', label: 'Dermatology', count: 8 },
        { value: 'neurology', label: 'Neurology', count: 6 },
        { value: 'orthopedics', label: 'Orthopedics', count: 10 },
        { value: 'pediatrics', label: 'Pediatrics', count: 15 },
        { value: 'psychiatry', label: 'Psychiatry', count: 7 }
    ];

    const filterConfig = [
        {
            id: 'specialization',
            label: 'Specialization',
            type: 'checkbox',
            options: specializations,
            selected: filters.specialization
        },
        {
            id: 'minExperience',
            label: 'Minimum Experience',
            type: 'range',
            min: 0,
            max: 30,
            step: 1,
            selected: filters.minExperience,
            formatValue: (val) => `${val} years`
        },
        {
            id: 'maxFee',
            label: 'Maximum Consultation Fee',
            type: 'range',
            min: 0,
            max: 5000,
            step: 100,
            selected: filters.maxFee,
            formatValue: (val) => `₹${val}`
        },
        {
            id: 'rating',
            label: 'Minimum Rating',
            type: 'range',
            min: 0,
            max: 5,
            step: 0.5,
            selected: filters.rating,
            formatValue: (val) => `${val} ⭐`
        }
    ];

    useEffect(() => {
        fetchDoctors();
    }, [filters, sortBy]);

    const fetchDoctors = async () => {
        dispatch(fetchDoctorsStart());
        try {
            // Build query params, only include non-empty values
            const queryParams = {};

            if (filters.specialization && filters.specialization.length > 0) {
                queryParams.specialization = filters.specialization.join(',');
            }
            if (filters.minExperience > 0) {
                queryParams.minExperience = filters.minExperience;
            }
            if (filters.maxFee < 5000) {
                queryParams.maxFee = filters.maxFee;
            }
            if (filters.rating > 0) {
                queryParams.rating = filters.rating;
            }
            if (filters.search) {
                queryParams.search = filters.search;
            }
            if (sortBy) {
                queryParams.sortBy = sortBy;
            }

            const response = await doctorService.getDoctors(queryParams);

            // Handle different response formats
            const doctorsData = response.data || response.doctors || response;
            const doctors = Array.isArray(doctorsData) ? doctorsData : [];

            dispatch(fetchDoctorsSuccess({
                doctors: doctors,
                total: response.total || doctors.length
            }));
        } catch (error) {
            console.error('Error fetching doctors:', error);

            // Provide user-friendly error message
            let errorMessage = 'Failed to load doctors. ';

            if (error.response) {
                // Server responded with error
                if (error.response.status === 500) {
                    errorMessage += 'The server encountered an error. Please try again later or contact support.';
                } else if (error.response.status === 404) {
                    errorMessage += 'Doctor service not found. Please check your connection.';
                } else if (error.response.status === 401) {
                    errorMessage += 'Please log in to view doctors.';
                } else {
                    errorMessage += error.response.data?.message || 'Please try again.';
                }
            } else if (error.request) {
                // Request made but no response
                errorMessage += 'Unable to reach the server. Please check your internet connection.';
            } else {
                // Something else happened
                errorMessage += error.message || 'An unexpected error occurred.';
            }

            dispatch(fetchDoctorsFailure(errorMessage));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(updateFilters({ search: searchQuery }));
    };

    const handleFilterChange = (filterId, value) => {
        if (filterId === 'specialization') {
            const currentSelected = filters.specialization || [];
            const newSelected = currentSelected.includes(value)
                ? currentSelected.filter(v => v !== value)
                : [...currentSelected, value];
            dispatch(updateFilters({ specialization: newSelected }));
        } else {
            dispatch(updateFilters({ [filterId]: value }));
        }
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
        setSearchQuery('');
    };

    const handleSortChange = (e) => {
        dispatch(setSortBy(e.target.value));
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
        }
        return stars;
    };

    const DoctorCard = ({ doctor, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Card className="hover:shadow-2xl transition-all duration-300 group h-full">
                <div className={`flex ${viewMode === 'list' ? 'flex-row items-center gap-6' : 'flex-col'}`}>
                    {/* Doctor Image */}
                    <div className={`${viewMode === 'list' ? 'w-32 h-32' : 'w-full h-48'} bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden`}>
                        {doctor.profilePicture ? (
                            <img src={doctor.profilePicture} alt={doctor.firstName} className="w-full h-full object-cover" />
                        ) : (
                            <FaUserMd className="text-primary-600 text-6xl" />
                        )}
                    </div>

                    {/* Doctor Info */}
                    <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-4'}`}>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                            Dr. {doctor.firstName} {doctor.lastName}
                        </h3>
                        <p className="text-primary-600 font-medium mt-1">{doctor.specialization || 'General Physician'}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex gap-1">
                                {renderStars(doctor.rating || 4.5)}
                            </div>
                            <span className="text-sm text-gray-600">
                                ({doctor.reviewCount || 0} reviews)
                            </span>
                        </div>

                        {/* Experience & Fee */}
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <FaBriefcase className="text-primary-600" />
                                <span>{doctor.experienceYears || 0} years exp.</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaDollarSign className="text-green-600" />
                                <span className="font-semibold">₹{doctor.consultationFee || 500}</span>
                            </div>
                        </div>

                        {/* About */}
                        {doctor.about && (
                            <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                                {doctor.about}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 mt-4">
                            <Button
                                variant="primary"
                                size="sm"
                                className="flex-1"
                                onClick={() => navigate(`/doctors/${doctor.id}`)}
                            >
                                View Profile
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => navigate(`/book-appointment/${doctor.id}`)}
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                        Find Your Doctor
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Browse through our network of qualified healthcare professionals
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by doctor name or specialization..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <Button type="submit" variant="primary">
                            Search
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden"
                        >
                            <FaFilter />
                        </Button>
                    </form>
                </motion.div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {doctors.length} doctor{doctors.length !== 1 ? 's' : ''} found
                        </span>
                        {(filters.specialization.length > 0 || filters.search) && (
                            <button
                                onClick={handleClearFilters}
                                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                <FaTimes className="text-xs" />
                                Clear filters
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View Mode Toggle */}
                        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded transition-colors ${viewMode === 'grid'
                                    ? 'bg-white text-primary-600 shadow'
                                    : 'text-gray-600 hover:text-primary-600'
                                    }`}
                            >
                                <FaTh />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded transition-colors ${viewMode === 'list'
                                    ? 'bg-white text-primary-600 shadow'
                                    : 'text-gray-600 hover:text-primary-600'
                                    }`}
                            >
                                <FaList />
                            </button>
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="rating">Highest Rated</option>
                            <option value="experience">Most Experienced</option>
                            <option value="fee_asc">Fee: Low to High</option>
                            <option value="fee_desc">Fee: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`${showFilters ? 'block' : 'hidden'
                            } lg:block w-full lg:w-80 flex-shrink-0`}
                    >
                        <div className="sticky top-4">
                            <FilterPanel
                                filters={filterConfig}
                                onFilterChange={handleFilterChange}
                                onClearFilters={handleClearFilters}
                            />
                        </div>
                    </motion.div>

                    {/* Doctor List */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader />
                            </div>
                        ) : error ? (
                            <Card className="text-center py-12">
                                <p className="text-red-600 font-medium">{error}</p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={fetchDoctors}
                                >
                                    Try Again
                                </Button>
                            </Card>
                        ) : doctors.length === 0 ? (
                            <Card className="text-center py-12">
                                <FaUserMd className="text-gray-400 text-6xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No doctors found
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your filters or search query
                                </p>
                                <Button variant="primary" onClick={handleClearFilters}>
                                    Clear Filters
                                </Button>
                            </Card>
                        ) : (
                            <div
                                className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                                    : 'grid-cols-1'
                                    }`}
                            >
                                {doctors.map((doctor, index) => (
                                    <DoctorCard key={doctor.id} doctor={doctor} index={index} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorList;
