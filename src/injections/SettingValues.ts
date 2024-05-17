import { PluginInjector, SettingValues } from "../index";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";

export default (): void => {
  PluginInjector.after(SettingValues, "set", ([name]) => {
    if (
      ["iconSize", "folderData", "sidebar", "sidebarBlacklist", "folderInSidebar"].includes(name)
    ) {
      void Utils.forceRerenderElement(`.${Modules.GuildsNavClasses.guilds}`);
    }
  });
};
