<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchQuestionAnswers, questionAnswers } from '../services/ApiService';

const route = useRoute();
const router = useRouter();
const questionId = route.params.questionId;
const questionTitle = ref(route.query.title);
const answers = ref([]);

onMounted(async () => {
  await fetchQuestionAnswers(questionId);
  answers.value = questionAnswers.value;
});

function goBack() {
  router.push('/');
}
</script>

<template>
    <button @click="goBack">Back to search results</button>
    <h1>Answers for: {{ questionTitle }}</h1>
    <ul v-if="answers.length > 0">
      <li v-for="answer in answers" :key="answer.answer_id">
        <div v-html="answer.body"></div>
      </li>
    </ul>
    <p v-else>No answers found.</p>
</template>

<style>
/* Your component styles here */
</style>
