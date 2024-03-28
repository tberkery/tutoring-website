import React, { FC } from 'react';

type ChatUserProps = {
    name: string;
    lastMessage: string;
    profilePicture: string;
    timestamp: string;
};

const ChatUser: FC<ChatUserProps> = ({ name, lastMessage, profilePicture, timestamp }) => {
    return (
        <div className="flex items-center p-3 border-b border-gray-200">
            <img className="h-12 w-12 rounded-full object-cover mr-4" src={profilePicture} alt={`${name}'s profile`} />
            <div>
                <p className="text-lg font-medium text-gray-700">{name}</p>
                <p className="text-sm text-gray-500 line-clamp-1 text-ellipsis">{lastMessage}</p>
                <p className="text-sm text-gray-400">{timestamp}</p>
            </div>
        </div>
    );
};

export default ChatUser;
