import { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  export interface FastifyInstance {
    use: (
      middleware: (
        req: FastifyRequest,
        res: FastifyReply,
        next: (err?: Error) => void
      ) => void
    ) => void;
  }

  export interface FastifyRequest {
    acceptsLanguages: (langs: string[]) => string;
  }

  export interface FastifyReply {
    header: (key: string, value: string) => void;
    view: (view: string, data: object) => void;
    status: (code: number) => FastifyReply;
    json: (data: object) => void;
    lang: string;
  }

  export interface FastifyNext {
    (err?: Error): void;
  }
}
