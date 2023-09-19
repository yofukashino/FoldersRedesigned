import { common } from "replugged";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import {
  ExpandedGuildFolderStore,
  GuildTreeConstructors,
  SortedGuildStore,
} from "../lib/requiredModules";
import Types from "../types";

const { lodash } = common;
export default (): void => {
  PluginInjector.after(
    SortedGuildStore,
    "getGuildsTree",
    (
      args: [{ custom: boolean | undefined; original: boolean | undefined }],
      res: Types.GuildsTree,
    ) => {
      if (!SettingValues.get("sidebar", defaultSettings.sidebar) || args[0]?.original) {
        return res;
      }

      const ret: Types.GuildsTree = new GuildTreeConstructors.GuildTreeRoot();
      const expandedFolders = Array.from(
        ExpandedGuildFolderStore.getExpandedFolders() as Set<string>,
      );

      if (!args[0]?.custom) {
        ret.nodes = lodash.cloneDeep(res.nodes);
        ret.root = lodash.cloneDeep(res.root);
        for (const id in ret?.nodes) {
          if (
            ret?.nodes?.[id]?.children &&
            ret?.nodes?.[id]?.type == "folder" &&
            !SettingValues.get("sidebarBlacklist", defaultSettings.sidebarBlacklist)?.[id]
          ) {
            ret.nodes[id].children = [];
          }
        }

        const rootItems = ret?.root?.children?.filter?.((c) => c?.type == "folder");
        for (const rootItem of rootItems.filter(
          (c) => !SettingValues.get("sidebarBlacklist", defaultSettings.sidebarBlacklist)?.[c?.id],
        )) {
          rootItem.children = [];
        }

        return ret;
      }

      ret.nodes = expandedFolders.length
        ? Object.fromEntries(
            expandedFolders
              .filter(
                (id) =>
                  !SettingValues.get("sidebarBlacklist", defaultSettings.sidebarBlacklist)?.[id],
              )
              .map((id) => res?.nodes?.[id]?.children?.map?.((guild) => [guild?.id, guild]))
              ?.flat(1)
              .filter(Boolean) ?? Object.entries(res.nodes),
          )
        : res.nodes;

      ret.root.children = expandedFolders.length
        ? expandedFolders
            .filter(
              (id) =>
                !SettingValues.get("sidebarBlacklist", defaultSettings.sidebarBlacklist)?.[id],
            )
            .map((id) => res?.root?.children?.find?.((c) => c?.id == id)?.children)
            ?.flat(1)
            .filter(Boolean) ?? res.root.children
        : ret.root.children;

      return ret;
    },
  );
};
