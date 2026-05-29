import { Request, Response } from 'express';
import { readJson, writeJson } from '../storage/db';
import { Note, StoryCard, StoryBeat, PublishedPage } from '../../../shared/types';

// Dummy implementation of story segmentation logic
const segmentNotesIntoBeats = (rawText: string, noteId: string): StoryBeat[] => {
  // Simplistic MVP segmentation: split by double line breaks
  const segments = rawText.split(/\n\s*\n/).filter(s => s.trim().length > 0);
  return segments.map((text, i) => ({
    id: `beat_${Date.now()}_${i}`,
    noteId,
    text: text.trim(),
    order: i,
  }));
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { rawText } = req.body;
    // @ts-ignore
    const userId = req.userId;

    const notes = await readJson<Note[]>('content/notes', []);
    const newNote: Note = {
      id: `note_${Date.now()}`,
      userId,
      rawText,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    notes.push(newNote);
    await writeJson('content/notes', notes);

    // Auto-generate story card
    const beats = segmentNotesIntoBeats(rawText, newNote.id);
    const newStory: StoryCard = {
      id: `story_${Date.now()}`,
      noteId: newNote.id,
      title: 'New Project Story',
      description: 'Auto-generated from notes',
      tags: [],
      beats,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const stories = await readJson<StoryCard[]>('content/stories', []);
    stories.push(newStory);
    await writeJson('content/stories', stories);

    res.json({ note: newNote, story: newStory });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStories = async (req: Request, res: Response) => {
  try {
    const stories = await readJson<StoryCard[]>('content/stories', []);
    // Note: in a real app we'd filter by userId, but we simplified the story mapping here
    res.json({ stories });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateStory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const stories = await readJson<StoryCard[]>('content/stories', []);
    const index = stories.findIndex(s => s.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Story not found' });
    }

    stories[index] = { ...stories[index], ...updates, updatedAt: Date.now() };
    await writeJson('content/stories', stories);

    res.json({ story: stories[index] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const publishStory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const stories = await readJson<StoryCard[]>('content/stories', []);
    const story = stories.find(s => s.id === id);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    const pages = await readJson<PublishedPage[]>('content/pages', []);

    const htmlContent = story.beats.map(b => `<p>${b.text}</p>`).join('\n');

    const newPage: PublishedPage = {
      id: `page_${Date.now()}`,
      storyCardId: story.id,
      title: story.title,
      content: `<h1>${story.title}</h1>\n<p><em>${story.description}</em></p>\n${htmlContent}`,
      publishedAt: Date.now()
    };

    pages.push(newPage);
    await writeJson('content/pages', pages);

    // Update story with published URL
    story.publishedUrl = `/published/${newPage.id}`;
    await writeJson('content/stories', stories);

    res.json({ page: newPage, url: story.publishedUrl });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
