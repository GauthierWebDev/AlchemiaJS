// import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import type { MetadataControllerMethod } from '#/core/Metadata';
import type { FastifyPluginCallback } from 'fastify';

import * as controllers from '#/app/controllers';
import { Metadata } from '#/core';
import { Logger } from '#/utils';

type Route = MetadataControllerMethod & { controller: (typeof controllers)[keyof typeof controllers] };

export const prepareRoutes = () => {
  const preparedRoutes: Route[] = [];

  Object.values(controllers).forEach((controller) => {
    const controllerMetadata = Metadata.getInstance().getControllerRoutes(controller);
    if (!controllerMetadata) return;

    controllerMetadata.controllerMethods.forEach((methodMetadata) => {
      if (!methodMetadata.path) return;

      preparedRoutes.push({
        controller,
        ...methodMetadata,
      });
    });
  });

  return preparedRoutes;
};

const routes: FastifyPluginCallback = (fastify, _, done) => {
  const preparedRoutes = prepareRoutes();

  const invalidRoutes: Route[] = [];
  const validRoutes: Route[] = [];

  preparedRoutes.forEach((preparedRoute) => {
    try {
      fastify[preparedRoute.httpMethod || 'all'](preparedRoute.path!, async (request, reply) => {
        const instance = new preparedRoute.controller(request, reply);
        return instance[preparedRoute.name as keyof typeof instance]();
      });

      validRoutes.push(preparedRoute);
    } catch (error: unknown) {
      invalidRoutes.push(preparedRoute);
      console.trace(error);
    }
  });

  Logger.debug(
    `${validRoutes.length} routes successfully registered out of ${preparedRoutes.length} routes (${invalidRoutes.length} failed)`,
  );

  const groupedRoutesByController = validRoutes
    .sort((a, b) => a.controller.name.localeCompare(b.controller.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce(
      (acc, route) => {
        if (!acc[route.controller.name]) acc[route.controller.name] = [];
        acc[route.controller.name].push(route);
        return acc;
      },
      {} as Record<string, Route[]>,
    );

  Object.entries(groupedRoutesByController).forEach(([controllerName, routes]) => {
    Logger.setTitle(controllerName, 'success')
      .addMessage(routes.map((route) => route.name).join(', '))
      .send();
  });

  if (invalidRoutes.length) {
    Logger.setTitle('Router', 'error')
      .addMessage('Failed routes:', invalidRoutes.map((route) => route.name).join(', '))
      .send();
  }

  done();
};

export default routes;
