"use client";
import React, { FC, useState } from "react";
import { useUser } from "@clerk/nextjs";
import "../../styles/global.css";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ComboBox from "@/components/ComboBox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type course = {
	"name" : string,
	"number" : string
}

const Page : FC = () => {
	const { isLoaded, isSignedIn, user } = useUser();

	if (!isLoaded || !isSignedIn) {
		return null;
	}

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [about, setAbout] = useState("");
	const [department, setDepartment] = useState("");
	const [year, setYear] = useState(2024);
	const [refilling, setRefilling] = useState(false);
	const [affliiateType, setAffiliateType] = useState("student");
	const [courseName, setCourseName] = useState("");
	const [courseNumber, setCourseNumber] = useState("");
	const [courses, setCourses] = useState<course[]>([]);
	const [courseMessage, setCourseMessage] = useState("");

	const checkAndSetYear = (input : string) => {
		let value : number = parseInt(input);
		const current : number = (new Date()).getFullYear();
		if (value > current + 6) {
			value = current + 6;
		} else if (value < current - 4) {
			value = current - 4
		}
		setYear(value);
	}

	const checkAndSubmit = () => {
		if (firstName === "" || lastName === "" || department === "") {
			// missing field!
			alert("Please fill out all required fields")
			setRefilling(true);
		} else {
			// form success!
			alert(`Success! ${firstName} ${lastName}, ${affliiateType}`);
			setRefilling(false);
		}
	}

	const addCourse = () => {
		if (courseName === "" || courseNumber === "")
		{
			setCourseMessage("Please input a course name and number!");
			return;
		}
		setCourseMessage("");
		const newCourse : course = { "name": courseName, "number": courseNumber };
		let newArray = courses.slice();
		newArray.push(newCourse);
		setCourses(newArray);
		setCourseName("");
		setCourseNumber("");
	}

	const removeCourse = (index: number) => {
		let newArray = courses.slice();
		newArray.splice(index, 1);
		setCourses(newArray);
	}

	const departments = [
		"Computer Science",
		"Applied Math",
		"Physics",
		"Really Really Really Long Department Name",
	]

  return <>
		<div className="flex flex-col justify-center items-center my-24 mx-24">
			<div className="
				bg-background flex-grow w-full max-w-4xl p-12 rounded-xl
				shadow-2xl"
			>
				<h1 className="text-4xl font-bold">Welcome to Tutor Hub!</h1>
				<hr/>
				<p>
					To finish setting up your account, please enter the following information
				</p>
				<h3 className="mt-4 text-2xl font-bold">Personal Information</h3>
				<hr/>
				<div className="flex flex-row flex-wrap gap-x-8 gap-y-4 mt-4">
					<div className="flex flex-col flex-grow min-w-60">
						<Label htmlFor="firstName">First Name*</Label>
						<Input 
							id="firstName"
							placeholder="First Name"
							className={ `mt-1 ${ firstName.length === 0 && refilling
								? "outline outline-red-500"
								: ''
							}` }
							value={ firstName }
							onChange={ (event) => setFirstName(event.target.value) } 
						/>
					</div>
					<div className="flex flex-col flex-grow min-w-60">
						<Label htmlFor="lastName">Last Name*</Label>
						<Input
							id="lastName"
							placeholder="Last Name"
							className={ `mt-1 ${ lastName.length === 0 && refilling
								? "outline outline-red-500"
								: ''
							}` }
							value={ lastName }
							onChange={ (event) => setLastName(event.target.value) }
						/>
					</div>
				</div>
				<div className="flex flex-row flex-wrap gap-x-8 gap-y-4 mt-4">
					<div className="flex flex-col flex-grow basis-4 min-w-60">
						<Label htmlFor="email">Email*</Label>
						<Input 
							disabled
							id="email"
							className="mt-1"
							value={ user.primaryEmailAddress.toString() }
						/>
					</div>
					<div className="flex flex-col flex-grow basis-4 min-w-60">
						<Label htmlFor="picture">Profile Picture</Label>
						<Input id="picture" type="file" className="mt-1 cursor-pointer"/>
					</div>
				</div>
				<Label htmlFor="about" className="inline-block mt-4">About Me</Label>
				<Textarea
					className="resize-none"
					value={ about }
					onChange={ (event) => setAbout(event.target.value) }
				/>
				<h3 className="mt-6 text-2xl font-bold">Hopkins Information</h3>
				<hr/>
				<div className="flex flex-row flex-wrap gap-x-8 gap-y-4 mt-4">
					<div className="flex flex-col">
						<Label className="inline-block">Affiliate Type</Label>
						<RadioGroup 
							className="mt-2"
							defaultValue="student"
							onValueChange={ (value) => setAffiliateType(value) }
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="student" id="option-student" />
								<Label htmlFor="option-student">Student</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="faculty" id="option-faculty" />
								<Label htmlFor="option-faculty">Faculty</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="otherAffiliate" id="option-otherAff" />
								<Label htmlFor="option-otherAff">Other</Label>
							</div>
						</RadioGroup>
					</div>
					<div className="flex flex-col flex-grow min-w-60">
						<div className="flex flex-col flex-grow">
							<Label>Department*</Label>
							<ComboBox 
								className={ `w-auto mt-1 ${ department.length === 0 && refilling
									? "outline outline-red-500"
									: ''
								}` }
								prompt="Select Department"
								options={ departments }
								setValueProp={ setDepartment }
							/>
						</div>
						{ affliiateType === "student" ?
							<div className="flex flex-col flex-grow mt-4 min-w-60">
								<Label htmlFor="year">Graduation Year</Label>
								<Input 
									className="mt-1"
									id="year"
									type="number"
									placeholder="Non-students, leave blank"
									value={ year }
									onChange={ (event) => setYear(parseInt(event.target.value)) }
									onBlur={ (event) => checkAndSetYear(event.target.value) }
								/>
							</div>
						:
							""
						}
					</div>
				</div>
				<h3 className="mt-6 text-2xl font-bold">Academic Information</h3>
				<hr/>
				<p>
					Please input any courses you'd like to offer tutoring in (if any)
				</p>
				<div className="flex flex-row mt-4 items-end">
					<div className="flex flex-col flex-grow basis-4 mr-8">
						<Label htmlFor="courseName">Course Name</Label>
						<Input 
							id="courseName"
							className="mt-1"
							placeholder="Course Name"
							value={ courseName }
							onChange={ (event) => setCourseName(event.target.value) }
						/>
					</div>
					<div className="flex flex-col flex-grow basis-4 mr-8">
						<Label htmlFor="courseNum">Course Number</Label>
						<Input 
							id="courseNum"
							className="mt-1"
							placeholder="Course Number"
							value={ courseNumber }
							onChange={ (event) => setCourseNumber(event.target.value) }
						/>
					</div>
					<Button className="w-20" onClick={ addCourse }>Add</Button>
				</div>
				<div className="h-6">
					<p className="text-red-500">{ courseMessage }</p>
				</div>
				<div className="flex flex-col">
					{ courses.map((course : course, index : number) => {
						return <div className="flex flex-row flex-grow mt-2">
							<Input className="mr-8" disabled value={ course.name }/>
							<Input className="mr-8" disabled value={ course.number }/>
							<Button className="w-20" onClick={ () => removeCourse(index) }>
								Remove
							</Button>
						</div>
					}) }
				</div>
				<Button className="mt-8" onClick={ checkAndSubmit }>Finish</Button>
			</div>
		</div>
	</>;
};

export default Page;