import type { AlchemiaDecoratorMiddleware } from "./middleware";
import type { AlchemiaDecoratorValue } from "./decoratorValue";
import type { AlchemiaHttpMethod } from "./httpMethod";
import type { AlchemiaRoute } from "./route";

export type AlchemiaController = {
  _middlewares: AlchemiaDecoratorValue<AlchemiaDecoratorMiddleware[]>;
  _methods: AlchemiaDecoratorValue<AlchemiaHttpMethod>;
  _routes: AlchemiaDecoratorValue<AlchemiaRoute>;
};
