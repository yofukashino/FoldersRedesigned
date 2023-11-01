import { common } from "replugged";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import {
  Animations,
  ExpandedGuildFolderStore,
  GuildsNav,
  GuildsNavClasses,
  SortedGuildStore,
} from "../lib/requiredModules";
const { React, flux: Flux } = common;

export default React.memo(() => {
  const expandedFolders = Flux.useStateFromStores(
    [ExpandedGuildFolderStore, SortedGuildStore],
    () => {
      return Array.from(ExpandedGuildFolderStore.getExpandedFolders() as Set<string>)
        .filter(
          (id) => !SettingValues.get("sidebarBlacklist", defaultSettings.sidebarBlacklist)?.[id],
        )
        .filter((id) => SortedGuildStore.getGuildFolders().find((f) => f.folderId === id))
        .filter(Boolean);
    },
  );
  const hide =
    !SettingValues.get("sidebar", false) || !expandedFolders.length || !GuildsNav.Sidebar;
  const GuildNavElement = document.querySelector(`.${GuildsNavClasses.guilds}`);
  if (
    !SettingValues.get("sidebarAnimation", defaultSettings.sidebarAnimation) ||
    !GuildNavElement
  ) {
    return (
      <div
        {...{
          key: `${hide}`,
          className: "foldersRedesigned-sidebar",
        }}>
        {hide ? null : (
          <GuildsNav.Sidebar
            {...{
              className: `${GuildsNavClasses.guilds} foldersRedesigned-sidebar`,
            }}
          />
        )}
      </div>
    );
  }
  return (
    <Animations.Transition
      {...{
        items: !hide,
        from: { width: 0 },
        enter: { width: GuildNavElement.getBoundingClientRect().width },
        leave: { width: 0 },
        config: {
          duration: SettingValues.get("sidebarAnimationMs", defaultSettings.sidebarAnimationMs),
        },
      }}>
      {(style, show) =>
        show && (
          <Animations.animated.div
            {...{
              key: `${hide}`,
              style,
              className: "foldersRedesigned-sidebar",
            }}>
            <GuildsNav.Sidebar
              {...{
                className: `${GuildsNavClasses.guilds} foldersRedesigned-sidebar`,
                style,
              }}
            />
          </Animations.animated.div>
        )
      }
    </Animations.Transition>
  );
});
