"use client";
import React, { FC, useEffect, useState } from "react";
import PostCard from './PostCard'; 
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { profile } from "console";

const samples = [
    {
        id: 1,
        username: 'Nolan Fogarty',
        title: 'OOSE',
        courseId: 'EN.601.421',
        description: 'I will teach you all about OOSE and how to make a great project!',
        imageUrl: "alsbdf",
        price: '150'
      },
      {
        id: 2,
        username: 'Nolan Fogarty',
        title: '',
        courseId: '',
        description: '',
        imageUrl: null,
        price: ''
      },
      {
        id: 3,
        username: 'Nolan Fogarty',
        title: 'OOSE',
        courseId: 'EN.601.421',
        description: 'I will teach you all about OOSE and how to make a great project!',
        classId: null,
        price: '150'
      },
  ];

  interface BrowseSectionProps {
    filterCourses: boolean;
    filterActivities: boolean;
  }

  interface ActivityPost {
    userId: string;
    activityTitle: string;
    activityDescription: string | null;
    activityPostPicKey: string | null;
    price: number | null;
    tags: string[] | null;
  }

  interface CoursePost {
    userId: string;
    courseName: string;
    description: string | null;
    price: number | null;
    courseNumber: string | null;
    courseDepartment: string[] | null;
    gradeReceived: string | null;
    semesterTaken: string | null;
    professorTakenWith: string | null;
    takenAtHopkins: boolean;
    schoolTakenAt: string | null;
    coursePostPicKey: string | null;
  }

  const BrowseSection: React.FC<BrowseSectionProps> = ({ filterCourses, filterActivities }) => {
    const [posts, setPosts] = useState<any[]>([]); // Set the type to any[] since we're using mongoose models directly

    const fetchPosts = async () => {
      try {
        let responseCourses;
        let responseActivities;
        let responseAll;
        if (filterCourses && !filterActivities) {
          responseCourses = await axios.get<CoursePost[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coursePosts`);
          setPosts(responseCourses.data.posts)
        } else if (!filterCourses && filterActivities) {
          responseActivities = await axios.get<ActivityPost[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/activityPosts`);
          setPosts(responseActivities.data)
        } else {
          responseAll = await axios.get<any[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allPosts`); // Fetch all posts
          setPosts(responseAll.data)
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    useEffect(() => {
      fetchPosts();
    }, [filterCourses, filterActivities]); // Run this effect whenever filterCourses or filterActivities changes
  
  
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  };
  
  export default BrowseSection;