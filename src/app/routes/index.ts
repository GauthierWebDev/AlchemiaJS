import type {
  AlchemiaAvailableLanguageCode,
  AlchemiaDecoratorMiddleware,
  AlchemiaDecoratorValue,
  AlchemiaHttpMethod,
  AlchemiaMiddleware,
  AlchemiaRoute,
} from "@/types";
import { buildRoutesFromController } from "@/functions";
import * as middlewaresRegistry from "@/app/middlewares";
import * as controllers from "@/app/controllers";
import { poweredBy } from "@/app/middlewares";
import { Logger } from "@/utils";

import type {
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from "fastify";

const routes: FastifyPluginCallback = (fastify, _, done) => {
  Object.values(controllers).forEach((Controller: any) => {
    const middlewares: AlchemiaDecoratorValue<AlchemiaDecoratorMiddleware[]> =
      Controller._middlewares;
    const httpMethods: AlchemiaDecoratorValue<AlchemiaHttpMethod> =
      Controller._methods;
    const routes: AlchemiaDecoratorValue<AlchemiaRoute> = Controller._routes;
    const langs: AlchemiaDecoratorValue<AlchemiaAvailableLanguageCode[]> =
      Controller._langs;

    if (!httpMethods || !routes) return;
    Logger.debug(`Building routes for "${Controller.name}"`);

    const controllerRoutes = buildRoutesFromController(
      Controller,
      routes,
      httpMethods,
      middlewares,
      langs
    );

    controllerRoutes.forEach(async (route) => {
      const routeMiddlewares = route.middlewares
        .filter((middleware) => {
          if (
            !middleware ||
            !middlewaresRegistry[middleware as keyof typeof middlewaresRegistry]
          ) {
            Logger.setTitle(`💀 Middleware "${middleware}" not found`, "error")
              .addMessage(`Route: ${route.route}`)
              .send();
            return false;
          }
          return true;
        })
        .map((middleware) => {
          return middlewaresRegistry[
            middleware as keyof typeof middlewaresRegistry
          ];
        }) as AlchemiaMiddleware[];

      fastify[route.httpMethod](
        route.route,
        { preHandler: routeMiddlewares, onSend: [poweredBy] },
        async (request: FastifyRequest, reply: FastifyReply) => {
          const instance = new Controller(request, reply);
          await instance[route.classMethod]();
        }
      );
    });
  });

  done();
};

export default routes;
