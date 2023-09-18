import { webpack } from "replugged";
import Types from "../types";
export const { exports: GuildsNav } = webpack.getBySource<Types.GenericMemo>("guildsnav", {
  raw: true,
});
export const SidebarContainer = {
  Sidebar: webpack.getBySource("guildsnav", { raw: true }).exports
    .Sidebar as Types.DefaultTypes.AnyFunction,
};
export const GuildsNavClasses = webpack.getByProps<Types.GuildsNavClasses>("guilds", "sidebar");
export const GuildFolderSettingsModalPromise =
  webpack.waitForModule<Types.DefaultTypes.AnyFunction>(
    webpack.filters.bySource("handleColorChange"),
  );
export const ExpandedGuildFolderStore = webpack.getByStoreName<Types.ExpandedGuildFolderStore>(
  "ExpandedGuildFolderStore",
);
export const SortedGuildStore = webpack.getByStoreName<Types.SortedGuildStore>("SortedGuildStore");
export const GuildTreeModule = webpack.getBySource("sortedGuildNodes=");
export const GuildTreeConstructors = {
  GuildTreeGuild: webpack.getFunctionBySource<(...args: unknown[]) => void>(
    GuildTreeModule,
    "GUILD",
  ),
  GuildTreeRoot: webpack.getFunctionBySource<(...args: unknown[]) => void>(GuildTreeModule, "ROOT"),
  GuildTreeFolder: webpack.getFunctionBySource<(...args: unknown[]) => void>(
    GuildTreeModule,
    "FOLDER",
  ),
};
export const { exports: AppView } = webpack.getBySource<{
  exports: { BaseLayer: Types.GenericMemo };
}>("isCopiedStreakGodlike", { raw: true });
export const AppViewClasses = webpack.getByProps<Types.AppViewClasses>(
  "app",
  "appAsidePanelWrapper",
);
export const Animations = webpack.getByProps<Types.Animations>(["a", "animated", "useTransition"]);
export const ChannelSelectUtils = webpack.getByProps<Types.ChannelSelectUtils>(
  "selectChannel",
  "selectPrivateChannel",
);
export const GuildAndFolderUtils = webpack.getByProps<Types.GuildAndFolderUtils>([
  "toggleGuildFolderExpand",
  "toggleGuildFolderExpand",
]);
export const ImageInput = webpack.getFunctionBySource<
  React.ComponentClass<{ onChange: (...args: unknown[]) => void }>
>(webpack.getBySource("multiple:!0,"), ".handleFileChange");
