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
        match:
          /let \w+=\(0,\w+.\w+\)\("guildsnav"\);return\(0,\w+\.jsx\)\(\w+\.\w+,{navigator:\w+,children:\(0,\w+\.jsx\)\((\w+)/,
        replace: (prefix: string, fn: string) =>
          `${prefix}=replugged.plugins.getExports("dev.tharki.FoldersRedesigned")?._assignSidebar?.(${fn})??${fn}`,
      },
    ],
  },
  {
    find: ".ImpressionNames.FRIENDS",
    replacements: [
      {
        match: /\.container.{10,50}\.guilds,themeOverride:\w+}\),/,
        replace: (prefix) =>
          `${prefix}replugged.plugins.getExports("dev.tharki.FoldersRedesigned")?._renderCustomSidebar?.(),`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
