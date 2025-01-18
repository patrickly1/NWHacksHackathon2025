import React, { useState, useEffect } from 'react';

const PitcherDashboard = ({ currentUser }) => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.type === 'pitcher') {
      fetchInbox();
    }
  }, [currentUser]);

  const fetchInbox = async () => {
    try {
      const response = await fetch(`http://localhost:5002/api/inbox/${currentUser.id}`);
      const data = await response.json();
      setInbox(data.pitches);
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser || currentUser.type !== 'pitcher') {
    return <div>Please log in as a pitcher.</div>;
  }

  const handleCreatePitch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5002/api/pitches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          videoUrl,
          companyInfo,
          ownerId: currentUser.id,
        }),
      });
      if (response.ok) {
        alert('Pitch created!');
        setTitle('');
        setVideoUrl('');
        setCompanyInfo('');
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMessageAction = async (pitchId, messageId, action) => {
    try {
      const response = await fetch('http://localhost:5002/api/messages/handle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitchId, messageId, action }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Refresh inbox
        fetchInbox();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Pitcher Dashboard</h2>
      <h3>Create Your Pitch</h3>
      <form onSubmit={handleCreatePitch}>
        <div>
          <label>Title: </label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Video URL: </label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Company Info: </label>
          <textarea
            value={companyInfo}
            onChange={(e) => setCompanyInfo(e.target.value)}
          />
        </div>
        <button type="submit">Create Pitch</button>
      </form>

      <hr />

      <h3>Inbox (Messages)</h3>
      {inbox.length === 0 && <div>No pitches yet.</div>}
      {inbox.map((pitch) => (
        <div key={pitch.id} style={{ border: '1px solid #ccc', margin: '1rem 0' }}>
          <strong>Pitch Title:</strong> {pitch.title}
          <div>
            <strong>Messages:</strong>
            {pitch.messages.length === 0 && <p>No messages yet.</p>}
            {pitch.messages.map((msg) => (
              <div key={msg.id} style={{ marginLeft: '1rem' }}>
                <p>
                  <strong>From (Shark ID):</strong> {msg.from} <br />
                  <strong>Message:</strong> {msg.content}
                </p>
                <button onClick={() => handleMessageAction(pitch.id, msg.id, 'accept')}>
                  Accept
                </button>
                <button onClick={() => handleMessageAction(pitch.id, msg.id, 'delete')}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PitcherDashboard;