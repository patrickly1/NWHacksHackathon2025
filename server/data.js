/**
 * This file will hold all our in-memory data structures.
 * In Phase 1, we won't use a database. 
 * Once you restart the server, all data resets.
 */
 
// Example user objects
const users = [
    {
      id: 'user1',
      type: 'shark',
      name: 'Mark Cuban',
      email: 'mark.cuban@example.com',
      password: 'mark123',
      bookmarkedPitches: ['pitch1'], // Bookmarked pitch IDs
      messages: [
        {
          pitchId: 'pitch1', // ID of the pitch Mark sent a message about
          to: 'user2', // Sarah Smith (pitcher)
          from: 'Patrick',
          content: 'Hi Sarah, I am really impressed with your AI Startup. Let’s connect!',
          timestamp: '2025-01-18T10:00:00Z'
        },
        {
          pitchId: 'pitch5',
          to: 'user2',
          from: 'Patrick',
          content: 'Your hiring platform is brilliant! Could you share more details?',
          timestamp: '2025-01-18T12:00:00Z'
        }
      ] // Messages sent to pitchers
    },
    {
      id: 'user2',
      type: 'pitcher',
      name: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      password: 'sarah123',
      messages: [
        {
          from: 'user1', // Mark Cuban (shark)
          pitchId: 'pitch1',
          content: 'Hi Sarah, I am really impressed with your AI Startup. Let’s connect!',
          timestamp: '2025-01-18T10:00:00Z'
        },
        {
          from: 'user1',
          pitchId: 'pitch5',
          content: 'Your hiring platform is brilliant! Could you share more details?',
          timestamp: '2025-01-18T12:00:00Z'
        }
      ] // Messages received from sharks
    },
    {
      id: 'user3',
      type: 'pitcher',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'john123',
      messages: []
    },
    {
      id: 'user4',
      type: 'shark',
      name: 'Barbara Corcoran',
      email: 'barbara.corcoran@gmail.com',
      password: 'barbara123',
      bookmarkedPitches: ['pitch2'],
      messages: []
    },
    {
      id: 'user5',
      type: 'pitcher',
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      password: 'emily123',
      messages: []
    }
  ];
  
  // Example pitch objects
  const pitches = [
    {
      id: 'pitch1',
      title: 'Revolutionary AI Startup',
      caption: 'The future of AI is here!',
      videoUrl: 'https://www.example.com/video1.mp4',
      companyInfo: 'We are developing cutting-edge AI to revolutionize the tech industry.',
      ownerId: 'user2', // Sarah Smith owns this pitch
      messages: [
        {
          id: 'msg1',
          from: 'user1', // Mark Cuban
          content: 'I’m interested in learning more about your company!'
        },
        {
          id: 'msg2',
          from: 'user4', // Barbara Corcoran
          content: 'This looks promising! Let’s connect.'
        }
      ]
    },
    {
      id: 'pitch2',
      title: 'Eco-Friendly Product',
      caption: 'Make the planet a better place!',
      videoUrl: 'https://www.example.com/video2.mp4',
      companyInfo: 'We create sustainable, eco-friendly household products to reduce waste.',
      ownerId: 'user3', // John Doe owns this pitch
      messages: [
        {
          id: 'msg3',
          from: 'user1', // Mark Cuban
          content: 'How do you plan to scale this?'
        }
      ]
    },
    {
      id: 'pitch3',
      title: 'Fitness App for Home Workouts',
      caption: 'Better mind better body!',
      videoUrl: 'https://www.example.com/video3.mp4',
      companyInfo: 'A fitness app focused on providing customized home workout plans.',
      ownerId: 'user5', // Emily Johnson owns this pitch
      messages: []
    },
    {
      id: 'pitch4',
      title: 'Renewable Energy Solutions',
      caption: 'Stop global warming',
      videoUrl: 'https://www.example.com/video4.mp4',
      companyInfo: 'We provide innovative solar energy solutions for residential homes.',
      ownerId: 'user3', // John Doe owns this pitch
      messages: []
    },
    {
      id: 'pitch5',
      title: 'AI-Powered Hiring Platform',
      caption: 'AI was used to generate this caption!',
      videoUrl: 'https://www.example.com/video5.mp4',
      companyInfo: 'An AI-powered platform to streamline the hiring process for startups.',
      ownerId: 'user2', // Sarah Smith owns this pitch
      messages: [
        {
          id: 'msg4',
          from: 'user4', // Barbara Corcoran
          content: 'Impressive! I’d like to discuss this further.'
        }
      ]
    }
  ];
  
  module.exports = {
    users,
    pitches
  };