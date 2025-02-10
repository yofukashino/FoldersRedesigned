import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export default async (): Promise<void> => {
  await Utils.waitForProps(Modules, "Sidebar");
  PluginInjector.after(
    Modules,
    "Sidebar",
    ([{ className }]: [{ className: string }], res: Types.ReactTree) => {
      if (!className.includes("foldersRedesigned-sidebar")) return res;
      const child = Utils.findInReactTree(res, (c: Types.ReactTree) =>
        c?.props?.children?.toString?.()?.includes(".unreadMentionsIndicatorBottom"),
      ) as Types.ReactTree;
      if (!child) return res;
      const original = child?.props.children.bind(null);
      child.props.children = (...args) => {
        const ret = original(...args);
        const scroller = Utils.findInReactTree(
          ret,
          (c: React.ReactElement & Types.Tree) =>
            typeof c?.props?.onScroll === "function" &&
            c?.props?.onScroll &&
            c?.props?.className?.includes("scroller"),
          100,
        ) as React.ReactElement & Types.Tree;

        const servers = Utils.findInReactTree(
          scroller,
          (c: React.ReactElement & Types.Tree) =>
            c?.type === "div" && Array.isArray(c.props.children),
          100,
        ) as React.ReactElement & Types.Tree;
        if (!scroller || !servers) {
          return res;
        }
        scroller.props.children = servers.props.children;
        const container = Utils.findInReactTree(
          ret,
          (c: React.ReactElement & Types.Tree) => c?.props?.children?.includes?.(scroller),
          100,
        ) as React.ReactElement & Types.Tree;
        if (container) {
          container.props.children = [scroller];
        }

        return ret;
      };
      return res;
    },
  );
  void Utils.forceRerenderElement(`.${Modules.GuildsNavClasses?.guilds}`);
};
