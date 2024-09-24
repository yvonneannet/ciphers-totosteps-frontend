'use client';

import React, { useState } from 'react';
import { XCircle } from 'lucide-react';

const initialUsers = [
  { id: '001', name: 'Nancy Shimwe', status: 'ACTIVE' },
  { id: '002', name: 'Eyvone Oyella', status: 'ACTIVE' },
  { id: '003', name: 'Simon Peter', status: 'ACTIVE' },
  { id: '004', name: 'Moses Abraham', status: 'ACTIVE' },
  { id: '005', name: 'Lauryn Hills', status: 'ACTIVE' },
];

const UserList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRestrict = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleProceed = () => {
    setUsers(users.map(user => 
      user.id === selectedUser.id ? {...user, status: 'RESTRICTED'} : user
    ));
    setModalOpen(false);
    setSuccessMessage(`${selectedUser.name} Successfully Restricted! The user can no longer have access to your platform using their account.`);
    
    // Clear the success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans bg-white text-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Totosteps Users</h1>
        <button className="px-4 py-2 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors">
          View All
        </button>
      </div>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 py-2 px-4 border-b border-gray-200">
          <div className="col-span-1"></div>
          <div className="col-span-2 text-pink-500 font-semibold">User ID</div>
          <div className="col-span-5 text-pink-500 font-semibold">Name</div>
          <div className="col-span-4"></div>
        </div>
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-12 gap-4 items-center py-3 px-4">
            <div className="col-span-1">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <img src="/Image/icon.png" alt="User Icon" className="w-8 h-6 rounded-full" />
              </div>
            </div>
            <div className="col-span-2 text-gray-800">{user.id}</div>
            <div className="col-span-5 text-black">{user.name}</div>
            <div className="col-span-4 flex justify-end space-x-2">
              <button
                onClick={() => user.status === 'ACTIVE' && handleRestrict(user)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                  user.status === 'RESTRICTED'
                    ? 'bg-gray-200 text-gray-500'
                    : 'border border-red-500 text-red-500 hover:bg-red-50'
                }`}
                disabled={user.status === 'RESTRICTED'}
              >
                {user.status === 'RESTRICTED' ? 'RESTRICTED' : 'RESTRICT'}
              </button>
              <button className="px-3 py-1 text-xs font-semibold rounded-full transition-colors border border-green-500 text-green-500 hover:bg-green-50">
                RESTORE
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute right-2 top-2 text-yellow-500 hover:text-yellow-600"
            >
              <XCircle size={20} />
            </button>
            <p className="mb-6 text-center text-black">
              Are you sure you want to restrict user {selectedUser?.name} with ID {selectedUser?.id}?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-1.5 bg-white text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleProceed}
                className="px-5 py-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                PROCEED
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;