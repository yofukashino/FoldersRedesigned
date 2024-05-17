import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import injectChannelSelectUtils from "./ChannelSelectUtils";
import injectFolderIcon from "./FolderIcon";
import injectFolderUnreadPill from "./FolderUnreadPill";
import injectGuildAndFolderUtils from "./GuildAndFolderUtils";
import injectGuildFolderSettingsModal from "./GuildFolderSettingsModal";
import injectSettingValues from "./SettingValues";
import injectSidebar from "./Sidebar";
import injectSortedGuildsStore from "./SortedGuildsStore";
import Utils from "../lib/utils";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectChannelSelectUtils();
  injectFolderIcon();
  injectFolderUnreadPill();
  injectGuildAndFolderUtils();
  injectSettingValues();
  void injectGuildFolderSettingsModal();
  void injectSidebar();
  injectSortedGuildsStore();
  void Utils.forceRerenderElement(`.${Modules.GuildsNavClasses?.guilds}`);
};
export const removeInjections = (): void => {
  PluginInjector.uninjectAll();
  void Utils.forceRerenderElement(`.${Modules.GuildsNavClasses?.guilds}`);
};

export default { applyInjections, removeInjections };
