import type { FastifyInstance } from 'fastify';

import fastifyMultipart from '@fastify/multipart';
import { settings, security } from '@/config';
import fastifyCaching from '@fastify/caching';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import Fastify from 'fastify';

declare module 'fastify' {
  interface Session {}
}

const buildServer = async (): Promise<FastifyInstance> => {
  const server = Fastify();

  server
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
        secure:
          settings.NODE_ENV === 'production' && settings.PROTOCOL === 'https',
        maxAge: 60 * 60 * 24 * 1000, // 1 day
        httpOnly: true,
        domain: 'localhost',
      },
      saveUninitialized: true,
    })
    .register(require('@/server/app/routes'))
    .register(require('@/server/functions').notFoundHandler, { prefix: '/' });

  return server;
};

export default buildServer;
