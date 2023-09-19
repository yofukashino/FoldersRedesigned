import patchAppView from "./AppView";
import patchChannelSelectUtils from "./ChannelSelectUtils";
import patchFolderIcon from "./FolderIcon";
import patchGuildAndFolderUtils from "./GuildAndFolderUtils";
import patchGuildFolderSettingsModal from "./GuildFolderSettingsModal";
import patchSettingValues from "./SettingValues";
import patchSidebar from "./Sidebar";
import patchSortedGuildsStore from "./SortedGuildsStore";
export const applyInjections = (): void => {
  patchAppView();
  patchChannelSelectUtils();
  patchFolderIcon();
  patchGuildAndFolderUtils();
  patchSettingValues();
  void patchGuildFolderSettingsModal();
  patchSidebar();
  patchSortedGuildsStore();
};
