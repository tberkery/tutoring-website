import React from 'react';
import "../../styles/global.css";
import Navbar from "../../components/Navbar.tsx"

const Page: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Hello World</h1>
      </div>
    </>
  );
};

export default Page;
