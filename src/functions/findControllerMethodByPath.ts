import * as controllers from "@/controllers";

const findControllerMethodByPath = (
  controllerName: string,
  path: string | undefined
) => {
  const controller = controllers[
    controllerName as keyof typeof controllers
  ] as any;
  if (!controller) return null;

  const methods: [string, string][] = Object.entries(controller._routes || {});
  const method = methods.find(([_key, value]) => value === path);

  return method ? method[0] : null;
};

export default findControllerMethodByPath;
