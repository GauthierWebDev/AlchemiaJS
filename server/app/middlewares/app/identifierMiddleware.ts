import type { FastifyRequest } from 'fastify';

import fastifyFingerprint from 'fastify-fingerprint';

/**
 * Middleware function to create an identifier for the request.
 */
const identifierMiddleware = async (request: FastifyRequest) => {
  request.identifier = fastifyFingerprint.hash(request.headers);
};

export default identifierMiddleware;
