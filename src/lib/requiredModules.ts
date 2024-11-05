import { webpack } from "replugged";
import Types from "../types";

const Modules: Types.Modules = {
  Sidebar: null,
};

Modules.loadModules = async () => {
  Modules.GuildTreeConstructorsModule ??= await webpack
    .waitForModule<Types.GenericModule>(webpack.filters.bySource("[GUILDS TREE]"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find GuildTreeConstructors Module");
    });

  Modules.GuildTreeConstructors ??= {
    GuildsNodeType: webpack.getExportsForProps<Types.GuildTreeConstructors["GuildsNodeType"]>(
      Modules.GuildTreeConstructorsModule,
      ["FOLDER", "GUILD"],
    ),
    GuildsTree: webpack.getFunctionBySource<() => void>(
      Modules.GuildTreeConstructorsModule,
      'type:"root"',
    ),
    createFolderNode: webpack.getFunctionBySource<Types.DefaultTypes.AnyFunction>(
      Modules.GuildTreeConstructorsModule,
      'type:"folder"',
    ),
    createGuildNode: webpack.getFunctionBySource<Types.DefaultTypes.AnyFunction>(
      Modules.GuildTreeConstructorsModule,
      'type:"guild"',
    ),
  };

  Modules.FolderConstructor ??= await webpack
    .waitForModule<Types.GenericExport>(webpack.filters.bySource(".expandedFolderIconWrapper"), {
      raw: true,
      timeout: 10000,
    })
    .then(({ exports }) => exports)
    .catch(() => {
      throw new Error("Failed To Find FolderConstructor  Module");
    });

  Modules.FolderUnreadPillConstructor ??= await webpack
    .waitForModule<Types.GenericMemo>(
      webpack.filters.bySource(/mediaState:\w+,defaultFolderName/),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find FolderUnreadPillConstructor Module");
    });

  Modules.Animations ??= await webpack
    .waitForProps<Types.Animations>(["Transition", "animated"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find Animations Module");
    });

  Modules.ChannelSelectUtils ??= await webpack
    .waitForProps<Types.ChannelSelectUtils>(["selectChannel", "selectPrivateChannel"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find ChannelSelectUtils Module");
    });

  Modules.GuildAndFolderUtils ??= await webpack
    .waitForProps<Types.GuildAndFolderUtils>(
      ["toggleGuildFolderExpand", "toggleGuildFolderExpand"],
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find GuildAndFolderUtils Module");
    });

  Modules.ImageInput ??= await webpack
    .waitForModule<Types.GenericModule>(webpack.filters.bySource("maxFileSizeBytes:1/0"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find ImageInput Module");
    });

  Modules.GuildFolderSettingsModalPromise = webpack.waitForModule<Types.DefaultTypes.AnyFunction>(
    webpack.filters.bySource("handleColorChange"),
  );

  Modules.ExpandedGuildFolderStore ??= webpack.getByStoreName<Types.ExpandedGuildFolderStore>(
    "ExpandedGuildFolderStore",
  );
  Modules.SortedGuildStore ??= webpack.getByStoreName<Types.SortedGuildStore>("SortedGuildStore");
  Modules.GuildsNavClasses ??= await webpack.waitForProps<Types.GuildsNavClasses>(
    "guilds",
    "sidebar",
  );
};

export default Modules;
