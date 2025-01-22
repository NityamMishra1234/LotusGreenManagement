import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginOwner } from '../../RTK/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
const OwnerLogin = () => {
    const dispatch = useDispatch();
    const { owner ,loading, error } = useSelector(state => state.auth);
    
    const navigate = useNavigate();
    useEffect(() => {
        if (owner) {
            navigate('/DashBord');
        }
    }, [owner, navigate]);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting credentials:', credentials);
        try {
            await dispatch(loginOwner(credentials)).unwrap();
            console.log('Login successful');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-6">Sign in to your PG management dashboard</p>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                               type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                               type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
                    </div>
                    <button type="submit" 
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300" 
                            disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">Don't have an account? <a href="/signup" className="text-blue-500 font-medium">Sign up</a></p>
            </div>
        </div>
    );
};

export default OwnerLogin;
