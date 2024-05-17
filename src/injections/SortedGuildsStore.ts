import { lodash } from "replugged/common";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export default (): void => {
  const { ExpandedGuildFolderStore, SortedGuildStore } = Modules;
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

      const ret: Types.GuildsTree = args[0]?.custom
        ? Utils.getGuildTree("custom")
        : Utils.getGuildTree("main");
      const expandedFolders = Array.from(
        ExpandedGuildFolderStore.getExpandedFolders() as Set<string>,
      );

      ret.version = res.version;

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
            .map((id) =>
              SettingValues.get("folderInSidebar", defaultSettings.folderInSidebar)
                ? [
                    res?.root?.children?.find?.((c) => c?.id == id),
                    ...(res?.root?.children?.find?.((c) => c?.id == id)?.children ?? []),
                  ]
                : res?.root?.children?.find?.((c) => c?.id == id)?.children,
            )
            ?.flat(1)
            .filter(Boolean) ?? res.root.children
        : ret.root.children;

      return ret;
    },
  );
};
