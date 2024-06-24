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
  <div>testing things</div>

    <button @click="executeSearch">Search Stack Exchange</button>
    <ul v-if="searchResults.length > 0">
      <li v-for="result in searchResults" :key="result.question_id">
        <RouterLink :to="{ path: `/question/${result.question_id}`, query: { title: result.title } }">
          {{ result.title }}
        </RouterLink>
      </li>
    </ul>
    <p v-else-if="searchExecuted">No results found.</p>
    <p v-else>Click the button to search Stack Exchange.</p>
</template>

<style>
/* Your component styles here */
</style>
