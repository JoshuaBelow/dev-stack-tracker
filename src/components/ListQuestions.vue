<script setup>
import { ref } from 'vue';
import { searchStackExchange, searchResults } from '../services/ApiService';

const results = ref([]);
const searchExecuted = ref(false);

searchResults.value = results;
</script>


<template>
  <div>
    <button @click="searchStackExchange">Search Stack Exchange</button>
    <ul v-if="searchResults.length > 0">
      <li v-for="result in searchResults" :key="result.question_id">
        <router-link :to="{ name: 'QuestionAnswers', params: { questionId: result.question_id, questionTitle: result.title } }">
          {{ result.title }}
        </router-link>
      </li>
    </ul>
    <p v-else-if="searchExecuted">No results found.</p>
    <p v-else>Click the button to search Stack Exchange.</p>
  </div>
</template>

<style>
/* Your component styles here */
</style>
