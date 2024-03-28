"use client";
import React, { FC, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import "../../styles/global.css";
import axios from 'axios';
import NavBar from "../../components/Navbar";
import ChatUser from "../../components/ChatUser";
import Conversation from "../../components/Conversation";

const Page : FC = () => {
    const { user } = useUser();
    const [selectedUser, setSelectedUser] = useState(null);
    const [draftMessage, setDraftMessage] = useState('');

    const [chatUsers, setChatUsers] = useState([
        { name: "Tae Wan Kim", lastMessage: "Here you go!", profilePicture: "path_to_tae_wan_kim_profile_pic", timestamp: "Mar 14" },
        { name: "Tae Wan Kim", lastMessage: "Here you go!", profilePicture: "path_to_tae_wan_kim_profile_pic", timestamp: "Mar 14" },
        { name: "Tae Wan Kim", lastMessage: "Here you go!", profilePicture: "path_to_tae_wan_kim_profile_pic", timestamp: "Mar 14" },
        { name: "Tae Wan Kim", lastMessage: "Here you go!", profilePicture: "path_to_tae_wan_kim_profile_pic", timestamp: "Mar 14" },
        { name: "Tae Wan Kim", lastMessage: "Here you go!", profilePicture: "path_to_tae_wan_kim_profile_pic", timestamp: "Mar 14" },
        { name: "Tae Wan Kim", lastMessage: "Here you go!", profilePicture: "path_to_tae_wan_kim_profile_pic", timestamp: "Mar 14" },
        { name: "Tae Wan Kim", lastMessage: "Here you go!", profilePicture: "path_to_tae_wan_kim_profile_pic", timestamp: "Mar 14" },
        { name: "Tae Wan Kim", lastMessage: "Here you go!", profilePicture: "path_to_tae_wan_kim_profile_pic", timestamp: "Mar 14" },
        { name: "Renee Cai", lastMessage: "I'm leaving on thursday but I'll be back as soon", profilePicture: "path_to_renee_cai_profile_pic", timestamp: "Mar 13" }
    ]);

    const [conversations, setConversations] = useState({
        "Tae Wan Kim": {
            messages: [
                { id: 'm1', content: "Hey there!", timestamp: "Mar 13, 10:00 AM", senderId: 'tae_wan_kim_id' },
                { id: 'm2', content: "How's it going?", timestamp: "Mar 13, 10:02 AM", senderId: 1 },
            ],
        },
        "Renee Cai": {
            messages: [
                { id: 'm1', content: "Are we still on for Thursday?", timestamp: "Mar 12, 08:45 AM", senderId: 'renee_cai_id' },
                { id: 'm2', content: "Yes, see you then!", timestamp: "Mar 12, 08:50 AM", senderId: 1 },
                { id: 'm1', content: "Are we still on for Thursday?", timestamp: "Mar 12, 08:45 AM", senderId: 'renee_cai_id' },
                { id: 'm2', content: "Yes, see you then!", timestamp: "Mar 12, 08:50 AM", senderId: 1 },
                { id: 'm1', content: "Are we still on for Thursday?", timestamp: "Mar 12, 08:45 AM", senderId: 'renee_cai_id' },
                { id: 'm2', content: "Yes, see you then!", timestamp: "Mar 12, 08:50 AM", senderId: 1 },
                { id: 'm1', content: "Are we still on for Thursday?", timestamp: "Mar 12, 08:45 AM", senderId: 'renee_cai_id' },
                { id: 'm2', content: "Yes, see you then!", timestamp: "Mar 12, 08:50 AM", senderId: 1 },
                { id: 'm1', content: "Are we still on for Thursday?", timestamp: "Mar 12, 08:45 AM", senderId: 'renee_cai_id' },
                { id: 'm2', content: "Yes, see you then!", timestamp: "Mar 12, 08:50 AM", senderId: 1 },
                { id: 'm1', content: "Are we still on for Thursday?", timestamp: "Mar 12, 08:45 AM", senderId: 'renee_cai_id' },
                { id: 'm2', content: "Yes, see you then!", timestamp: "Mar 12, 08:50 AM", senderId: 1 },
                { id: 'm2', content: "How's it going?", timestamp: "Mar 13, 10:02 AM", senderId: 1 },
                { id: 'm2', content: "How's it going?", timestamp: "Mar 13, 10:02 AM", senderId: 1 },
                { id: 'm2', content: "How's it going?", timestamp: "Mar 13, 10:02 AM", senderId: 1 },
                { id: 'm2', content: "How's it going?", timestamp: "Mar 13, 10:02 AM", senderId: 1 },

            ],
        },
    });

    const handleSendMessage = () => {
        if (draftMessage.trim() !== '') {
            // UPDATE TO SEND the message using BACKEND API
            // For now, log to console
            console.log("Message to send:", draftMessage);
            // UPDATE CONVO STATE
            setDraftMessage(''); // Clear the draft message
        }
    };

    const handleUserClick = (userName) => {
        setSelectedUser(userName);
    };

    const getToken = async () => {
        if (!user) return;
        try {
            const response = await axios.get(`http://localhost:4000/token/${user.primaryEmailAddress.toString()}`);
            console.log(response);
            const { data } = response;
            console.log(data.token);
        } catch (error) {
            console.error("Failed to fetch token:", error);
        }
    }
    useEffect(() => {
        getToken();
    }, [user]);
    return (
        <>
            <NavBar />
            <div className="flex" style={{ height: 'calc(100vh - 80px)' }}>
                <div className="search w-1/4 bg-blue-300 min-h-full overflow-y-auto">
                    {chatUsers.map(chatUser => (
                        <div 
                            key={chatUser.name}
                            onClick={() => handleUserClick(chatUser.name)}
                            className="cursor-pointer"
                        >
                            <ChatUser
                                name={chatUser.name}
                                lastMessage={chatUser.lastMessage}
                                profilePicture={chatUser.profilePicture}
                                timestamp={chatUser.timestamp}
                            />
                        </div>
                    ))}
                </div>
                <div className="conversation w-3/4 bg-bluejay-blue flex flex-col">
                {selectedUser && (
                    <div className="flex-grow overflow-y-auto">
                        <Conversation 
                            messages={conversations[selectedUser].messages.map(msg => ({
                                id: msg.id,
                                content: msg.content,
                                timestamp: msg.timestamp,
                                isUserMessage: msg.senderId === 1, // Adjust accordingly
                            }))}
                        />
                    </div>
                )}
                <div className="p-4 flex border-t border-gray-200">
                    <input 
                        className="flex-grow rounded p-2 mr-2" 
                        type="text" 
                        placeholder="Type a message..."
                        value={draftMessage}
                        onChange={(e) => setDraftMessage(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                    />
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
            </div>
        </>
    );
}

export default Page;