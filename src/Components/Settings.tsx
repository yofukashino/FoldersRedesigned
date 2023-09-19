import { common, components } from "replugged";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import { SortedGuildStore } from "../lib/requiredModules";
const { flux: Flux } = common;
const { SwitchItem, Category, SliderItem, FormItem } = components;
import utils from "../lib/utils";
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
  const GuildFolders = Flux.useStateFromStores([SortedGuildStore], () =>
    SortedGuildStore.getGuildFolders().filter((f) => f.folderId),
  );
  return (
    <div>
      <Category {...{ title: "General Settings", open: false }}>
        <SwitchItem
          {...{
            ...utils.useSetting(SettingValues, "sidebar", defaultSettings.sidebar),
            note: "Display servers from folder on dedicated sidebar",
          }}>
          Sidebar
        </SwitchItem>
        <SwitchItem
          {...{
            ...utils.useSetting(
              SettingValues,
              "sidebarAnimation",
              defaultSettings.sidebarAnimation,
            ),
            note: "Animate opening and closing of dedicated the folder sidebar",
          }}>
          Sidebar Animation
        </SwitchItem>
        <SliderItem
          {...{
            ...utils.useSetting(
              SettingValues,
              "sidebarAnimationMs",
              defaultSettings.sidebarAnimationMs,
            ),
            onValueRender: (value) => `${value.toFixed(1)}ms`,
            minValue: 100,
            maxValue: 300,
            note: "How Much time the Animation for sidebar take in ms",
          }}>
          Animation Time
        </SliderItem>
        <SwitchItem
          {...{
            ...utils.useSetting(SettingValues, "closeAllFolders", defaultSettings.closeAllFolders),
            note: "Close all folders when selecting a server not in a folder or DMs/home",
          }}>
          Close All
        </SwitchItem>
        <SwitchItem
          {...{
            ...utils.useSetting(SettingValues, "forceOpen", defaultSettings.forceOpen),
            note: "Force a folder to open when switching to a server of that folder",
          }}>
          Force Open
        </SwitchItem>
        <SwitchItem
          {...{
            ...utils.useSetting(SettingValues, "closeOthers", defaultSettings.closeOthers),
            note: "Close other folders when opening a folder",
          }}>
          Close Others
        </SwitchItem>
        <SliderItem
          {...{
            ...utils.useSetting(SettingValues, "iconSize", defaultSettings.iconSize),
            onValueRender: (value) => `${value.toFixed(1)}%`,
            minValue: 75,
            maxValue: 100,
            note: "How much area to cover with custom icon",
          }}>
          Icon Size
        </SliderItem>
      </Category>
      <Category
        {...{
          title: "Folder Settings",
          open: false,
          key: `${SettingValues.get("sidebar", defaultSettings.sidebar)}`,
        }}>
        {GuildFolders.map(({ folderId, folderName }, index) => (
          <FormItem
            {...{
              title: folderName ?? `Server Folder #${index + 1}`,
              divider: true,
              style: {
                marginBottom: "6px",
              },
            }}>
            <FolderSettings
              {...{ folderId, key: `${SettingValues.get("sidebar", defaultSettings.sidebar)}` }}
            />
          </FormItem>
        ))}
      </Category>
    </div>
  );
};
