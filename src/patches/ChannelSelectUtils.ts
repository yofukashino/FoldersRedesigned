import { common } from "replugged";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import {
  ChannelSelectUtils,
  ExpandedGuildFolderStore,
  GuildAndFolderUtils,
  SortedGuildStore,
} from "../lib/requiredModules";
const { guilds: UltimateGuildStore } = common;
export default (): void => {
  PluginInjector.before(
    ChannelSelectUtils,
    "selectChannel",
    (args: [{ guildId: string; lastGuildId?: string }]) => {
      args[0].lastGuildId = UltimateGuildStore.getLastSelectedGuildId();
      return args;
    },
  );
  PluginInjector.after(
    ChannelSelectUtils,
    "selectChannel",
    ([{ guildId, lastGuildId }]: [{ guildId: string; lastGuildId?: string }], res) => {
      if (lastGuildId !== guildId) {
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
          !ExpandedGuildFolderStore.isFolderExpanded(guildFolder?.folderId) &&
          guildFolder?.folderId
        )
          GuildAndFolderUtils.toggleGuildFolderExpand(guildFolder?.folderId);
      }
      return res;
    },
  );
};
