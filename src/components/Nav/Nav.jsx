import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaChartPie, FaBed, FaClipboardCheck, FaUsers, FaUniversity } from 'react-icons/fa';

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-fit bg-gray-100">
      {/* Top Navigation (Mobile) */}
      <nav className="w-full bg-indigo-600 p-4 text-white shadow-md md:hidden">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </nav>

      {/* Scrollable Navigation Cards at the Top */}
      <div className="overflow-x-auto p-4 md:flex md:flex-wrap md:justify-start md:px-8">
        <div className="flex flex-nowrap gap-4 md:w-full md:max-w-full">
          {/* Navigation Cards */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-white cursor-pointer transform hover:scale-105 md:w-1/5 lg:w-1/5 xl:w-1/5" onClick={() => navigate('/expenses')}>
            <FaMoneyBillWave className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Expenses</h3>
          </div>
          <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-white cursor-pointer transform hover:scale-105 md:w-1/5 lg:w-1/5 xl:w-1/5" onClick={() => navigate('/payments')}>
            <FaChartPie className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Payments</h3>
          </div>
          <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-white cursor-pointer transform hover:scale-105 md:w-1/5 lg:w-1/5 xl:w-1/5" onClick={() => navigate('/DashBord')}>
            <FaClipboardCheck className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Reports</h3>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-white cursor-pointer transform hover:scale-105 md:w-1/5 lg:w-1/5 xl:w-1/5" onClick={() => navigate('/requests')}>
            <FaUsers className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Requests</h3>
          </div>
          <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-white cursor-pointer transform hover:scale-105 md:w-1/5 lg:w-1/5 xl:w-1/5" onClick={() => navigate('/rooms')}>
            <FaBed className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Rooms</h3>
          </div>
          <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-white cursor-pointer transform hover:scale-105 md:w-1/5 lg:w-1/5 xl:w-1/5" onClick={() => navigate('/students')}>
            <FaUniversity className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Students</h3>
          </div>
        </div>
      </div>

      {/* Main Content Placeholder */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* You can add other content here as needed */}
      </main>
    </div>
  );
};

export default Nav;
