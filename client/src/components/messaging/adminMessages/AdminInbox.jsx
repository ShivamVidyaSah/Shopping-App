// AdminInbox.jsx
import { useState } from "react";
import styles from "../../../styles/messaging/AdminMessage.module.css";
import ChatWindow from "./ChatWindow"; //(You can uncomment when ready)

const dummyUsers = [
  { id: 1, name: "Alice", lastMessage: "Hey there!" },
  { id: 2, name: "Bob", lastMessage: "Need help with order..." },
  { id: 3, name: "Charlie", lastMessage: "Thanks for the support!" },
];

const AdminInbox = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className={styles.messagingContainer}>
      <div className={styles.sidebar}>
        <h2>Inbox</h2>
        {dummyUsers.map((user) => (
          <div
            key={user.id}
            className={`${styles.userEntry} ${selectedUser?.id === user.id ? styles.active : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            <strong>{user.name}</strong>
            <p className={styles.preview}>{user.lastMessage}</p>
          </div>
        ))}
      </div>

      <div className={styles.chatArea}>
        {selectedUser ? (
          <ChatWindow user={selectedUser} />
        ) : (
          <div className={styles.emptyChat}>Select a user to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default AdminInbox;
