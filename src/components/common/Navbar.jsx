import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../redux/slices/authSlice';
import { FaUserMd, FaCalendarAlt, FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Button from './Button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            className="bg-white shadow-md sticky top-0 z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <FaUserMd className="text-primary-600 text-3xl" />
                        </motion.div>
                        <span className="text-2xl font-bold text-primary-600">HealthCare</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {!isAuthenticated ? (
                            <>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to="/doctors"
                                        className={`text-gray-700 hover:text-primary-600 font-medium transition-colors ${isActive('/doctors') ? 'text-primary-600' : ''
                                            }`}
                                    >
                                        Find Doctors
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to="/about"
                                        className={`text-gray-700 hover:text-primary-600 font-medium transition-colors ${isActive('/about') ? 'text-primary-600' : ''
                                            }`}
                                    >
                                        About
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to="/contact"
                                        className={`text-gray-700 hover:text-primary-600 font-medium transition-colors ${isActive('/contact') ? 'text-primary-600' : ''
                                            }`}
                                    >
                                        Contact
                                    </Link>
                                </motion.div>
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
                                    <motion.button
                                        onClick={handleLogout}
                                        className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </motion.button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            {isMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaTimes size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaBars size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden pb-4"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
