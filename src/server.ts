import * as middlewares from "@/app/middlewares";
import fastifyCaching from "@fastify/caching";
import htmlMinifier from "html-minifier";
import * as filters from "@/filters";
import routes from "@/app/routes";
import nunjucks from "nunjucks";
import Fastify from "fastify";
import path from "path";

const server = Fastify();

const viewConfig = {
  engine: {
    nunjucks,
  },
  templates: [path.join(__dirname, "..", "views")],
  options: {
    onConfigure: (env: nunjucks.Environment) => {
      Object.keys(filters).forEach((filterName) => {
        env.addFilter(filterName, filters[filterName as keyof typeof filters]);
      });
    },
    useHtmlMinifier: htmlMinifier,
    htmlMinifierOptions: {
      removeComments: true,
      removeCommentsFromCDATA: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
    },
  },
};

server
  .register(fastifyCaching, {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    privacy: "public",
  })
  .register(require("@fastify/static"), {
    root: path.join(__dirname, "..", "public"),
    prefix: "/",
  })
  .register(require("@fastify/middie"))
  .register(require("@fastify/view"), viewConfig)
  .register(middlewares.createMiddleware(middlewares.poweredBy))
  .register(middlewares.createMiddleware(middlewares.lang))
  .register(routes);

export default server;
