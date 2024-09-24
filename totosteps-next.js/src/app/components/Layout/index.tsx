
'use client'
import React from 'react';
import Sidebar from '../Sidebar';
import UserList from '../Users';
import Resources from '../Resources';
import { Milestone } from 'lucide-react';
import Milestones from '../Milestones';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex-grow p-4">
        {children}

        <UserList/>
        {/* <Resources/> */}
        {/* <Milestones/> */}
      </div>
    </div>
  );
}