import * as React from 'react';

export function CommentItem({ name, date, content }) {
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
