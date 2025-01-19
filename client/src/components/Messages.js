import React, { useEffect, useState } from 'react';

const Messages = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        try {
          const response = await fetch(
            `http://localhost:5002/api/messages/${currentUser.id}`
          );
          const data = await response.json();
          setMessages(data.messages || []);
        } catch (err) {
          console.error('Error fetching messages:', err);
        }
      }
    };
    fetchMessages();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Please log in to view messages.</div>;
  }

  if (messages.length === 0) {
    return <div>No messages yet.</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index} style={{ marginBottom: '1rem' }}>
            {currentUser.type === 'shark' && (
              <>
                <strong>Pitch ID:</strong> {message.pitchId} <br />
                <strong>Content:</strong> {message.content} <br />
                <strong>From:</strong> {message.from} <br />
              </>
            )}
            {currentUser.type === 'pitcher' && (
              <>
                <strong>From Shark:</strong> {message.from} <br />
                <strong>Message:</strong> {message.content} <br />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;