import type { AlchemiaRouteMiddleware } from '$/types';

const middlewareDecorator = (middleware: AlchemiaRouteMiddleware) => {
  console.log(middleware);
};

export default middlewareDecorator;
