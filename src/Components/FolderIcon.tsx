import { common } from "replugged";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
const { React } = common;
export default React.memo(
  (props: { folderId: string; expanded: boolean; originalChildren: React.ReactElement }) => {
    const FolderData = SettingValues.get("folderData", {});
    const CurrentFolder = FolderData[props.folderId];
    if (CurrentFolder?.iconType !== "custom") {
      return props.originalChildren;
    }
    if (props.expanded) {
      return CurrentFolder.openIcon ? (
        <div
          {...{
            className: "foldersRedesigned-folderIcon",
            style: {
              backgroundImage: `url(${CurrentFolder.openIcon})`,
              width: `${SettingValues.get("iconSize", defaultSettings.iconSize)}%`,
              height: `${SettingValues.get("iconSize", defaultSettings.iconSize)}%`,
            },
          }}
        />
      ) : (
        props.originalChildren ?? null
      );
    }
    return CurrentFolder.closedIcon ? (
      <div
        {...{
          className: "foldersRedesigned-folderIcon",
          style: {
            backgroundImage: `url(${CurrentFolder.closedIcon})`,
            width: `${SettingValues.get("iconSize", defaultSettings.iconSize)}%`,
            height: `${SettingValues.get("iconSize", defaultSettings.iconSize)}%`,
          },
        }}
      />
    ) : (
      props.originalChildren ?? null
    );
  },
);
