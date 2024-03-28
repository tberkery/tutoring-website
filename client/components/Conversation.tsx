import React, { FC } from 'react';

type Message = {
    id: string;
    content: string;
    timestamp: string;
    isUserMessage: boolean; // Determine if the message is from the user or the other person
};

type ConversationProps = {
    messages: Message[];
};

const Conversation: FC<ConversationProps> = ({ messages }) => {
    return (
        <div className="flex flex-col p-4 space-y-2">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.isUserMessage ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`max-w-2/3 px-4 py-2 rounded-lg ${message.isUserMessage ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
                        <p>{message.content}</p>
                        <p className="text-right text-xs">{message.timestamp}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Conversation;
