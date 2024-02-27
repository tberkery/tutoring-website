import React from 'react';
import Link from 'next/link'; 

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold">TUTORHUB</span>
        <Link href="/browse">
          Browse
        </Link>
        <Link href="/about">
          About
        </Link>
        <Link href="/team">
          Team
        </Link>
      </div>
      <div>
        <Link className="bg-sky-700 p-2 text-white rounded-sm" href="/signin">
        Sign In
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
