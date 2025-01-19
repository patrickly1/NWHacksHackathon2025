// // import React, { useEffect, useState } from 'react';

// // const Messages = ({ currentUser }) => {
// //   const [messages, setMessages] = useState([]);

// //   useEffect(() => {
// //     const fetchMessages = async () => {
// //       if (currentUser) {
// //         try {
// //           const response = await fetch(
// //             `http://localhost:5002/api/messages/${currentUser.id}`
// //           );
// //           const data = await response.json();
// //           setMessages(data.messages || []);
// //         } catch (err) {
// //           console.error('Error fetching messages:', err);
// //         }
// //       }
// //     };
// //     fetchMessages();
// //   }, [currentUser]);

// //   if (!currentUser) {
// //     return <div>Please log in to view messages.</div>;
// //   }

// //   if (messages.length === 0) {
// //     return <div>No messages yet.</div>;
// //   }

// //   return (
// //     <div style={{ padding: '1rem' }}>
// //       <h2>Messages</h2>
// //       <ul>
// //         {messages.map((message, index) => (
// //           <li key={index} style={{ marginBottom: '1rem' }}>
// //             {currentUser.type === 'shark' && (
// //               <>
// //                 <strong>Company:</strong> {message.title} <br />
// //                 <strong>Content:</strong> {message.content} <br />
// //                 <strong>From:</strong> {message.from} <br />
// //               </>
// //             )}
// //             {currentUser.type === 'pitcher' && (
// //               <>
// //                 <strong>From Shark:</strong> {message.from} <br />
// //                 <strong>Message:</strong> {message.content} <br />
// //               </>
// //             )}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Messages;

// import React, { useEffect, useState } from "react";
// import "./style/Messages.css";

// const Messages = ({ currentUser }) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (currentUser) {
//         try {
//           const response = await fetch(
//             `http://localhost:5002/api/messages/${currentUser.id}`
//           );
//           const data = await response.json();
//           setMessages(data.messages || []);
//         } catch (err) {
//           console.error("Error fetching messages:", err);
//         }
//       }
//     };
//     fetchMessages();
//   }, [currentUser]);

//   if (!currentUser) {
//     return <div>Please log in to view messages.</div>;
//   }

//   if (messages.length === 0) {
//     return <div>No messages yet.</div>;
//   }

//   return (
//     <div className="messages-container">
//       <h2>Messages</h2>
//       <ul className="messages-list">
//         {messages.map((message, index) => (
//           <li key={index} className="message-item">
//             <div className="message-avatar">
//               <img
//                 src={message.avatar || "https://via.placeholder.com/50"}
//                 alt={message.title}
//               />
//             </div>
//             <div className="message-content">
//               <div className="message-header">
//                 <p className="message-title">{message.title || "Unknown"}</p>
//                 <span className="message-time">{message.time || "Now"}</span>
//               </div>
//               <p className="message-preview">
//                 {currentUser.type === "shark"
//                   ? `To: ${message.to || "Unknown"}`
//                   : `From: ${message.from || "Unknown"}`}
//                 <br />
//                 {message.content}
//               </p>
//             </div>
//             {message.unread && (
//               <div className="message-notification">{message.unread}</div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Messages;

import React, { useEffect, useState } from "react";
import "./style/Messages.css";

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
          console.error("Error fetching messages:", err);
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
    <div className="messages-container">
      <h2>Messages</h2>
      <ul className="messages-list">
        {messages.map((message, index) => (
          <li key={index} className="message-item">
            <div className="message-avatar">
              <img
                src={
                  message.photo ||
                  "https://via.placeholder.com/50"
                }
                alt="Avatar"
              />
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-title">
                  {message.title || "Unknown"}
                </span>
                <span className="message-time">23 min</span>
              </div>
              <p className="message-preview">
                {message.content || "No message content"}
              </p>
            </div>
            <div className="message-notification">
              {message.notification || 1}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;