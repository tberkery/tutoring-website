"use client";
import React, { FC, useEffect, useState } from "react";
import axios from 'axios';
import Link from 'next/link'; 
import { useRouter } from "next/navigation";
import "../../styles/global.css";
import { useUser } from '@clerk/clerk-react';
import PostCard from '../../components/PostCard';
import Navbar from "../../components/Navbar"
import Loader from '../../components/Loader';
import RatingStars from "@/components/RatingStars";
import ReviewCard from "@/components/ReviewCard";
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Square, Star } from "lucide-react";

interface ActivityPost {
  _id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
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
  const analyticsSections = ["Overview", "Profile Viewers"];

  const { isLoaded, isSignedIn, user } = useUser();
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [posts, setPosts] = useState<Post[]>([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState("../defaultimg.jpeg");
  const [activeSection, setActiveSection] = useState("Posts");
  const [activeAnalytics, setActiveAnalytics] = useState(analyticsSections[0]);
  const router = useRouter();

  const reviews = [
    {
      'title' : 'Very Good!!',
      'rating' : 5,
      'leftBy' : 'Kat Forbes',
      'post' : 'Piano Lessons',
      'text' : "Review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text",
    },
    {
      'title' : 'Bad Experience...',
      'rating' : 2,
      'leftBy' : 'Ilana Chalom',
      'post' : 'Linear Algebra',
      'text' : "Short review text review text review text review text review text review text review text review text",
    },
    {
      'title' : 'Learned a Lot!',
      'rating' : 4,
      'leftBy' : 'Anonymous',
      'post' : 'Piano Lessons',
      'text' : "Review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text",
    },
  ]

  const viewsData = [
    { label: 'March 4th', value: 20 },
    { label: 'March 11th', value: 12 },
    { label: 'March 18th', value: 15 },
    { label: 'March 25th', value: 39 },
    { label: 'April 1st', value: 25 },
  ];

  const viewedPosts = [
    { title: 'Linear Algebra', views: 79},
    { title: 'Calculus III', views: 54},
    { title: 'Piano Lessons', views: 48},
  ]

  const ratedPosts = [
    { title: 'Calculus III', rating: 4.8 },
    { title: 'Synchronized Swimming', rating: 4.7 },
    { title: 'Piano Lessons', rating: 4.2 },
  ]

  const majorData = [
    { _id: 'Computer Science', count: 32 },
    { _id: 'Applied Math', count: 13 },
    { _id: 'Physics', count: 25 },
  ]

  const yearData = [
    { _id: '2024', count: 38 },
    { _id: '2025', count: 31 },
    { _id: '2026', count: 23 },
    { _id: '2027', count: 19 },
  ]

  const affiliationData = [
    { _id: 'Student', count: 83 },
    { _id: 'Faculty', count: 11 },
    { _id: 'Other', count: 3 },
  ]

  const pieColors = ['#ef4444', '#a3e635', '#38bdf8', '#ec4899', '#f59e0b', '#34d399', '#a855f7']
  
  const fetchData = async () => {
    if (!isLoaded || !isSignedIn) {
      return false;
    }
    try {
      const userInfo = await axios.get(`${api}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
      if (userInfo.data.data.length === 0) {
        router.replace('/createAccount');
      }
      setProfileData(userInfo.data.data[0]);
      const posts = await axios.get(`${api}/allPosts/findAllByUserId/${userInfo.data.data[0]._id}`);
      if (posts.data.length !== 0) {
        setPosts(posts.data);
      }
      const picUrl = await axios.get(`${api}/profilePics/get/${userInfo.data.data[0].profilePicKey}`);
      setImgUrl(picUrl.data.imageUrl);
    } catch (error) {
      console.error('Error fetching posts', error);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchData();
  }, [api, user, isLoaded, isSignedIn]);

  if (loading || !profileData) {
    return (
      <>
        <Loader />
      </>
    )
  }

  const getCustomTooltip = ({ payload, label, active }) => {
    if (active) {
      return (
        <div 
          className="bg-white px-2 py-1 border
          border-slate-300"
        >
          <p className="font-bold text-slate-800">{label}</p>
          <p className="text-gray-600">{`views: ${payload[0].value}`}</p>
        </div>
      );
    }
    return <></>;
  }

  const getAnalyticsOverview = () => {
    return (
      <>
        <div 
          className="flex flex-col flex-grow basis-[440px] 
          min-w-[440px] max-w-[640px]"
        >
          <div className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Number of Profile Views
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid stroke="#ccc"/>
                <Line type="monotone" dataKey="value" stroke="#8884d8" animationDuration={700}/>
                <Tooltip content={getCustomTooltip}/>
                <XAxis dataKey="label"/>
                <YAxis/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Average Time Spent on Profile
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid stroke="#ccc"/>
                <Line type="monotone" dataKey="value" stroke="#8884d8" animationDuration={700}/>
                <Tooltip content={getCustomTooltip}/>
                <XAxis dataKey="label"/>
                <YAxis/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div 
          className="flex flex-col flex-grow basis-[320px] 
          min-w-[320px] max-w-[560px]"
        >
          <div className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Most Viewed Posts
            </h3>
            { viewedPosts.map((post, index) => {
              return <>
                <div
                  className="flex items-center mb-2" 
                  key={`viewed-post-${index}`}
                >
                  <div
                    className="w-9 h-9 mr-5 flex flex-shrink-0 justify-center
                    items-center bg-sky-800 rounded-3xl"
                  >
                    <p className="text-white font-bold text-2xl">
                      {index + 1}
                    </p>
                  </div>
                  <a
                    className="text-lg mr-2 line-clamp-1
                    hover:cursor-pointer hover:underline"
                  >
                    {post.title}
                  </a>
                  <p className="text-slate-500 text-nowrap">
                    ({post.views} views)
                  </p>
                </div>
              </>
            })}
          </div>
          <div className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Highest Rated Posts
            </h3>
            { ratedPosts.map((post, index) => {
              return <>
                <div 
                  className="flex justify-between items-center mb-2"
                  key={`rated-post-${index}`}
                >
                  <div className="flex items-center">
                    <div
                      className="w-9 h-9 mr-5 flex flex-shrink-0
                      justify-center items-center bg-sky-800 rounded-3xl"
                    >
                      <p className="text-white font-bold text-2xl">
                        {index + 1}
                      </p>
                    </div>
                    <a
                      className="text-lg mr-2 line-clamp-1
                      hover:cursor-pointer hover:underline"
                    >
                      {post.title}
                    </a>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <Star size={20} strokeWidth={1} className="fill-yellow-300"/>
                    <p>{post.rating}</p>
                  </div>
                </div>
              </>
            })}
          </div>
        </div>
      </>
    )
  }

  const pieChartLabel = (
    { cx, cy, midAngle, innerRadius, outerRadius, percent }
  ) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
  
    return (
      <text 
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getViewersSection = () => {
    return <>
      <div
        className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md flex-grow
        basis-[480px] min-w-[480px] max-w-[540px]"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">
          Profile Viewers by Major
        </h3>
        <div className="flex">
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie 
                data={majorData}
                dataKey="count"
                nameKey="id"
                outerRadius={130}
                fill='#3b82f6'
                labelLine={false}
                label={pieChartLabel}
                animationDuration={600}
              >
                { majorData.map((data, index) => {
                  return (
                    <Cell 
                      fill={pieColors[index % pieColors.length]}
                      key={`major-pie-cell-${index}`}
                    />
                  )
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-start">
            { majorData.map((data, index) => {
              return (
                <div className="flex gap-x-2">
                  <Square 
                    fill={pieColors[index % pieColors.length]}
                    strokeWidth={1}
                  />
                  <p>{data._id}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div
        className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md flex-grow
        basis-[480px] min-w-[480px] max-w-[540px]"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">
          Profile Viewers by Graduation Year
        </h3>
        <div className="flex">
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie 
                data={yearData}
                dataKey="count"
                nameKey="id"
                outerRadius={130}
                fill='#3b82f6'
                labelLine={false}
                label={pieChartLabel}
                animationDuration={600}
              >
                { yearData.map((data, index) => {
                  return (
                    <Cell 
                      fill={pieColors[index % pieColors.length]}
                      key={`year-pie-cell-${index}`}
                    />
                  )
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-start">
            { yearData.map((data, index) => {
              return (
                <div className="flex gap-x-2">
                  <Square 
                    fill={pieColors[index % pieColors.length]}
                    strokeWidth={1}
                  />
                  <p>{data._id}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div
        className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md flex-grow
        basis-[480px] min-w-[480px] max-w-[540px]"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">
          Profile Viewers by Affiliation Type
        </h3>
        <div className="flex">
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie 
                data={affiliationData}
                dataKey="count"
                nameKey="id"
                outerRadius={130}
                fill='#3b82f6'
                labelLine={false}
                label={pieChartLabel}
                animationDuration={600}
              >
                { affiliationData.map((data, index) => {
                  return (
                    <Cell 
                      fill={pieColors[index % pieColors.length]}
                      key={`year-pie-cell-${index}`}
                    />
                  )
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-start">
            { affiliationData.map((data, index) => {
              return (
                <div className="flex gap-x-2">
                  <Square 
                    fill={pieColors[index % pieColors.length]}
                    strokeWidth={1}
                  />
                  <p>{data._id}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  }

  const getAnalyticsSection = () => {
    return (
      <div className="flex flex-col flex-grow">
        <div className="flex justify-center mb-6">
          <div 
            className="flex flex-row flex-grow-0 px-1 py-1 bg-sky-50 gap-x-1
            rounded-lg"
          >
            { analyticsSections.map((section) => {
              return (
                <button 
                  className={`text-lg px-2 py-1 rounded-md transition
                  ${section === activeAnalytics ? 'bg-sky-200' 
                  : 'hover:bg-blue-300'}`}
                  disabled={section === activeAnalytics}
                  onClick={() => setActiveAnalytics(section)}
                  key={section}
                >
                  {section}
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex justify-center flex-wrap flex-grow gap-x-8">
          { activeAnalytics === "Overview" ? 
            getAnalyticsOverview()
          :
            getViewersSection()
          }
        </div>
      </div>
    );
  }

  const getTabSection = () => {
    if (activeSection === "Posts") {
      return (
        <div 
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2
          lg:grid-cols-3 gap-4"
        >
          { posts.map((post) => (
            <PostCard key={post._id} post={post} />
          )) }
        </div>
      )
    } else if (activeSection === "Reviews") {
      return (
        <div className="flex flex-col justify-center max-w-3xl">
          { reviews.map((review, index) => (
            <ReviewCard 
              key={`review-${index}`}
              review={review}
              className="mb-4 bg-white rounded-lg shadow-md"
            />
          )) }
        </div>
      )
    } else if (activeSection === "Analytics") {
      return getAnalyticsSection();
    } else {
      return <></>
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-evenly items-center bg-blue-300 py-16 px-16">
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl font-extrabold font-sans uppercase text-black">
            {profileData.firstName} {profileData.lastName} - {profileData.department}
            {profileData.graduationYear ? `, ${profileData.graduationYear}` : ''}
          </h1>
          <p className="text-s underline font-light mb-2">{profileData.email}</p>
          <p className="text-gray-700 text-base">{profileData.description}</p>
        </div>
        <div className="flex-none flex flex-col items-center">
          <img className="w-48 h-48 snap-center rounded-md" src={imgUrl} alt={`${profileData.firstName}`} />
          <RatingStars rating={3.7} starSize={26} numReviews={42} className="mt-2"/>
          <div className="flex mt-2 space-x-4">
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
      <div className="w-full bg-blue-300 relative">
        <div className="ml-8 flex items-end">
          { ["Posts", "Reviews", "Analytics"].map((value, index) => {
            return (
              <button 
                key={`tab-${index}`}
                className={`text-md w-32 mx-1 py-2 rounded-t-lg font-bold 
                transition border-black relative -bottom-2 pb-4
                ${activeSection === value ? 
                  "bg-pageBg border-t border-l border-r z-20" :
                  "hover:-translate-y-2 bg-sky-100"}
                `}
                disabled={activeSection === value}
                onClick={ () => setActiveSection(value) }
              >
                { value }
              </button>
            )
          }) }
        </div>
        <div className="w-full bg-pageBg absolute h-4 top-[50px] z-30"/>
        <div
          className="relative z-10 border-t border-black bg-pageBg px-6 py-8
          flex justify-center"
        >
          { getTabSection() }
        </div>
      </div>
    </>
  );
};

export default Page;
