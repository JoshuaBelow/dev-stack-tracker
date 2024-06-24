<script setup>
import { createMemoryHistory, createRouter } from 'vue-router'
import ListQuestions from './components/ListQuestions.vue'
import ViewQuestion from './components/ViewQuestion.vue'

const routes = [
  { path: '/', component: ListQuestions },
  { path: '/ViewQuestion', component: ViewQuestion },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->

  <template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route }}
  </p>
  <nav>hi
    <RouterLink to="/">list of questions</RouterLink>
    <RouterLink to="/ViewQuestion">one question</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
  <ListQuestions/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
