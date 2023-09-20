import { PluginInjector } from "../index";
import { GuildsNav, SortedGuildStore } from "../lib/requiredModules";
import Types from "../types";
export default (): void => {
  PluginInjector.before(
    GuildsNav.FolderUnreadPill,
    "type",
    (args: [{ folderNode: Types.GuildTreeItem }]) => {
      args[0].folderNode = (
        SortedGuildStore.getGuildsTree({ original: true }) as Types.GuildsTree
      ).nodes[args[0].folderNode?.id];
      return args;
    },
  );
  PluginInjector.after(
    GuildsNav.FolderUnreadPill,
    "type",
    ([{ folderNode }]: [{ expanded: boolean; folderNode: { id: string } }], res) => {
      res.props.folderNode = (SortedGuildStore.getGuildsTree() as Types.GuildsTree).nodes[
        folderNode?.id
      ];
      return res;
    },
  );
};
