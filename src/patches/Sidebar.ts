import { common } from "replugged";
import { PluginInjector } from "../index";
import { SidebarContainer } from "../lib/requiredModules";
import utils from "../lib/utils";
const { i18n } = common;
export default () => {
  PluginInjector.after(SidebarContainer, "Sidebar", (_args, res: React.ReactElement) => {
    const scroller = utils.findInReactTree(
      res,
      (c) =>
        typeof c?.props?.onScroll === "function" &&
        c?.props?.children.some((i) => i?.props?.["aria-label"] === i18n.Messages.SERVERS),
      { maxRecrusions: 100 },
    ) as React.ReactElement;
    const servers = utils.findInReactTree(
      scroller,
      (c) => c?.props?.["aria-label"] === i18n.Messages.SERVERS,
      { maxRecrusions: 100 },
    ) as React.ReactElement;
    if (!scroller || !servers) {
      return res;
    }
    scroller.props.children = servers.props.children;
    return res;
  });
};
