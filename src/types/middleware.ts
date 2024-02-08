import type { FastifyRequest, FastifyReply, FastifyNext } from "fastify";

export type AlchemiaDecoratorMiddleware = string;

export type AlchemiaMiddleware = (
  req: FastifyRequest,
  res: FastifyReply,
  next: FastifyNext
) => void;
