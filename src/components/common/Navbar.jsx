import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FaUserMd, FaCalendarAlt, FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Button from './Button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <FaUserMd className="text-primary-600 text-3xl" />
                        <span className="text-2xl font-bold text-primary-600">HealthCare</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/doctors" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                    Find Doctors
                                </Link>
                                <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                    About
                                </Link>
                                <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                    Contact
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" size="sm">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" size="sm">Sign Up</Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                {role === 'patient' && (
                                    <>
                                        <Link to="/patient/dashboard" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                            Dashboard
                                        </Link>
                                        <Link to="/patient/appointments" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                            My Appointments
                                        </Link>
                                        <Link to="/doctors" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                            Find Doctors
                                        </Link>
                                    </>
                                )}
                                {role === 'doctor' && (
                                    <>
                                        <Link to="/doctor/dashboard" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                            Dashboard
                                        </Link>
                                        <Link to="/doctor/appointments" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                            Appointments
                                        </Link>
                                        <Link to="/doctor/patients" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                            Patients
                                        </Link>
                                    </>
                                )}
                                <div className="flex items-center space-x-3">
                                    <Link to={`/${role}/profile`} className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                                        <FaUser />
                                        <span className="font-medium">{user?.firstName || 'Profile'}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                                    >
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        {!isAuthenticated ? (
                            <div className="flex flex-col space-y-3">
                                <Link to="/doctors" className="text-gray-700 hover:text-primary-600 font-medium">
                                    Find Doctors
                                </Link>
                                <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium">
                                    About
                                </Link>
                                <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium">
                                    Contact
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" size="sm" className="w-full">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-3">
                                <Link to={`/${role}/dashboard`} className="text-gray-700 hover:text-primary-600 font-medium">
                                    Dashboard
                                </Link>
                                <Link to={`/${role}/profile`} className="text-gray-700 hover:text-primary-600 font-medium">
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-600 hover:text-red-700 text-left font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
