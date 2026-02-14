import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../redux/slices/authSlice';
import { FaUserMd, FaCalendarAlt, FaUser, FaBars, FaTimes, FaSignOutAlt, FaChevronDown, FaHome, FaInfoCircle, FaEnvelope, FaSearch } from 'react-icons/fa';
import Button from './Button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { isAuthenticated, user, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        setShowUserMenu(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = !isAuthenticated ? [
        { path: '/', label: 'Home', icon: FaHome },
        { path: '/doctors', label: 'Find Doctors', icon: FaSearch },
        { path: '/about', label: 'About', icon: FaInfoCircle },
        { path: '/contact', label: 'Contact', icon: FaEnvelope }
    ] : [];

    const patientLinks = [
        { path: '/patient/dashboard', label: 'Dashboard' },
        { path: '/patient/appointments', label: 'My Appointments' },
        { path: '/doctors', label: 'Find Doctors' }
    ];

    const doctorLinks = [
        { path: '/doctor/dashboard', label: 'Dashboard' },
        { path: '/doctor/appointments', label: 'Appointments' },
        { path: '/doctor/patients', label: 'Patients' }
    ];

    return (
        <motion.nav
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/80 backdrop-blur-lg shadow-lg'
                    : 'bg-white shadow-md'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                                <FaUserMd className="text-white text-xl" />
                            </div>
                        </motion.div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            HealthCare
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {!isAuthenticated ? (
                            <>
                                {navLinks.map((link) => (
                                    <motion.div
                                        key={link.path}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${isActive(link.path)
                                                    ? 'text-primary-600 bg-primary-50'
                                                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                                                }`}
                                        >
                                            <link.icon className="text-sm" />
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <div className="flex items-center gap-2 ml-4">
                                    <Link to="/login">
                                        <Button variant="outline" size="sm">Login</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="primary" size="sm" className="shadow-lg">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                {role === 'patient' && patientLinks.map((link) => (
                                    <motion.div
                                        key={link.path}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive(link.path)
                                                    ? 'text-primary-600 bg-primary-50'
                                                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                {role === 'doctor' && doctorLinks.map((link) => (
                                    <motion.div
                                        key={link.path}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive(link.path)
                                                    ? 'text-primary-600 bg-primary-50'
                                                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* User Menu */}
                                <div className="relative ml-4">
                                    <motion.button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 hover:border-primary-300 transition-all"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                                            <FaUser className="text-white text-sm" />
                                        </div>
                                        <span className="font-medium text-gray-900">{user?.firstName || 'User'}</span>
                                        <motion.div
                                            animate={{ rotate: showUserMenu ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FaChevronDown className="text-gray-600 text-sm" />
                                        </motion.div>
                                    </motion.button>

                                    <AnimatePresence>
                                        {showUserMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                                            >
                                                <Link
                                                    to={`/${role}/profile`}
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors"
                                                >
                                                    <FaUser className="text-primary-600" />
                                                    <span className="font-medium text-gray-900">Profile</span>
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                                                >
                                                    <FaSignOutAlt />
                                                    <span className="font-medium">Logout</span>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none p-2"
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
                            className="md:hidden pb-4 border-t border-gray-100 mt-2"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {!isAuthenticated ? (
                                <div className="flex flex-col space-y-2 pt-4">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${isActive(link.path)
                                                        ? 'text-primary-600 bg-primary-50'
                                                        : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                                                    }`}
                                            >
                                                <link.icon />
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                    <div className="flex flex-col gap-2 pt-2">
                                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                            <Button variant="outline" size="sm" className="w-full">Login</Button>
                                        </Link>
                                        <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                            <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-2 pt-4">
                                    {/* User Info */}
                                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                                            <FaUser className="text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{user?.firstName || 'User'}</p>
                                            <p className="text-xs text-gray-600 capitalize">{role}</p>
                                        </div>
                                    </div>

                                    {role === 'patient' && patientLinks.map((link, index) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`block px-4 py-3 rounded-lg font-medium transition-all ${isActive(link.path)
                                                        ? 'text-primary-600 bg-primary-50'
                                                        : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    {role === 'doctor' && doctorLinks.map((link, index) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`block px-4 py-3 rounded-lg font-medium transition-all ${isActive(link.path)
                                                        ? 'text-primary-600 bg-primary-50'
                                                        : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    <Link
                                        to={`/${role}/profile`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all"
                                    >
                                        <FaUser />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-all text-left"
                                    >
                                        <FaSignOutAlt />
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

