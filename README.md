Our hello world app is deployed at https://oose-team02-helloworld.netlify.app/

It's built using the MERN stack and other technologies detailed in our "Tech Stack" github issue

# Name of the app 

TutorHub

## Installing / Getting started

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have Node.js and npm installed on your machine.
- You have MongoDB installed locally or you have access to a MongoDB instance.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cs421sp24-homework/project-team-02.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd project-team-02/client
   ```

3. Install frontend dependencies:
   ```bash
   npm install react react-dom react-router-dom tailwindcss
   npm install
   ```

4. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

5. Install backend dependencies:
   ```bash
   npm install cors mongoose mongodb express nodemon
   npm install
   ```

## Configuration

1. Create a .env file. Update the variable with your MongoDB connection:
   ```plaintext
   ATLAS_URI={YOUR_ATLAS_URI}
   ```

## Running the app

1. Start the backend server:
   ```bash
   node server/server.js
   ```

2. In another terminal, navigate to the frontend directory:
   ```bash
   cd client
   ```

3. Start the frontend development server:
   ```bash
   npm run start
   ```

4. If you're modifying code, tailwind development command
   ```bash
   npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
   ```
