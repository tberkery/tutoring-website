"use client";
import React, { FC } from 'react';
import Link from 'next/link'; 
import { SignOutButton } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';

const NavBar: FC = () => {
  const { isLoaded, isSignedIn } = useUser();
  return (
    <nav className="flex justify-between items-center p-4 bg-white">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold mr-2">TUTORHUB</span>
        <Link 
          href="/browse" 
          className="inline-block px-2 py-1 ease-linear duration-75
          hover:bg-blue-900 hover:text-white rounded-md"
        >
          Browse
        </Link>
        <Link 
          href="/profile" 
          className="inline-block px-2 py-1 ease-linear duration-75
          hover:bg-blue-900 hover:text-white rounded-md"
        >
          Profile
        </Link>
      </div>
      <div>
        { isLoaded ? 
          <div className='bg-blue-900 px-2 py-1 text-white rounded-sm *:text-md'>
          { isSignedIn ?
            <SignOutButton/>
          :
            <Link href="/signIn">
              Sign In
            </Link>
          }
          </div>
        :
          <></>
        }
      </div>
    </nav>
  );
};

export default NavBar;
