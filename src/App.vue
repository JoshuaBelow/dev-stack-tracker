<script setup>
import { createRouter, createWebHistory } from 'vue-router';
import ListQuestions from './components/ListQuestions.vue';
import ViewQuestion from './components/ViewQuestion.vue';

const routes = [
  { path: '/', component: ListQuestions },
  { path: '/question/:questionId', component: ViewQuestion, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">List of Questions</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>
