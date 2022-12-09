import axios from 'redaxios';

const baseURL = 'https://beary-cyou.web7.workers.dev/api';
// const baseURL = 'http://127.0.0.1:8787/api';

export const api = axios.create({
  baseURL,
});

export function getComments(url = '/comments', page) {
  return api.get(url, {
    params: {
      page,
      pageSize: 10,
    },
  });
}

export function postComment(content, nickname) {
  return api.post('/comments', {
    content,
    by_nickname: nickname,
  });
}
