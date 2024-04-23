import * as controllers from '#/app/controllers';
import * as middlewares from '#/app/middlewares';

export type AlchemiaHttpMethod = 'get' | 'head' | 'post' | 'put' | 'delete' | 'options' | 'patch' | 'all';
export type AlchemiaRouteMiddleware = (typeof middlewares.routes)[keyof typeof middlewares.routes];
export type AlchemiaController = (typeof controllers)[keyof typeof controllers];

export type LoggerType = 'info' | 'success' | 'warning' | 'debug' | 'error';
