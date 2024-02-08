import { ErrorController } from "@/app/controllers";
import type { FastifyInstance } from "fastify";
import { getRoutes } from "@/app/routes";

const notFoundHandler = (
  instance: FastifyInstance,
  options: any,
  done: (err?: Error) => void
) => {
  instance.setNotFoundHandler((request, reply) => {
    const currentHttpMethod = request.raw.method?.toLowerCase() || "get";
    if (currentHttpMethod !== "get") {
      const controller = new ErrorController(request, reply);
      controller.notFound();
      return;
    }

    const currentPath = request.raw.url;
    // const routes = getRoutes();

    // const matchingRoute = routes.find((route) => {
    //   return (
    //     route.route.replace(/\/:lang\([\w|\|]+\)/, "") === currentPath &&
    //     (route.httpMethod === currentHttpMethod || route.httpMethod === "all")
    //   );
    // });

    console.log(request.raw.url);

    // if (matchingRoute) {
    //   let redirectPath = matchingRoute.route;

    //   if (matchingRoute.route.startsWith("/:lang")) {
    //     console.log(matchingRoute);
    //     redirectPath = `/${matchingRoute.lang}${matchingRoute.route}`;
    //   }

    //   // return reply.redirect(redirectPath);
    // }

    // new ErrorController(request, reply).notFound();
  });

  done();
};

export default notFoundHandler;
