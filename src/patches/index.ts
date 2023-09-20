import { PluginInjector } from "../index";
import utils from "../lib/utils";
import { GuildsNavClasses } from "../lib/requiredModules";
import patchAppView from "./AppView";
import patchChannelSelectUtils from "./ChannelSelectUtils";
import patchFolderIcon from "./FolderIcon";
import patchFolderUnreadPill from "./FolderUnreadPill";
import patchGuildAndFolderUtils from "./GuildAndFolderUtils";
import patchGuildFolderSettingsModal from "./GuildFolderSettingsModal";
import patchSettingValues from "./SettingValues";
import patchSidebar from "./Sidebar";
import patchSortedGuildsStore from "./SortedGuildsStore";
export const applyInjections = (): void => {
  patchAppView();
  patchChannelSelectUtils();
  patchFolderIcon();
  patchFolderUnreadPill();
  patchGuildAndFolderUtils();
  patchSettingValues();
  void patchGuildFolderSettingsModal();
  patchSidebar();
  patchSortedGuildsStore();
  void utils.forceRerenderElement(`.${GuildsNavClasses.guilds}`);
};
export const removeInjections = (): void => {
  PluginInjector.uninjectAll();
  if (document.querySelector(".foldersRedesigned-sidebar")) {
    utils.forceUpdateElement(".foldersRedesigned-sidebar");
  }
};
