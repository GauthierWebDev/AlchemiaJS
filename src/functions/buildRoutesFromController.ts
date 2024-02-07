import type { AlchemiaMultiLingualDecoratorValues } from "@/decorators/multiLingual";
import type { AvailableLanguageCode } from "@/config/languages";
import { buildLangRoutePrefix } from "@/functions";
import { Logger } from "@/utils";

type AlchemiaRouteHistory = {
  middlewares: string[];
  classMethod: string;
  httpMethod: AlchemiaMethod;
  route: string;
  langs: AvailableLanguageCode[];
};

const buildRoutesFromController = (
  Controller: any,
  routes: AlchemiaRoutes,
  httpMethods: AlchemiaMethods,
  middlewares: AlchemiaMiddlewares,
  langs: AlchemiaMultiLingualDecoratorValues
) => {
  const addedRoutes: AlchemiaRouteHistory[] = [];
  const errorRoutes: AlchemiaRouteHistory[] = [];

  Object.entries(routes).forEach(([key, route]) => {
    try {
      const method = httpMethods[key];
      if (!method) return;

      const middlewaresToApply: string[] = [];

      if (middlewares && middlewares[key]) {
        middlewaresToApply.push(...middlewares[key]);
      }

      route = `/${buildLangRoutePrefix(key, langs)}/${route}`
        .replace(/\/+/g, "/")
        .replace(/\/$/, "");

      addedRoutes.push({
        httpMethod: httpMethods[key],
        classMethod: key,
        middlewares: middlewaresToApply,
        route,
        langs: langs[key],
      });
    } catch (err: any) {
      Logger.setTitle(`💀 Error building route "${route}"`, "error")
        .addMessage(err?.message)
        .send();

      errorRoutes.push({
        middlewares: middlewares[key],
        httpMethod: httpMethods[key],
        classMethod: key,
        route,
        langs: langs[key],
      });
    }
  });

  if (addedRoutes.length) {
    Logger.debug(
      `${addedRoutes.length} route(s) added for the controller "${Controller.name}":`,
      ...addedRoutes.map((route) => {
        return `\n -> [${route.httpMethod.toUpperCase()}] ${route.route} => ${
          Controller.name
        }.${route.classMethod}`;
      })
    );
  }

  if (errorRoutes.length) {
    Logger.debug(
      `${errorRoutes.length} route(s) failed to be added for the controller "${Controller.name}":`,
      ...errorRoutes.map((route) => {
        return `\n -> [${route.httpMethod.toUpperCase()}] ${route.route} => ${
          Controller.name
        }.${route.classMethod}`;
      })
    );
  }

  return addedRoutes;
};

export default buildRoutesFromController;
