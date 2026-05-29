import { writeJson } from '../storage/db';
import { generateSalt, hashPassword } from '../auth/auth';
import { User, StoryCard, StoryBeat } from '../../../shared/types';

const seed = async () => {
  console.log('Seeding initial data...');

  // Seed Users
  const salt = generateSalt();
  const passwordHash = hashPassword('password123', salt);
  const user: User = {
    id: 'user_admin',
    username: 'admin',
    passwordHash,
    salt,
    createdAt: Date.now()
  };
  await writeJson('users/users', [user]);

  // Seed Story
  const beats: StoryBeat[] = [
    { id: 'beat_1', noteId: 'note_1', text: 'Started the project setup by initializing Vue and Express.', order: 0 },
    { id: 'beat_2', noteId: 'note_1', text: 'Configured the simple JSON file storage adapter for local testing.', order: 1 }
  ];

  const story: StoryCard = {
    id: 'story_seed_1',
    noteId: 'note_1',
    title: 'Seed Project MVP',
    description: 'The story of how this app was seeded.',
    tags: ['vue', 'node'],
    beats,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  await writeJson('content/stories', [story]);

  console.log('Done.');
};

seed().catch(console.error);