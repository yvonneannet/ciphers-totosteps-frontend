

"use client"; 

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; 
import { Home, Users, Box } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactElement;
  text: string;
  active: boolean;
}

const Sidebar = () => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <nav className="bg-customPurple text-white h-screen w-[300px] flex flex-col items-center">
      <div className="p-4 flex justify-center items-center">
        <div className="w-40 h-40 relative mb-8">
          <Image
            src="/images/logo.png"
            alt="Totosteps Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <ul className="flex-grow space-y-[100px]">
        <NavItem href="/homepage" icon={<Home size={32} strokeWidth={2.5} />} text="Home" active={pathname === '/homepage'} />
        <NavItem href="/users" icon={<Users size={32} strokeWidth={2.5} />} text="Users" active={pathname === '/users'} />
        <NavItem href="/resources" icon={<Box size={32} strokeWidth={2.5} />} text="Resources" active={pathname === '/resources'} />
      </ul>
    </nav>
  );
};

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, active }) => (
  <li>
    <Link
      href={href}
      className={`flex items-center w-[260px] px-4 py-2 transition-colors rounded-[5px] ${active ? 'border-white' : 'border-transparent'}`}
    >
      <span className={`mr-[20px] ${active ? 'text-customOrange' : ''}`}>
        {React.cloneElement(icon, { className: active ? 'text-customOrange' : 'text-white' })}
      </span>
      <span className={`text-2xl font-nunito font-bold ${active ? 'text-customOrange' : 'text-white'}`}>{text}</span>
    </Link>
  </li>
);

export default Sidebar;