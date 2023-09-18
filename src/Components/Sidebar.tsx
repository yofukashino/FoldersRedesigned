import { common } from "replugged";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import {
  SidebarContainer,
  GuildsNavClasses,
  ExpandedGuildFolderStore,
  Animations,
} from "../lib/requiredModules";
const { React, flux: Flux } = common;

export default React.memo(() => {
  const expandedFolders = Flux.useStateFromStores([ExpandedGuildFolderStore], () => {
    return Array.from(ExpandedGuildFolderStore.getExpandedFolders() as Set<string>).filter(
      (id) => !SettingValues.get("sidebarBlacklist", defaultSettings.sidebarBlacklist)?.[id],
    );
  });
  const hide = !SettingValues.get("sidebar", false) || !expandedFolders.length;
  const { Sidebar } = SidebarContainer as { Sidebar: React.ComponentType<{ className: string }> };
  const GuildNavElement = document.querySelector(`.${GuildsNavClasses.guilds}`);
  if (
    !SettingValues.get("sidebarAnimation", defaultSettings.sidebarAnimation) ||
    !GuildNavElement
  ) {
    return (
      <div
        {...{
          key: `${hide}`,
          className: "tharki-sidebar",
        }}>
        {hide ? null : (
          <Sidebar
            {...{
              className: `${GuildsNavClasses.guilds} tharki`,
            }}
          />
        )}
      </div>
    );
  }
  return (
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
            {...{
              key: `${hide}`,
              style,
              className: "tharki-sidebar",
            }}>
            <Sidebar
              {...{
                className: `${GuildsNavClasses.guilds} tharki`,
                style,
              }}
            />
          </Animations.animated.div>
        )
      }
    </Animations.Transition>
  );
});
