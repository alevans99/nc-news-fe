import axios from 'axios';
const newsApi = axios.create({
  baseURL: 'https://nc-news-ae.herokuapp.com/api',
});

export const getTopics = async () => {
  const result = await newsApi.get('/topics');

  const topicObjects = result.data.topics;
  return topicObjects;
};

export const postNewTopic = async (slug, description) => {
  const result = await newsApi.post(`/topics`, {
    slug,
    description,
  });
  const topicObject = result.data.topic;
  return topicObject;
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

export const getArticlesByUsername = async (username, pageQuery) => {
  let optionalQueries = {};

  optionalQueries['p'] = pageQuery;

  const result = await newsApi.get(`/users/${username}/articles`, {
    params: optionalQueries,
  });

  const articlesObject = result.data;
  return articlesObject;
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

export const postNewArticle = async (author, title, body, topic) => {
  console.log(author, title, body, topic);

  const result = await newsApi.post(`/articles`, {
    author,
    title,
    body,
    topic,
  });
  const articleObject = result.data.article;
  return articleObject;
};

export const deleteArticle = async (articleId) => {
  const result = await newsApi.delete(`/articles/${articleId}`);
  const deletedArticle = result.data;
  return deletedArticle;
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

export const getCommentsByUsername = async (username, pageQuery) => {
  let optionalQueries = {};

  optionalQueries['p'] = pageQuery;

  const result = await newsApi.get(`/users/${username}/comments`, {
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

export const postNewComment = async (articleId, username, body) => {
  const result = await newsApi.post(`/articles/${articleId}/comments`, {
    username,
    body,
  });
  const postedComment = result.data.comment;
  return postedComment;
};

export const deleteComment = async (commentId) => {
  const result = await newsApi.delete(`/comments/${commentId}`);
  const deletedComment = result.data;
  return deletedComment;
};

export const getUserByUsername = async (username) => {
  const result = await newsApi.get(`/users/${username}`);
  const user = result.data.user;
  return user;
};
