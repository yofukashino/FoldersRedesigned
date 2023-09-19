import { common } from "replugged";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import {
  ChannelSelectUtils,
  ExpandedGuildFolderStore,
  GuildAndFolderUtils,
  SortedGuildStore,
} from "../lib/requiredModules";
const { channels: UltimateChannelStore } = common;
export default (): void => {
  PluginInjector.after(
    ChannelSelectUtils,
    "selectChannel",
    ([{ guildId }]: [{ guildId: string }], res) => {
      const lastChannelId = UltimateChannelStore.getCurrentlySelectedChannelId();
      const lastChannel = UltimateChannelStore.getChannel(lastChannelId);
      if (lastChannel?.guild_id !== guildId) {
        const guildFolder = SortedGuildStore.getGuildFolders().find((f) =>
          f.guildIds.includes(guildId),
        );
        if (
          !guildFolder?.folderId &&
          SettingValues.get("closeAllFolders", defaultSettings.closeAllFolders)
        ) {
          GuildAndFolderUtils.collapseAllFolders();
          return res;
        }
        if (
          SettingValues.get("forceOpen", defaultSettings.forceOpen) &&
          !ExpandedGuildFolderStore.isFolderExpanded(guildFolder?.folderId)
        )
          GuildAndFolderUtils.toggleGuildFolderExpand(guildFolder?.folderId);
      }
      return res;
    },
  );
};
