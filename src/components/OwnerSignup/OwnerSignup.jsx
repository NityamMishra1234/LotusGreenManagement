import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerOwner } from '../../RTK/Slices/authSlice';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaBuilding, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const OwnerSignup = () => {
    const dispatch = useDispatch();

    const {token, loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        pgName: '',
        pgAddress: '',
        pgCapacity: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerOwner(formData));
    };

    const fields = [
        { name: 'name', label: 'Full Name', icon: <FaUser /> },
        { name: 'email', label: 'Email', icon: <FaEnvelope /> },
        { name: 'phone', label: 'Phone Number', icon: <FaPhone /> },
        { name: 'password', label: 'Password', icon: <FaLock /> },
        { name: 'pgName', label: 'PG Name', icon: <FaBuilding /> },
        { name: 'pgAddress', label: 'PG Address', icon: <FaMapMarkerAlt /> },
        { name: 'pgCapacity', label: 'PG Capacity', icon: <FaUsers /> },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg transform transition duration-300 hover:scale-105">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Owner Registration</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {fields.map((field, index) => (
                        <div key={index} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                {field.icon}
                            </div>
                            <input
                                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
                                type={field.name === 'password' ? 'password' : field.name === 'pgCapacity' ? 'number' : 'text'}
                                name={field.name}
                                placeholder={field.label}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OwnerSignup;
