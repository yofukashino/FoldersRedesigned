import { i18n } from "replugged/common";
import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export default async (): Promise<void> => {
  await Utils.waitForProps(Modules, "Sidebar");
  PluginInjector.after(
    Modules,
    "Sidebar",
    ([{ className }]: [{ className: string }], res: React.ReactElement & Types.Tree) => {
      if (!className.includes("foldersRedesigned-sidebar")) return res;
      const origial = res.props.children.props.children.bind(null);
      res.props.children.props.children = (...args) => {
        const ret = origial(...args);
        const scroller = Utils.findInReactTree(
          ret,
          (c: React.ReactElement & Types.Tree) =>
            typeof c?.props?.onScroll === "function" &&
            c?.props?.children.some((i) => i?.props?.["aria-label"] === i18n.Messages.SERVERS),
          100,
        ) as React.ReactElement & Types.Tree;
        const servers = Utils.findInReactTree(
          scroller,
          (c: React.ReactElement & Types.Tree) =>
            c?.props?.["aria-label"] === i18n.Messages.SERVERS,
          100,
        ) as React.ReactElement & Types.Tree;
        console.log(res);
        if (!scroller || !servers) {
          return res;
        }
        scroller.props.children = servers.props.children;
        return ret;
      };
      return res;
    },
  );
  void Utils.forceRerenderElement(`.${Modules.GuildsNavClasses?.guilds}`);
};
