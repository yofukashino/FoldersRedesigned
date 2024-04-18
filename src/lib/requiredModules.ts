import { webpack } from "replugged";
import Types from "../types";
const Modules: Types.Modules = {
  Sidebar: null,
};
Modules.loadModules = async () => {
  Modules.ExpandedGuildFolderStore ??= webpack.getByStoreName<Types.ExpandedGuildFolderStore>(
    "ExpandedGuildFolderStore",
  );
  Modules.SortedGuildStore ??= webpack.getByStoreName<Types.SortedGuildStore>("SortedGuildStore");
  Modules.GuildsNavClasses ??= await webpack.waitForProps<Types.GuildsNavClasses>(
    "guilds",
    "sidebar",
  );
  Modules.GuildFolderSettingsModalPromise = webpack.waitForModule<Types.DefaultTypes.AnyFunction>(
    webpack.filters.bySource("handleColorChange"),
  );

  Modules.GuildTreeConstructors ??= await webpack
    .waitForProps(["GuildsTree", "createFolderNode"], { raw: true })
    .then(({ exports }) => exports);
  Modules.FolderConstructor ??= await webpack
    .waitForModule(webpack.filters.bySource(".Messages.GUILD_FOLDER_TOOLTIP_A11Y_LABEL"), {
      raw: true,
    })
    .then(({ exports }) => exports);

  Modules.FolderUnreadPillConstructor ??= await webpack.waitForModule<Types.GenericMemo>(
    webpack.filters.bySource(".MAX_GUILD_FOLDER_NAME_LENGTH"),
  );

  Modules.Animations ??= await webpack.waitForProps<Types.Animations>(["Transition", "animated"]);
  Modules.ChannelSelectUtils ??= await webpack.waitForProps<Types.ChannelSelectUtils>(
    "selectChannel",
    "selectPrivateChannel",
  );
  Modules.GuildAndFolderUtils ??= await webpack.waitForProps<Types.GuildAndFolderUtils>([
    "toggleGuildFolderExpand",
    "toggleGuildFolderExpand",
  ]);
  Modules.ImageInput ??= await webpack.waitForProps<{
    default: React.ComponentClass<{ onChange: (...args: unknown[]) => void }>;
    processImage: Types.DefaultTypes.AnyFunction;
  }>("processImage");
};

export default Modules;
