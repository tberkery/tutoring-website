"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import "@/styles/global.css";
import axios from "axios";
import Navbar from "@/components/Navbar"
import Link from 'next/link';
import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import RatingStars from "@/components/RatingStars";
import ReviewCard from "@/components/ReviewCard";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Profile {
  affiliation: string;
  department: string;
  description: string;
  email: string;
  firstName: string;
  graduationYear: string;
  lastName: string;
  posts: string[];
  availability: number[];
}

interface ActivityPost {
  _id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  activityTitle: string;
  activityDescription: string;
  reviews: Review[],
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
  reviews: Review[],
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

type Review = {
  postId: string,
  postName?: string,
  postType?: string,
  posterId: string,
  reviewerId: string,
  title?: string,
  reviewDescription: string,
  rating: number,
}

const Page : FC = ({ params }: { params : { id: string }}) => {
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewAvg, setReviewAvg] = useState(5);
  const [imgUrl, setImgUrl] = useState("../defaultimg.jpeg");
  const [activeSection, setActiveSection] = useState("Posts");
  const [timeSpent, setTimeSpent] = useState(0);
  const [onPage, setOnPage] = useState(true);
  const [visitorId, setVisitorId] = useState('');

  const timeSpentRef = useRef<Number>();
  useEffect(() => {
    timeSpentRef.current = timeSpent;
  }, [onPage]);

  const visitorIdRef = useRef<string>();
  useEffect(() => {
    visitorIdRef.current = visitorId;
  }, [visitorId])

  useEffect(() => {
    let ratingTotal = 0;
    reviews.forEach((review) => ratingTotal += review.rating);
    console.log(ratingTotal);
    setReviewAvg(ratingTotal / reviews.length);
  }, [reviews])
  
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const fetchData = async () => {
    try {
      if (!user) {
        return;
      }
      console.log("here")
      const email = user.primaryEmailAddress.toString();
      console.log(email)
      console.log("here2")
      const mongooseUserIdResponse = await axios.get(`${api}/profiles/getByEmail/${email}`)
      console.log("here3")
      const mongooseUserId = mongooseUserIdResponse.data.data[0]._id;
      console.log("here4")
      const userInfo = await axios.get(`${api}/profiles/${mongooseUserId}`);
      console.log("here5")
      setProfile(userInfo.data.data);
      const profileId = userInfo.data.data._id
      console.log("profileId")
      console.log(profileId)
      const bookmarksResponse = await axios.get(`${api}/profiles/allBookmarks/${profileId}`);
      const coursePostBookmarkIds = bookmarksResponse.data.data.courseBookmarks
      console.log("coursePostBookmarkIds")
      console.log(coursePostBookmarkIds)
      const activityPostBookmarkIds = bookmarksResponse.data.data.activityBookmarks
      console.log("activityPostBookmarkIds")
      console.log(activityPostBookmarkIds)
      const bookmarks = coursePostBookmarkIds.concat(activityPostBookmarkIds);
      console.log("bookmarks");
      console.log(bookmarks);
      console.log("Noted bookmarks:");
      console.log(bookmarks);

      const postsResponse = await axios.get(`${api}/allPosts/findAllByUserId/${userInfo.data.data._id}`);
      const filteredPosts = postsResponse.data.filter(post => bookmarks.includes(post._id));

      if (filteredPosts.length !== 0) {
        setPosts(filteredPosts);
        let reviews : Review[] = [];
        filteredPosts.forEach((post : Post) => {
            post.reviews.forEach((review) => {
                // @ts-ignore
                review.postName = post.courseName ? post.courseName : post.activityTitle;
                review.postType = 'courseName' in post ? 'course' : 'activity';
                reviews.push(review);
            })
        })
        setReviews(reviews);
        if (userInfo.data.data.profilePicKey) {
        const picUrl = await axios.get(`${api}/profilePics/get/${userInfo.data.data.profilePicKey}`);
        setImgUrl(picUrl.data.imageUrl);
        }
        const profileId = userInfo.data.data._id;
        const reviewEndpoint = `${api}/postReviews/getByProfileId/${profileId}`;
        const reviewResponse = await axios.get(reviewEndpoint);
        console.log(reviewResponse);
      }
    } catch (error) {
      console.error('Error fetching posts', error);
    } finally {
      setLoading(false);
    };
  };

  const getVisitor = async () => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }
    try {
      const response = await axios.get(`${api}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
      const id = response.data.data[0]._id;
      setVisitorId(id);
      if (id === params.id) {
        router.replace('profile');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateProfileViewsAsync = async () => {
    console.log('a');
    if (visitorIdRef.current === '') {
      return;
    }
    console.log('b');
    const endpoint = `${api}/profiles/views/${params.id}`;
    const body = { 
      viewerId: visitorIdRef.current,
      timestamp: new Date(),
      duration: timeSpentRef.current
    };
    await axios.put(endpoint, body);
    return;
  }

  const updateProfileViews = () => {
    console.log('a');
    if (visitorIdRef.current === '') {
      return;
    }
    console.log('b');
    const endpoint = `${api}/profiles/views/${params.id}`;
    const body = { 
      viewerId: visitorIdRef.current,
      timestamp: new Date(),
      duration: timeSpentRef.current
    };
    axios.put(endpoint, body);
    return;
  }

  const handleClickReportUser = () => {
    router.push(`/profile/report/${params.id}`);
  }


  useEffect(() => { getVisitor() }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    fetchData();
    window.addEventListener("blur", () => setOnPage(false));
    window.addEventListener("focus", () => setOnPage(true));
    window.addEventListener("beforeunload", updateProfileViewsAsync);
    return () => {
      window.removeEventListener("blur", () => setOnPage(false));
      window.removeEventListener("focus", () => setOnPage(true));
      window.removeEventListener("beforeunload", updateProfileViewsAsync);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (onPage) {
        setTimeSpent(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [onPage]);

  useEffect(() => updateProfileViews, [])
  

  if (loading) return ( <> <Loader /> </>);

  return (
    <>
      <Navbar />
      <div className="flex justify-evenly items-center bg-blue-300 py-16 px-16">
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl font-extrabold font-sans uppercase text-black">{profile.firstName} {profile.lastName} - {profile.department}
                                            {profile.graduationYear ? `, ${profile.graduationYear}` : ''}</h1>
          <p className="text-s underline font-light mb-2">{profile.email}</p>
          <p className="text-gray-700 text-base">{profile.description}</p>
        </div>
        <div className="flex-none flex flex-col items-center mx-8">
          <img className="w-48 h-48 snap-center rounded-md" src={imgUrl} alt={`${profile.firstName}`} />
          { reviews.length > 0 ?
            <RatingStars rating={reviewAvg} starSize={26} numReviews={reviews.length} className="mt-2"/>
          :
            <></>
          }
          <div className="flex mt-2 space-x-4">
            <button className="bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md" onClick={() => compareAvail()}>
                Compare Availability
            </button>
            
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md" onClick={() => handleClickReportUser()}>
                Report this user
            </button>
          </div>

        </div>
        <div className="w-3/4">
            <div className="container px-6 py-8 mx-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((posts) => (
                    <PostCard key={posts._id} post={posts} onUpdateBookmark={handleBookmarkUpdate}/>
                ))}
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Page;
