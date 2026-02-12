import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCalendarAlt, FaUsers, FaDollarSign, FaStar } from 'react-icons/fa';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import doctorService from '../../services/doctorService';

const DoctorDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [stats, setStats] = useState({
        totalPatients: 0,
        todayAppointments: 0,
        monthlyEarnings: 0,
        rating: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const appointments = await doctorService.getDoctorAppointments();
            const today = new Date().toDateString();
            const todayApts = appointments.filter(
                apt => new Date(apt.appointment_date).toDateString() === today
            );
            setTodayAppointments(todayApts);

            // Fetch stats (mock data for now)
            setStats({
                totalPatients: 156,
                todayAppointments: todayApts.length,
                monthlyEarnings: 12500,
                rating: 4.8,
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome, Dr. {user?.lastName || 'Doctor'}!
                    </h1>
                    <p className="text-gray-600 mt-2">Here's your practice overview for today</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Today's Appointments</p>
                                <p className="text-3xl font-bold text-primary-600 mt-1">{stats.todayAppointments}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                <FaCalendarAlt className="text-primary-600 text-xl" />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Patients</p>
                                <p className="text-3xl font-bold text-primary-600 mt-1">{stats.totalPatients}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <FaUsers className="text-green-600 text-xl" />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Monthly Earnings</p>
                                <p className="text-3xl font-bold text-primary-600 mt-1">${stats.monthlyEarnings}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <FaDollarSign className="text-yellow-600 text-xl" />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Rating</p>
                                <p className="text-3xl font-bold text-primary-600 mt-1">{stats.rating}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <FaStar className="text-purple-600 text-xl" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link to="/doctor/appointments">
                        <Card className="text-center cursor-pointer hover:scale-105 transition-transform">
                            <FaCalendarAlt className="text-primary-600 text-4xl mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900">Manage Appointments</h3>
                            <p className="text-gray-600 text-sm mt-2">View and update appointments</p>
                        </Card>
                    </Link>

                    <Link to="/doctor/patients">
                        <Card className="text-center cursor-pointer hover:scale-105 transition-transform">
                            <FaUsers className="text-primary-600 text-4xl mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900">Patient Records</h3>
                            <p className="text-gray-600 text-sm mt-2">Access patient history</p>
                        </Card>
                    </Link>

                    <Link to="/doctor/profile">
                        <Card className="text-center cursor-pointer hover:scale-105 transition-transform">
                            <FaStar className="text-primary-600 text-4xl mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900">My Profile</h3>
                            <p className="text-gray-600 text-sm mt-2">Update profile & availability</p>
                        </Card>
                    </Link>
                </div>

                {/* Today's Appointments */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Today's Appointments</h2>
                        <Link to="/doctor/appointments">
                            <Button variant="outline" size="sm">View All</Button>
                        </Link>
                    </div>

                    {loading ? (
                        <Card>
                            <p className="text-center text-gray-600">Loading appointments...</p>
                        </Card>
                    ) : todayAppointments.length > 0 ? (
                        <div className="space-y-4">
                            {todayAppointments.map((appointment) => (
                                <Card key={appointment.id}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-lg font-semibold text-gray-700">
                                                    {appointment.patient?.firstName?.[0]}{appointment.patient?.lastName?.[0]}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {appointment.patient?.firstName} {appointment.patient?.lastName}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {appointment.start_time} - {appointment.end_time}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">{appointment.type} consultation</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-3 py-1 text-sm rounded-full ${appointment.status === 'confirmed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : appointment.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {appointment.status}
                                            </span>
                                            <Button variant="primary" size="sm">View Details</Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <div className="text-center py-8">
                                <FaCalendarAlt className="text-gray-400 text-5xl mx-auto mb-3" />
                                <p className="text-gray-600">No appointments scheduled for today</p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
