const baseURL = 'https://beary-cyou.web7.workers.dev/api';
// const baseURL = 'http://127.0.0.1:8787/api';

export async function getComments(page) {
  const res = await fetch(`${baseURL}/comments?page=${page}&pageSize=10`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
}

export async function postComment(content, nickname) {
  const res = await fetch(`${baseURL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      nickname,
    }),
  });
  return res.json();
}
