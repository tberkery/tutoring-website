# Object-Oriented Software Engineering Project

Team members: Tad Berkery, Ilana Chalom, Matthew Flynn, Katherine Forbes, Nolan Fogarty, Dokyung Yang

The tutoring website was built using MERN stack and other technologies detailed in our "Tech Stack" issue

View an overview here: https://docs.google.com/presentation/d/1WR7jA-tGc01Hs1lCPtze69hDLfAj6UUkvK5s18X1m_I/edit?usp=sharing

# The Tutoring Website
<br />
<p align="center">
    <img src="./assets/TuturHubLogo.png">
    <h3 align="center">Comprehensive Tutoring/Learning Platform for BlueJays</h3>

  <p align="center">
    <a href="mailto:dyang40@jh.edu?subject=Mail from Our Site">Report Bug</a>
    ·
    <a href="mailto:dyang40@jh.edu?subject=Mail from Our Site">Request Feature</a>
    ·
    <a href="https://project-team-02-git-frontenddepl-b0804a-nolan-fogartys-projects.vercel.app/">Vercel Demo 🚀</a>
  </p>
      <p align="center"> *The tutoring website is a comprehensive tutoring/learning platform for all JHU affiliates. </p>
</p>

## Installing / Getting started

### Prerequisites

Before you begin, ensure you have met the following requirements:
- You have Node.js (version 21.6.2) and npm installed on your machine.
- You have created a MongoDB Atlas cluster for use with the app.

### Installation

1. Clone the repository: ```git clone https://github.com/cs421sp24-homework/project-team-02.git```

2. Navigate to the frontend directory: ```cd project-team-02/client```

3. Install frontend dependencies: ```npm install```

4. Navigate to the backend directory: ```cd ../server```

5. Install backend dependencies: ```npm install```

6. Navigate to the root directiory: ```cd ..```

See the `package.json` and `package-lock.json` files.

### Configuration

1. Create a .env file in the server directory. Set a variable called ATLAS_URI to the connection string (with user and pwd included) for your cluster:
   ```ATLAS_URI={YOUR_ATLAS_URI}```
   ```ATLAS_URI_TEST={YOUR_ATLAS_URI_FOR_TESTING_CLUSTER}```

3. Create a .env file in the client directory.
   ```NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY={YOUR_CLERK_KEY}```
   ```CLERK_SECRET_KEY={YOUR_SECRET_KEY}```
   ```NEXT_PUBLIC_BACKEND_URL={YOUR_BACKEND_URL}```

4. Use AWS for object storage. Create an AWS account. After establishing your root user, create a new user role called `admin` with full read and write permissions in S3. Create an access key for the admin user role. Encode this info in a file called `aws.env` in the `server` directory in the following format (note that we have omitted our access key ID and secret access key for security reasons):

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-2
AWS_BUCKET_NAME=The tutoring websiteprofilepics
```

3. Make sure you have installed the AWS SDK (one way to do this is `npm install aws-sdk`). Note that installing all contains of the `*.json` files above on the server-side should have already sufficiently accomplished this. This will be integral for ensuring the code and S3 are able to communicate and interact.

### Running the app

Run ```npm i``` in root, server, and client directories to install necessary dependencies.
From the root directory (after appropriate installation), start both the frontend and the backend server simultaneously by executing: ```npm run start:all```

### Viewing Deployed App (Server)

An earlier version of our app is deployed at https://project-team-02-git-frontenddepl-b0804a-nolan-fogartys-projects.vercel.app/
The backend (server) is deployed at : https://The tutoring website-server.onrender.com
To confirm that it is working, you can visit the url and check if you see "Hello World!" message. 

### Navigating the App

Since we haven't created a landing page, please click the  'Sign-In' button to create an account using your JHU email(must end in @jhu.edu). Once an account is created, add '/profile' to the URL to navigate to your profile page. From here, you should be able to Edit Profile as well as Create Posts using the designated buttons. 
