import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const { FolderUnreadPillConstructor, SortedGuildStore } = Modules;
  PluginInjector.before(
    FolderUnreadPillConstructor,
    "type",
    (args: [{ folderNode: Types.GuildTreeItem }]) => {
      args[0].folderNode = SortedGuildStore.getGuildsTree({ original: true }).nodes[
        args[0].folderNode?.id
      ];
      return args;
    },
  );
  PluginInjector.after(
    FolderUnreadPillConstructor,
    "type",
    (
      [{ folderNode }]: [{ expanded: boolean; folderNode: { id: string } }],
      res: React.ReactElement,
    ) => {
      res.props.folderNode = SortedGuildStore.getGuildsTree().nodes[folderNode?.id];
      return res;
    },
  );
};
