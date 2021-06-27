import * as React from 'preact';
import { useCallback, useState, useEffect } from 'preact/hooks';
import { getComments, postComment } from './fetch';

export default function Comment() {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmitComment = useCallback(() => {
    if (!nickname) {
      alert('昵称不能为空');
      return;
    }

    if (!content) {
      alert('内容不能为空');
      return;
    }

    setSending(true);
    postComment(content, nickname)
      .then(() => {
        alert('提交成功，请等待审核通过');
      })
      .catch(e => {
        console.error(e);
        alert('提交失败，请稍后重试');
      })
      .finally(() => setSending(false));
  }, [content, nickname, sending]);

  useEffect(() => {
    getComments(page).then(res => {
      setComments(res.data.data.data);
    });
  }, [page]);

  return (
    <div class="w-full max-w-600px p-8">
      <textarea
        onInput={e => setContent(e.target.value)}
        placeholder="还有话想说..."
        className="w-full min-h-100px bg-transparent rounded border-2 border-dark-700 border-solid p-2 placeholder-warm-gray-500"
      ></textarea>
      <div className="mb-8">
        <input
          onInput={e => setNickname(e.target.value)}
          placeholder="昵称"
          type="text"
          className="bg-transparent rounded border-2 border-dark-700 border-solid px-2 placeholder-warm-gray-500 h-36px mr-4"
        />
        <button
          onClick={handleSubmitComment}
          disabled={sending}
          className="w-180px h-36px bg-[#62BA6A] text-white rounded"
        >
          发送
        </button>
      </div>
      <div>
        {comments.map(i => (
          <CommentItem
            name={i.by_nickname}
            date={i.createdAt}
            content={i.content}
            key={i.id}
          />
        ))}
      </div>
    </div>
  );
}

function formatDate(d) {
  const date = new Date(d);
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();

  return `${YYYY}-${MM}-${dd} ${hh}:${mm}`;
}

function CommentItem({ name, date, content }) {
  return (
    <div className="my-2 pl-4 border-solid border-l-2 border-dark-700">
      <div className="mb-2">
        <span className="text-dark-800 mr-4 text-base">{name}</span>
        <span className="text-sm text-warm-gray-500">{formatDate(date)}</span>
      </div>
      <div>{content}</div>
    </div>
  );
}
