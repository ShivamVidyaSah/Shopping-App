import { useState } from "react";
import styles from "../../../styles/messaging/AdminMessage.module.css";

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([
    { from: "user", text: "Hello, I need help." },
    { from: "admin", text: "Sure! How can I assist you?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "admin", text: newMessage },
    ]);
    setNewMessage("");
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <h3>{user.name}</h3>
      </div>

      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.from === "admin"
                ? styles.adminMessage
                : styles.userMessage
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className={styles.chatInputArea}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.chatInput}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
