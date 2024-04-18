import { PluginInjector, SettingValues } from "../index";
import Modules from "../lib/requiredModules";
import utils from "../lib/utils";
export default (): void => {
  PluginInjector.after(SettingValues, "set", ([name]) => {
    if (
      ["iconSize", "folderData", "sidebar", "sidebarBlacklist", "folderInSidebar"].includes(name)
    ) {
      void utils.forceRerenderElement(`.${Modules.GuildsNavClasses.guilds}`);
    }
  });
};
