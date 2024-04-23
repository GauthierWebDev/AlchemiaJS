import type { AlchemiaRouteMetadata } from '$/types';

const routeDecorator = (route: AlchemiaRouteMetadata) => {
  return (target: object, key: string) => {
    Reflect.defineMetadata('alchemia:route', route, target, key);
  };
};

export default routeDecorator;
