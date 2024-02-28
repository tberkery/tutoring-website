import React from 'react';
import "../../styles/global.css";
import Navbar from "../../components/Navbar"
import Profile from "../../components/Profile"

const Page: React.FC = () => {
  return (
    <>
      <Navbar />
      <Profile />
    </>
  );
};

export default Page;
