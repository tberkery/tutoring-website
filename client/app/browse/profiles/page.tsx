"use client";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import "@/styles/global.css";
import "@/styles/basic.css";
import NavBar from "@/components/Navbar";
import ProfileSearch from "@/components/ProfileSearch";
import { Label } from "@/components/ui/label";

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

const Page : FC = () => {
	const api = process.env.NEXT_PUBLIC_BACKEND_URL;
	const [profiles, setProfiles] = useState<profileType[]>([]);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		const searchForProfiles = setTimeout(async () => {
			if (searchText.length === 0) {
				setProfiles([]);
				return;
			}
			let pieces = searchText.split(' ');
			let index = 0;
			let params = {};
			let flag = false;
			while (index < pieces.length) {
				if (pieces[index].includes('@')) {
					params['email'] = pieces[index];
					flag = true;
					break;
				}
				index++;
			}
			console.log(index);
			if (flag) {
				pieces.splice(index, 1);
			}
			console.log(pieces);
			if (pieces.length >= 1) {
				params['name1'] = pieces[0];
			}
			if (pieces.length >= 2) {
				params['name2'] = pieces[1];
			}
			const url = `${api}/profiles`;
			const response = await axios.get(url, { params: params });
			setProfiles(response.data.data);
		}, 200);

		return () => clearTimeout(searchForProfiles);
	}, [searchText]);

	return <>
		<NavBar />
		<div className="flex min-h-screen">
			<div className="w-1/4 min-w-80 flex flex-col items-center py-3 bg-blue-300">
			<Label 
				htmlFor="search-bar" 
				className="inline-block mt-2 text-xl"
			>
				Search Profiles
			</Label>
				<div className="input-container my-2">
					<input
						id="search-bar"
						placeholder="Name, email"
						type="text"
						name="text"
						className="input mr-4 placeholder-black placeholder-opacity-50"
						onChange={ (event) => setSearchText(event.target.value) }
					/>
					<div className="top-line"></div>
				</div>
				<div className="FilterRecipes">
				</div>
			</div>
			<div className="w-3/4">
				<ProfileSearch profiles={profiles}/>
			</div>
		</div>
	</>;
}

export default Page;
