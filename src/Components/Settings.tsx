import { flux as Flux, React } from "replugged/common";
import { Category, FormItem, SelectItem, SliderItem, SwitchItem } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";
import FolderSettings from "./FolderSettings";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};

export const Settings = (): React.ReactElement => {
  const { SortedGuildStore } = Modules;
  const GuildFolders = Flux.useStateFromStores([SortedGuildStore], () =>
    SortedGuildStore.getGuildFolders().filter((f) => f.folderId),
  );
  const guildFolderSettingComponents = GuildFolders.map(({ folderId, folderName }, index) => (
    <FormItem
      key={folderName ?? `Server Folder #${index + 1}`}
      divider={true}
      style={{
        marginBottom: "6px",
      }}>
      <FolderSettings
        folderId={folderId}
        key={`${SettingValues.get("sidebar", defaultSettings.sidebar)}`}
      />
    </FormItem>
  ));
  const [generalOpen, setGeneralOpen] = React.useState(false);
  const [folderOpen, setFolderOpen] = React.useState(false);
  const [key, setKey] = React.useState(`${generalOpen} ${folderOpen}`);
  const [selectedFolder, setSelectedFolder] = React.useState("");
  React.useEffect(() => {
    setKey(`${generalOpen} ${folderOpen}`);
  }, [generalOpen, folderOpen]);

  return (
    <div key={key}>
      <Category
        title="General Settings"
        open={generalOpen}
        onChange={() => {
          setGeneralOpen((prev) => !prev);
          setFolderOpen(false);
        }}>
        <SwitchItem
          {...Utils.useSetting(SettingValues, "sidebar", defaultSettings.sidebar)}
          note="Display servers from folder on dedicated sidebar">
          Sidebar
        </SwitchItem>
        <SwitchItem
          {...Utils.useSetting(SettingValues, "folderInSidebar", defaultSettings.folderInSidebar)}
          note="Show the open folder itself in dedicated folder sidebar">
          Folder in Sidebar
        </SwitchItem>
        <SwitchItem
          {...Utils.useSetting(SettingValues, "sidebarAnimation", defaultSettings.sidebarAnimation)}
          note="Animate the opening and closing of the dedicated folder sidebar">
          Sidebar Animation
        </SwitchItem>
        <SliderItem
          {...Utils.useSetting(
            SettingValues,
            "sidebarAnimationMs",
            defaultSettings.sidebarAnimationMs,
          )}
          onValueRender={(value) => `${value.toFixed(1)}ms`}
          minValue={100}
          maxValue={300}
          note="How much time the animation for sidebar take in ms">
          Animation Time
        </SliderItem>
        <SwitchItem
          {...Utils.useSetting(SettingValues, "closeAllFolders", defaultSettings.closeAllFolders)}
          note="Close all folders when selecting a server not in a folder or DMs/home">
          Close All
        </SwitchItem>
        <SwitchItem
          {...Utils.useSetting(SettingValues, "forceOpen", defaultSettings.forceOpen)}
          note="Force a folder to open when switching to a server of that folder">
          Force Open
        </SwitchItem>
        <SwitchItem
          {...Utils.useSetting(SettingValues, "closeOthers", defaultSettings.closeOthers)}
          note="Close other folders when opening a folder">
          Close Others
        </SwitchItem>
        <SliderItem
          {...Utils.useSetting(SettingValues, "iconSize", defaultSettings.iconSize)}
          onValueRender={(value) => `${value.toFixed(1)}%`}
          minValue={75}
          maxValue={100}
          note="How much area to cover with custom icon">
          Icon Size
        </SliderItem>
      </Category>
      <Category
        title="Folder Settings"
        open={folderOpen}
        onChange={() => {
          setFolderOpen((prev) => !prev);
          setGeneralOpen(false);
        }}
        key={`${SettingValues.get("sidebar", defaultSettings.sidebar)}`}>
        <SelectItem
          note="Select folder to manage settings of"
          options={GuildFolders.map(({ folderName }, index) => ({
            label: folderName ?? `Server Folder #${index + 1}`,
            value: folderName ?? `Server Folder #${index + 1}`,
          }))}
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e)}>
          Choose Folder
        </SelectItem>
        {guildFolderSettingComponents?.find?.((c) => c?.key === selectedFolder)}
      </Category>
    </div>
  );
};

export default { registerSettings, Settings };
