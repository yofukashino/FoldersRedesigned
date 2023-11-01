import { webpack } from "replugged";
import Types from "../types";
export const { exports: GuildsNav } = webpack.getBySource("guildsnav", { raw: true });
export const GuildsNavClasses = webpack.getByProps<Types.GuildsNavClasses>("guilds", "sidebar");
export const GuildFolderSettingsModalPromise =
  webpack.waitForModule<Types.DefaultTypes.AnyFunction>(
    webpack.filters.bySource("handleColorChange"),
  );
export const ExpandedGuildFolderStore = webpack.getByStoreName<Types.ExpandedGuildFolderStore>(
  "ExpandedGuildFolderStore",
);
export const SortedGuildStore = webpack.getByStoreName<Types.SortedGuildStore>("SortedGuildStore");
export const { exports: GuildTreeConstructors } = webpack.getByProps(
  ["GuildsTree", "createFolderNode"],
  { raw: true },
);
export const { exports: FolderConstructor } = webpack.getBySource(
  ".Messages.GUILD_FOLDER_TOOLTIP_A11Y_LABEL",
  { raw: true },
);

export const FolderUnreadPillConstructor = webpack.getBySource<Types.GenericMemo>(
  ".MAX_GUILD_FOLDER_NAME_LENGTH",
);
export const Animations = webpack.getByProps<Types.Animations>(["Transition", "animated"]);
export const ChannelSelectUtils = webpack.getByProps<Types.ChannelSelectUtils>(
  "selectChannel",
  "selectPrivateChannel",
);
export const GuildAndFolderUtils = webpack.getByProps<Types.GuildAndFolderUtils>([
  "toggleGuildFolderExpand",
  "toggleGuildFolderExpand",
]);
export const ImageInput = webpack.getByProps<{
  default: React.ComponentClass<{ onChange: (...args: unknown[]) => void }>;
  processImage: Types.DefaultTypes.AnyFunction;
}>("processImage");
