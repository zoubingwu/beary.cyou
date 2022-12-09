export interface Env {
  DB: D1Database;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  by_nickname: string;
}

type PostCommentBody = Pick<Comment, 'content' | 'by_nickname'>;

const getComments = async (env: Env, page: number, pageSize: number) => {
  const { results } = await env.DB.prepare(
    'SELECT * FROM Comments ORDER BY rowid DESC LIMIT ? OFFSET ?'
  )
    .bind(pageSize, (page - 1) * pageSize)
    .all<Comment>();

  return Response.json(results);
};

const postComment = async (env: Env, content: string, nickname: string) => {
  const uuid = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES (?,?,?,?)`
  )
    .bind(uuid, createdAt, content, nickname)
    .run();

  return Response.json({ message: 'ok' });
};

export default {
  async fetch(request: Request, env: Env) {
    const { pathname, searchParams } = new URL(request.url);

    if (request.method === 'GET' && pathname === '/api/comments') {
      const page = Number(searchParams.get('page')) || 1;
      const pageSize = Number(searchParams.get('pageSize')) || 10;

      return await getComments(env, page, pageSize);
    }

    if (request.method === 'POST' && pathname === '/api/comments') {
      const body = await request.json<PostCommentBody>();
      const { content, by_nickname } = body;
      if (!content || !by_nickname) {
        return new Response(null, { status: 400 });
      }
      return await postComment(env, body.content, body.by_nickname);
    }

    return new Response(null, { status: 404 });
  },
};
