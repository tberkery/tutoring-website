"use client";

import React, { FC, useEffect, useState } from "react";
import "../../styles/global.css";
import NavBar from "@/components/Navbar";
import "../../styles/basic.css";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import BrowseSection from "@/components/BrowseSection";
import axios from "axios";
import PostCard from "@/components/PostCard";
import "../../styles/loader.css";

  interface ActivityPost {
    _id: string;
    userId: string;
    activityTitle: string;
    activityDescription: string;
    imageUrl: string;
    price: number;
    tags: string[];
    __v: number;
  }
  
  interface CoursePost {
    _id: string;
    userId: string;
    courseName: string;
    description: string;
    price: number;
    courseNumber: string;
    courseDepartment: string[];
    gradeReceived: string;
    semesterTaken: string;
    professorTakenWith: string;
    takenAtHopkins: boolean;
    schoolTakenAt: string;
    __v: number;
  }

  type Post = ActivityPost | CoursePost;

const Page : FC = () => {
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${api}/allPosts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        } finally {
            setLoading(false); // Stop loading regardless of the outcome
        };
        }
        fetchData();
    }, [api]);

  const [filterCourses, setFilterCourses] = useState(false);
  const [filterActivities, setFilterActivities] = useState(false);

  const [sortByPriceHighToLow, setSortByPriceHighToLow] = useState(false);
  const [sortByPriceLowToHigh, setSortByPriceLowToHigh] = useState(false);

  const [filterAthleticTag, setFilterAthleticTag] = useState(false);
  const [filterMusicTag, setFilterMusicTag] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const handleCourseFilterChange = () => {
    setFilterCourses(!filterCourses);
  };

  const handleActivityFilterChange = () => {
    setFilterActivities(!filterActivities);
  };

  const handlePriceHighToLowChange = () => {
    setSortByPriceHighToLow(!sortByPriceHighToLow);
  };
  
  const handlePriceLowToHighChange = () => {
    setSortByPriceLowToHigh(!sortByPriceLowToHigh);
  };

  const handleAthleticTagFilterChange = () => {
    setFilterAthleticTag(!filterAthleticTag);
  };

  const handleMusicTagFilterChange = () => {
    setFilterMusicTag(!filterMusicTag);
  };

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if(searchInput !== '') {
            const filteredPosts = posts.filter((post) => {
                if ('courseName' in post) {
                    return post.courseName.toLowerCase().includes(searchValue.toLowerCase());
                } else if ('activityTitle' in post) {
                    return post.activityTitle.toLowerCase().includes(searchValue.toLowerCase());
                }
                return false;
            })
            setFilteredResults(filteredPosts);
        } else {
            setFilteredResults(posts);
        }
    }

  if (loading) {
    // If still loading, render loading indicator
    return (
        <>
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-96">
            <div className="flex justify-center items-center">
                <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
        </div>
        </div>
            <h1 className="mt-8 text-center">Loading...</h1>
        </div>
        </>
    );
  }
  return <>
  <NavBar />
    <div className="flex min-h-screen">
        <div className="w-1/4 flex flex-col items-center py-3 bg-blue-300">
            <div className="input-container my-6">
                <input type="text" name="text" 
                        className="input" 
                        placeholder="Search"
                        onChange={ (e) => searchItems(e.target.value) }></input>
                <label className="label">Search</label>
                <div className="top-line"></div>
                <div className="under-line"></div>
            </div>
            <div className="FilterRecipes">
                <h1>filter listings</h1>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>By Type</AccordionTrigger>
                        <AccordionContent>
                            <div className="checkbox-wrapper ml-2">
                                <input 
                                type="checkbox" 
                                id="cbx-46" 
                                className="inp-cbx" 
                                onChange={handleCourseFilterChange}
                                checked={filterCourses}
                                />
                                <label htmlFor="cbx-46" className="cbx"
                                    ><span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>Courses</span>
                                </label>
                            </div>
                            <div className="checkbox-wrapper ml-2">
                                <input 
                                type="checkbox" 
                                id="cbx-47" 
                                className="inp-cbx" 
                                onChange={handleActivityFilterChange}
                                checked={filterActivities}
                                />
                                <label htmlFor="cbx-47" className="cbx"
                                    ><span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>Activities</span>
                                </label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>By Price</AccordionTrigger>
                        <AccordionContent>
                        <div className="checkbox-wrapper ml-2">
                                <input 
                                    type="checkbox" 
                                    id="cbx-48" 
                                    className="inp-cbx" 
                                    onChange={handlePriceLowToHighChange}
                                    checked={sortByPriceLowToHigh}
                                    />
                                <label htmlFor="cbx-48" className="cbx"
                                    ><span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>Low-to-High</span>
                                </label>
                            </div>
                            <div className="checkbox-wrapper ml-2">
                                <input 
                                    type="checkbox" 
                                    id="cbx-49" 
                                    className="inp-cbx" 
                                    onChange={handlePriceHighToLowChange}
                                    checked={sortByPriceHighToLow}
                                    />
                                <label htmlFor="cbx-49" className="cbx"
                                    ><span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>High-to-Low</span>
                                </label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>By Tag</AccordionTrigger>
                        <AccordionContent>
                        <div className="checkbox-wrapper ml-2">
                                <input 
                                    type="checkbox" 
                                    id="cbx-50" 
                                    className="inp-cbx" 
                                    onChange={handleAthleticTagFilterChange}
                                    checked={filterAthleticTag}
                                    />
                                <label htmlFor="cbx-50" className="cbx"
                                    ><span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>Athletic</span>
                                </label>
                            </div>
                            <div className="checkbox-wrapper ml-2">
                                <input 
                                    type="checkbox" 
                                    id="cbx-49" 
                                    className="inp-cbx" 
                                    onChange={handleMusicTagFilterChange}
                                    checked={filterMusicTag}
                                    />
                                <label htmlFor="cbx-49" className="cbx"
                                    ><span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>Music</span>
                                </label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
        <div className="w-3/4">
        {searchInput.length > 1 ? (
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResults.map((posts) => (
                    <PostCard key={posts._id} post={posts} />
                ))}
                </div>
            </div>
        ) : (
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((posts) => (
                    <PostCard key={posts._id} post={posts} />
                ))}
                </div>
            </div>
        )}
        </div>
    </div>
    </>;
};

export default Page;
