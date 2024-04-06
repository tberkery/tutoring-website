"use client";
import React, { FC, useEffect } from 'react';
import Link from 'next/link'; 
import { SignOutButton } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from 'axios';

const NavBar: FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [hasUnreadMessages, setHasUnreadMessages] = React.useState(false);
  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }
    const fetchUnreadMessages = async () => {
      try {
        if (!user) return;
        const application_id = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID;
        const unreadMessages = await axios.get(`https://api-${application_id}.sendbird.com/v3/users/${user.primaryEmailAddress}/unread_message_count`);
        if (unreadMessages.data.unread_count > 0) {
          setHasUnreadMessages(true);
        }
        console.log('Unread messages:', unreadMessages.data.unread_count);
      } catch (error) {
        console.error('Failed to fetch unread messages:', error);
      }
    };
    fetchUnreadMessages();
  });

  return (
    <nav className="flex justify-between items-center p-4 bg-white h-18">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold mr-2">TUTORHUB</span>
        <Link 
          href="/browse" 
          className="inline-block px-2 py-1 ease-linear duration-75
          hover:bg-blue-300 rounded-md font-extrabold font-sans text-lg"
        >
          Posts
        </Link>
        <Link 
          href="/profiles" 
          className="inline-block px-2 py-1 ease-linear duration-75
          hover:bg-blue-300 rounded-md font-extrabold font-sans text-lg"
        >
          Profiles
        </Link>
      </div>
      <div>
          <div>
          { isSignedIn ?
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="relative">
                    <Avatar>
                      <AvatarImage src="/defaultimg.jpeg" alt="@shadcn" />
                      <AvatarFallback>TH</AvatarFallback>
                    </Avatar>
                    {hasUnreadMessages && (
                      <div className="absolute top-0 right-0 transform translate-x-0 -translate-y-0 w-3 h-3 bg-red-500 rounded-full"></div>
                      )}
                    </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/chat">Messages</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SignOutButton/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </>
          :
            <Link href="/signIn">
              Sign In
            </Link>
          }
          </div>
      </div>
    </nav>
  );
};

export default NavBar;
