import React from 'react';
import UserList from './components/Users';
// import ResourcesChart from './components/Resources';

const UserListPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <UserList />
        {/* <ResourcesChart/> */}
        <p className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto">
          This page represents all the users using the TotoSteps application, with their user IDs.
          The restrict button will enable an admin to restrict a user from using the application under required circumstances.
        </p>
      </main>
    </div>
  );
};

export default UserListPage;