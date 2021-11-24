import axios from 'axios';
const newsApi = axios.create({
  baseURL: 'https://nc-news-ae.herokuapp.com/api',
});

export const getTopics = async () => {
  const result = await newsApi.get('/topics');

  const topicObjects = result.data.topics;
  return topicObjects;
};

export const getArticles = async (topic, sortQuery, pageQuery) => {
  let optionalQueries = {};

  optionalQueries['sort_by'] = sortQuery;
  optionalQueries['p'] = pageQuery;
  if (topic !== 'all' && topic !== undefined) {
    optionalQueries['topic'] = topic;
  }
  const result = await newsApi.get('/articles', { params: optionalQueries });
  const articleObject = result.data;
  return articleObject;
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

export const getComments = async (articleId, pageQuery) => {
  let optionalQueries = {};

  optionalQueries['p'] = pageQuery;

  const result = await newsApi.get(`/articles/${articleId}/comments`, {
    params: optionalQueries,
  });

  const commentsObject = result.data;
  return commentsObject;
};

export const patchCommentVotes = async (commentId, voteChange) => {
  const result = await newsApi.patch(`/comments/${commentId}`, {
    inc_votes: voteChange,
  });
  const commentObject = result.data.comment;
  return commentObject;
};
