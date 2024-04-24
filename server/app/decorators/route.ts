import type { AlchemiaRouteMetadata } from '$/types';

import * as controllers from '#/app/controllers';
import { Metadata } from '#/core';

const routeDecorator = (route: AlchemiaRouteMetadata) => {
  return (
    Controller: InstanceType<(typeof controllers)[keyof typeof controllers]>,
    controllerMethod: string,
  ) => {
    const controllerClass = Controller.constructor as (typeof controllers)[keyof typeof controllers];
    Metadata.getInstance().addRoute(controllerClass, controllerMethod, route);
  };
};

export default routeDecorator;
