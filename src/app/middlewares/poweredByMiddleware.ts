import type { FastifyRequest, FastifyReply } from "fastify";

/**
 * Middleware function to set the "X-Powered-By" header to "AlchemiaJS".
 * @param _req - Fastify request object.
 * @param res - Fastify reply object.
 * @param next - Fastify next function.
 */
const minifyHtmlMiddleware = (
  _req: FastifyRequest,
  res: FastifyReply,
  payload: any,
  next: Function
) => {
  res.header("X-Powered-By", "AlchemiaJS");
  next(null, payload);
};

export default minifyHtmlMiddleware;
