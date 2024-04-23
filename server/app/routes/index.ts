// import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import type { FastifyPluginCallback } from 'fastify';

// import { routes as routeMiddlewares, app as appMiddlewares } from '#/app/middlewares';
import { buildRoutesFromController } from '#/functions';
import * as controllers from '#/app/controllers';

export const getRoutes = () => {
  const builtRoutes: ReturnType<typeof buildRoutesFromController> = [];

  Object.entries(controllers).forEach(([controllerName, controller]) => {
    const builtRoutesFromController = buildRoutesFromController(controller);

    builtRoutes.push(...builtRoutesFromController);
  });

  return builtRoutes;
};

const routes: FastifyPluginCallback = (fastify, _, done) => {
  const builtRoutes = getRoutes();
  console.log(builtRoutes);

  done();
};

export default routes;
