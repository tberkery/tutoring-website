"use client";
import React, { FC } from "react";
import "@/styles/global.css";

const Page : FC = ({ params }: { params : { test: string }}) => {
  return <>
    <p>{JSON.stringify(params)}</p>
  </>;
};

export default Page;