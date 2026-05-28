<template>
  <div class="p-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-2rem)]">
    <div class="flex justify-between items-center mb-6">
      <button @click="router.push('/dashboard')" class="text-gray-600 hover:text-gray-900">&larr; Back</button>
      <div v-if="story" class="space-x-4">
        <button @click="exportMarkdown" class="text-gray-600 hover:text-gray-900 font-medium">Export MD</button>
        <button v-if="story.publishedUrl" @click="openPublished" class="text-blue-600 font-medium">View Published</button>
        <button @click="handlePublish" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Publish</button>
      </div>
    </div>

    <!-- Mode: Create Notes -->
    <div v-if="!story" class="flex-grow flex flex-col">
      <h2 class="text-2xl font-bold mb-4">Paste Project Notes</h2>
      <p class="text-gray-600 mb-4">Separate thoughts with double line breaks to automatically segment them.</p>
      <textarea v-model="rawText" class="flex-grow p-4 border rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Paste your raw project notes here..."></textarea>
      <button @click="handleProcess" :disabled="!rawText" class="mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium disabled:opacity-50">
        Process into Story
      </button>
    </div>

    <!-- Mode: Edit Story -->
    <div v-else class="flex-grow overflow-y-auto pr-2">
      <div class="bg-white p-6 rounded-lg shadow-sm mb-6 border">
        <input v-model="editTitle" @blur="saveTitle" class="text-3xl font-bold w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none mb-4" />
        <textarea v-model="editDesc" @blur="saveDesc" class="w-full text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none resize-none h-20" placeholder="Story description..."></textarea>
      </div>

      <h3 class="text-xl font-bold mb-4">Story Beats</h3>
      <div class="space-y-4">
        <div v-for="(beat, index) in story.beats" :key="beat.id" class="bg-white p-4 rounded-lg shadow-sm border flex gap-4">
          <div class="text-gray-400 font-bold text-xl">{{ index + 1 }}</div>
          <div class="flex-grow">
            <p class="text-gray-800">{{ beat.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNotesStore } from '../stores/notesStore'

const router = useRouter()
const route = useRoute()
const notesStore = useNotesStore()

const rawText = ref('')
const editTitle = ref('')
const editDesc = ref('')

const storyId = computed(() => route.params.id as string)
const story = computed(() => notesStore.stories.find(s => s.id === storyId.value))

onMounted(async () => {
  if (notesStore.stories.length === 0) {
    await notesStore.fetchStories()
  }
  if (story.value) {
    editTitle.value = story.value.title
    editDesc.value = story.value.description
  }
})

const handleProcess = async () => {
  if (!rawText.value) return
  const newStory = await notesStore.createNote(rawText.value)
  if (newStory) {
    router.replace(`/editor/${newStory.id}`)
  }
}

const saveTitle = () => {
  if (story.value && editTitle.value !== story.value.title) {
    notesStore.updateStory(story.value.id, { title: editTitle.value })
  }
}

const saveDesc = () => {
  if (story.value && editDesc.value !== story.value.description) {
    notesStore.updateStory(story.value.id, { description: editDesc.value })
  }
}

const exportMarkdown = () => {
  if (!story.value) return
  let md = `# ${story.value.title}\n\n*${story.value.description}*\n\n`
  story.value.beats.forEach((b, i) => {
    md += `## Beat ${i + 1}\n${b.text}\n\n`
  })

  const blob = new Blob([md], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${story.value.title.replace(/\s+/g, '-').toLowerCase()}.md`
  a.click()
  URL.revokeObjectURL(url)
}

const handlePublish = async () => {
  if (!story.value) return
  if (!navigator.onLine) {
    alert("You are currently offline. Publishing is disabled.");
    return;
  }
  const data = await notesStore.publishStory(story.value.id)
  alert(`Published! URL: ${data.url}`)
}

const openPublished = () => {
  if (story.value?.publishedUrl) {
    window.open(`${import.meta.env.VITE_API_BASE || 'http://localhost:3000'}${story.value.publishedUrl}`, '_blank')
  }
}
</script>
