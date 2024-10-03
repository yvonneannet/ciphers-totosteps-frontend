'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { XCircle, ChevronLeft, ChevronRight} from 'lucide-react';
import { getFullName } from '@/app/utils/fetchUsers';
import { User } from '@/app/utils/types';
import Sidebar from '../Sidebar';


export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsersFromAPI = async () => {
    try {
      const response = await fetch('https://totosteps-29a482165136.herokuapp.com/api/users/');
      if (!response.ok) {
        throw new Error('Failed to fetch users from API');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users from API');
      return [];
    }
  };

  useEffect(() => {
    const initializeUsers = async () => {
      const savedUsers = localStorage.getItem('users');

      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        const apiUsers = await fetchUsersFromAPI();

        const filteredUsers = apiUsers.filter((user: User) => user.first_name && user.last_name);
        if (filteredUsers.length > 0) {
          setUsers(filteredUsers);
          localStorage.setItem('users', JSON.stringify(filteredUsers));
        }
      }
      setLoading(false);
    };

    initializeUsers();
  }, []);

  const saveUsersToLocalStorage = (updatedUsers: User[]) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return { users, setUsers: saveUsersToLocalStorage, loading, error };
};

const UserList: React.FC = () => {
  const { users, setUsers, loading, error } = useUsers();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [action, setAction] = useState<'RESTRICT' | 'RESTORE'>('RESTRICT');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7); 

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const restrictUser = async (userId: string) => {
    try {
      const response = await fetch(`https://totosteps-29a482165136.herokuapp.com/api/users/${userId}/restrict/`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to restrict user');
      }
      return true;
    } catch (error) {
      console.error('Error restricting user:', error);
      return false;
    }
  };

  const restoreUser = async (userId: string) => {
    try {
      const response = await fetch(`https://totosteps-29a482165136.herokuapp.com/api/users/${userId}/restore/`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to restore user');
      }
      return true;
    } catch (error) {
      console.error('Error restoring user:', error);
      return false;
    }
  };

  const handleAction = useCallback((user: User, actionType: 'RESTRICT' | 'RESTORE') => {
    setSelectedUser(user);
    setAction(actionType);
    setModalOpen(true);
  }, []);

  const handleProceed = useCallback(async () => {
    if (selectedUser) {
      let success = false;

      if (action === 'RESTRICT') {
        success = await restrictUser(selectedUser.id);
      } else {
        success = await restoreUser(selectedUser.id);
      }

      if (success) {
        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id
            ? { ...user, status: action === 'RESTRICT' ? 'RESTRICTED' : 'ACTIVE' }
            : user
        );

        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        setModalOpen(false);
        setSuccessMessage(
          `${getFullName(selectedUser)} Successfully ${action === 'RESTRICT' ? 'Restricted' : 'Restored'}! ${
            action === 'RESTRICT'
              ? 'The user can no longer have access to your platform using their account.'
              : 'The user now has full access to your platform.'
          }`
        );

        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        setSuccessMessage(`Failed to ${action.toLowerCase()} user.`);
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      }
    }
  }, [selectedUser, action, users, setUsers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex w-full p-8 font-sans bg-white text-base">
      <div className="w-1/4">
        <Sidebar />
      </div>

      <div className="w-3/4 pl-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[50px] font-bold font-nunito text-black nest-hub-title">Totosteps Users</h1>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8 nest-hub-text" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <div className="bg-white rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-6 py-4 px-6 border-b border-pink-200">
            <div className="text-pink-500 font-bold text-[30px] font-nunito nest-hub-header"></div>
            <div className="text-pink-500 font-bold text-[30px] font-nunito nest-hub-header">First Name</div>
            <div className="text-pink-500 font-bold text-[30px] font-nunito nest-hub-header">Last Name</div>
            <div className="text-pink-500 font-bold text-[30px] font-nunito nest-hub-header">Actions</div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-4 gap-6 items-center py-4 px-6 border-b border-gray-100">
                  <div className="text-gray-800 text-[25px] nest-hub-text">
                    <img src="public/images/icon.png" alt="User Icon" className="inline-block w-6 h-6 mr-2" style={{ width: '40px', height: '35px' }} />
                    {user.id}
                  </div>
                  <div className="text-black text-[25px] nest-hub-text">{user.first_name}</div>
                  <div className="text-black text-[25px] nest-hub-text">{user.last_name}</div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleAction(user, 'RESTRICT')}
                      className={`px-4 py-1 font-semibold rounded-full transition-colors text-[22px] nest-hub-text border
                      ${
                        user.status === 'RESTRICTED'
                          ? 'bg-gray-200 text-gray-500'
                          : 'border border-red-500 text-red-500 hover:bg-red-50'
                      }`}
                      disabled={user.status === 'RESTRICTED'}
                    >
                      {user.status === 'RESTRICTED' ? 'RESTRICTED' : 'RESTRICT'}
                    </button>

                    <button
                      onClick={() => handleAction(user, 'RESTORE')}
                      className={`px-4 py-1 font-semibold rounded-full transition-colors text-[22px] nest-hub-text border
                      ${
                        user.status === 'ACTIVE'
                          ? 'bg-gray-200 text-gray-500'
                          : 'border border-green-500 text-green-500 hover:bg-green-50'
                      }`}
                      disabled={user.status === 'ACTIVE'}
                    >
                      {user.status === 'ACTIVE' ? 'ACTIVE' : 'RESTORE'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No users to display</div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded-full ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(users.length / usersPerPage)}
            className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute right-3 top-3 text-yellow-500 hover:text-yellow-600"
            >
              <XCircle size={24} />
            </button>
            <p className="mb-8 text-center text-black text-lg nest-hub-text">
              Are you sure you want to {action.toLowerCase()} user {getFullName(selectedUser)}?
            </p>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors text-base font-semibold nest-hub-text"
              >
                CANCEL
              </button>
              <button
                onClick={handleProceed}
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-base font-semibold nest-hub-text"
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