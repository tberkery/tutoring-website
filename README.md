Our hello world app is deployed at https://oose-team02-helloworld.netlify.app/

It's built using the MERN stack and other technologies detailed in our "Tech Stack" github issue

# Name of the app 

TutorHub

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

### Configuration

1. Create a .env file in the server directory. Set a variable called ATLAS_URI to the connection string (with user and pwd included) for your cluster:
   ```ATLAS_URI={YOUR_ATLAS_URI}```

### Running the app

1. From the root directory, start the backend server: ```npm run start:api```

2. In another terminal, navigate to the frontend directory: ```cd client```

3. Start the frontend development server:
   ```bash
   npm run start
   ```
# Team 2: Object-Oriented Software Engineering

The goal is to create TutorHub.

Team members: Tad Berkery, Ilana Chalom, Matthew Flynn, Katherine Forbes, Nolan Fogarty, Dokyung Yang
