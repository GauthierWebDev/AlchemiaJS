import type { AlchemiaHttpMethod } from '@/types';

import * as controllers from '@/app/controllers';

const findControllerMethodByPath = (
  controllerName: string,
  httpMethod: AlchemiaHttpMethod,
  path: string | undefined,
) => {
  const controller = controllers[controllerName as keyof typeof controllers] as any;
  if (!controller) return null;

  const methodsPaths: [string, string][] = Object.entries(controller._routes || {});
  const methodsHttpMethods: [string, AlchemiaHttpMethod][] = Object.entries(controller._methods || {});

  const possibleMethodByPath = methodsPaths.filter(([pathMethodName, methodPath]) => {
    // ? Perfect match (absolute path, no params)
    if (methodPath === path) return true;

    const requestPathParts = path?.split('/').filter((part) => part !== '') || [];
    const methodPathParts = methodPath.split('/').filter((part) => part !== '');

    // ? Different number of parts, not a match
    if (requestPathParts.length !== methodPathParts.length) return false;

    // ? Compare each part
    return requestPathParts.every((part, index) => {
      if (part === methodPathParts[index]) return true;
      if (methodPathParts[index].startsWith(':')) return true;

      return false;
    });
  });

  const method = possibleMethodByPath.find(([pathMethodName]) => {
    const methodHttpMethod = methodsHttpMethods
      .find(([methodName]) => methodName === pathMethodName)?.[1]
      ?.toUpperCase();
    return methodHttpMethod === httpMethod.toUpperCase();
  });

  return method ? method[0] : null;
};

export default findControllerMethodByPath;
