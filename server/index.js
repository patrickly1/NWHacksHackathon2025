const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const { users, pitches } = require("./data");

const app = express();
const PORT = 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public/uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ROUTES

/**
 * 1. Sign up route (POST /api/signup)
 *    - Creates an account with type = 'shark' or 'pitcher'
 *    - Body: { name, email, password, type }
 */
app.post("/api/signup", (req, res) => {
  const { name, email, password, type } = req.body;

  // Basic validation
  if (!name || !email || !password || !type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Check if user with email already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    type,
    bookmarkedPitches: [], // For sharks
    messages: [], // For sharks or pitchers as needed
  };
  users.push(newUser);

  res.status(201).json({ message: "User created successfully", user: newUser });
});

/**
 * 2. Login route (POST /api/login)
 *    - Simple login just checks if user exists
 */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((u) => u.email === email && u.password === password);
  if (!existingUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful", user: existingUser });
});

/**
 * 3. Create a pitch (POST /api/pitches)
 *    - For pitcher type only
 *    - Body: { title, videoUrl, companyInfo, ownerId }
 */
app.post("/api/pitches", (req, res) => {
  const { title, videoUrl, companyInfo, ownerId } = req.body;

  if (!title || !videoUrl || !companyInfo || !ownerId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const owner = users.find((u) => u.id === ownerId && u.type === "pitcher");
  if (!owner) {
    return res.status(400).json({ message: "Owner must be a valid pitcher account" });
  }

  const newPitch = {
    id: Date.now().toString(),
    title,
    videoUrl,
    companyInfo,
    ownerId,
    messages: [],
  };

  pitches.push(newPitch);
  res.status(201).json({ message: "Pitch created successfully", pitch: newPitch });
});

/**
 * 4. Get all pitches (GET /api/pitches)
 *    - For sharks to view or anyone for demonstration
 */
app.get("/api/pitches", (req, res) => {
  const resolvedPitches = pitches.map((pitch) => {
    const owner = users.find((u) => u.id === pitch.ownerId);
    return {
      ...pitch,
      owner: owner
        ? {
            id: owner.id,
            name: owner.name,
            location: owner.location,
            linkedin: owner.linkedin,
            profilePic: owner.profilePic,
          }
        : null,
    };
  });

  res.status(200).json(resolvedPitches);
});

/**
 * 5. Send message (POST /api/messages)
 *    - Body: { senderId, senderType, recipientId, message }
 */
app.post("/api/messages", (req, res) => {
  const { senderId, senderType, recipientId, message } = req.body;

  if (!senderId || !recipientId || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const recipient = users.find((u) => u.id === recipientId);
  if (!recipient) {
    return res.status(404).json({ message: "Recipient not found" });
  }

  recipient.messages.push({ senderId, senderType, content: message, timestamp: new Date() });
  res.status(201).json({ message: "Message sent successfully" });
});

/**
 * 6. Shark bookmarks a pitch (POST /api/bookmark)
 *    - Body: { sharkId, pitchId }
 */
app.post("/api/bookmark", (req, res) => {
  const { sharkId, pitchId } = req.body;

  const shark = users.find((u) => u.id === sharkId && u.type === "shark");
  if (!shark) {
    return res.status(400).json({ message: "Invalid shark account" });
  }

  if (!pitches.find((p) => p.id === pitchId)) {
    return res.status(404).json({ message: "Pitch not found" });
  }

  if (!shark.bookmarkedPitches.includes(pitchId)) {
    shark.bookmarkedPitches.push(pitchId);
  }

  res.status(200).json({ message: "Pitch bookmarked successfully", shark });
});

/**
 * Fetch a user's details (GET /api/users/:userId)
 */
app.get("/api/users/:userId", (req, res) => {
  const { userId } = req.params;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

/**
 * Fetch messages for a user (GET /api/messages/:userId)
 * - If the user is a shark, return their sent messages
 * - If the user is a pitcher, return messages for their pitches
 */
app.get("/api/messages/:userId", (req, res) => {
  const { userId } = req.params;

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.type === "shark") {
    return res.status(200).json({ messages: user.messages });
  }

  if (user.type === "pitcher") {
    const pitcherPitches = pitches.filter((p) => p.ownerId === userId);
    const receivedMessages = pitcherPitches.flatMap((p) => p.messages);

    return res.status(200).json({ messages: receivedMessages });
  }

  return res.status(400).json({ message: "Invalid user type" });
});

/**
 * 7. Pitcher fetches messages (GET /api/inbox/:pitcherId)
 */
app.get("/api/inbox/:pitcherId", (req, res) => {
  const { pitcherId } = req.params;

  const pitcher = users.find((u) => u.id === pitcherId && u.type === "pitcher");
  if (!pitcher) {
    return res.status(400).json({ message: "Invalid pitcher account" });
  }

  const pitcherPitches = pitches.filter((p) => p.ownerId === pitcherId);
  const messages = pitcherPitches.flatMap((p) => p.messages);

  res.status(200).json({ messages });
});

/**
 * 8. Handle message actions (POST /api/messages/handle)
 */
app.post("/api/messages/handle", (req, res) => {
  const { pitchId, messageId, action } = req.body;

  const pitch = pitches.find((p) => p.id === pitchId);
  if (!pitch) {
    return res.status(404).json({ message: "Pitch not found" });
  }

  const messageIndex = pitch.messages.findIndex((m) => m.id === messageId);
  if (messageIndex === -1) {
    return res.status(404).json({ message: "Message not found" });
  }

  if (action === "delete") {
    pitch.messages.splice(messageIndex, 1);
    return res.status(200).json({ message: "Message deleted" });
  } else if (action === "accept") {
    return res.status(200).json({ message: "Message accepted" });
  }

  return res.status(400).json({ message: "Invalid action" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});