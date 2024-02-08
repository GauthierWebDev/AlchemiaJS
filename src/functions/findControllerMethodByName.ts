import * as controllers from "@/app/controllers";
import { AlchemiaDecoratorValue, AlchemiaRouteName } from "@/types";

const findControllerMethodByName = (routeName: string) => {
  return Object.values(controllers).find((controller: any) => {
    if (!controller._names) return false;

    const names: AlchemiaDecoratorValue<AlchemiaRouteName> = controller._names;
    return Object.values(names).find((name: string) => name === routeName);
  });
};

export default findControllerMethodByName;
