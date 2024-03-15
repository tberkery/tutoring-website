"use client";
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';

type profileType = {
	_id : string,
	firstName : string,
	lastName : string,
	email : string,
	affiliation : string,
	department : string,
	graduationYear? : string,
	description? : string,
  profilePicKey? : string
}

const PostCard: FC<{profile: profileType}> = ({ profile }) => {
  const [img, setImg] = useState("/defaultimg.jpeg");
  const fullName = `${profile.firstName} ${profile.lastName}`;

  useEffect(() => { loadImage() }, [profile]);

  const loadImage = async () => {
    if (profile.profilePicKey) {
      const api = process.env.NEXT_PUBLIC_BACKEND_URL;
      const url = await axios.get(`${api}/profilePics/get/${profile.profilePicKey}`);
      setImg(url.data.imageUrl);
    }
  }

  const capitalize = (s : string) => {
    const pieces = s.split(" ");
    const newPieces = pieces.map((piece) => {
      return `${piece.charAt(0).toUpperCase()}${piece.substring(1)}`
    })
    return newPieces.join(' ');
  }

  const trimBio = (s : string) => {
    if (!s) {
      return "";
    } else if (s.length < 90) {
      return s;
    } else {
      return `${s.substring(0, 87)}...`
    }
  }

  return ( <> 
    <div className="max-w-sm h-96 rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src={img}
        alt={fullName}
      />
      <div className="px-6 py-4">
        <div className="mb-2">
          <a href={`/profile/${profile._id}`}>
            <div className="font-bold text-xl hover:underline">{fullName}</div>
          </a>
          <p className="text-gray-600 text-sm">
            {profile.email} - {capitalize(profile.department)}
          </p>
          <p className="text-gray-600 text-sm">
            { profile.affiliation === "student" && profile.graduationYear ?
              `${capitalize(profile.affiliation)}, class of ${profile.graduationYear}`
            :
              `${profile.affiliation}`
            }
          </p>
        </div>
        <p className="text-gray-700 text-base">
          {trimBio(profile.description)}
        </p>
      </div>
    </div>
    </>
  );
};

export default PostCard;
