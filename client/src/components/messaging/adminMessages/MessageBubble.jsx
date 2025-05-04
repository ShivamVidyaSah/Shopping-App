// MessageBubble.jsx
const MessageBubble = ({ message }) => {
    const isAdmin = message.sender === "admin";
  
    return (
      <div className={`message-bubble ${isAdmin ? "admin" : "user"}`}>
        <p>{message.text}</p>
      </div>
    );
  };
  
  export default MessageBubble;
  