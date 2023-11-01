import { common } from "replugged";
import { PluginInjector } from "../index";
import { GuildsNav } from "../lib/requiredModules";
import { assignedSidebar } from "../plaintextFunctions";
import utils from "../lib/utils";
import Types from "../types";
const { i18n } = common;
export default async (): Promise<void> => {
  await assignedSidebar;
  PluginInjector.after(
    GuildsNav,
    "Sidebar",
    ([{ className }]: [{ className: string }], res: React.ReactElement & Types.Tree) => {
      if (!className.includes("foldersRedesigned-sidebar")) return res;
      const scroller = utils.findInReactTree(
        res,
        (c: React.ReactElement & Types.Tree) =>
          typeof c?.props?.onScroll === "function" &&
          c?.props?.children.some((i) => i?.props?.["aria-label"] === i18n.Messages.SERVERS),
        100,
      ) as React.ReactElement & Types.Tree;
      const servers = utils.findInReactTree(
        scroller,
        (c: React.ReactElement & Types.Tree) => c?.props?.["aria-label"] === i18n.Messages.SERVERS,
        100,
      ) as React.ReactElement & Types.Tree;
      if (!scroller || !servers) {
        return res;
      }
      scroller.props.children = servers.props.children;
      return res;
    },
  );
};
