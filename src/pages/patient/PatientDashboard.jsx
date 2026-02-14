import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
    FaCalendarAlt,
    FaUserMd,
    FaFileMedical,
    FaSearch,
    FaPrescriptionBottleAlt,
    FaHeartbeat,
    FaBell,
    FaClock,
    FaChartLine,
    FaAmbulance,
    FaCheckCircle,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import appointmentService from '../../services/appointmentService';

const PatientDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalAppointments: 0,
        doctorsVisited: 0,
        medicalRecords: 0,
        loading: true
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const appointments = await appointmentService.getPatientAppointments();
            const upcoming = appointments.filter(apt => new Date(apt.appointment_date) >= new Date());
            setUpcomingAppointments(upcoming.slice(0, 3));

            // Calculate real stats
            const uniqueDoctors = new Set(appointments.map(apt => apt.doctor_id)).size;
            setStats({
                totalAppointments: appointments.length,
                doctorsVisited: uniqueDoctors,
                medicalRecords: appointments.filter(apt => apt.status === 'completed').length,
                loading: false
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setStats({ ...stats, loading: false });
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const quickActions = [
        {
            icon: FaSearch,
            title: 'Find Doctors',
            description: 'Search for specialists',
            link: '/doctors',
            gradient: 'from-blue-500 to-cyan-500',
            iconColor: 'text-blue-600'
        },
        {
            icon: FaCalendarAlt,
            title: 'My Appointments',
            description: 'View all appointments',
            link: '/patient/appointments',
            gradient: 'from-purple-500 to-pink-500',
            iconColor: 'text-purple-600'
        },
        {
            icon: FaFileMedical,
            title: 'Medical Records',
            description: 'Access your records',
            link: '/patient/medical-records',
            gradient: 'from-green-500 to-emerald-500',
            iconColor: 'text-green-600'
        },
        {
            icon: FaAmbulance,
            title: 'Emergency',
            description: 'Urgent consultation',
            link: '/doctors?emergency=true',
            gradient: 'from-red-500 to-orange-500',
            iconColor: 'text-red-600'
        },
        {
            icon: FaPrescriptionBottleAlt,
            title: 'Prescriptions',
            description: 'View prescriptions',
            link: '/patient/prescriptions',
            gradient: 'from-indigo-500 to-blue-500',
            iconColor: 'text-indigo-600'
        },
        {
            icon: FaChartLine,
            title: 'Health Reports',
            description: 'Track your health',
            link: '/patient/health-reports',
            gradient: 'from-yellow-500 to-orange-500',
            iconColor: 'text-yellow-600'
        }
    ];

    const healthInsights = [
        {
            icon: FaHeartbeat,
            title: 'Stay Hydrated',
            description: 'Drink at least 8 glasses of water daily',
            color: 'bg-blue-50 text-blue-700'
        },
        {
            icon: FaCheckCircle,
            title: 'Regular Checkups',
            description: 'Schedule your annual health checkup',
            color: 'bg-green-50 text-green-700'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section with Animation */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                Welcome back, {user?.firstName || 'Patient'}! 👋
                            </h1>
                            <p className="text-gray-600 mt-2 text-lg">Here's your health overview for today</p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/doctors">
                                <Button variant="primary" className="shadow-lg">
                                    <FaUserMd className="inline mr-2" />
                                    Book Appointment
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Health Stats with Real Data */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">Total Appointments</h3>
                                    <FaCalendarAlt className="text-primary-600 text-2xl" />
                                </div>
                                {stats.loading ? (
                                    <div className="animate-pulse">
                                        <div className="h-10 bg-gray-200 rounded w-20 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-4xl font-bold text-primary-600 mb-1">{stats.totalAppointments}</p>
                                        <div className="flex items-center text-sm text-green-600">
                                            <FaArrowUp className="mr-1" />
                                            <span>All time</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">Doctors Visited</h3>
                                    <FaUserMd className="text-purple-600 text-2xl" />
                                </div>
                                {stats.loading ? (
                                    <div className="animate-pulse">
                                        <div className="h-10 bg-gray-200 rounded w-20 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-4xl font-bold text-purple-600 mb-1">{stats.doctorsVisited}</p>
                                        <p className="text-sm text-gray-600">Different specialists</p>
                                    </>
                                )}
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-green-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">Medical Records</h3>
                                    <FaFileMedical className="text-green-600 text-2xl" />
                                </div>
                                {stats.loading ? (
                                    <div className="animate-pulse">
                                        <div className="h-10 bg-gray-200 rounded w-20 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-4xl font-bold text-green-600 mb-1">{stats.medicalRecords}</p>
                                        <p className="text-sm text-gray-600">Completed visits</p>
                                    </>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Quick Actions Grid */}
                <motion.div
                    className="mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to={action.link}>
                                    <Card className="text-center cursor-pointer h-full hover:shadow-xl transition-all duration-300 group">
                                        <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                            <action.icon className="text-white text-2xl" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-1">{action.title}</h3>
                                        <p className="text-xs text-gray-600">{action.description}</p>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upcoming Appointments - Takes 2 columns */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Upcoming Appointments</h2>
                            <Link to="/patient/appointments">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </div>

                        {loading ? (
                            <Card>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="animate-pulse flex space-x-4">
                                            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ) : upcomingAppointments.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingAppointments.map((appointment, index) => (
                                    <motion.div
                                        key={appointment.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="hover:shadow-xl transition-all duration-300 group">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                        <FaUserMd className="text-primary-600 text-2xl" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 text-lg">
                                                                Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                                                            </h3>
                                                            <p className="text-sm text-gray-600">{appointment.doctor?.specialization}</p>
                                                        </div>
                                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${appointment.status === 'confirmed'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {appointment.status}
                                                        </span>
                                                    </div>
                                                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-700">
                                                        <div className="flex items-center">
                                                            <FaCalendarAlt className="mr-2 text-primary-600" />
                                                            {new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FaClock className="mr-2 text-primary-600" />
                                                            {appointment.start_time} - {appointment.end_time}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                                <div className="text-center py-12">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 1
                                        }}
                                    >
                                        <FaCalendarAlt className="text-gray-400 text-6xl mx-auto mb-4" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No upcoming appointments</h3>
                                    <p className="text-gray-600 mb-6">Book an appointment with our specialists</p>
                                    <Link to="/doctors">
                                        <Button variant="primary" className="shadow-lg">
                                            <FaSearch className="inline mr-2" />
                                            Find Doctors
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        )}
                    </motion.div>

                    {/* Health Insights Sidebar */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Insights</h2>
                        <div className="space-y-4">
                            {healthInsights.map((insight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                >
                                    <Card className={`${insight.color} border-l-4 border-current hover:shadow-lg transition-shadow duration-300`}>
                                        <div className="flex items-start space-x-3">
                                            <insight.icon className="text-2xl mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-semibold mb-1">{insight.title}</h3>
                                                <p className="text-sm opacity-90">{insight.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}

                            {/* Notifications */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-500">
                                    <div className="flex items-start space-x-3">
                                        <FaBell className="text-yellow-600 text-2xl mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-yellow-900 mb-1">Reminder</h3>
                                            <p className="text-sm text-yellow-800">
                                                {upcomingAppointments.length > 0
                                                    ? `You have ${upcomingAppointments.length} upcoming appointment${upcomingAppointments.length > 1 ? 's' : ''}`
                                                    : 'Stay healthy! Schedule your next checkup'}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
