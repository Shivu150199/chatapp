
# Chat App Documentation

## 1. Introduction

**Chat App**

This is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) and WebSockets for real-time communication.

**Features:**
- Real-time messaging
- User authentication
- Online/offline status
- Message history

## 2. Installation

**Prerequisites:**
- Node.js and npm installed
- MongoDB instance running

**Clone the repository:**
\`\`\`bash
git clone url of repository
cd chat-app
\`\`\`

**Install dependencies:**
\`\`\`bash
npm install
cd client
npm install
\`\`\`

## 3. Configuration

**Environment Variables:**
Create a \`.env\` file in the root directory and add the following:
\`\`\`env
PORT=your port
MONGO_URI='your mongo connection uri'
SALT=10
SECRET_KEY="any secret"
\`\`\`

## 4. Usage

**Running the development server:**
\`\`\`bash
npm run dev
\`\`\`
This will start the backend
\`\`\`bash
cd client
npm run dev
\`\`\`
This will start frontend

**Building for production:**
\`\`\`bash
npm run build
\`\`\`

## 5. API Endpoints

**Authentication:**
- \`POST /auth/login\` - Login user
- \`POST /auth/register\` - Register user
-  \`POST /auth/check\` - check authentication
- \`POST /auth/logout\` - logout
- \`POST /auth/getuser\` - get all users



## 6. WebSocket Integration

**Setting up WebSocket connection:**
\`\`\`js
const socket = io('http://localhost:8000');
\`\`\`

**Handling events:**
\`\`\`js
socket.on('message', (message) => {
  console.log('New message:', message);
});

socket.emit('sendMessage', messageContent);
\`\`\`

## 7. Frontend

**Folder structure:**
\`\`\`
client/
  src/
    components/
    pages/
    utils/
    App.js
    main.js
\`\`\`

**Main components:**
- \`Chat.jsx\`
- \`MessageSection.js\`
- \`MessageSidebar.js\`

**State management:**
Using state and redux library to manage state.

## 8. Backend

**Folder structure:**
\`\`\`
aoi/
  controllers/
  models/
  routes/
  utils/
  schemas/
  models/
  index.js
\`\`\`

**Main modules:**
- \`authController.js\`


**Database schema:**
Using Mongoose for MongoDB object modeling.



## 9. Deployment

**Deploying to production:**
deployed on Render.com.


## 10. Troubleshooting

**Common issues:**
- WebSocket connection errors
- Database connection issues
- Authentication problems
- cookies access issue

**Deployed URL:**
[Chat App](https://chatapp-fpc1.onrender.com)




