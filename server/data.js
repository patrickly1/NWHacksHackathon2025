/**
 * This file will hold all our in-memory data structures.
 * In Phase 1, we won't use a database. 
 * Once you restart the server, all data resets.
 */
 
// Example user objects
// user = { id, type: 'shark' or 'pitcher', name, email, password, bookmarkedPitches = [], messages = []}
const users = [];

// Example pitch objects
// pitch = { id, title, videoUrl, companyInfo, ownerId (pitcher), messages = [] }
const pitches = [];

module.exports = {
  users,
  pitches
};