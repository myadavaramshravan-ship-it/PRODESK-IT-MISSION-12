import { useEffect, useState, useRef } from "react";

function Chat({ socket, username }) {
  const [room, setRoom] = useState("General");
  const [joinedRoom, setJoinedRoom] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const messagesRef = useRef(null);

  const joinRoom = () => {
    setJoinedRoom(true);
  };

  useEffect(() => {
    if (joinedRoom) {
      socket.emit("join_room", { room, username });
      setMessages([]);
    }
  }, [joinedRoom, room, socket, username]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("typing", (name) => {
      setTyping(`${name} is typing...`);

      setTimeout(() => {
        setTyping("");
      }, 1000);
    });

    return () => {
      socket.off("receive_message");
      socket.off("typing");
    };
  }, [socket]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const data = {
      username,
      room,
      message,
    };

    socket.emit("send_message", data);
    setMessages((prev) => [...prev, data]);
    setMessage("");
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", {
      username,
      room,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="app-shell">
      <div className="container">
        <div className="chat-header">
          <div className="chat-title">
            <h3>Chat room</h3>
            <p>Stay connected in a clean and simple space.</p>
          </div>
          <span className="room-badge">Room: {room}</span>
        </div>

        {!joinedRoom ? (
          <>
            <h3>Select a room</h3>
            <p style={{ marginTop: "8px", color: "#6b7280" }}>
              Choose where you want to chat before you join.
            </p>

            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <select className="select" value={room} onChange={(e) => setRoom(e.target.value)}>
                <option value="General">General</option>
                <option value="Tech Support">Tech Support</option>
              </select>

              <button onClick={joinRoom}>Join Room</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: "12px" }}>
              <p>
                <strong>You:</strong> {username}
              </p>
            </div>

            <div className="messages" ref={messagesRef}>
              {messages.length === 0 ? (
                <div className="message system">No messages yet. Start the conversation.</div>
              ) : (
                messages.map((msg, index) => {
                  const isSystem = msg.username === "System";
                  const isOwn = msg.username === username;
                  const cls = `message ${isSystem ? "system" : isOwn ? "own" : ""}`;
                  return (
                    <div key={index} className={cls}>
                      <div style={{ fontSize: "0.9em", marginBottom: 4 }}>
                        <strong>{msg.username}</strong>
                      </div>
                      <div>{msg.message}</div>
                    </div>
                  );
                })
              )}
            </div>

            <p className="typing">{typing}</p>

            <div className="input-area">
              <input
                className="input"
                type="text"
                placeholder="Enter Message"
                value={message}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
              />

              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;