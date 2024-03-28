"use client";
import React, { FC, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import "../../styles/global.css";

const Page : FC = () => {

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    
    client.conversations.v1.conversations
                           .create({friendlyName: 'My First Conversation'})
                           .then(conversation => console.log(conversation.sid));
    return (
    <>
        <h1> TWILIO INIT </h1>
    </>
    );
}

export default Page;