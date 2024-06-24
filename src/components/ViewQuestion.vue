
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchQuestionAnswers, questionAnswers } from '../services/ApiService';
import { shuffleArray } from '../utils/ArrayFun';

const route = useRoute();
const router = useRouter();
const questionId = route.params.questionId;
const questionTitle = ref(route.query.title);
const answers = ref([]);
const shuffledAnswers = ref([]);

onMounted(async () => {
  await fetchQuestionAnswers(questionId);
  answers.value = questionAnswers.value;
  shuffledAnswers.value = shuffleArray([...answers.value]);
});

function goBack() {
  router.push('/');
}
</script>


<template>
  <div class="container mx-auto mt-4">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3" @click="goBack">Back to search results</button>
    <h1 class="text-xl font-semibold mb-4">Answers for: {{ questionTitle }}</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="answer in shuffledAnswers" :key="answer.answer_id">
            <td class="px-6 py-4 whitespace-nowrap" v-html="answer.body"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="shuffledAnswers.length === 0">No answers found.</p>
  </div>
</template>

<style scoped>
/* Your component styles here */
</style>
