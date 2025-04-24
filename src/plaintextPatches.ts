import Types from "./types";
export default [
  {
    find: "guildsnav",
    replacements: [
      {
        match: "getGuildsTree()",
        replace: () => `getGuildsTree({custom:arguments[0]?.custom})`,
      },
      {
        match: /\.unreadMentionsBar}\)]/,
        replace: (prefix) =>
          `${prefix}.reduce(replugged.plugins.getExports("dev.tharki.FoldersRedesigned")?._reduceSidebar?.bind?.(null, arguments[0]) ?? ((a,c,i,o) => o), [])`,
      },
    ],
  },
  {
    find: ".ImpressionNames.FRIENDS",
    replacements: [
      {
        match: /\.channelListHidden.{10,75}\.guilds,themeOverride:\w+}\),/,
        replace: (prefix) =>
          `${prefix}replugged.plugins.getExports("dev.tharki.FoldersRedesigned")?._renderCustomSidebar?.(),`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
