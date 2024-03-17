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
import Loader from "@/components/Loader";
import { Checkbox } from "@/components/ui/checkbox"

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

  const [searchInput, setSearchInput] = useState("");
  const [typeFilters, setTypeFilters] = useState({
    courses: false,
    activities: false,
  });
  const handleTypeChange = (filterCategory) => {
    setTypeFilters(prev => ({
      ...prev,
      [filterCategory]: !prev[filterCategory],
    }));
  };
  
  const [tagFilters, setTagFilters] = useState({
    music: false,
    athletic: false,
  });
  const handleTagChange = (filterCategory, value) => {
    setTagFilters(prev => ({
      ...prev,
      [filterCategory]: value,
    }));
  };

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${api}/allPosts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        } finally {
            setLoading(false);
        };
        }
        fetchData();
    }, [api]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
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
    return (
        <>
            <Loader />
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
                            <div className="ml-2 pb-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="courses" onCheckedChange={(e) => handleTypeChange('courses')}/>
                                    <label
                                        htmlFor="terms2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Courses
                                    </label>
                                </div>
                            </div>
                            <div className="ml-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="activites" onCheckedChange={(e) => handleTypeChange('activities')}/>
                                    <label
                                        htmlFor="terms2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Activities
                                    </label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>By Price</AccordionTrigger>
                        <AccordionContent>
                        <div className="ml-2 pb-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="hightolow" />
                                    <label
                                        htmlFor="terms2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        High to Low
                                    </label>
                                </div>
                            </div>
                            <div className="ml-2 pb-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="lowtohigh" />
                                    <label
                                        htmlFor="terms2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Low to High
                                    </label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>By Tag</AccordionTrigger>
                        <AccordionContent>
                            <div className="ml-2 pb-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="athletic" />
                                    <label
                                        htmlFor="terms2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Athletic
                                    </label>
                                </div>
                            </div>
                            <div className="ml-2 pb-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="music" />
                                    <label
                                        htmlFor="terms2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Music
                                    </label>
                                </div>
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
