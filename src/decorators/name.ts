/**
 * Decorator function for defining a name for the current route.
 * @param routeName - The name of the route.
 * @returns A decorator function that sets the route name for the target method.
 */
const name = (routeName: string) => {
  return (target: any, key: string, __descriptor: PropertyDescriptor) => {
    if (!target.constructor._names) target.constructor._names = {};
    target.constructor._names[key] = routeName;
  };
};

export default name;
