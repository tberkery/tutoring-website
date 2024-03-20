"use client";
import React, { FC, useEffect, useState } from "react";
import NavBar from "@/components/Navbar";
import axios from "axios";
import ProfileCard from "@/components/ProfileCard";
import Loader from "@/components/Loader";
import "../../styles/global.css";

interface ProfilePost {
	_id : string,
	firstName : string,
	lastName : string,
	email : string,
	affiliation : string,
	department : string,
	graduationYear? : string,
	description? : string
}

type Profile = ProfilePost;

const Page : FC = () => {
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${api}/profiles`);
        setProfiles(response.data.data);
      } catch (error) {
          console.error('Error fetching posts', error);
      } finally {
          setLoading(false);
      };
    };
    fetchProfiles();
  }, [api]);

  const searchItems = (searchValue) => {

  };
  if (loading) {
    return ( <> <Loader /> </>);
  }
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen">
        <div className="w-1/4 flex flex-col items-center py-3 bg-blue-300">
          <div className="input-container my-6">
              <input type="text" name="text" 
                      className="input" 
                      placeholder="Name, Email"
                      onChange={ (e) => searchItems(e.target.value) }></input>
              <label className="label">Search</label>
              <div className="top-line"></div>
              <div className="under-line"></div>
          </div>
          <h1 className="text-xl font-extrabold font-sans">Search Profiles</h1>
        </div>
        <div className="w-3/4">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profiles.map((profiles) => (
                    <ProfileCard key={profiles._id} profile={profiles} />
                ))}
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Page;