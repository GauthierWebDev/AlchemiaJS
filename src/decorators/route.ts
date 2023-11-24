/**
 * Decorator function for defining a route path.
 * @param path - The path of the route.
 * @returns A decorator function that sets the route path for the target method.
 */
const route = (path: string) => {
  return (target: any, key: string, __descriptor: PropertyDescriptor) => {
    if (!target.constructor._routes) target.constructor._routes = {};
    target.constructor._routes[key] = path;
  };
};

export default route;
