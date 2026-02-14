import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCalendarAlt,
    FaUserMd,
    FaClock,
    FaSearch,
    FaTimes,
    FaEye,
    FaEdit,
    FaCheckCircle,
    FaHourglassHalf,
    FaBan
} from 'react-icons/fa';
import appointmentService from '../../services/appointmentService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const PatientAppointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, past, cancelled
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    useEffect(() => {
        filterAppointments();
    }, [activeTab, appointments, searchQuery]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await appointmentService.getPatientAppointments();
            setAppointments(response.data || response || []);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterAppointments = () => {
        let filtered = [...appointments];
        const now = new Date();

        // Filter by tab
        if (activeTab === 'upcoming') {
            filtered = filtered.filter(apt => {
                const aptDate = new Date(apt.appointment_date);
                return aptDate >= now && apt.status !== 'cancelled';
            });
        } else if (activeTab === 'past') {
            filtered = filtered.filter(apt => {
                const aptDate = new Date(apt.appointment_date);
                return aptDate < now || apt.status === 'completed';
            });
        } else if (activeTab === 'cancelled') {
            filtered = filtered.filter(apt => apt.status === 'cancelled');
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(apt => {
                const doctorName = `${apt.doctor?.firstName} ${apt.doctor?.lastName}`.toLowerCase();
                const specialization = apt.doctor?.specialization?.toLowerCase() || '';
                const query = searchQuery.toLowerCase();
                return doctorName.includes(query) || specialization.includes(query);
            });
        }

        setFilteredAppointments(filtered);
    };

    const handleCancelAppointment = async (appointmentId) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) {
            return;
        }

        try {
            await appointmentService.cancelAppointment(appointmentId);
            fetchAppointments(); // Refresh the list
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            alert('Failed to cancel appointment. Please try again.');
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: FaHourglassHalf, label: 'Pending' },
            confirmed: { color: 'bg-blue-100 text-blue-800', icon: FaCheckCircle, label: 'Confirmed' },
            completed: { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, label: 'Completed' },
            cancelled: { color: 'bg-red-100 text-red-800', icon: FaBan, label: 'Cancelled' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
                <Icon className="text-xs" />
                {config.label}
            </span>
        );
    };

    const tabs = [
        { id: 'upcoming', label: 'Upcoming', count: appointments.filter(apt => new Date(apt.appointment_date) >= new Date() && apt.status !== 'cancelled').length },
        { id: 'past', label: 'Past', count: appointments.filter(apt => new Date(apt.appointment_date) < new Date() || apt.status === 'completed').length },
        { id: 'cancelled', label: 'Cancelled', count: appointments.filter(apt => apt.status === 'cancelled').length }
    ];

    const AppointmentCard = ({ appointment, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Card className="hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Doctor Info */}
                    <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FaUserMd className="text-primary-600 text-2xl" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                                    </h3>
                                    <p className="text-primary-600 text-sm font-medium">
                                        {appointment.doctor?.specialization || 'General Physician'}
                                    </p>
                                </div>
                                {getStatusBadge(appointment.status)}
                            </div>

                            {/* Date & Time */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-3">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-primary-600" />
                                    <span>
                                        {new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-primary-600" />
                                    <span>{appointment.start_time} - {appointment.end_time}</span>
                                </div>
                            </div>

                            {/* Reason */}
                            {appointment.reason && (
                                <p className="text-sm text-gray-600 mb-3">
                                    <span className="font-semibold">Reason:</span> {appointment.reason}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/doctors/${appointment.doctor?.id}`)}
                                >
                                    <FaEye className="mr-1" />
                                    View Doctor
                                </Button>

                                {activeTab === 'upcoming' && appointment.status !== 'cancelled' && (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleCancelAppointment(appointment.id)}
                                            className="text-red-600 border-red-300 hover:bg-red-50"
                                        >
                                            <FaTimes className="mr-1" />
                                            Cancel
                                        </Button>
                                    </>
                                )}
                            </div>
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
                        My Appointments
                    </h1>
                    <p className="text-gray-600 text-lg">
                        View and manage all your appointments
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by doctor name or specialization..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="flex gap-2 border-b border-gray-200">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${activeTab === tab.id
                                        ? 'border-primary-600 text-primary-600'
                                        : 'border-transparent text-gray-600 hover:text-primary-600'
                                    }`}
                            >
                                {tab.label}
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id
                                        ? 'bg-primary-100 text-primary-600'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Appointments List */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader />
                        </div>
                    ) : filteredAppointments.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <Card className="text-center py-12">
                                <FaCalendarAlt className="text-gray-400 text-6xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No {activeTab} appointments
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {activeTab === 'upcoming'
                                        ? "You don't have any upcoming appointments. Book one now!"
                                        : `You don't have any ${activeTab} appointments.`
                                    }
                                </p>
                                {activeTab === 'upcoming' && (
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate('/doctors')}
                                    >
                                        <FaSearch className="mr-2" />
                                        Find Doctors
                                    </Button>
                                )}
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            {filteredAppointments.map((appointment, index) => (
                                <AppointmentCard
                                    key={appointment.id}
                                    appointment={appointment}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PatientAppointments;
