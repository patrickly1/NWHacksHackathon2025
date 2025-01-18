const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { users, pitches } = require('./data');

const app = express();
const PORT = 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ROUTES

/**
 * 1. Sign up route (POST /api/signup)
 *    - Creates an account with type = 'shark' or 'pitcher'
 *    - Body: { name, email, password, type }
 */
app.post('/api/signup', (req, res) => {
  const { name, email, password, type } = req.body;

  // Basic validation
  if (!name || !email || !password || !type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Check if user with email already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    type,
    bookmarkedPitches: [], // For sharks
    messages: []            // For pitchers or sharks if needed
  };
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully', user: newUser });
});

/**
 * 2. Login route (POST /api/login)
 *    - Simple login just checks if user exists
 */
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((u) => u.email === email && u.password === password);
  if (!existingUser) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful', user: existingUser });
});

/**
 * 3. Create a pitch (POST /api/pitches)
 *    - For pitcher type only
 *    - Body: { title, videoUrl, companyInfo, ownerId }
 */
app.post('/api/pitches', (req, res) => {
  const { title, videoUrl, companyInfo, ownerId } = req.body;

  // Basic validation
  if (!title || !videoUrl || !companyInfo || !ownerId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Verify owner is a pitcher
  const owner = users.find((u) => u.id === ownerId && u.type === 'pitcher');
  if (!owner) {
    return res.status(400).json({ message: 'Owner must be a valid pitcher account' });
  }

  const newPitch = {
    id: Date.now().toString(),
    title,
    videoUrl,
    companyInfo,
    ownerId,
    messages: []
  };

  pitches.push(newPitch);
  res.status(201).json({ message: 'Pitch created successfully', pitch: newPitch });
});

/**
 * 4. Get all pitches (GET /api/pitches)
 *    - For sharks to view or anyone for demonstration
 */
app.get('/api/pitches', (req, res) => {
  res.status(200).json(pitches);
});

/**
 * 5. Send message from a shark to a pitcher (POST /api/messages)
 *    - Body: { pitchId, sharkId, message }
 */
app.post('/api/messages', (req, res) => {
  const { pitchId, sharkId, message } = req.body;

  if (!pitchId || !sharkId || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Find pitch
  const pitch = pitches.find((p) => p.id === pitchId);
  if (!pitch) {
    return res.status(404).json({ message: 'Pitch not found' });
  }

  // Check if user is indeed a shark
  const sharkUser = users.find((u) => u.id === sharkId && u.type === 'shark');
  if (!sharkUser) {
    return res.status(400).json({ message: 'User must be a valid shark account' });
  }

  // Add message to pitch's messages array
  // In a real application, you'd probably store messages in a separate structure
  pitch.messages.push({
    id: Date.now().toString(),
    from: sharkUser.id,
    content: message
  });

  res.status(201).json({ message: 'Message sent successfully', pitch });
});

/**
 * 6. Shark bookmarks a pitch (POST /api/bookmark)
 *    - Body: { sharkId, pitchId }
 */
app.post('/api/bookmark', (req, res) => {
  const { sharkId, pitchId } = req.body;

  const shark = users.find((u) => u.id === sharkId && u.type === 'shark');
  if (!shark) {
    return res.status(400).json({ message: 'Invalid shark account' });
  }

  if (!pitches.find((p) => p.id === pitchId)) {
    return res.status(404).json({ message: 'Pitch not found' });
  }

  if (!shark.bookmarkedPitches.includes(pitchId)) {
    shark.bookmarkedPitches.push(pitchId);
  }

  res.status(200).json({ message: 'Pitch bookmarked successfully', shark });
});

/**
 * 7. Pitcher fetches messages (GET /api/inbox/:pitcherId)
 *    - Return pitches that belong to pitcher with their messages
 */
app.get('/api/inbox/:pitcherId', (req, res) => {
  const { pitcherId } = req.params;

  const pitcher = users.find((u) => u.id === pitcherId && u.type === 'pitcher');
  if (!pitcher) {
    return res.status(400).json({ message: 'Invalid pitcher account' });
  }

  // Find pitches that belong to pitcher
  const pitcherPitches = pitches.filter((p) => p.ownerId === pitcherId);

  // Return messages from these pitches
  res.status(200).json({ pitches: pitcherPitches });
});

/**
 * 8. Pitcher can respond to message (DELETE or something similar)
 *    - For demonstration, let's just handle "delete" or "accept"
 *    - Body: { pitchId, messageId, action }
 */
app.post('/api/messages/handle', (req, res) => {
  const { pitchId, messageId, action } = req.body;

  const pitch = pitches.find((p) => p.id === pitchId);
  if (!pitch) {
    return res.status(404).json({ message: 'Pitch not found' });
  }

  const messageIndex = pitch.messages.findIndex((m) => m.id === messageId);
  if (messageIndex === -1) {
    return res.status(404).json({ message: 'Message not found' });
  }

  if (action === 'delete') {
    pitch.messages.splice(messageIndex, 1);
    return res.status(200).json({ message: 'Message deleted' });
  } else if (action === 'accept') {
    // In a real app, you'd mark the message as "accepted" or start a conversation
    return res.status(200).json({ message: 'Message accepted' });
  }

  return res.status(400).json({ message: 'Invalid action' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});