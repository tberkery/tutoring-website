"use client";
import React, { FC, useState } from 'react';
import React, { FC, useEffect, useState } from 'react';
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
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { isLoaded, isSignedIn, user } = useUser();
  const [ isAdmin, setIsAdmin ] = useState(false);
  const [imgUrl, setImgUrl] = useState("/defaultimg.jpeg");
  const [ isAdmin, setIsAdmin ] = useState(false);

  const fetchUserData = async () => {
    if (!isLoaded || !isSignedIn) {
      return false;
    }
    const userInfo = await axios.get(`${api}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
    if (userInfo.data.data.length === 0) {
      return;
    }
    if (userInfo.data.data[0].profilePicKey) {
      const picUrl = await axios.get(`${api}/profilePics/get/${userInfo.data.data[0].profilePicKey}`);
      setImgUrl(picUrl.data.imageUrl);
    }
  }

  useEffect(() => { fetchUserData() }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (isSignedIn) {
      // TODO change after creating page
      if (String(user.primaryEmailAddress) == "admin@jhu.edu") {
        setIsAdmin(true);
      }
    }
  }, [user])
  
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
        <Link 
          href="/chat" 
          className="inline-block px-2 py-1 ease-linear duration-75
          hover:bg-blue-300 rounded-md font-extrabold font-sans text-lg"
        >
          Messages
        </Link>
        { isAdmin ? 
          <Link 
            href="/reports" 
            className="inline-block px-2 py-1 ease-linear duration-75
            hover:bg-blue-300 rounded-md font-extrabold font-sans text-lg"
          >
            Reports
          </Link>
          : <></>
        }
      </div>
      <div>
          <div>
          { isSignedIn ?
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={imgUrl} alt="@shadcn" />
                  <AvatarFallback>TH</AvatarFallback>
                </Avatar>
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
