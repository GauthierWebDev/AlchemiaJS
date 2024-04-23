import * as controllers from '#/app/controllers';

export type AlchemiaHttpMethod =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'options'
  | 'patch'
  | 'all';

export type AlchemiaController = (typeof controllers)[keyof typeof controllers];

export type LoggerType = 'info' | 'success' | 'warning' | 'debug' | 'error';
