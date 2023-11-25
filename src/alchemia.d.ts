type AlchemiaResponse = {
  code: number;
  body: string | object | null;
};

type AlchemiaDictionaryTexts = {
  [key: string]: string | number | null | string[] | AlchemiaDictionaryTexts;
};

type AlchemiaDictionary = {
  language: string;
  texts: AlchemiaDictionaryTexts;
};

type AlchemiaMethod = "get" | "post" | "put" | "delete";

type AlchemiaMethods = {
  [key: string]: AlchemiaMethod;
};

type AlchemiaRoutes = {
  [key: string]: string;
};

type AlchemiaMiddlewares = {
  [key: string]: string[];
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

type AlchemiaQueryBuilderInstructions = {
  select: string[];
  where: string[];
  orWhere: string[];
  join: string[];
  on: string[];
  groupBy: string[];
  having: string[];
  orderBy: string[];
  limit: string[];
};

type AlchemiaQueryBuilderInstruction =
  AlchemiaQueryBuilderInstructions[keyof AlchemiaQueryBuilderInstructions];

type AlchemiaQueryBuilderField = string | number | null | string[] | number[];

type AlchemiaQueryBuilderSQL = {
  query: string;
  params: any[];
};
