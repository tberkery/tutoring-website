import React, { FC } from "react";
import HelloWorld from "../components/HelloWorld";
import "../styles/global.css";
import { SignIn, UserButton } from "@clerk/nextjs";
import Profile from "./profile/page";

const Page : FC = () => {
  return <>
    <HelloWorld/>
    <UserButton/>
    <a href="/signIn">sign in</a>
  </>;
};

export default Page;