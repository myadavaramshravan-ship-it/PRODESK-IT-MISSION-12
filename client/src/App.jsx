import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";

const socket = io("https://prodesk-it-mission-12.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const joinChat = () => {
    if (username.trim() !== "") {
      setJoined(true);
    } else {
      alert("Please enter a username");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      joinChat();
    }
  };

  if (!joined) {
    return (
      <div className="app-shell">
        <div className="auth-card">
          <h2>Welcome to the chat</h2>
          <p>Pick a display name and jump into the conversation.</p>

          <div className="auth-form">
            <input
              className="input"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={joinChat}>Join Chat</button>
          </div>
        </div>
      </div>
    );
  }

  return <Chat socket={socket} username={username} />;
}

export default App;