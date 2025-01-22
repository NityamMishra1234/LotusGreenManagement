import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestsByOwner, updateRequestStatus } from '../../RTK/Slices/requestSlice';

const Request = ({ pgOwnerId }) => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.requests);

  useEffect(() => {
    // Fetch requests by PG owner ID
    dispatch(getRequestsByOwner(pgOwnerId));
  }, [dispatch, pgOwnerId]);

  const handleUpdateStatus = (requestId, status) => {
    dispatch(updateRequestStatus({ requestId, status }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Requests</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Request List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">All Requests</h2>
          {requests.length > 0 ? (
            <ul className="divide-y">
              {requests.map((request) => (
                <li
                  key={request._id}
                  className="flex justify-between items-center p-4 hover:bg-gray-100"
                >
                  <div>
                    <p className="text-lg font-medium">{request.issueType}</p>
                    <p className="text-sm text-gray-600">{request.description}</p>
                    <p className="text-sm text-gray-500">
                      Status: {request.status || 'Pending'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleUpdateStatus(request._id, 'Done')}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Mark as Done
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(request._id, 'In Progress')}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(request._id, 'Not Done')}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Mark as Not Done
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;
