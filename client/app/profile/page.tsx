"use client";
import React from 'react';
import "../../styles/global.css";
import Navbar from "../../components/Navbar"
import Profile from "../../components/Profile"
import PostsSection from '../../components/PostSection';

const Page: React.FC = () => {
  return (
    <>
      <Navbar />
      <Profile />
      <PostsSection />
    </>
  );
};

export default Page;
