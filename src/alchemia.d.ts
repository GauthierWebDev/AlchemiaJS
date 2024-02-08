type AlchemiaResponse = {
  code: number;
  body: string | object | null;
};

type AlchemiaMiddleware = (
  req: import("fastify").FastifyRequest,
  res: import("fastify").FastifyReply,
  next: (err?: Error) => void
) => void;

type AlchemiaController = {
  _middlewares: AlchemiaMiddlewares;
  _methods: AlchemiaMethods;
  _routes: AlchemiaRoutes;
};
