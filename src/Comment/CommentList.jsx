import * as React from 'react';
import { useState } from 'react';
import useSWR from 'swr';

import { getComments } from './fetch';

export default function CommentList() {
  const [page, setPage] = useState(1);
  const { data, error } = useSWR(['/comments', page], getComments);

  if (error) {
    return 'Failed to load comments.';
  }

  if (!data) {
    return 'Loading...';
  }

  const { total, data: comments } = data.data;
  const pageCount = Math.ceil(total / 10);
  const paginator = 'underline text-true-gray-500 mr-2 cursor-pointer';

  return (
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
  );
}

function CommentItem({ name, date, content }) {
  return (
    <div className="my-2">
      <div className="mb-1">
        <span className="text-dark-800 mr-4 text-base">{name}</span>
        <span className="text-sm text-gray-400">{formatDate(date)}</span>
      </div>

      <div className="text-gray-500">{content}</div>
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
