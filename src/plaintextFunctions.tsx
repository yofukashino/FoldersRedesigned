import Sidebar from "./Components/Sidebar";
import { GuildsNav } from "./lib/requiredModules";
export const _renderCustomSidebar = () => {
  return <Sidebar />;
};

import Types from "./types";
let resolveSidebarPromise: () => void;
export const assignedSidebar = new Promise<void>((res) => {
  resolveSidebarPromise = res;
  if (GuildsNav.Sidebar) res();
});

export const _assignSidebar = (
  fn: Types.DefaultTypes.AnyFunction,
): Types.DefaultTypes.AnyFunction => {
  if (GuildsNav.Sidebar) {
    return fn;
  }
  Object.defineProperty(GuildsNav, "Sidebar", {
    get: () => fn,
    set: (value) => {
      fn = value;
    },
    configurable: true,
  });
  resolveSidebarPromise();
  return fn;
};
