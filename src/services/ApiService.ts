import axios from 'axios';
import { ref } from 'vue';

const API_BASE_URL = 'https://api.stackexchange.com/2.3';

const searchResults = ref([]);
const questionAnswers = ref([]);

export async function searchStackExchange() {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/advanced`, {
      params: {
        page: 1,
        pagesize: 10,
        order: 'desc',
        sort: 'creation',
        accepted: true,
        answers: 2, //this is to say more than 1 as "answers" is more like "moreThanXAnswers"
        site: 'stackoverflow',
      },
    });
    searchResults.value = response.data.items;
    console.info(searchResults);

  } catch (error) {
    console.error('Error fetching data from Stack Exchange API:', error);
    throw error;
  }
}

export async function fetchQuestionAnswers(questionId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions/${questionId}/answers`, {
      params: {
        order: 'desc',
        sort: 'activity',
        site: 'stackoverflow',
        filter: 'withbody', // Get the full answer body
      },
    });
    questionAnswers.value = response.data.items;
    console.info(questionAnswers);

  } catch (error) {
    console.error('Error fetching answers from Stack Exchange API:', error);
    throw error;
  }
}


export { searchResults, questionAnswers };
