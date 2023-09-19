import { PluginInjector } from "../index";
import { GuildsNav, GuildsNavClasses, SortedGuildStore } from "../lib/requiredModules";
import FolderIcon from "../Components/FolderIcon";
import utils from "../lib/utils";
import Types from "../types";
export default (): void => {
  PluginInjector.before(
    GuildsNav.FolderUnreadPill,
    "type",
    (args: [{ folderNode: Types.GuildTreeItem }]) => {
      args[0].folderNode = (
        SortedGuildStore.getGuildsTree({ original: true }) as Types.GuildsTree
      ).nodes[args[0].folderNode.id];
      return args;
    },
  );
  PluginInjector.after(
    GuildsNav.FolderUnreadPill,
    "type",
    (
      [
        {
          folderNode: { id },
        },
      ]: [{ expanded: boolean; folderNode: { id: string } }],
      res,
    ) => {
      res.props.folderNode = (SortedGuildStore.getGuildsTree() as Types.GuildsTree).nodes[id];
      return res;
    },
  );
  void utils.forceRerenderElement(`.${GuildsNavClasses.guilds}`);
};
