import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">HealthCare</h3>
                        <p className="text-sm">
                            Your trusted platform for booking doctor appointments online.
                            Connect with qualified healthcare professionals anytime, anywhere.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                            <li><Link to="/doctors" className="hover:text-primary-400 transition-colors">Find Doctors</Link></li>
                            <li><Link to="/specializations" className="hover:text-primary-400 transition-colors">Specializations</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* For Doctors */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">For Doctors</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/doctor/register" className="hover:text-primary-400 transition-colors">Register as Doctor</Link></li>
                            <li><Link to="/doctor/login" className="hover:text-primary-400 transition-colors">Doctor Login</Link></li>
                            <li><Link to="/faq" className="hover:text-primary-400 transition-colors">FAQ</Link></li>
                            <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center space-x-2">
                                <FaMapMarkerAlt className="text-primary-400" />
                                <span>123 Health Street, Medical City</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaPhone className="text-primary-400" />
                                <span>+1 234 567 8900</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaEnvelope className="text-primary-400" />
                                <span>support@healthcare.com</span>
                            </li>
                        </ul>

                        {/* Social Media */}
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} HealthCare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
