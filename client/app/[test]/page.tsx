import React, { FC } from "react";
import "@/styles/global.css";

const Page : FC = ({ params }: { params : { test: string }}) => {
  return <>
    <p>params: {JSON.stringify(params)}</p>
  </>;
};

export default Page;