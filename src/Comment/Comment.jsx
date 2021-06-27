import * as React from 'preact';
import { useCallback, useState, useEffect } from 'preact/hooks';
import { getComments, postComment } from './fetch';

export default function Comment() {
  const [page, setPage] = useState(1);
  const [commentCount, setCommentCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
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

    if (sending) return;

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
      setPageCount(res.data.data.pageCount);
      setCommentCount(res.data.data.commentCount);
    });
  }, [page]);

  const paginator = 'underline text-true-gray-500 mr-2 cursor-pointer';

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
          className="<sm:w-full <sm:mb-2 bg-transparent rounded border-2 border-dark-700 border-solid px-2 placeholder-warm-gray-500 h-36px mr-4"
        />
        <button
          onClick={handleSubmitComment}
          disabled={sending}
          className="<sm:w-full w-180px h-36px bg-[#62BA6A] text-white rounded"
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
    <div className="my-2">
      <div className="mb-1">
        <span className="text-dark-800 mr-4 text-base">{name}</span>
        <span className="text-sm text-gray-400">{formatDate(date)}</span>
      </div>

      <div>{content}</div>
    </div>
  );
}
