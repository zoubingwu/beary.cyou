import * as React from 'react';
import { useState, useRef } from 'react';
import { useInViewport } from 'ahooks';
import useSWR from 'swr';

import { postComment, getComments } from './fetch';
import { CommentItem } from './CommentItem';

export default function Comment() {
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const [sending, setSending] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const [inViewport] = useInViewport(ref);
  const [page, setPage] = useState(1);
  const { data, error, mutate } = useSWR(inView ? page : null, getComments);

  const total = data?.total;
  const comments = data?.data;
  const pageCount = Math.ceil(total / 10);
  const paginator = 'underline text-true-gray-500 mr-2 cursor-pointer';

  if (inViewport && !inView) {
    setInView(true);
  }

  const handleSubmitComment = () => {
    if (!nickname || !nickname.trim()) {
      alert('昵称不能为空');
      return;
    }

    if (!content || !content.trim()) {
      alert('内容不能为空');
      return;
    }

    if (sending) return;

    setSending(true);
    postComment(content.trim(), nickname.trim())
      .then(() => {
        setContent('');
      })
      .catch(e => {
        console.error(e);
        alert('提交失败，请稍后重试');
      })
      .finally(() => {
        mutate();
        setSending(false);
      });
  };

  return (
    <div class="w-full max-w-600px p-8" ref={ref}>
      <textarea
        value={content}
        onInput={e => setContent(e.target.value)}
        placeholder="还有话想说..."
        className="w-full min-h-100px bg-transparent rounded border-2 border-dark-700 border-solid p-2 placeholder-warm-gray-500"
      ></textarea>
      <div className="mb-8">
        <input
          value={nickname}
          onInput={e => setNickname(e.target.value)}
          placeholder="昵称"
          type="text"
          className="<sm:w-full <sm:mb-2 bg-transparent rounded border-2 border-dark-700 border-solid px-2 placeholder-warm-gray-500 h-36px mr-4"
        />
        <button
          type="button"
          onClick={handleSubmitComment}
          disabled={sending}
          className="<sm:w-full w-180px h-36px bg-[#62BA6A] text-white rounded"
        >
          {sending ? '发送中' : '发送'}
        </button>
      </div>

      {error && <div>Failed to load comments...</div>}
      {!data && <div>Loading...</div>}

      {comments && (
        <div>
          {comments.map(i => (
            <CommentItem
              name={i.nickname}
              date={i.createdAt}
              content={i.content}
              key={i.id}
            />
          ))}

          {pageCount >= 5 && page > 5 && (
            <a onClick={() => setPage(1)} className={paginator}>
              first
            </a>
          )}
          {pageCount > 1 && page > 1 && (
            <a onClick={() => setPage(page - 1)} className={paginator}>
              prev
            </a>
          )}
          {pageCount > 1 && page < pageCount && (
            <a onClick={() => setPage(page + 1)} className={paginator}>
              next
            </a>
          )}
          {pageCount >= 5 && page < pageCount && (
            <a onClick={() => setPage(pageCount)} className={paginator}>
              last
            </a>
          )}
        </div>
      )}
    </div>
  );
}
