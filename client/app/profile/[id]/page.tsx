"use client";
import React from 'react';
import "../../../styles/global.css";
import Navbar from "@/components/Navbar"

const Page: React.FC = ({ params }: { params : { id: string }}) => {
  return (
    <>
      <Navbar />
      {/* <PostsSection /> */}
    </>
  );
};

export default Page;
