import type { FastifyInstance } from "fastify";

const createMiddleware =
  (middleware: Function) =>
  (instance: FastifyInstance, _opts: any, done: () => void) => {
    instance.use((req, res, next) => {
      middleware(req, res, next);
    });
    done();
  };

export default createMiddleware;
