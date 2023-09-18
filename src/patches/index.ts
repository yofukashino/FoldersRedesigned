import patchAppView from "./AppView";
import patchChannelSelectUtils from "./ChannelSelectUtils";
import patchFolderIcon from "./FolderIcon";
import patchGuildAndFolderUtils from "./GuildAndFolderUtils";
import patchGuildFolderSettingsModal from "./GuildFolderSettingsModal";
import patchSettingValues from "./SettingValues";
import patchSidebar from "./Sidebar";
import patchSortedGuildsStore from "./SortedGuildsStore";
export const applyInjections = (): void => {
  void patchAppView();
  void patchChannelSelectUtils();
  void patchFolderIcon();
  void patchGuildAndFolderUtils();
  void patchSettingValues();
  void patchGuildFolderSettingsModal();
  void patchSidebar();
  void patchSortedGuildsStore();
};
