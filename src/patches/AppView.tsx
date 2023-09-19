import { PluginInjector } from "../index";
import { AppView } from "../lib/requiredModules";
import Sidebar from "../Components/Sidebar";
import utils from "../lib/utils";
export default (): void => {
  PluginInjector.after(AppView, "BaseLayer", (_args, res: React.ReactElement) => {
    const container = utils.findInReactTree(
      res,
      (c) => c !== res && Array.isArray(c?.props?.children),
      { maxRecrusions: 100 },
    ) as React.ReactElement;
    container?.props?.children?.splice?.(1, 0, <Sidebar />);
    return res;
  });
};
