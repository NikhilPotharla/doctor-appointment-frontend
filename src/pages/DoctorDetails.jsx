import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
    FaUserMd,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaBriefcase,
    FaDollarSign,
    FaGraduationCap,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaArrowLeft,
    FaCheckCircle
} from 'react-icons/fa';
import { setSelectedDoctor } from '../redux/slices/doctorSlice';
import doctorService from '../services/doctorService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const DoctorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDoctorDetails();
    }, [id]);

    const fetchDoctorDetails = async () => {
        try {
            setLoading(true);
            const response = await doctorService.getDoctorById(id);
            setDoctor(response.data || response);
            dispatch(setSelectedDoctor(response.data || response));
        } catch (err) {
            setError(err.message || 'Failed to load doctor details');
        } finally {
            setLoading(false);
        }
    };

    const handleBookAppointment = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/doctors/${id}` } });
            return;
        }
        navigate(`/book-appointment/${id}`);
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader fullScreen />
            </div>
        );
    }

    if (error || !doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                <Card className="max-w-md text-center">
                    <p className="text-red-600 font-medium mb-4">{error || 'Doctor not found'}</p>
                    <Button variant="primary" onClick={() => navigate('/doctors')}>
                        Back to Doctors
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <Link
                        to="/doctors"
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                        <FaArrowLeft />
                        Back to Doctors
                    </Link>
                </motion.div>

                {/* Doctor Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="mb-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Profile Image */}
                            <div className="w-full md:w-48 h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {doctor.profilePicture ? (
                                    <img
                                        src={doctor.profilePicture}
                                        alt={doctor.firstName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaUserMd className="text-primary-600 text-8xl" />
                                )}
                            </div>

                            {/* Doctor Info */}
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                            Dr. {doctor.firstName} {doctor.lastName}
                                        </h1>
                                        <p className="text-xl text-primary-600 font-medium">
                                            {doctor.specialization || 'General Physician'}
                                        </p>
                                    </div>

                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={handleBookAppointment}
                                        className="shadow-lg"
                                    >
                                        <FaCalendarAlt className="mr-2" />
                                        Book Appointment
                                    </Button>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex gap-1">
                                        {renderStars(doctor.rating || 4.5)}
                                    </div>
                                    <span className="text-lg font-semibold text-gray-900">
                                        {(doctor.rating || 4.5).toFixed(1)}
                                    </span>
                                    <span className="text-gray-600">
                                        ({doctor.reviewCount || 0} reviews)
                                    </span>
                                </div>

                                {/* Quick Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <FaBriefcase className="text-primary-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Experience</p>
                                            <p className="font-semibold">{doctor.experienceYears || 0} years</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <FaDollarSign className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Consultation Fee</p>
                                            <p className="font-semibold text-green-600">₹{doctor.consultationFee || 500}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {doctor.about || `Dr. ${doctor.firstName} ${doctor.lastName} is a highly qualified ${doctor.specialization || 'medical'} professional with ${doctor.experienceYears || 0} years of experience. Dedicated to providing exceptional patient care and staying updated with the latest medical advancements.`}
                                </p>
                            </Card>
                        </motion.div>

                        {/* Qualifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FaGraduationCap className="text-primary-600" />
                                    Qualifications
                                </h2>
                                <ul className="space-y-2">
                                    {doctor.qualification && doctor.qualification.length > 0 ? (
                                        doctor.qualification.map((qual, index) => (
                                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                                <span>{qual}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <FaCheckCircle className="text-green-500 mt-1" />
                                            <span>MBBS</span>
                                        </li>
                                    )}
                                </ul>
                            </Card>
                        </motion.div>

                        {/* License Information */}
                        {doctor.licenseNumber && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Card className="bg-blue-50 border-l-4 border-blue-500">
                                    <div className="flex items-center gap-3">
                                        <FaCheckCircle className="text-blue-600 text-2xl" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Verified License</p>
                                            <p className="text-sm text-gray-600">License No: {doctor.licenseNumber}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Book */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Book Appointment</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Consultation Fee</span>
                                        <span className="text-2xl font-bold text-primary-600">
                                            ₹{doctor.consultationFee || 500}
                                        </span>
                                    </div>
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        onClick={handleBookAppointment}
                                    >
                                        <FaCalendarAlt className="mr-2" />
                                        Book Now
                                    </Button>
                                    <p className="text-xs text-gray-600 text-center">
                                        Available slots will be shown on the next page
                                    </p>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                                <div className="space-y-3 text-sm">
                                    {doctor.phone && (
                                        <div>
                                            <p className="text-gray-600">Phone</p>
                                            <p className="font-medium text-gray-900">{doctor.phone}</p>
                                        </div>
                                    )}
                                    {doctor.email && (
                                        <div>
                                            <p className="text-gray-600">Email</p>
                                            <p className="font-medium text-gray-900">{doctor.email}</p>
                                        </div>
                                    )}
                                    {doctor.location && (
                                        <div>
                                            <p className="text-gray-600 flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-primary-600" />
                                                Location
                                            </p>
                                            <p className="font-medium text-gray-900">{doctor.location}</p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
