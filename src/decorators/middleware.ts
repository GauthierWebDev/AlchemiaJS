/**
 * Decorator that adds middlewares to a class method.
 * @param middlewares - The middlewares to be added.
 * @returns A decorator function.
 */
const middleware = (...middlewares: string[]) => {
  return (target: any, key: string, _descriptor: PropertyDescriptor) => {
    if (!target.constructor._middlewares) target.constructor._middlewares = {};
    target.constructor._middlewares[key] = middlewares;
  };
};

export default middleware;
