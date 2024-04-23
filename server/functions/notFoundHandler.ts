import type { FastifyInstance } from 'fastify';

import { ErrorController } from '#/app/controllers';
import { prepareRoutes } from '#/app/routes';

const notFoundHandler = (instance: FastifyInstance, _options: unknown, done: (err?: Error) => void) => {
  instance.setNotFoundHandler((request, reply) => {
    const currentHttpMethod = request.raw.method?.toLowerCase() || 'get';
    if (currentHttpMethod !== 'get') {
      return new ErrorController(request, reply).notFound();
    }

    const currentPath = request.raw.url;
    const routes = prepareRoutes();

    const matchingRoute = routes.find((route) => {
      // return (
      //   route.route.replace(/\/:lang\([\w|\|]+\)/, '') === currentPath &&
      //   (route.httpMethod === currentHttpMethod || route.httpMethod === 'all')
      // );
    });

    if (!matchingRoute) {
      return new ErrorController(request, reply).notFound();
    }

    let redirectPath = matchingRoute.route;

    if (matchingRoute.route.startsWith('/:lang')) {
      const routeWithoutLang = matchingRoute.route.replace(/\/:lang\([\w|\|]+\)/, '');
      const firstLanguage = matchingRoute.langs[0];
      redirectPath = `/${firstLanguage}${routeWithoutLang}`;
    }

    return reply.redirect(redirectPath);
  });

  done();
};

export default notFoundHandler;
