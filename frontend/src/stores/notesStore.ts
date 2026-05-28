import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { StoryCard } from '../../../shared/types';
import { useAuthStore } from './authStore';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
const API_URL = `${API_BASE}/api`;

export const useNotesStore = defineStore('notes', () => {
  const stories = ref<StoryCard[]>([]);
  const currentStory = ref<StoryCard | null>(null);
  const loading = ref(false);
  const authStore = useAuthStore();

  const fetchStories = async () => {
    loading.value = true;
    try {
      const res = await fetch(`${API_URL}/notes/stories`, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      const data = await res.json();
      stories.value = data.stories;
      // Offline fallback: save to localStorage
      localStorage.setItem('offline_stories', JSON.stringify(data.stories));
    } catch (err) {
      console.warn('Network error, loading from cache', err);
      const cached = localStorage.getItem('offline_stories');
      if (cached) stories.value = JSON.parse(cached);
    } finally {
      loading.value = false;
    }
  };

  const createNote = async (rawText: string) => {
    // If offline, save draft locally (MVP simplified offline approach)
    if (!navigator.onLine) {
      alert('You are offline. Note saved as draft.');
      const draft = { id: `draft_${Date.now()}`, rawText };
      localStorage.setItem('draft_note', JSON.stringify(draft));
      return null;
    }

    const res = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ rawText })
    });
    const data = await res.json();
    stories.value.push(data.story);
    return data.story;
  };

  const updateStory = async (id: string, updates: Partial<StoryCard>) => {
    const res = await fetch(`${API_URL}/notes/stories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    const index = stories.value.findIndex(s => s.id === id);
    if (index !== -1) stories.value[index] = data.story;
    if (currentStory.value?.id === id) currentStory.value = data.story;
  };

  const publishStory = async (id: string) => {
    const res = await fetch(`${API_URL}/notes/stories/${id}/publish`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    const data = await res.json();
    await updateStory(id, { publishedUrl: data.url });
    return data;
  };

  return { stories, currentStory, loading, fetchStories, createNote, updateStory, publishStory };
});