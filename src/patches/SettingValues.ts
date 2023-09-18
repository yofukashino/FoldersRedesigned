import { PluginInjector, SettingValues } from "../index";
import { GuildsNavClasses } from "../lib/requiredModules";
import utils from "../lib/utils";
export default (): void => {
  PluginInjector.after(SettingValues, "set", ([name]) => {
    if (["iconSize", "folderData", "sidebar", "sidebarBlacklist"].includes(name)) {
      void utils.forceRerenderElement(`.${GuildsNavClasses.guilds}`);
    }
  });
};
