import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, getExpensesByOwner, deleteExpense } from '../../RTK/Slices/expenseSlice';
import Nav from '../Nav/Nav';
const Expense = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);

  const [newExpense, setNewExpense] = useState({
    pgOwnerId: '678e5c392e5d83b9a8dec4bc', // Example owner ID
    description: '',
    amount: '',
    date: '',
    category: '',
  });

  useEffect(() => {
    dispatch(getExpensesByOwner(newExpense.pgOwnerId));
  }, [dispatch, newExpense.pgOwnerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.date && newExpense.category) {
      dispatch(addExpense(newExpense));
      setNewExpense({
        ...newExpense,
        description: '',
        amount: '',
        date: '',
        category: '',
      });
    } else {
      alert('Please fill in all fields before adding an expense.');
    }
  };

  const handleDeleteExpense = (expenseId) => {
    dispatch(deleteExpense(expenseId));
  };

  const formatAmount = (amount) => {
    return `₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Nav/>
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">Expense Management</h1>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl shadow-indigo-500/50">
        {/* Add Expense Form */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-600">Add New Expense</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="description"
              value={newExpense.description}
              onChange={handleChange}
              placeholder="Description"
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleChange}
              placeholder="Amount in ₹"
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              name="category"
              value={newExpense.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleAddExpense}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Expense List */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-indigo-600">All Expenses</h2>
          {expenses.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {expenses.map((expense) => (
                <li
                  key={expense._id}
                  className="flex justify-between items-center p-6 hover:bg-indigo-50 rounded-lg"
                >
                  <div>
                    <p className="text-lg font-medium text-indigo-700">{expense.description}</p>
                    <p className="text-sm text-gray-500">
                      {expense.category} - {formatAmount(expense.amount)} on {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteExpense(expense._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No expenses found.</p>
          )}
        </div>
      </div>
    </div>      
    
    </>
  );
};

export default Expense;
