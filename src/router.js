import { createRouter, createWebHistory } from 'vue-router';
import ListQuestions from '../src/components/ListQuestions.vue';
import ViewQuestion from '../src/components/ViewQuestion.vue';

const routes = [
  { path: '/', component: ListQuestions },
  { path: '/question/:questionId', component: ViewQuestion, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;