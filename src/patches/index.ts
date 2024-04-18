import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import patchChannelSelectUtils from "./ChannelSelectUtils";
import patchFolderIcon from "./FolderIcon";
import patchFolderUnreadPill from "./FolderUnreadPill";
import patchGuildAndFolderUtils from "./GuildAndFolderUtils";
import patchGuildFolderSettingsModal from "./GuildFolderSettingsModal";
import patchSettingValues from "./SettingValues";
import patchSidebar from "./Sidebar";
import patchSortedGuildsStore from "./SortedGuildsStore";
import Utils from "../lib/utils";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  patchChannelSelectUtils();
  void patchFolderIcon();
  patchFolderUnreadPill();
  patchGuildAndFolderUtils();
  patchSettingValues();
  void patchGuildFolderSettingsModal();
  void patchSidebar();
  patchSortedGuildsStore();
  void Utils.forceRerenderElement(`.${Modules.GuildsNavClasses?.guilds}`);
};
export const removeInjections = (): void => {
  PluginInjector.uninjectAll();
  void Utils.forceRerenderElement(`.${Modules.GuildsNavClasses?.guilds}`);
};

export default { applyInjections, removeInjections };
