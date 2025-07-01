import styles from "../../styles/queries/queries.module.css";
import { useState, useEffect } from "react";

const Queries = () => {
    const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      // const res = await fetch('/api/contact-messages');
      // const data = await res.json();
      // setMessages(data);


      const response = await axios.get('http://localhost:4000/getqueries');
        } catch (err) {
          console.error("Failed to fetch contact messages", err);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
    fetchMessages();
  }, []);

      return (
        <div className={styles.container}>
          <h2>Contact Queries</h2>

          {loading ? (
            <p>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Received At</th>
                    <th>Status</th>
                    <th>Reply</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(msg => (
                    <tr key={msg._id}>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.subject}</td>
                      <td>{msg.message}</td>
                      <td>{moment(msg.createdAt).format("DD MMM YYYY, hh:mm A")}</td>
                      <td>{msg.isReplied ? "Replied" : "Pending"}</td>
                      <td>
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                          className={styles.replyBtn}
                        >
                          Reply
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
  );
}

export default Queries;