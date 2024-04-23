import type { AlchemiaRouteMetadata } from '$/types';

import * as controllers from '#/app/controllers';
import { Metadata } from '#/core';

export const routeDecorator = (route: AlchemiaRouteMetadata) => {
  console.log(route);

  return (
    Controller: InstanceType<(typeof controllers)[keyof typeof controllers]>,
    controllerMethod: string,
  ) => {
    console.log(Controller.constructor.name, controllerMethod);
    Metadata.getInstance().addRoute(Controller, controllerMethod, route);
  };
};
