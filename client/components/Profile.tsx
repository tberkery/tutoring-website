"use client";
import React from 'react';
import Link from 'next/link'; 

const Profile = () => {
  // Placeholder data - replace with actual data
  const profileData = {
    name: "Nolan Fogarty",
    department: "Computer Science", // For major OR Department
    year: "2025",
    email: "nfogart1@jhu.edu",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper purus eu aliquam feugiat. Morbi ipsum libero, porttitor a nisi sed, varius laoreet diam. Morbi euismod sed eros vitae efficitur. Nulla pulvinar vestibulum viverra. Fusce id dapibus nibh, vitae efficitur nisi. Mauris accumsan ipsum ligula, vel bibendum nulla semper eu. In gravida, turpis vitae faucibus vulputate, ligula mauris viverra odio, id vestibulum sem nisl eu sem. Proin pretium urna orci, id lobortis libero semper id. Donec urna libero, placerat vitae commodo aliquet, maximus sed nisl. Pellentesque consectetur interdum tellus at tincidunt. Curabitur ultricies in ligula quis dictum. Nullam mauris nibh, volutpat nec quam non, auctor luctus sapien.",
    profilePic: "/defaultimg.jpeg" // Replace with the actual image path / URL / DATABASE CALL???? 
  };

  return (
    <div className="flex justify-between items-center bg-blue-300 pt-16 pb-16 pl-32 pr-32">
      <div className="flex-1 mr-5">
        <h1 className="text-2xl font-bold">{profileData.name} - {profileData.department}, {profileData.year}</h1>
        <p className="text-s underline font-light mb-2">{profileData.email}</p>
        <p className="text-gray-700 text-base">{profileData.description}</p>
      </div>
      <div className="flex-none pl-32 flex flex-col items-center">
        <img className="w-268 h-268 md:w-48 md:h-48 snap-center rounded-md" src={profileData.profilePic} alt={`${profileData.name}`} />
        <div className="flex mt-4 space-x-4">
          <Link href="/profile/edit" passHref>
                      <button className="bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">
                        Edit Profile
                      </button>
                    </Link>
          <Link href="/profile/posts" passHref>
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
