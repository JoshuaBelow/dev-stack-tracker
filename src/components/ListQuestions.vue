<script setup>
import { ref } from 'vue';
import { searchStackExchange, searchResults } from '../services/ApiService';

const results = ref([]);
const searchExecuted = ref(false);

searchResults.value = results;

const executeSearch = async () => {
  try {
    await searchStackExchange();
    results.value = searchResults.value;
    searchExecuted.value = true;
  } catch (error) {
    console.error('Error executing search:', error);
  }
};
</script>

<template>
  <div>hello</div>
  <button @click="searchStackExchange">Search Stack Exchange</button>
  <ul v-if="searchResults.length > 0">
    <li v-for="result in searchResults" :key="result.question_id">
      <a :href="result.link" target="_blank">{{ result.title }}</a>
    </li>
  </ul>
  <p v-else-if="searchExecuted">No results found.</p>
  <p v-else>Click the button to search Stack Exchange.</p>
</template>



<style>
/* Your component styles here */
</style>