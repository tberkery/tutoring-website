"use client";
import React, { FC, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import "../../styles/global.css";
import axios from 'axios';

const Page : FC = () => {
    const { user } = useUser();
    const getToken = async () => {
        const email = user.primaryEmailAddress.toString();
        const response = await axios.get(`http://localhost:4000/token/nfogart1@jhu.edu`);
        const { data } = response;
        console.log(data.token);
        console.log(email);
        return data.token;
    }
    useEffect(() => {
        getToken();
    }, []);
    return (
    <>
        <h1> TWILIO INIT </h1>
    </>
    );
}

export default Page;