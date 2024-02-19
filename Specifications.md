# Software Requirement Specification

## Problem Statement
There is no current platform for Hopkins students to easily find tutors for a given course/field, or for tutors to easily advertise their services to students. Moreover, it can be difficult for tutors and students to get in touch with one another and discuss logistics (scheduling, hourly rates, accepted payments, etc.) There is a clear need for a comprehensive, user-friendly platform that facilitates seamless matchmaking between students seeking academic support and tutors offering their expertise within the Hopkins ecosystem.

## Proposed Solution
TutorHub is a fully-fledged tutoring marketplace. It seeks to address these challenges by providing a dedicated platform specifically tailored to the Hopkins community, streamlining the process of finding, selecting, and engaging in personalized tutoring sessions and beyond. By offering intuitive search and filtering options, detailed tutor profiles, direct messaging capabilities and review forums, TutorHub aims to enhance the tutoring experience, foster collaboration, and improve learning outcomes for students while empowering tutors to effectively showcase their skills and connect with students in need. As for the quality of tutors, TutorHub itself will not have a special process of verifying the tutors. The first level of qualification comes from the fact that only Hopkins affiliated individuals can access this app. We aim to leverage shared trust already existing in a defined community and augment it with the tutors' self-reported talents. Tutors will showcase their qualification by documenting their relevant experiences, and tutees will freely pick their tutor. There will be repercussions including account bans for any tutors who are continuously reported for reasons including (but not limited to) not showing up to scheduled tutoring sessions, being unprepared for the session, or for not having the level of expertise that they indicated on their profile. Long-term (beyond this semester), there is potential to expand this to be a product marketed to organizations more broadly, but we will use the Hopkins community for our current goals. Beyond tutoring services, TutorHub further aims to provide a comprehensive and inclusive discussion forum. The idea is to have a centralized hub for the exchange of technical help in an efficient and available manner.

## Potential Clients
Our target clients over the course of this project would be JHU affiliates. However, we are also interested in expanding to include students on other university campuses. Whether using the app as a tutor advertising one’s services, or as a tutee looking for a tutor, all users must be JHU affiliates who sign in with their Hopkins account.


## Functional Requirements
- Create Account: As a new user, I want to create an account so that I can access the tutoring app.
- SSO Auth: As a user, I want to sign in using single sign-on authentication so that I can conveniently access the app with my existing Hopkins credentials.
- CRUD Profile: As a user, I want to create, read, update, and delete my profile information so that I can maintain an accurate representation of myself on the platform.
- CRUD Courses Willing to Tutor: As a tutor, I want to list the courses I'm willing to tutor so that potential tutees can see them and connect with me.
- About Me: As a user, I want to share information about myself on my profile so that other users can learn more about me.
- Upload Profile Photo: As a user, I want to upload a profile photo so that my profile is personalized and recognizable to other users.
- Automatic Academic Posts from Completed Profile: As a tutor, I want the information I encoded in my profile to automatically be translated to posts indicating my ability to tutor in courses I indicated so that I don’t have to make a separate post for every course by hand.
- Manual Posts for Non-Academic Tutoring Options: As a tutor, I want to have the ability to manually make a post about a non-academic skill I can tutor in so people interested in that skill can easily find me.
- View Reviews People Left You: As a user, I want to see the reviews that others have left on my profile so that I can gauge my performance and reputation.
- View Other Users' Profile Page: As a user, I want to view the profile page of other users so that I can learn more about them and their offerings.
- Inbox Page: As a user, I want access to my inbox so that I can communicate with other users efficiently.
- Message Other Users (Accessible from Profile): As a user, I want to be able to message other users directly from their profile pages so that I can initiate conversations easily.
- Browsing Page: As a tutee, I want to browse for tutors with the intention of discovering something new and exciting, so that I can expand my knowledge and skills beyond my current interests.
- Basic Searching for Topics: As a tutee, I want to perform basic searches for topics using course numbers or titles so that I can quickly find relevant content.
- Navigate from Post to Profile: As a tutee, I want to easily navigate from a post to the profile of the user who posted it so that I can learn more about them.
- Search for Profiles: As a tutee, I want to be able to search for specific user profiles so that I can find and connect with them.
- Report Accounts: As a user, I would like to be able to report accounts for specific reasons such as ghosting at tutoring sessions, being disrespectful, or not paying, to maintain a safe and respectful community environment.
- Rate Tutors (In Profile): As a tutee, I would like to be able to rate tutors on a scale of 1 to 5 stars and provide an optional review explanation to help other users make informed decisions.


Nice-to-Have Requirements:
- Add Info About Courses: As a tutor, I want to provide additional information about the courses I offer, such as the semester taken and grade received, to give potential tutees more context.
- Advanced Searching: As a user, I would like to perform advanced searches with more criteria such as tutor name, professor name, and available languages, to refine my search results further.
- Tags in Review: As a user, I would like to be able to tag reviews with relevant keywords for easier organization and search, enhancing the review browsing experience.
- Optional Anonymous Reviews: As a user, I would appreciate the option to leave anonymous reviews for tutors, providing feedback without concerns about potential repercussions.
- Filter Reviews: As a user, I would like to be able to filter reviews based on different criteria such as rating or date, to find the most relevant and helpful feedback.
- Bookmark Posts: As a user, I want to be able to bookmark posts for later reference so that I can easily access them again.
- View Bookmarked Posts: As a user, I want to view the posts I have bookmarked so that I can easily access them later.

## Software Architecture & Technology Stack
Type of Application: Web Application

Architecture: Our web application will follow the classic MERN tech stack architecture (MongoDB, Express, React, Node.js), additionally using Typescript, and Clerk

Frontend:

Framework: We are planning to use React and Next.js for building the front-end.

Styling: we plan to use shadcn and Tailwind CSS

Backend:

API: we will build a Restful API with Node and Express

Database: MongoDB, with mongoose, chosen for its flexibility and thorough documentation

ORM: we don't anticipate needing one here since we are currently planning to rely on a No-SQL database, but we also recognize that there might be more to learn here.

Deployment:

Hosting: we are interested in using Netlify for our front end, and Heroku for the back end.

Additional Technologies:

Version Control: Git and GitHub for version control and collaborative development.
Testing Frameworks: we plan to use the React Testing Library for front-end tests. We will use Jest for backend testing and will use Postman/Insomnia for quick API testing.

## Similar Existing Apps

Certain courses at Hopkins have PILOT, which facilitates tutoring groups. However, this is very limited in what courses/areas it applies to, and the method of the tutoring is standardized and inflexible, only offering group tutoring at specific times each week. TutorHub can provide a solution to this by providing students with access to flexible, individual/group tutoring opportunities on a large range of academic and non-academic topics. Additionally, students get busy for various reasons, so all scheduling is handled between the tutor and the student to provide needed flexibility.
There are many different tutor finding apps and websites (ex. tutoraround.com), but none that are associated with Hopkins. Our app can leverage both the community at Hopkins, and the data available from JHU student accounts to make the tutoring experience easier, more successful, and tailored to the Hopkins community.
