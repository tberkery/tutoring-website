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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Heading1, SpadeIcon } from "lucide-react";
import { useUser } from '@clerk/clerk-react';
import ReviewCard from "@/components/ReviewCard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type activityPostType = {
  _id? : string,
  userId? : string,
  activityTitle? : string,
  activityDescription? : string,
  price? : number,
  tags? : string[],
}

type userType = {
  firstName? : string,
  lastName? : string,
  description? : string,
}

type review = {
  _id: string,
  postId: string,
  postName?: string,
  postType?: string,
  posterId: string,
  reviewerId: string,
  title?: string,
  isAnonymous?: boolean,
  reviewDescription: string,
  rating: number,
}

const Page : FC = ({ params }: { params : { id: string, type: string }}) => {
	const api : string = process.env.NEXT_PUBLIC_BACKEND_URL;
  const postId = params.id;

  const [post, setPost] = useState<activityPostType>({});
  const [poster, setPoster] = useState<userType>({});
  const [imgUrl, setImgUrl] = useState("/jhulogo.jpeg");
  const [loadedPost, setLoadedPost] = useState(false);

  const [posterId, setPosterId] = useState('');
  const [reviewerId, setReviewerId] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const [reviews, setReviews] = useState<review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const reviewSortMethods = [
    "Highest Rating",
    "Lowest Rating"
  ]
  const [reviewSort, setReviewSort] = useState(reviewSortMethods[0]);

  const loadReviews = async () => {
    try {
        const response = await axios.get(`${api}/postReviews/getByPostId/${postId}`);
        let fetchedReviews = response.data.reviews;

            let sumOfRatings = 0;
            const numberOfReviews = fetchedReviews.length;
            setReviewCount(numberOfReviews);

            if (numberOfReviews > 0) {
                for (let i = 0; i < numberOfReviews; i++) {
                    sumOfRatings += fetchedReviews[i].rating;
                }
                setAverageRating(sumOfRatings / numberOfReviews);
                console.log(`Average Rating: ${averageRating}`);
            } else {
                console.log("No ratings yet");
            }
            fetchedReviews.forEach((review) => {
              // @ts-ignore
              review.postName = post.activityTitle;
              review.postType = 'activity';
            });
            fetchedReviews = sortReviews(fetchedReviews);
            setReviews(fetchedReviews); // Set reviews state at the end
        } catch (error) {
        console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (postId && post.activityTitle) {
        loadReviews();
    }
  }, [postId, post, averageRating]);


  const loadOldPost = async () => {
    if (!isLoaded || !isSignedIn) {
      return false;
    }
    const userInfo = await axios.get(`${api}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
    setReviewerId(userInfo.data.data[0]._id);

    const response = await axios.get(`${api}/activityPosts/findOne/${postId}`);
    setPost(response.data.post);

    const imgKey = response.data.post.coursePostPicKey;
    const profile = await axios.get(`${api}/profiles/${response.data.post.userId}`)
    setPoster(profile.data.data);
    setPosterId(response.data.post.userId);
    if (imgKey) {
      try {
        const url = await axios.get(`${api}/activityPostPics/get/${imgKey}`);
        setImgUrl(url.data.coursePostPicKey);
      } catch (e) {
        console.error(e);
      }
    }
    setLoadedPost(true);
  }

  const sortReviews = (unsorted : review[]) => {
    let newReviews = unsorted.slice();
    if (reviewSort === "Lowest Rating") {
      newReviews.sort((a, b) => a.rating - b.rating);
    } else if (reviewSort === "Highest Rating") {
      newReviews.sort((a, b) => b.rating - a.rating);
    }
    return newReviews;
  }

  useEffect(() => { setReviews(sortReviews(reviews)) }, [reviewSort]);

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
      console.log(postId, posterId, reviewerId, rating, comment, isAnonymous)
      const response = await axios.post(`${api}/postReviews/${postId}`, {
        postId,
        posterId,
        reviewerId: reviewerId,
        reviewDescription: comment,
        rating,
        isAnonymous: isAnonymous
      });
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
      <div className="w-2/3 flex flex-col px-20 my-14 border-r border-black">
        <div className="intro border-b border-black pb-10">
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
                <BreadcrumbPage className="capitalize">{post.activityTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-sans font-extrabold uppercase text-5xl leading-none mt-0 mb-1 text-slate-800 pt-2">{post.activityTitle}</h1>
          <h3 className="w-full text-xs tracking-wide leading-tight capitalize font-medium mb-3 text-slate-700">${post.price} / hour</h3>
          <div className="flex items-center justify-between space-x-2">
          <img
            src="/defaultimg.jpeg"
            alt={`Avatar`}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-grow flex flex-col justify-center">
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
      <p className="py-8">{post.activityDescription}</p>
      <div className="flex flex-row gap-x-4 mb-4">
        { reviews.length === 0 ? 
          <h1 className="text-xl font-bold">No Reviews</h1>
        :
          <h1 className="font-sans font-extrabold uppercase text-3xl leading-none mt-0 mb-1 text-slate-800 py-2">Reviews</h1>
        }
        { reviews.length === 0 ? "" :
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div 
                className='px-4 py-2 text-md text-white font-bold bg-custom-blue
                hover:bg-blue-900 rounded-lg flex'
              >
                {reviewSort} <ChevronDown/>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className='bg-blue-300 rounded-xl px-2 py-1.5 border mt-1'
            >
              {
                reviewSortMethods.map((method) => {
                  return (
                    <DropdownMenuItem 
                      key={`sort-${method}`}
                      className='p-0 mb-1 hover:cursor-pointer text-lg font-bold
                      rounded-xl overflow-hidden'
                      onClick={ () => setReviewSort(method) }
                    >
                      <div className='hover:bg-sky-100 px-3 py-1 w-full'>
                        {method}
                      </div>
                    </DropdownMenuItem>
                  );
                })
              }
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </div>
      <div className="w-1/3 flex flex-col items-center pr-20 my-10">
        <div className="content px-20">
          <div className="w-[300px] info-box max-w p-4 border-2 border-black mt-10 mb-6" style={{
              boxShadow: '5px 5px 0px rgba(0, 0, 0, 10)',
            }}>
            <h1 className="bg-blue-300 text-black text-lg font-extrabold uppercase p-1 mb-2 inline-block font-sans">
              About {poster.firstName} {poster.lastName}
            </h1>
            <p className="text-black mb-4 line-clamp-4 overflow-ellipsis">
              {poster.description}
            </p>
            <Link href={`/profile/` + post.userId}  className="bg-black text-white uppercase text-sm px-4 py-2 mt-4">
              Learn More
            </Link>
          </div>
          <div className="review-content">
            <h1 className="font-sans font-extrabold uppercase text-3xl leading-none mt-0 mb-1 text-slate-800 pt-2 self-start">
              leave a review
            </h1>
            <p>Required fields are marked *</p>
            <h2 className="font-sans font-extrabold uppercase text-l leading-none mt-2 mb-0 text-slate-700 pt-2 self-start">tutor rating *</h2>
            <div className="flex py-1 ">
              <StarReview rating={rating} setRating={setRating} />
            </div>
            <h2 className="font-sans font-extrabold uppercase text-l leading-none mt-2 mb-0 text-slate-700 pt-2 self-start">Comment *</h2>
            <Textarea className="resize-none my-2 rounded" onChange={handleCommentChange}/>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={isAnonymous} onChange={handleCheckedChange}/>
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