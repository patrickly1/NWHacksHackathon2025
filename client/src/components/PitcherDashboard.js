import React, { useState, useEffect } from 'react';
import "./style/PitcherDashboard.css";


const PitcherDashboard = ({ currentUser }) => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState([]);
  const [pitches, setPitches] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.type === 'pitcher') {
      fetchInbox();
    }
  }, [currentUser]);

  const fetchInbox = async () => {
    try {
      const response = await fetch(`http://localhost:5002/api/inbox/${currentUser.id}`);
      const data = await response.json();
      setPitches(data.pitches || []); // Set pitches to an empty array if undefined
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
          caption,
          ownerId: currentUser.id,
        }),
      });
      if (response.ok) {
        alert('Pitch created!');
        setTitle('');
        setVideoUrl('');
        setCaption('');
        fetchInbox(); // Refresh pitches after creating a new one
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
      <h1>Create</h1>
      <p>Curate your posts to attract them sharks!</p>
      <form onSubmit={handleCreatePitch}>
        <div id='titleDiv'>
          <label>Title: </label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter title'
          />
        </div>
        {/* <div className='formDiv'>
          <label>Video URL: </label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div> */}
        <button id='uploadBtn'> {/*IMPLEMENT UPLOAD*/}
          +
          <br></br>
          upload media
        </button>
        <div className='formDiv'>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder=' Enter caption'
          />
        </div>
        <button id='postBtn' type="submit">Post</button>
      </form>

     

      {/* <h3>Your Pitches</h3>
      {pitches.length === 0 && <div>No pitches yet.</div>}
      {pitches.map((pitch) => (
        <div key={pitch.id} style={{ border: '1px solid #ccc', margin: '1rem 0' }}>
          <strong>Pitch Title:</strong> {pitch.title}
        </div>
      ))} */}
    </div>
  );
};

export default PitcherDashboard;