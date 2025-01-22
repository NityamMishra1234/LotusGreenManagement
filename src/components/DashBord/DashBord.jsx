import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchRevenueReport,
  fetchFinancialReport,
  fetchOccupancyReport,
  fetchRequestsReport,
} from '../../RTK/Slices/reportSlice';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, DoughnutController } from 'chart.js';
import { FaMoneyBillWave, FaChartPie, FaBed, FaClipboardCheck, FaUsers, FaUniversity } from 'react-icons/fa';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, DoughnutController);

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { revenue, requests, financial, occupancy, loading, error } = useSelector((state) => state.report);
  
  useEffect(() => {
    dispatch(fetchRevenueReport());
    dispatch(fetchFinancialReport());
    dispatch(fetchOccupancyReport());
    dispatch(fetchRequestsReport());
  }, [dispatch]);

  const revenueData = {
    labels: revenue?.map((item) => `Month ${item._id}`),
    datasets: [
      {
        label: 'Revenue',
        data: revenue?.map((item) => item.totalRevenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const financialData = {
    labels: ['Total Income', 'Total Expenses', 'Net Profit'],
    datasets: [
      {
        data: [
          financial?.totalIncome || 0,
          financial?.totalExpenses || 0,
          financial?.netProfit || 0,
        ],
        backgroundColor: ['#36A2EB', '#FF6384', '#4BC0C0'],
      },
    ],
  };

  const occupancyData = {
    labels: ['Occupied Rooms', 'Available Rooms'],
    datasets: [
      {
        data: [occupancy?.occupiedRooms || 0, occupancy?.availableRooms || 0],
        backgroundColor: ['#FFCE56', '#FF6384'],
      },
    ],
  };

  const requestData = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        data: [
          requests?.pendingRequests || 0,
          requests?.inProgressRequests || 0,
          requests?.resolvedRequests || 0,
        ],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation (Mobile) */}
      <nav className="w-full bg-indigo-600 p-4 text-white shadow-md md:hidden">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </nav>

      {/* Scrollable Navigation Cards at the Top */}
      <div className="overflow-x-auto p-4 md:flex md:flex-wrap md:justify-start md:px-8">
        <div className="flex flex-nowrap gap-4 md:w-full md:max-w-full">
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            {/* Reports section with charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Revenue Report</h3>
                <Bar data={revenueData} />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Financial Report</h3>
                <Doughnut data={financialData} />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Occupancy Report</h3>
                <Doughnut data={occupancyData} />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Requests Report</h3>
                <Doughnut data={requestData} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
