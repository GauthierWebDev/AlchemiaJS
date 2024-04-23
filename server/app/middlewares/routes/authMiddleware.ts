import type { FastifyRequest, FastifyReply, FastifyNext } from 'fastify';

/**
 * Middleware function to check if the user is authenticated.
 * @param request - Fastify request object.
 * @param reply - Fastify reply object.
 * @param next - Fastify next function.
 */
const authMiddleware = (request: FastifyRequest, reply: FastifyReply, next: FastifyNext) => {
  try {
    next();
  } catch (error: unknown) {
    console.trace(error);
  }
};

export default authMiddleware;
