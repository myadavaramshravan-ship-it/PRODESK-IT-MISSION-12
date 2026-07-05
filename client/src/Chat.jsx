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
  }, [joinedRoom, room, socket]);

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

  return (
    <div className="container">
      <h2>Chat application</h2>

      {!joinedRoom ? (
        <>
          <h3>Select Room</h3>

          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Tech Support">Tech Support</option>
          </select>

          <br />
          <br />

          <button onClick={joinRoom}>
            Join Room
          </button>
        </>
      ) : (
        <>
          <h3>Room: {room}</h3>
          <p><strong>You:</strong> {username}</p>

          <div className="messages" ref={messagesRef}>
            {messages.map((msg, index) => {
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
            })}
          </div>

          <hr />

          <p className="typing">{typing}</p>

          <div className="input-area">
            <input
              type="text"
              placeholder="Enter Message"
              value={message}
              onChange={handleTyping}
            />

            <button onClick={sendMessage}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;