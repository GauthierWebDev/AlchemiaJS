import type { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Middleware function to set the "X-Powered-By" header to "AlchemiaJS".
 */
const poweredByMiddleware = async (_request: FastifyRequest, reply: FastifyReply) => {
  reply.header('X-Powered-By', 'AlchemiaJS');
};

export default poweredByMiddleware;
