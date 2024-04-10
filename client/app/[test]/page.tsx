"use client";
import React, { FC } from "react";
import "@/styles/global.css";

const Page : FC = ({ params }: { params : { test: string }}) => {
  return <>
    <p>{params.test}</p>
  </>;
};

export default Page;