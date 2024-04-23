import type { AlchemiaRouteMetadata, AlchemiaHttpMethod } from '$/types';

import { routes as routeMiddlewares } from '#/app/middlewares';
import * as controllers from '#/app/controllers';

interface MetadataRoute {
  controller: InstanceType<(typeof controllers)[keyof typeof controllers]>;
  controllerMethods: MetadataControllerMethod[];
}

interface MetadataControllerMethod {
  name: string;
  httpMethod?: AlchemiaHttpMethod;
  path?: string;
  middlewares: (typeof routeMiddlewares)[keyof typeof routeMiddlewares][];
}

class Metadata {
  private static instance: Metadata;

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

  /**
   * Get controller metadata
   * @param controller Instance of controller
   * @returns MetadataRoute
   */
  getControllerRoutes(controller: InstanceType<(typeof controllers)[keyof typeof controllers]>) {
    return this.routes.find((route) => route.controller === controller);
  }

  /**
   * Get controller method metadata
   * @param controller Instance of controller
   * @param controllerMethod Controller method name
   * @returns MetadataControllerMethod
   */
  getControllerMethod(
    controller: InstanceType<(typeof controllers)[keyof typeof controllers]>,
    controllerMethod: string,
  ) {
    const controllerRoutes = this.getControllerRoutes(controller);
    return controllerRoutes?.controllerMethods.find((method) => method.name === controllerMethod);
  }

  /**
   * Create controller metadata
   * @param controller Instance of controller
   * @returns MetadataRoute
   */
  createControllerRoutes(controller: InstanceType<(typeof controllers)[keyof typeof controllers]>) {
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
   * @param controller Instance of controller
   * @param controllerMethod Method name of controller
   * @param route Route metadata
   */
  addRoute(
    controller: InstanceType<(typeof controllers)[keyof typeof controllers]>,
    controllerMethod: string,
    route: AlchemiaRouteMetadata,
  ) {
    let controllerRoutes = this.getControllerRoutes(controller);
    if (!controllerRoutes) {
      controllerRoutes = this.createControllerRoutes(controller);
    }

    let controllerMethodMetadata = this.getControllerMethod(controller, controllerMethod);
    if (!controllerMethodMetadata) {
      controllerMethodMetadata = this.createControllerMethod(controllerRoutes, controllerMethod);
    }

    controllerMethodMetadata.httpMethod = route.method || 'all';
    controllerMethodMetadata.path = route.path;
    controllerMethodMetadata.middlewares = route.middlewares || controllerMethodMetadata.middlewares;
  }
}

export default Metadata;
