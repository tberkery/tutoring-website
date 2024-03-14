"use client";
import "../../styles/global.css";
import { FC, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ComboBox from "@/components/ComboBox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { X } from "lucide-react";

const Page : FC = () => {
	const { isLoaded, user } = useUser();
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

  const inputPrice = (input: string) => {
    setPrice(`$${input.replace(/\D/g, '')}`);
  }

  const addTag = (tag: string) => {
    let newTags = tags.slice();
    if (!newTags.includes(tag)) {
      newTags.push(tag);
    }
    setTags(newTags);
  }

  const removeTag = (tag: string) => {
    let newTags = tags.slice();
    const index = newTags.indexOf(tag);
    if (index !== -1) {
      newTags.splice(index, 1);
    }
    setTags(newTags);
  }

  const createCoursePost = async () => {
    const email = user.primaryEmailAddress.toString();
    const response = await axios.get(`${api}/profiles/getByEmail/${email}`);
    console.log(response);
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

	const departments = [
		"Computer Science",
		"Applied Math",
		"Physics",
		"Really Really Really Long Department Name",
	];

  const tagOptions = [
    "Athletic",
    "Music",
    "Cooking",
    "Performing Art",
    "Visual Art",
  ].sort();

  return <>
    <div className="flex flex-col justify-center items-center my-24 mx-24">
      <div 
        className="bg-background flex-grow w-full max-w-4xl p-12 rounded-xl
        shadow-2xl"
      >
        <div className="flex items-center">
          <Label className="mr-4 text-lg font-bold">
            I would like to tutor a:
          </Label>
          <RadioGroup
            className="flex"
            defaultValue="course"
            onValueChange={ (value) => setPostType(value) }
          >
            <div className="flex items-center gap-0.5">
              <RadioGroupItem 
                value="course"
                id="option-course"
                className="text-lg"
              />
              <Label 
                htmlFor="option-course"
                className="cursor-pointer text-lg font-bold"
              >
                Course
              </Label>
            </div>
            <div className="flex items-center gap-0.5">
              <RadioGroupItem
                value="activity"
                id="option-activity"
                className="text-lg"
              />
              <Label
                htmlFor="option-activity"
                className="cursor-pointer text-lg font-bold">
                Activity
              </Label>
            </div>
          </RadioGroup>
        </div>
        <hr/>
        <div className="mt-4 flex gap-x-8">
          <div className="flex flex-col flex-grow basis-1">
            <Label htmlFor="title">
              { postType === "course" ?
                "Course Title*"
              :
                "Activity Title*"
              }
            </Label>
            <Input
              id="title"
              className={`mt-1 ${ title.length === 0 && refilling
								? "outline outline-red-500"
								: ''
							}`}
              placeholder="Title"
              value={ title }
              onChange={ (event) => setTitle(event.target.value) }
            />
          </div>
          { postType === "course" ?
            <div className="flex flex-col flex-grow basis-1">
              <Label htmlFor="number">Course Number*</Label>
              <Input
                id="number"
                className={`mt-1 ${ number.length === 0 && refilling
                  ? "outline outline-red-500"
                  : ''
                }`}
                placeholder="Number"
                value={ number }
                onChange={ (event) => setNumber(event.target.value) }
              />
            </div>
          :
            <></>
          }
        </div>
        <div className="mt-4 flex gap-x-8">
          <div className="mt-4 flex flex-grow basis-1 items-center">
            <Label 
              htmlFor="price-low"
              className="whitespace-nowrap mr-2"
            >
              Price (approx per hour):
            </Label>
            <Input
              id="price-low"
              className="flex-grow"
              value={price}
              onChange={(event) => inputPrice(event.target.value)}
            />
          </div>
          <div className="flex flex-col flex-grow basis-1">
            { postType === "course" ? 
              <>
                <Label htmlFor="picture">Department*</Label>
                <ComboBox
                  id="department"
                  prompt="Select*"
                  options={departments}
                  setValueProp={setDepartment}
                  className={`w-full mt-1 ${ department === "" && refilling
                    ? "outline outline-red-500"
                    : ''
                  }`}
                />
              </>
            :
              <>
                <Label htmlFor="picture">Image</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  className="mt-1 mb-0.5 cursor-pointer"
                />
              </>
            }
          </div>
        </div>
        { postType === "course" ?
          <>
            <div className="mt-4 flex gap-x-8">
              <div className="flex flex-col flex-grow basis-1">
                <Label htmlFor="semester">Semester Taken</Label>
                <Input
                  id="semester"
                  className="mt-1"
                  placeholder="Semester"
                  value={ semester }
                  onChange={ (event) => setSemester(event.target.value) }
                />
              </div>
              <div className="flex flex-col flex-grow basis-1">
                <Label htmlFor="grade">Grade Recieved</Label>
                <Input
                  id="grade"
                  className="mt-1"
                  placeholder="Grade"
                  value={ grade }
                  onChange={ (event) => setGrade(event.target.value) }
                />
              </div>
            </div>
            <div className="mt-4 flex gap-x-8">
              <div className="flex flex-col">
                <Label className="inline-block">
                  Did you take this class at JHU?
                </Label>
                <RadioGroup 
                  className="mt-2"
                  defaultValue="Yes"
                  onValueChange={ (value) => setAtJHU(value) }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="option-yes" />
                    <Label htmlFor="option-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="option-no" />
                    <Label htmlFor="option-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
                { atJHU === "Yes" ? 
                  <div className="flex flex-col flex-grow">
                    <Label htmlFor="professor">
                      Who was your professor?
                    </Label>
                    <Input
                      id="professor"
                      className="mt-1"
                      placeholder="Professor"
                      value={ professor }
                      onChange={ (event) => setProfessor(event.target.value) }
                    />
                  </div>
                :
                  <div className="flex flex-col flex-grow">
                    <Label htmlFor="schoolName">
                      If you took it at another school, where?
                    </Label>
                    <Input
                      id="schoolName"
                      className="mt-1"
                      placeholder="School"
                      value={ schoolName }
                      onChange={ (event) => setSchoolName(event.target.value) }
                    />
                  </div>
                }
            </div>
          </>
        :
          <>
            <div className="mt-4 flex gap-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="shadow-sm">
                    Add Tags
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  { tagOptions.map((option) => {
                    return <>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={ () => addTag(option) }
                      >
                        { option }
                      </DropdownMenuItem>
                    </>
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
                <div className="flex gap-x-2 items-center">
                  { tags.map((tag) => {
                    return <>
                      <div 
                        className="px-3 py-1 flex items-center gap-x-1
                        bg-pageBg rounded-xl"
                        key={tag}
                      >
                        {tag}
                        <Button 
                          variant="ghost"
                          className="w-4 h-4 p-0 rounded-lg bg-slate-700
                          text-white"
                          onClick={ () => removeTag(tag) }
                        >
                          <X className="w-3 h-3"/>
                        </Button>
                      </div>
                    </>
                  })}
                </div>
            </div>
          </>
        }
        <Label htmlFor="description" className="inline-block mt-4">
          { postType === "course" ? 
            "Additional Information"
          :
            "Activity Description*"
          }
        </Label>
				<Textarea
					id="description"
          className={`resize-none ${ 
            title.length === 0 && refilling && postType === "activity"
            ? "outline outline-red-500"
            : ''
          }`}
					value={ description }
          placeholder={
            postType === "course" ?
              "Any additional information about your experience taking or tutoring this course"
            :
              "Description of the activity you'll be teaching"
          }
					onChange={ (event) => setDescription(event.target.value) }
        />
				<Button 
          id="submit" 
          className="text-lg mt-8"
          disabled={!isLoaded}
          onClick={ checkAndSubmit }
        >
					Finish
				</Button>
      </div>
    </div>
  </>
};

export default Page;