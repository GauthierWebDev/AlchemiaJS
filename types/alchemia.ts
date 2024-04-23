import { routes as routeMiddlewares } from '#/app/middlewares';
import * as controllers from '#/app/controllers';

export type AlchemiaHttpMethod = 'get' | 'head' | 'post' | 'put' | 'delete' | 'options' | 'patch' | 'all';

export type AlchemiaController = (typeof controllers)[keyof typeof controllers];
export type AlchemiaRouteMiddleware = (typeof routeMiddlewares)[keyof typeof routeMiddlewares];

export interface AlchemiaRouteMetadata {
  method: AlchemiaHttpMethod;
  path: string;
  middlewares?: AlchemiaRouteMiddleware[];
}

export type LoggerType = 'info' | 'success' | 'warning' | 'debug' | 'error';
