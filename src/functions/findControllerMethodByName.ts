import * as controllers from "@/app/controllers";
import {
  AlchemiaAvailableLanguageCode,
  AlchemiaDecoratorValue,
  AlchemiaHttpMethod,
  AlchemiaRouteName,
} from "@/types";

interface ControllerMethodDetails {
  name: string;
  method: string;
  route: string;
  langs: AlchemiaAvailableLanguageCode[];
}

const findControllerMethodByName = (routeName: string) => {
  let found = false;

  const controllerMethodDetails: ControllerMethodDetails = {
    name: "",
    method: "",
    route: "",
    langs: [],
  };

  Object.values(controllers).forEach((controller: any) => {
    if (!controller._names) return false;

    const names: AlchemiaDecoratorValue<AlchemiaRouteName> = controller._names;
    const methods: AlchemiaDecoratorValue<AlchemiaHttpMethod> =
      controller._methods;

    Object.entries(names).forEach(([key, name]) => {
      if (name !== routeName) return;

      found = true;

      controllerMethodDetails.name = name;
      controllerMethodDetails.method = methods[key];
      controllerMethodDetails.route = controller._routes[key];
      controllerMethodDetails.langs = controller._langs[key];
    });
  });

  return found ? controllerMethodDetails : null;
};

export default findControllerMethodByName;
