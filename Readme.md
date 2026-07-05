# Real-Time Chat Application using Socket.io

A real-time chat application built with React, Node.js, Express, and Socket.io that enables instant messaging, typing indicators, and room-based communication.

## Features
- WebSocket integration using Socket.io
- Real-time client-server communication
- Instant message broadcasting
- React frontend connected to Express backend
- Username-based chat sessions
- Messages displayed with sender name
- Real-time typing indicator
- Multiple chat rooms
- Room selection (General & Tech Support)
- Room-specific messaging
- Messages are visible only to users in the same room

## Tech Stack

### Frontend
- React
- Vite
- Socket.io Client
- CSS

### Backend
- Node.js
- Express.js
- Socket.io
- CORS
- Dotenv

##  Project Structure

```
chat-app/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Chat.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd chat-app
```

---

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
```

Start the backend:

```bash
node server.js
```

---

### Frontend Setup

```bash
cd client
npm install
npm install socket.io-client
npm run dev
```

Open the URL displayed by Vite (usually `http://localhost:5173`).

---

## 📌 How to Use

1. Enter your username.
2. Select a room:
   - General
   - Tech Support
3. Click **Join Room**.
4. Send messages.
5. Open another browser or Incognito window to test multiple users.
6. Users in different rooms cannot see each other's messages.

---