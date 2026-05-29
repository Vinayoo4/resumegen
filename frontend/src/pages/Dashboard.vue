<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">My Stories</h1>
      <button @click="router.push('/editor')" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        New Project Notes
      </button>
    </div>

    <div v-if="notesStore.loading" class="text-center py-8">Loading...</div>

    <div v-else-if="notesStore.stories.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <p class="text-gray-500 mb-4">No stories yet. Start by adding some project notes.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="story in notesStore.stories" :key="story.id"
           class="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
           @click="router.push(`/editor/${story.id}`)">
        <h3 class="text-xl font-semibold mb-2">{{ story.title }}</h3>
        <p class="text-gray-600 mb-4">{{ story.description }}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="tag in story.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-sm rounded-full">
            {{ tag }}
          </span>
        </div>
        <div class="text-sm text-gray-500 flex justify-between items-center">
          <span>{{ story.beats.length }} beats</span>
          <span v-if="story.publishedUrl" class="text-green-600 font-medium">Published</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notesStore'

const router = useRouter()
const notesStore = useNotesStore()

onMounted(() => {
  notesStore.fetchStories()
})
</script>
