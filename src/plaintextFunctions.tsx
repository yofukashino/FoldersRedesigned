import Modules from "./lib/requiredModules";
import Sidebar from "./Components/Sidebar";
import Types from "./types";

export const _renderCustomSidebar = () => {
  return <Sidebar />;
};

export const _assignSidebar = (
  fn: Types.DefaultTypes.AnyFunction,
): Types.DefaultTypes.AnyFunction => {
  if (Modules?.Sidebar) {
    return Modules?.Sidebar;
  }
  Object.defineProperty(Modules, "Sidebar", {
    get: () => fn,
    set: (value) => {
      fn = value;
    },
    configurable: true,
  });

  return Modules?.Sidebar;
};
