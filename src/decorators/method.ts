import type { AlchemiaHttpMethod } from "@/types";

/**
 * Decorator that assigns an HTTP method to a class method.
 * @param httpMethod The HTTP method to assign.
 * @returns The decorator function.
 */
const method = (httpMethod: AlchemiaHttpMethod) => {
  return (target: any, key: string, __descriptor: PropertyDescriptor) => {
    if (!target.constructor._methods) target.constructor._methods = {};
    target.constructor._methods[key] = httpMethod;
  };
};

export default method;
