import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllRooms,
  fetchRoomDetails,
} from '../../RTK/Slices/roomSlice';
import {
  getPaymentsForStudent,
  addPayment,
  generatePaymentBill,
} from '../../RTK/Slices/paymentSlice';

const Payment = () => {
  const dispatch = useDispatch();
  const { rooms, roomDetails } = useSelector((state) => state.rooms);
  const { paymentsByStudent, billDetails } = useSelector((state) => state.payment);

  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [amountPaid, setAmountPaid] = useState({});
  const [totalAmount, setTotalAmount] = useState({});
  const [paymentType, setPaymentType] = useState({});
  const [month, setMonth] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  const handleRoomClick = (roomId) => {
    setSelectedRoomId(roomId);
    dispatch(fetchRoomDetails(roomId));
  };

  const handleAddPayment = (studentId) => {
    if (!amountPaid[studentId] || !totalAmount[studentId] || !paymentType[studentId] || !month[studentId]) return;
    const paymentData = {
      studentId,
      amountPaid: Number(amountPaid[studentId]),
      totalAmount: Number(totalAmount[studentId]),
      paymentType: paymentType[studentId],
      month: month[studentId],
    };
    dispatch(addPayment(paymentData))
      .unwrap()
      .then(() => {
        dispatch(getPaymentsForStudent(studentId));
      });
    setAmountPaid({ ...amountPaid, [studentId]: '' });
    setTotalAmount({ ...totalAmount, [studentId]: '' });
    setPaymentType({ ...paymentType, [studentId]: '' });
    setMonth({ ...month, [studentId]: '' });
  };

  const handleFetchPayments = (studentId) => {
    dispatch(getPaymentsForStudent(studentId));
  };

  const handleGenerateBill = (studentId) => {
    console.log("Sorry we are not Working on that")
  };
  

  return (
    <div className="p-6 bg-gradient-to-br from-blue-800 to-purple-800 min-h-screen flex flex-col items-center text-white">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 text-center drop-shadow-lg">
      Payment Management
    </h1>
  
    <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Room List */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl text-gray-900">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">All Rooms</h2>
        <input
          type="text"
          placeholder="Search Rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-400 transition-all duration-300"
        />
        {/* Make the room list scrollable */}
        <div className="mt-4 max-h-80 overflow-y-auto">
          <ul className="space-y-4">
            {rooms.filter((room) => room.roomNumber.includes(search)).map((room) => (
              <li
                key={room._id}
                className={`cursor-pointer p-5 rounded-xl text-lg font-semibold transition-all ${
                  selectedRoomId === room._id
                    ? 'bg-purple-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 hover:bg-purple-300 hover:text-white'
                }`}
                onClick={() => handleRoomClick(room._id)}
              >
                Room {room.roomNumber} - {room.totalBeds} Beds
              </li>
            ))}
          </ul>
        </div>
      </div>
  
      {/* Room Details */}
      {selectedRoomId && roomDetails && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl text-gray-900 col-span-1 md:col-span-2">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Students in Room {roomDetails.roomNumber}
          </h2>
          <div className="space-y-6">
            {roomDetails.students.map((student) => (
              <div key={student._id} className="p-6 bg-gray-100 rounded-2xl shadow-md">
                <p className="text-2xl font-semibold">{student.name}</p>
                <p className="text-lg text-gray-700">Email: {student.email}</p>
                <p className="text-lg text-gray-700">Phone: {student.phone}</p>
  
                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                  <a
                    href={`tel:${student.phone}`}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-green-600 transition-all"
                  >
                    Call
                  </a>
                  <button
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-blue-600 transition-all"
                    onClick={() => handleFetchPayments(student._id)}
                  >
                    Fetch Payments
                  </button>
                </div>
  
                <div className="mt-6">
                  <h3 className="text-2xl font-bold mb-4 text-center">Payments</h3>
                  {paymentsByStudent[student._id]?.length > 0 ? (
                    <ul className="space-y-4">
                      {paymentsByStudent[student._id].map((payment) => (
                        <li key={payment._id} className="border p-4 rounded-xl flex justify-between items-center shadow-sm">
                          <span className="text-lg">
                            {payment.month}: ₹{payment.amountPaid} / ₹{payment.totalAmount} , Date:{payment.paymentDate} <br />
                            Remaining Amout:{payment.remainingAmount} , Payment Type : {payment.paymentType}
                          </span>
                          <button
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-all"
                            onClick={() => handleGenerateBill(payment._id)}
                          >
                            Generate Bill
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 font-semibold text-center">
                      Click on the Fetch button to Get the List of Payments.
                    </p>
                  )}
  
                  {/* Payment Input */}
                  <div className="mt-6 flex flex-col md:flex-row flex-wrap gap-4 justify-center">
                    <input
                      type="number"
                      value={amountPaid[student._id] || ''}
                      onChange={(e) => setAmountPaid({ ...amountPaid, [student._id]: e.target.value })}
                      placeholder="Amount Paid"
                      className="border p-4 rounded-xl flex-grow w-full md:w-auto max-w-sm"
                    />
                    <input
                      type="number"
                      value={totalAmount[student._id] || ''}
                      onChange={(e) => setTotalAmount({ ...totalAmount, [student._id]: e.target.value })}
                      placeholder="Total Amount"
                      className="border p-4 rounded-xl flex-grow w-full md:w-auto max-w-sm"
                    />
                    <select
                      value={month[student._id] || ''}
                      onChange={(e) => setMonth({ ...month, [student._id]: e.target.value })}
                      className="border p-4 rounded-xl flex-grow w-full md:w-auto max-w-sm bg-white text-gray-700"
                    >
                      <option value="" disabled>Select Month</option>
                      {/* Month Options */}
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
  
                    <select
                      value={paymentType[student._id] || ''}
                      onChange={(e) => setPaymentType({ ...paymentType, [student._id]: e.target.value })}
                      className="border p-4 rounded-xl flex-grow w-full md:w-auto max-w-sm"
                    >
                      <option value="" disabled>Select Payment Type</option>
                      <option value="UPI">UPI</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                    </select>
                  </div>
  
                  <div className="mt-4 text-center">
                    <button
                      className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-green-600 transition-all"
                      onClick={() => handleAddPayment(student._id)}
                    >
                      Add Payment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
  


  );
};

export default Payment;
