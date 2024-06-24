<script setup>
  import { ref } from 'vue'

  // Define reactive properties
  const searchQuery = ref('');
  const searchResults = ref([]);

  // Function to fetch data from Stack Exchange API
  const searchStackExchange = async () => {
    try {
      const response = await axios.get('https://api.stackexchange.com/2.3/search', {
        params: {
          order: 'desc',
          sort: 'activity',
          site: 'stackoverflow',
          intitle: searchQuery.value  
        }
      });
      searchResults.value = response.data.items;
    } catch (error) {
      console.error('Error fetching data from Stack Exchange API:', error);
    }
  }
</script>

<template>
    <h1>{{ msg }}</h1>

    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Enter search query">
      <button @click="searchStackExchange">Search</button>
    </div>

    <div v-if="searchResults.length > 0">
      <h2>Search Results:</h2>
      <ul>
        <li v-for="result in searchResults" :key="result.question_id">
          <a :href="result.link" target="_blank">{{ result.title }}</a>
        </li>
      </ul>
    </div>

    <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <!-- <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
      starter
    </p>
    <p>
      Learn more about IDE Support for Vue in the
      <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up
        Guide</a>.
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p> -->
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.search-container {
  margin-bottom: 20px;
}
</style>
