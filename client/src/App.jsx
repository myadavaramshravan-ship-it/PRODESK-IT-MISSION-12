import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";

// Render Backend URL
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

  if (!joined) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Join Chat</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <button onClick={joinChat}>Join</button>
      </div>
    );
  }

  return <Chat socket={socket} username={username} />;
}

export default App;