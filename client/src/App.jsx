import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";

const socket = io("http://localhost:5000");

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