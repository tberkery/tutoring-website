"use client";
import "../../styles/global.css";
import { FC, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import CreatePost from "@/components/CreatePost";

const Page : FC = () => {
	const { user } = useUser();
	const api : string = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const [postType, setPostType] = useState("course");
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("$");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [grade, setGrade] = useState("");
  const [professor, setProfessor] = useState("");
  const [atJHU, setAtJHU] = useState("Yes");
  const [schoolName, setSchoolName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
	const [refilling, setRefilling] = useState(false);

  const createCoursePost = async () => {
    const email = user.primaryEmailAddress.toString();
    const response = await axios.get(`${api}/profiles/getByEmail/${email}`);
    const profile = response.data.data[0];
    let body = {
      courseName: title,
      userId: profile._id,
      courseNumber: number,
      courseDepartment: [ department ],
      takenAtHopkins: atJHU === "Yes"
    }
    if (price !== "") {
      body["price"] = price.replace(/\D/g, '');
    }
    if (semester !== "") {
      body["semesterTaken"] = semester;
    }
    if (grade !== "") {
      body["gradeReceived"] = grade;
    }
    if (atJHU && professor !== "") {
      body["professorTakenWith"] = professor;
    }
    if (!atJHU && schoolName !== "") {
      body["schoolTakenAt"] = schoolName;
    }
    if (description !== "") {
      body["description"] = description;
    }
    console.log(body);
    return await axios.post(`${api}/coursePosts`, body);
  }

  const createActivityPost = async () => {
    const email = user.primaryEmailAddress.toString();
    const response = await axios.get(`${api}/profiles/getByEmail/${email}`);
    const profile = response.data.data[0];
    let body = { 
      activityTitle: title,
      userId: profile._id
    }
    if (price !== "") {
      body["price"] = price.replace(/\D/g, '');
    }
    if (description !== "") {
      body["activityDescription"] = description;
    }
    if (tags.length > 0) {
      body["tags"] = tags;
    }
    // TODO implement pics
    return await axios.post(`${api}/activityPosts`, body);
  }

  const checkAndSubmit = async () => {
    if (title === "" || (postType === "course" && 
    (number === "" || department === ""))
    || (postType === "activity" && description === "")) {
      alert('Please fill out all required fields');
      setRefilling(true);
    } else {
      alert(`Your ${title} post has been created!`);
      let response;
      if (postType === "course") {
        response = await createCoursePost();
      } else {
        response = await createActivityPost();
      }
      console.log(response);
    }
  }

  return <>
    <div className="flex flex-col justify-center items-center my-24 mx-24">
      <CreatePost
        postType={postType}
        setPostType={setPostType}
        title={title}
        setTitle={setTitle}
        number={number}
        setNumber={setNumber}
        price={price}
        setPrice={setPrice}
        department={department}
        setDepartment={setDepartment}
        semester={semester}
        setSemester={setSemester}
        grade={grade}
        setGrade={setGrade}
        professor={professor}
        setProfessor={setProfessor}
        atJHU={atJHU}
        setAtJHU={setAtJHU}
        schoolName={schoolName}
        setSchoolName={setSchoolName}
        tags={tags}
        setTags={setTags}
        description={description}
        setDescription={setDescription}
        refilling={refilling}
        setRefilling={setRefilling}
        submitText="Finish"
        submit={checkAndSubmit}
      />
    </div>
  </>
};

export default Page;