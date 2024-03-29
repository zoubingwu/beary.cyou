// Reference: https://developers.cloudflare.com/workers/examples/cors-header-proxy
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
};

function handleOptions(request: Request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers': request.headers.get(
        'Access-Control-Request-Headers'
      ),
    };
    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    });
  }
}

export interface Env {
  DB: D1Database;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  nickname: string;
}

type PostCommentBody = Pick<Comment, 'content' | 'nickname'>;

const getComments = async (env: Env, page: number, pageSize: number) => {
  const { results } = await env.DB.prepare(
    'SELECT * FROM Comments ORDER BY rowid DESC LIMIT ? OFFSET ?'
  )
    .bind(pageSize, (page - 1) * pageSize)
    .all<Comment>();

  const res = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM Comments`
  ).first<{ count: number }>();

  return Response.json({
    data: results,
    total: res.count,
  });
};

const postComment = async (env: Env, content: string, nickname: string) => {
  const uuid = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO Comments(id,createdAt,content,nickname) VALUES (?,?,?,?)`
  )
    .bind(uuid, createdAt, content, nickname)
    .run();

  return Response.json({ message: 'ok' });
};

export default {
  async fetch(request: Request, env: Env) {
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }

    const { pathname, searchParams } = new URL(request.url);
    let response = new Response(null, { status: 404 });
    if (request.method === 'GET' && pathname === '/api/comments') {
      const page = Number(searchParams.get('page')) || 1;
      const pageSize = Number(searchParams.get('pageSize')) || 10;

      response = await getComments(env, page, pageSize);
    } else if (request.method === 'POST' && pathname === '/api/comments') {
      const body = await request.json<PostCommentBody>();
      const { content, nickname } = body;
      if (
        typeof content !== 'string' ||
        typeof nickname !== 'string' ||
        !content ||
        !nickname ||
        content.length > 255 ||
        nickname.length > 100 ||
        !content.trim() ||
        !nickname.trim()
      ) {
        return new Response(null, { status: 400 });
      }

      response = await postComment(env, body.content, body.nickname);
    }

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );

    return response;
  },
};
