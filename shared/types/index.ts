export interface User {
  id: string;
  username: string;
  passwordHash: string; // The salted hash
  salt: string;
  createdAt: number;
}

export interface Note {
  id: string;
  userId: string;
  rawText: string;
  createdAt: number;
  updatedAt: number;
}

export interface StoryBeat {
  id: string;
  noteId: string;
  text: string;
  order: number;
}

export interface StoryCard {
  id: string;
  noteId: string;
  title: string;
  description: string;
  tags: string[];
  beats: StoryBeat[];
  publishedUrl?: string; // Optional URL for the simple "project story" page
  createdAt: number;
  updatedAt: number;
}

// For frontend rendering
export interface PublishedPage {
  id: string;
  storyCardId: string;
  title: string;
  content: string; // The markdown/HTML content generated from beats
  publishedAt: number;
}
