
import React from 'react';
import HomePage from '../Homepage';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div>
        <HomePage/>
      </div>
      <div className="flex-grow p-4">
        {children}
      </div>
    </div>
  );
}