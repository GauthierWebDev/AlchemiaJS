import { routes as routeMiddlewares } from '#/app/middlewares';

const middlewareDecorator = (...middlewares: (keyof typeof routeMiddlewares)[]) => {
  return function (target: object, key: string) {
    // Reflect.defineMetadata('alchemia:middlewares', middlewares, target, key);
  };
};

export default middlewareDecorator;
