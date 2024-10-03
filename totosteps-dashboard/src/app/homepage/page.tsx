'use client';
import React from 'react';
import { useUsers } from '@/app/hooks/useGetUsers';
import { useResources } from '@/app/hooks/useGetResources';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const { users, loading: usersLoading, error: usersError } = useUsers();
  const { resourcesCount, loading: resourcesLoading, error: resourcesError } = useResources();

  if (usersLoading || resourcesLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (usersError || resourcesError) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl text-red-500">Error: {usersError || resourcesError}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center w-full h-screen overflow-hidden p-5 bg-white">
        <div className="flex-grow p-8 font-sans bg-white text-base">
          <h1 className="text-[50px] font-bold font-nunito text-black">Totosteps</h1>

          <div className="grid grid-cols-3 gap-6 mb-[150px] mt-[100px]">
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-[30px] text-pink-500 font-bold">Total Users</h2>
              <p className="text-[30px] mt-[15px] font-bold text-black">{users.length}</p>
            </div>
       
            <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-[30px] text-green-500 font-bold">Total Resources</h2>
              <p className="text-[30px] mt-[15px] font-bold text-black">{resourcesCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden mb-[40px]">
            <div className="grid grid-cols-3 gap-[190px] py-[4px] px-[20px] border-b border-pink-200">
              <div className="text-pink-500 font-bold text-[30px] w-full">User ID</div>
              <div className="text-pink-500 font-bold text-[30px] w-full text-center">First Name</div>
              <div className="text-pink-500 font-bold text-[30px] w-full text-right">Last Name</div>
            </div>

            {users.map((user) => (
              <div className="grid grid-cols-3 gap-[190px] px-[250px] items-center py-4 px-6 border-b border-gray-100" key={user.id}>
                <div className="text-gray-800 text-[25px]">
                  <img src="/images/icon.png" alt="User Icon" className="inline-block w-6 h-6 mr-2" style={{ width: '40px', height: '35px' }} />
                  {user.id}
                </div>
                <div className="text-black text-[25px] text-center">{user.first_name}</div>
                <div className="text-black text-[25px] text-right">{user.last_name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;