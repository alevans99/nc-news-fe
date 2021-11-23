import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://nc-news-ae.herokuapp.com/api',
});

export const getTopics = async () => {
  const result = await newsApi.get('/topics');
  const topicObjects = result.data.topics;
  return topicObjects;
};

export const getArticles = async () => {
  const result = await newsApi.get('/articles');
  const articleObjects = result.data.articles;
  return articleObjects;
};

export const getArticleById = async (articleId) => {
  const result = await newsApi.get(`/articles/${articleId}`);
  const articleObject = result.data.article;
  return articleObject;
};

export const patchArticleVotes = async (articleId, voteChange) => {
  const result = await newsApi.patch(`/articles/${articleId}`, {
    inc_votes: voteChange,
  });
  const articleObject = result.data.article;
  return articleObject;
};
