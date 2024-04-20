"use client";
import "@/styles/global.css";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import RatingStars from "@/components/RatingStars";
import Link from "next/link";
import StarReview from "@/components/StarReview";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from '@clerk/clerk-react';
import { set } from "cypress/types/lodash";
import ReviewCard from "@/components/ReviewCard";
import PriceAnalytics from "@/components/PriceAnalytics";

type coursePostType = {
  _id? : string,
  userId? : string,
  courseName? : string,
  description? : string,
  price? : number,
  courseNumber? : string,
  courseDepartment? : string[],
  gradeReceived? : string,
  semesterTaken? : string,
  professorTakenWith? : string,
  takenAtHopkins? : boolean,
  schoolTakenAt? : string,
}

type userType = {
  userId? : string,
  firstName? : string,
  lastName? : string,
  description? : string,
}

const Page : FC = ({ params }: { params : { id: string, type: string }}) => {
	const api : string = process.env.NEXT_PUBLIC_BACKEND_URL;
  const postId = params.id;

  const [post, setPost] = useState<coursePostType>({});
  const [poster, setPoster] = useState<userType>({});
  const [imgUrl, setImgUrl] = useState("/jhulogo.jpeg");
  const [loadedPost, setLoadedPost] = useState(false);

  const [posterId, setPosterId] = useState('');
  const [reviewerId, setReviewerId] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const loadReviews = async () => {
    try {
        const response = await axios.get(`${api}/postReviews/getByPostId/${postId}`);
        const fetchedReviews = response.data.reviews;

            let sumOfRatings = 0;
            const numberOfReviews = fetchedReviews.length;
            setReviewCount(numberOfReviews);

            if (numberOfReviews > 0) {
                for (let i = 0; i < numberOfReviews; i++) {
                    sumOfRatings += fetchedReviews[i].rating;
                }
                setAverageRating(sumOfRatings / numberOfReviews);
            }
            fetchedReviews.forEach((review) => {
              // @ts-ignore
              review.postName = post.courseName;
              review.postType = 'course';
            });
            setReviews(fetchedReviews); // Set reviews state at the end
        } catch (error) {
        console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (postId) {
        loadReviews();
    }
  }, [postId, averageRating]);

  const loadOldPost = async () => {
    if (!isLoaded || !isSignedIn) {
      return false;
    }
    const userInfo = await axios.get(`${api}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
    setReviewerId(userInfo.data.data[0]._id);

    const response = await axios.get(`${api}/coursePosts/findOne/${postId}`);

    setPost(response.data.post);

    const imgKey = response.data.post.coursePostPicKey;
    const profile = await axios.get(`${api}/profiles/${response.data.post.userId}`)
    setPoster(profile.data.data);
    setPosterId(response.data.post.userId);
    if (imgKey) {
      try {
        const url = await axios.get(`${api}/coursePostPics/get/${imgKey}`);
        setImgUrl(url.data.coursePostPicKey);
      } catch (e) {
        console.error(e);
      }
    }
    setLoadedPost(true);
  }

  useEffect(() => { loadOldPost() }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    setIsButtonDisabled(posterId === reviewerId);
  }, [posterId, reviewerId]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleCheckedChange = () => {
    setIsAnonymous(!isAnonymous);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        postId,
        posterId,
        reviewerId: reviewerId,
        reviewDescription: comment,
        rating,
        isAnonymous: isAnonymous,
      };
      console.log(body);
      const response = await axios.post(`${api}/postReviews/${postId}`, body);
      alert(`Your review has been created!`);
      console.log('Review submitted:', response.data);
      setRating(0);
      setComment('');
      setIsAnonymous(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!loadedPost) {
    return <></>;
  }

  return <>
    <Navbar/>
    <div className="flex min-h-screen">
      <div className="flex flex-col w-2/3 px-20 border-r border-black my-14">
        <div className="pb-10 border-b border-black intro">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">TutorHub</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/browse">Browse</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">{post.courseName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="pt-2 mt-0 mb-1 font-sans text-5xl font-extrabold leading-none uppercase text-slate-800">{post.courseName}</h1>
          <h3 className="w-full mb-3 text-xs font-medium leading-tight tracking-wide capitalize text-slate-700">${post.price} / hour</h3>
          <div className="flex items-center justify-between space-x-2">
          <img
            src="/defaultimg.jpeg"
            alt={`Avatar`}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col justify-center flex-grow">
            <span className="text-sm font-semibold">by {poster.firstName} {poster.lastName} - Tutor Hub</span>
            <span className="text-xs text-gray-500">published Mar 30, 2024</span>
          </div>
          <div className="flex flex-col items-end">
            <RatingStars rating={averageRating} starSize={20} />
            <span className="text-sm">
             {averageRating.toFixed(1)} from {reviewCount} reviews
            </span>
          </div>
        </div>
      </div>
      <p className="py-8">{post.description}</p>
      <h1 className="py-2 mt-0 mb-1 font-sans text-3xl font-extrabold leading-none uppercase text-slate-800">Reviews</h1>
      <div className="flex flex-col justify-center max-w-3xl">
          { reviews.map((review, index) => (
            <ReviewCard 
              key={`review-${index}`}
              review={review}
              className="mb-4 bg-white rounded-lg shadow-md"
            />
          )) }
        </div>
    </div>
      <div className="flex flex-col items-center w-1/3 pr-20 my-10">
        <div>
          <PriceAnalytics postId={postId} />
        </div>
        <div className="px-20 content">
          <div className="w-[300px] info-box max-w p-4 border-2 border-black mt-10 mb-6" style={{
              boxShadow: '5px 5px 0px rgba(0, 0, 0, 10)',
            }}>
            <h1 className="inline-block p-1 mb-2 font-sans text-lg font-extrabold text-black uppercase bg-blue-300">
              About {poster.firstName} {poster.lastName}
            </h1>
            <p className="mb-4 text-black line-clamp-4 overflow-ellipsis">
              {poster.description}
            </p>
            <Link href={`/profile/` + post.userId}  className="px-4 py-2 mt-4 text-sm text-white uppercase bg-black">
              Learn More
            </Link>
          </div>
          <div className="review-content">
            <h1 className="self-start pt-2 mt-0 mb-1 font-sans text-3xl font-extrabold leading-none uppercase text-slate-800">
              leave a review
            </h1>
            <p>Required fields are marked *</p>
            <h2 className="self-start pt-2 mt-2 mb-0 font-sans font-extrabold leading-none uppercase text-l text-slate-700">tutor rating *</h2>
            <div className="flex py-1 ">
              <StarReview rating={rating} setRating={setRating} />
            </div>
            <h2 className="self-start pt-2 mt-2 mb-0 font-sans font-extrabold leading-none uppercase text-l text-slate-700">Comment *</h2>
            <Textarea className="my-2 rounded resize-none" onChange={handleCommentChange}/>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={isAnonymous} onCheckedChange={handleCheckedChange}/>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                make my response anonymous
              </label>
            </div>
            <button 
              onClick={handleSubmit} disabled={isButtonDisabled}
              className={`uppercase info-box max-w p-4 border-2 border-black mt-4 mb-6 font-md font-bold ${isButtonDisabled ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-300 text-black'}`} style={{
                boxShadow: '2px 2px 0px rgba(0, 0, 0, 10)',
              }}>
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default Page;