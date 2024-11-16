import { React } from "replugged/common";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
export default React.memo(
  (props: { folderId: string; expanded: boolean; children: React.ReactElement }) => {
    const FolderData = SettingValues.get("folderData", {});
    const CurrentFolder = FolderData[props.folderId];
    if (CurrentFolder?.iconType !== "custom") {
      return props.children;
    }
    if (props.expanded) {
      return CurrentFolder.openIcon ? (
        <div
          className="foldersRedesigned-folderIcon"
          style={{
            backgroundImage: `url(${CurrentFolder.openIcon})`,
            width: `${SettingValues.get("iconSize", defaultSettings.iconSize)}%`,
            height: `${SettingValues.get("iconSize", defaultSettings.iconSize)}%`,
          }}
        />
      ) : (
        props.children ?? null
      );
    }
    return CurrentFolder.closedIcon ? (
      <div
        className="foldersRedesigned-folderIcon"
        style={{
          backgroundImage: `url(${CurrentFolder.closedIcon})`,
          width: `${SettingValues.get("iconSize", defaultSettings.iconSize)}%`,
          height: `${SettingValues.get("iconSize", defaultSettings.iconSize)}%`,
        }}
      />
    ) : (
      props.children ?? null
    );
  },
);
