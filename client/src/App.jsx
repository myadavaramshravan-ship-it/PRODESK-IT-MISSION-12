import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";

import { io } from "socket.io-client";

const socket = io("https://prodesk-it-mission-12.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  if (!joined) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Join Chat</h2>

        <input
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <button onClick={() => setJoined(true)}>
          Join
        </button>
      </div>
    );
  }

  return <Chat socket={socket} username={username} />;
}

export default App;