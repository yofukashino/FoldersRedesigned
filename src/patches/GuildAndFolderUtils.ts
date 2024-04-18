import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default (): void => {
  const { ExpandedGuildFolderStore, GuildAndFolderUtils } = Modules;
  PluginInjector.before(GuildAndFolderUtils, "toggleGuildFolderExpand", ([folderId]: [string]) => {
    const expandedFolders = ExpandedGuildFolderStore.getExpandedFolders() as Set<string>;
    if (
      !SettingValues.get("closeOthers", defaultSettings.closeOthers) ||
      expandedFolders.has(folderId) ||
      expandedFolders.size < 1
    ) {
      return [folderId];
    }

    for (const id of expandedFolders) {
      if (id == folderId) continue;
      GuildAndFolderUtils.toggleGuildFolderExpand(id);
    }

    return [folderId];
  });
};
