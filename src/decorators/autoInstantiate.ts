/**
 * Decorator that automatically instantiates a class before invoking a method.
 * The instantiated class is used as the context for the method call.
 * @param target - The target object (class prototype).
 * @param _key - The name of the decorated method.
 * @param descriptor - The property descriptor of the decorated method.
 * @returns The modified property descriptor.
 */
const autoInstantiate = (
  target: any,
  _key: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (this: any, ...args: any[]) {
    const instance = new target.constructor(...args);
    return originalMethod.apply(instance, args);
  };

  return descriptor;
};

export default autoInstantiate;
