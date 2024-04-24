import type { AlchemiaRouteMetadata, AlchemiaHttpMethod } from '$/types';

import { routes as routeMiddlewares } from '#/app/middlewares';
import * as controllers from '#/app/controllers';

export interface MetadataRoute {
  controller: (typeof controllers)[keyof typeof controllers];
  controllerMethods: MetadataControllerMethod[];
}

export interface MetadataControllerMethod {
  name: string;
  httpMethod?: AlchemiaHttpMethod;
  path?: string;
  middlewares: (typeof routeMiddlewares)[keyof typeof routeMiddlewares][];
}

/**
 * Metadata class
 */
class Metadata {
  /**
   * Singleton instance of Metadata
   */
  private static instance: Metadata;

  /**
   * List of routes
   */
  private routes: MetadataRoute[] = [];

  private constructor() {}

  /**
   * Get instance of Metadata
   * @returns Metadata
   */
  static getInstance(): Metadata {
    if (!Metadata.instance) Metadata.instance = new Metadata();
    return Metadata.instance;
  }

  private findMiddlewars(middleware: string[]) {
    return Object.entries(routeMiddlewares)
      .filter(([name]) => middleware.includes(name))
      .map(([, middleware]) => middleware);
  }

  private findOrCreateControllerMethod(
    controller: (typeof controllers)[keyof typeof controllers],
    controllerMethod: string,
  ) {
    let controllerRoutes = this.getControllerRoutes(controller);
    if (!controllerRoutes) {
      controllerRoutes = this.createControllerRoutes(controller);
    }

    let controllerMethodMetadata = this.getControllerMethod(controller, controllerMethod);
    if (!controllerMethodMetadata) {
      controllerMethodMetadata = this.createControllerMethod(controllerRoutes, controllerMethod);
    }

    return controllerMethodMetadata;
  }

  /**
   * Get controller metadata
   * @param controller Controller class
   * @returns MetadataRoute
   */
  getControllerRoutes(controller: (typeof controllers)[keyof typeof controllers]) {
    return this.routes.find((route) => route.controller === controller);
  }

  /**
   * Get controller method metadata
   * @param controller Controller class
   * @param controllerMethod Controller method name
   * @returns MetadataControllerMethod
   */
  getControllerMethod(controller: (typeof controllers)[keyof typeof controllers], controllerMethod: string) {
    const controllerRoutes = this.getControllerRoutes(controller);
    return controllerRoutes?.controllerMethods.find((method) => method.name === controllerMethod);
  }

  /**
   * Create controller metadata
   * @param controller Controller class
   * @returns MetadataRoute
   */
  createControllerRoutes(controller: (typeof controllers)[keyof typeof controllers]) {
    const controllerRoutes = {
      controller,
      controllerMethods: [],
    };

    this.routes.push(controllerRoutes);
    return controllerRoutes;
  }

  /**
   * Create controller method metadata
   * @param metadataRoute MetadataRoute
   * @param controllerMethod Controller method name
   * @returns MetadataControllerMethod
   */
  createControllerMethod(metadataRoute: MetadataRoute, controllerMethod: string) {
    const controllerMethodMetadata = {
      name: controllerMethod,
      middlewares: [],
    };

    metadataRoute.controllerMethods.push(controllerMethodMetadata);
    return controllerMethodMetadata;
  }

  /**
   * Add route to metadata
   * @param controller Controller class
   * @param controllerMethod Method name of controller
   * @param route Route metadata
   */
  addRoute(
    controller: (typeof controllers)[keyof typeof controllers],
    controllerMethod: string,
    route: AlchemiaRouteMetadata,
  ) {
    const controllerMethodMetadata = this.findOrCreateControllerMethod(controller, controllerMethod);

    controllerMethodMetadata.httpMethod = route.method || 'all';
    controllerMethodMetadata.path = route.path;
    controllerMethodMetadata.middlewares = this.findMiddlewars(route.middlewares || []);
  }
}

export default Metadata;
