import type { FastifyInstance } from 'fastify';

import fastifyMultipart from '@fastify/multipart';
import fastifyCompress from '@fastify/compress';
import { settings, security } from '$/config';
import fastifyCaching from '@fastify/caching';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';
import { renderPage } from 'vike/server';
import fastifyCors from '@fastify/cors';
import routes from '#/app/routes';
import { root } from './root';
import Fastify from 'fastify';

declare module 'fastify' {
  interface Session {}

  interface FastifyRequest {
    identifier: string;
  }

  interface FastifyNext {
    (err?: Error): void;
  }
}

const isProduction = settings.NODE_ENV === 'production';

const buildServer = async (): Promise<FastifyInstance> => {
  const server = Fastify();

  if (isProduction) {
    server.register(fastifyStatic, {
      root: `${root}/dist/client/assets`,
      prefix: '/assets/',
    });
  } else {
    const vite = await import('vite');
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;

    server.addHook('onRequest', async (request, reply) => {
      const next = () =>
        new Promise<void>((resolve) => {
          viteDevMiddleware(request.raw, reply.raw, resolve);
        });

      await next();
    });
  }

  server
    .register(fastifyCompress)
    .register(fastifyCaching, {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      privacy: 'public',
    })
    .register(fastifyCors, {
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
    .register(fastifyMultipart)
    .register(fastifyCookie)
    .register(fastifySession, {
      secret: security.SESSION_SECRET,
      cookieName: 'session',
      cookie: {
        secure: settings.NODE_ENV === 'production' && settings.PROTOCOL === 'https',
        maxAge: 60 * 60 * 24 * 1000, // 1 day
        httpOnly: true,
        domain: 'localhost',
      },
      saveUninitialized: true,
    })
    .register(routes);

  server.get('*', async (request, reply) => {
    const pageContextInit = {
      urlOriginal: request.raw.url || '',
    };

    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;

    if (!httpResponse) return reply.callNotFound();

    const { statusCode, headers } = httpResponse;
    headers.forEach(([name, value]) => reply.raw.setHeader(name, value));

    reply.status(statusCode);
    httpResponse.pipe(reply.raw);

    return reply;
  });

  return server;
};

export default buildServer;
