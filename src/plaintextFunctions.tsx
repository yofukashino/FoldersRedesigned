import Modules from "./lib/requiredModules";
import Sidebar from "./Components/Sidebar";
export const _renderCustomSidebar = () => {
  return <Sidebar />;
};

import Types from "./types";

export const _assignSidebar = (
  fn: Types.DefaultTypes.AnyFunction,
): Types.DefaultTypes.AnyFunction => {
  if (Modules?.Sidebar) {
    return fn;
  }
  Object.defineProperty(Modules, "Sidebar", {
    get: () => fn,
    set: (value) => {
      fn = value;
    },
    configurable: true,
  });

  return fn;
};
