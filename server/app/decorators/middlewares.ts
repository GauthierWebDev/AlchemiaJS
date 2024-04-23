import { routes as routeMiddlewares } from '#/app/middlewares';
import * as controllers from '#/app/controllers';
import { Metadata } from '#/core';

const middlewareDecorator = (...middlewares: (keyof typeof routeMiddlewares)[]) => {
  return (
    Controller: InstanceType<(typeof controllers)[keyof typeof controllers]>,
    controllerMethod: string,
  ) => {
    const controllerClass = Controller.constructor as (typeof controllers)[keyof typeof controllers];
    const middlewaresFunctions = middlewares.map((middleware) => routeMiddlewares[middleware]);

    Metadata.getInstance().addMiddlewares(controllerClass, controllerMethod, middlewaresFunctions);
  };
};

export default middlewareDecorator;
