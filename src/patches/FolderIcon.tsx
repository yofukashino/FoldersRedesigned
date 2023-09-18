import { PluginInjector } from "../index";
import { GuildsNav, GuildsNavClasses } from "../lib/requiredModules";
import FolderIcon from "../Components/FolderIcon";
import utils from "../lib/utils";
export default () => {
  PluginInjector.after(
    GuildsNav,
    "FolderIcon",
    (
      [
        {
          expanded,
          folderNode: { id },
        },
      ]: [{ expanded: boolean; folderNode: { id: string } }],
      res,
    ) => {
      res.props.children = (
        <FolderIcon
          {...{
            expanded,
            folderId: id,
            originalChildren: res.props.children,
          }}
        />
      );
      return res;
    },
  );
  void utils.forceRerenderElement(`.${GuildsNavClasses.guilds}`);
};
