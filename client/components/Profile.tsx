"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const Profile = (props : { profileId? : string}) => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [profileData, setProfileData] = useState(null);
  const [imgUrl, setImgUrl] = useState("../defaultimg.jpeg");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        if (props.profileId) {
          const response = await axios.get(`${BACKEND_URL}/profiles/${props.profileId}`);
          console.log(response.data.data);
          setProfileData(response.data.data);
        } else {
          const response = await axios.get(`${BACKEND_URL}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
          console.log(response.data.data[0]);
          setProfileData(response.data.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const reloadProfilePicture = async () => {
    if (!profileData || !profileData.profilePicKey) return;
    const url = await axios.get(`${BACKEND_URL}/profilePics/get/${profileData.profilePicKey}`);
    setImgUrl(url.data.imageUrl);
    console.log(url.data.imageUrl);
  }

  useEffect(() => { reloadProfilePicture() }, [profileData]);

  if (!isSignedIn) {
    return (<p>Please sign in</p>);
  }
  if (!isLoaded) {
    return <div className="text-center mt-20">Loading your profile...</div>;
  }
  if (!profileData) {
    return <div className="text-center mt-20">No profile data found</div>;
  }

  return (
    <div className="flex justify-between items-center bg-blue-300 pt-16 pb-16 pl-32 pr-32">
      <div className="flex-1 mr-5">
        <h1 className="text-2xl font-extrabold font-sans uppercase text-black">{profileData.firstName} {profileData.lastName} - {profileData.department}
                                           {profileData.graduationYear ? `, ${profileData.graduationYear}` : ''}</h1>
        <p className="text-s underline font-light mb-2">{profileData.email}</p>
        <p className="text-gray-700 text-base">{profileData.description}</p>
      </div>
      <div className="flex-none pl-32 flex flex-col items-center">
        <img className="w-268 h-268 md:w-48 md:h-48 snap-center rounded-md" src={imgUrl} alt={`${profileData.firstName}`} />
        <div className="flex mt-4 space-x-4">
          <Link href="/profile/edit" passHref>
                      <button className="bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">
                        Edit Profile
                      </button>
                    </Link>
          <Link href="/createPost" passHref>
            <button className="bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">
              Create Post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
