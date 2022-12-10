import * as React from 'react';
import { useState, useRef } from 'react';
import { useSWRConfig } from 'swr';
import { useInViewport } from 'ahooks';

import CommentList from './CommentList';
import { postComment } from './fetch';

export default function Comment() {
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const [sending, setSending] = useState(false);
  const [inView, setInView] = useState(false);
  const { mutate } = useSWRConfig();
  const ref = useRef();
  const [inViewport] = useInViewport(ref);

  if (inViewport && !inView) {
    setInView(true);
  }

  const handleSubmitComment = () => {
    if (!nickname) {
      alert('昵称不能为空');
      return;
    }

    if (!content) {
      alert('内容不能为空');
      return;
    }

    if (sending) return;

    setSending(true);
    postComment(content, nickname)
      .then(() => {
        setContent('');
      })
      .catch(e => {
        console.error(e);
        alert('提交失败，请稍后重试');
      })
      .finally(() => {
        mutate('/api/comments');
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
          onClick={handleSubmitComment}
          disabled={sending}
          className="<sm:w-full w-180px h-36px bg-[#62BA6A] text-white rounded"
        >
          {sending ? '发送中' : '发送'}
        </button>
      </div>

      {inView && <CommentList />}
    </div>
  );
}
