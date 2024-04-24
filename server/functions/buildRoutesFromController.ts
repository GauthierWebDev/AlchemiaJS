import { AlchemiaHttpMethod } from '$/types';

import * as controllers from '#/app/controllers';
import { Logger } from '$/utils';

type AlchemiaRouteHistory = {
  middlewares: string[];
  classMethod: string;
  httpMethod: AlchemiaHttpMethod;
  route: string;
};

const buildRoutesFromController = (Controller: (typeof controllers)[keyof typeof controllers]) => {
  const addedRoutes: AlchemiaRouteHistory[] = [];
  const errorRoutes: (AlchemiaRouteHistory & { error?: string })[] = [];

  if (!Controller) {
    Logger.setTitle('buildRoutesFromController', 'error').addMessage('No controller provided').send();
    return [];
  }

  if (errorRoutes.length) {
    errorRoutes.forEach((route) => {
      Logger.setTitle(`💀 Error building route "${route}"`, 'error')
        .addMessage(route?.error || 'Unknown error')
        .send();
    });
  }

  return addedRoutes;
};

export default buildRoutesFromController;
