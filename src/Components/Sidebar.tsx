import { plugins } from "replugged";
import { flux as Flux, React } from "replugged/common";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default React.memo(() => {
  const { Animations, ExpandedGuildFolderStore, GuildsNavClasses, SortedGuildStore } = Modules;
  const loadedModules =
    Animations &&
    ExpandedGuildFolderStore &&
    GuildsNavClasses &&
    SortedGuildStore &&
    Modules.Sidebar;
  const expandedFolders = loadedModules
    ? Flux.useStateFromStores([ExpandedGuildFolderStore, SortedGuildStore], () => {
        return (
          ExpandedGuildFolderStore &&
          Array.from(ExpandedGuildFolderStore?.getExpandedFolders() as Set<string>)
            .filter(
              (id) =>
                !SettingValues.get("sidebarBlacklist", defaultSettings.sidebarBlacklist)?.[id],
            )
            .filter((id) => SortedGuildStore?.getGuildFolders().find((f) => f.folderId === id))
            .filter(Boolean)
        );
      })
    : [];
  const hide =
    !SettingValues.get("sidebar", false) ||
    !expandedFolders.length ||
    plugins.getDisabled()?.includes("dev.tharki.FoldersRedesigned");
  const GuildNavElement = document.querySelector(`.${GuildsNavClasses?.guilds}`);
  if (
    !SettingValues.get("sidebarAnimation", defaultSettings.sidebarAnimation) ||
    !GuildNavElement
  ) {
    return (
      loadedModules && (
        <div key={`${hide}`} className="foldersRedesigned-sidebar">
          {hide ? null : (
            <Modules.Sidebar className={`${GuildsNavClasses.guilds} foldersRedesigned-sidebar`} />
          )}
        </div>
      )
    );
  }
  return (
    loadedModules && (
      <Animations.Transition
        items={!hide}
        from={{ width: 0 }}
        enter={{ width: GuildNavElement.getBoundingClientRect().width }}
        leave={{ width: 0 }}
        config={{
          duration: SettingValues.get("sidebarAnimationMs", defaultSettings.sidebarAnimationMs),
        }}>
        {(style, show) =>
          show && (
            <Animations.animated.div
              key={`${hide}`}
              style={style}
              className="foldersRedesigned-sidebar">
              <Modules.Sidebar
                className={`${GuildsNavClasses.guilds} foldersRedesigned-sidebar`}
                style={style}
              />
            </Animations.animated.div>
          )
        }
      </Animations.Transition>
    )
  );
});
