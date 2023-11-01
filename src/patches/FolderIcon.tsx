import { PluginInjector } from "../index";
import { FolderConstructor, SortedGuildStore } from "../lib/requiredModules";
import FolderIcon from "../Components/FolderIcon";
import Types from "../types";
export default (): void => {
  PluginInjector.before(
    FolderConstructor,
    "default",
    (args: [{ folderNode: Types.GuildTreeItem }]) => {
      args[0].folderNode = SortedGuildStore.getGuildsTree({ original: true }).nodes[
        args[0].folderNode.id
      ];
      return args;
    },
  );
  PluginInjector.after(
    FolderConstructor,
    "default",
    (
      [
        {
          expanded,
          folderNode: { id },
        },
      ]: [{ expanded: boolean; folderNode: { id: string } }],
      res,
    ) => {
      res.props.children.props.children = (
        <FolderIcon
          {...{
            expanded,
            folderId: id,
            originalChildren: res.props.children.props.children,
          }}
        />
      );
      return res;
    },
  );
};
