import { webpack } from "replugged";
import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import FolderIcon from "../Components/FolderIcon";
import Types from "../types";

export default (): void => {
  const { FolderConstructor, SortedGuildStore } = Modules;
  const loader = webpack.getFunctionKeyBySource(FolderConstructor, "folderNode:");
  PluginInjector.before(
    FolderConstructor,
    loader,
    (args: [{ folderNode: Types.GuildTreeItem }]) => {
      args[0].folderNode = SortedGuildStore.getGuildsTree({ original: true }).nodes[
        args[0].folderNode.id
      ];
      return args;
    },
  );
  PluginInjector.after(
    FolderConstructor,
    loader,
    (
      [{ expanded, folderNode }]: [{ expanded: boolean; folderNode: { id: string } }],
      res: React.ReactElement,
    ) => {
      res.props.children.props.children = (
        <FolderIcon
          expanded={expanded}
          folderId={folderNode?.id}
        >{res.props.children.props.children}</FolderIcon>
      );
      return res;
    },
  );
};
