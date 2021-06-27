import axios from 'redaxios';

const baseURL = 'https://cusdis.com/api/open';
const appId = '3de79b13-ebe6-4f25-a02c-2be3136005e7';
const pageId = 'home-page';
const pageTitle = document.title;
const pageUrl = window.location.href;

export const api = axios.create({
  baseURL,
});

export function getComments(page) {
  return api.get('/comments', {
    params: {
      page,
      appId,
      pageId,
    },
  });
}

export function postComment(content, nickname) {
  return api.post('/comments', {
    data: {
      content,
      nickname,

      email: '',
      appId,
      pageId,
      pageTitle,
      pageUrl,
    },
  });
}
