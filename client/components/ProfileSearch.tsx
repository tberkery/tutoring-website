"use client";
import React, { FC } from "react";
import ProfileCard from "./ProfileCard";

type profileType = {
	_id : string,
	firstName : string,
	lastName : string,
	email : string,
	affiliation : string,
	department : string,
	graduationYear? : string,
	description? : string
}

const ProfileSearch: FC<{profiles: profileType[]}> = ({ profiles }) => {

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile._id} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default ProfileSearch;