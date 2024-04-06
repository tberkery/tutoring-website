"use client";

import React, { FC, useEffect, useState } from "react";
import NavBar from "@/components/Navbar";
import "@/styles/global.css";
import "@/styles/basic.css";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import axios from "axios";
import PostCard from "@/components/PostCard";
import "../../styles/loader.css";
import Loader from "@/components/Loader";
import { Checkbox } from "@/components/ui/checkbox"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface ActivityPost {
    _id: string;
    userId: string;
    activityTitle: string;
    activityDescription: string;
    imageUrl: string;
    userFirstName: string;
    userLastName: string;
    price: number;
    tags: string[];
    __v: number;
}

interface CoursePost {
    _id: string;
    userId: string;
    userFirstName: string;
    userLastName: string;
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
    // Data from Backend
    const api = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    
    // Loading State
    const [loading, setLoading] = useState(true);

    // Search
    const [searchInput, setSearchInput] = useState("");

    // Checkbox Filters
    const [typeFilters, setTypeFilters] = useState({
        courses: false,
        activities: false,
    });
    const [priceFilters, setPriceFilters] = useState({
        highToLow: false,
        lowToHigh: false,
    });
    const [tagFilters, setTagFilters] = useState({
        music: false,
        athletic: false,
    });

	const { user } = useUser();
    const router = useRouter();

    const checkProfile = async () => {
        if (!user) {
            return;
        }
        const email = user.primaryEmailAddress.toString();
        const response = await axios.get(`${api}/profiles/getByEmail/${email}`);
        if (response.data.data.length === 0) {
            router.replace('createAccount');
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await checkProfile();
                const postResponse = await axios.get(`${api}/allPosts`);
                setPosts(postResponse.data);
            } catch (error) {
                console.error('Error fetching posts', error);
            } finally {
                setLoading(false);
            };
            }
            fetchData();
        }, [api, user]);

    useEffect(() => {
        filterPosts();
    }, [posts, searchInput, typeFilters, tagFilters, priceFilters]);

    const filterPosts = () => {
        let filtered = posts;
        if (typeFilters.courses || typeFilters.activities) {
            filtered = filtered.filter(post => {
                return (typeFilters.courses && 'courseName' in post) || 
                       (typeFilters.activities && 'activityTitle' in post);
            });
        }

        if (priceFilters.highToLow && !priceFilters.lowToHigh) {
            filtered = [...filtered.sort((a, b) => b.price - a.price)]; 
        } else if (priceFilters.lowToHigh && !priceFilters.highToLow) {
            filtered = [...filtered.sort((a, b) => a.price - b.price)];
        }

        if (tagFilters.music || tagFilters.athletic) {
            filtered = filtered.filter(post => {
                return (tagFilters.music && 'activityTitle' in post && post.tags.includes('music')) || 
                       (tagFilters.athletic && 'activityTitle' in post && post.tags.includes('athletic'));
            });
        }

        if (searchInput) {
            filtered = filtered.filter(post => {
                if ('courseName' in post) {
                    return post.courseName.toLowerCase().includes(searchInput.toLowerCase());
                } else if ('activityTitle' in post) {
                    return post.activityTitle.toLowerCase().includes(searchInput.toLowerCase());
                }
                return false;
            });
        }
        
        setFilteredPosts(filtered);
    };

    const handleTypeChange = (filterCategory) => {
        setTypeFilters(prev => {
            const updatedFilters = {
                ...prev,
                [filterCategory]: !prev[filterCategory],
            };
            return updatedFilters;
        });
    };

    const handlePriceChange = (filterCategory) => {
        setPriceFilters(prev => {
            const updatedFilters = {
                ...prev,
                [filterCategory]: !prev[filterCategory],
            };
            return updatedFilters;
        });
    }

    const handleTagChange = (filterCategory) => {
        setTagFilters(prev => {
            const updatedFilters = {
                ...prev,
                [filterCategory]: !prev[filterCategory],
            };
            return updatedFilters;
        });
    };

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    }

  if (loading) {
    return ( <> <Loader /> </>);
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
            <div>
                <h1 className="font-sans font-bold text-2xl uppercase">filter listings</h1>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>By Type</AccordionTrigger>
                        <AccordionContent>
                            <div className="ml-2 pb-1">
                                <div className="flex items-center space-x-2">                                    
                                    <Checkbox id="courses" checked={typeFilters.courses} onCheckedChange={(e) => handleTypeChange('courses')}/>
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
                                    <Checkbox id="activites" checked={typeFilters.activities} onCheckedChange={(e) => handleTypeChange('activities')}/>
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
                                    <Checkbox id="highToLow" checked={priceFilters.highToLow} onCheckedChange={(e) => handlePriceChange('highToLow')} />
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
                                    <Checkbox id="lowToHigh" checked={priceFilters.lowToHigh} onCheckedChange={(e) => handlePriceChange('lowToHigh')}/>
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
                                    <Checkbox id="athletic" checked={tagFilters.athletic} onCheckedChange={(e) => handleTagChange('athletic')} />
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
                                    <Checkbox id="music" checked={tagFilters.music} onCheckedChange={(e) => handleTagChange('music')}/>
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
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPosts.map((posts) => (
                        <PostCard key={posts._id} post={posts} />
                    ))}
                    </div>
                </div>
        </div>
    </div>
    </>;
};

export default Page;
