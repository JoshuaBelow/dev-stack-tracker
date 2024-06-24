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
const notification = ref({
  show: false,
  type: '',
  message: ''
});

onMounted(async () => {
  await fetchQuestionAnswers(questionId);
  answers.value = shuffleArray([...questionAnswers.value]);
});

function goBack() {
  router.push('/');
}

function checkIfCorrect(answer) {
  if (answer.is_accepted === true) {
    answer.checked = true;
    showNotification('success', 'You marked this answer as correct!');
  } else {
    answer.checked = false;
    showNotification('false', 'You marked this answer as incorrect.');
  }
}

function showNotification(type, message) {
  notification.value.type = type;
  notification.value.message = message;
  notification.value.show = true;

  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
}

function closeNotification() {
  notification.value.show = false;
}
</script>

<template>
  <div class="container mx-auto mt-4">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3" @click="goBack">Back to search results</button>
    <h1 class="text-xl font-semibold mb-4">Answers for: {{ questionTitle }}</h1>

    <div v-if="notification.show" class="toast">
      <div :class="['toast-content', notification.type]">
        {{ notification.message }}
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">What answer do you think is correct?</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="answer in answers" :key="answer.answer_id">
            <td class="px-6 py-4">

              <div class="p-4 bg-white shadow-md rounded-lg cursor-pointer"
                   v-if="answer.checked !== undefined" 
                   :class="{'border-2 border-green-500': answer.checked === true, 'border-2 border-red-500': answer.checked === false}"
                   @click="checkIfCorrect(answer)">
                <div class="prose max-w-none" v-html="answer.body"></div>
              </div>
              <div class="p-4 bg-white shadow-md rounded-lg cursor-pointer"
                   v-else
                   @click="checkIfCorrect(answer)">
                <div class="prose max-w-none" v-html="answer.body"></div>
              </div>
            </td>
          </tr>
          <tr v-if="answers.length === 0">
            <td class="px-6 py-4 whitespace-nowrap text-center" colspan="1">No answers found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  text-align: center;
}

.toast-content {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
}

.success {
  background-color: #4CAF50; /* Green */
}

.false {
  background-color: #f44336; /* Red */
}

</style>
