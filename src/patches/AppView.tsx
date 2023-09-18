import { PluginInjector } from "../index";
import { AppView, AppViewClasses } from "../lib/requiredModules";
import Sidebar from "../Components/Sidebar";
import Types from "../types";
import utils from "../lib/utils";
export default (): void => {
  PluginInjector.after(AppView.BaseLayer, "type", (_args, res: React.ReactElement) => {
    const LayerContainer = utils.findInReactTree(
      res,
      (c) => c?.type?.toString?.()?.includes?.(".GUILD_MEMBER_VERIFICATION"),
      { maxRecrusions: 100 },
    ) as React.ReactElement & { type: Types.DefaultTypes.AnyFunction };
    if (!LayerContainer) {
      return res;
    }
    PluginInjector.after(LayerContainer, "type", (_args, res: React.ReactElement) => {
      const container = utils.findInReactTree(
        res,
        (c) => c !== res && Array.isArray(c?.props?.children),
        { maxRecrusions: 100 },
      ) as React.ReactElement;
      container?.props?.children?.splice?.(1, 0, <Sidebar />);
      return res;
    });
    return res;
  });
  void utils.forceRerenderElement(`.${AppViewClasses.app}`);
};
