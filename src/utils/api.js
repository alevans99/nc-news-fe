import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://nc-news-ae.herokuapp.com/api',
});

export const getTopics = async () => {
  const result = await newsApi.get('/topics');
  const topicObjects = result.data.topics;
  return topicObjects;
};
