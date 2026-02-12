import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCalendarAlt, FaUserMd, FaFileMedical, FaSearch } from 'react-icons/fa';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import appointmentService from '../../services/appointmentService';

const PatientDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUpcomingAppointments();
    }, []);

    const fetchUpcomingAppointments = async () => {
        try {
            const appointments = await appointmentService.getPatientAppointments();
            const upcoming = appointments.filter(apt => new Date(apt.appointment_date) >= new Date());
            setUpcomingAppointments(upcoming.slice(0, 3));
        } catch (error) {
            console.error('Error fetching appointments:', error);
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
                        Welcome back, {user?.firstName || 'Patient'}!
                    </h1>
                    <p className="text-gray-600 mt-2">Here's your health overview</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link to="/doctors">
                        <Card className="text-center cursor-pointer hover:scale-105 transition-transform">
                            <FaSearch className="text-primary-600 text-4xl mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900">Find Doctors</h3>
                            <p className="text-gray-600 text-sm mt-2">Search for specialists</p>
                        </Card>
                    </Link>

                    <Link to="/patient/appointments">
                        <Card className="text-center cursor-pointer hover:scale-105 transition-transform">
                            <FaCalendarAlt className="text-primary-600 text-4xl mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900">My Appointments</h3>
                            <p className="text-gray-600 text-sm mt-2">View all appointments</p>
                        </Card>
                    </Link>

                    <Link to="/patient/medical-records">
                        <Card className="text-center cursor-pointer hover:scale-105 transition-transform">
                            <FaFileMedical className="text-primary-600 text-4xl mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900">Medical Records</h3>
                            <p className="text-gray-600 text-sm mt-2">Access your records</p>
                        </Card>
                    </Link>
                </div>

                {/* Upcoming Appointments */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Upcoming Appointments</h2>
                        <Link to="/patient/appointments">
                            <Button variant="outline" size="sm">View All</Button>
                        </Link>
                    </div>

                    {loading ? (
                        <Card>
                            <p className="text-center text-gray-600">Loading appointments...</p>
                        </Card>
                    ) : upcomingAppointments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {upcomingAppointments.map((appointment) => (
                                <Card key={appointment.id}>
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                                <FaUserMd className="text-primary-600 text-xl" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">
                                                Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                                            </h3>
                                            <p className="text-sm text-gray-600">{appointment.doctor?.specialization}</p>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-sm text-gray-700">
                                                    <FaCalendarAlt className="inline mr-1" />
                                                    {new Date(appointment.appointment_date).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    {appointment.start_time} - {appointment.end_time}
                                                </p>
                                            </div>
                                            <div className="mt-3">
                                                <span className={`px-2 py-1 text-xs rounded-full ${appointment.status === 'confirmed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {appointment.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <div className="text-center py-8">
                                <FaCalendarAlt className="text-gray-400 text-5xl mx-auto mb-3" />
                                <p className="text-gray-600 mb-4">No upcoming appointments</p>
                                <Link to="/doctors">
                                    <Button variant="primary">Book an Appointment</Button>
                                </Link>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Health Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Appointments</h3>
                        <p className="text-3xl font-bold text-primary-600">12</p>
                        <p className="text-sm text-gray-600 mt-1">This year</p>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Doctors Visited</h3>
                        <p className="text-3xl font-bold text-primary-600">5</p>
                        <p className="text-sm text-gray-600 mt-1">Different specialists</p>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Records</h3>
                        <p className="text-3xl font-bold text-primary-600">8</p>
                        <p className="text-sm text-gray-600 mt-1">Documents uploaded</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
