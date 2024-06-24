<script setup>
import { ref } from 'vue';
import { searchStackExchange, searchResults } from '../services/ApiService';

const results = ref([]);
const searchExecuted = ref(false);

searchResults.value = results;

async function executeSearch() {
  searchExecuted.value = true;
  await searchStackExchange();
}
</script>

<template>
  <div>
    <button @click="executeSearch" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Search Stack Exchange For Recent Questions
    </button>

    <ul v-if="searchResults.length > 0" class="mt-4">
      <li v-for="result in searchResults" :key="result.question_id" class="mb-2">
        <router-link :to="{ path: `/question/${result.question_id}`, query: { title: result.title } }" class="text-blue-500 hover:underline">
          {{ result.title }}
        </router-link>
      </li>
    </ul>

    <p v-else-if="searchExecuted" class="mt-4 text-gray-600">No results found.</p>
  </div>
</template>

<style>
/* Your component styles here */
</style>
