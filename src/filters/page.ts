import { findControllerMethodByName } from "@/functions";

function page(
  this: NunjucksFilterInstance,
  routeName: string,
  targetLang?: string
) {
  let language = this.ctx.lang;

  const controllerMethod = findControllerMethodByName(routeName);
  console.log(controllerMethod);

  return null;
}

export default page;
