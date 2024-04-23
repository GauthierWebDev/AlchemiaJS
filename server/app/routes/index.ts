// import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import type { MetadataControllerMethod } from '#/core/Metadata';
import type { FastifyPluginCallback } from 'fastify';

import * as controllers from '#/app/controllers';
import { Metadata } from '#/core';

type Route = MetadataControllerMethod & { controller: (typeof controllers)[keyof typeof controllers] };

export const getRoutes = () => {
  const builtRoutes: Route[] = [];

  Object.values(controllers).forEach((controller) => {
    const controllerMetadata = Metadata.getInstance().getControllerRoutes(controller);
    if (!controllerMetadata) return;

    controllerMetadata.controllerMethods.forEach((methodMetadata) => {
      if (!methodMetadata.path) return;

      builtRoutes.push({
        controller,
        ...methodMetadata,
      });
    });
  });

  return builtRoutes;
};

const routes: FastifyPluginCallback = (fastify, _, done) => {
  const builtRoutes = getRoutes();
  console.log(builtRoutes);

  done();
};

export default routes;
