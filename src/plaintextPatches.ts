import Types from "./types";
export default [
  {
    find: "guildsnav",
    replacements: [
      {
        match: /themeOverride:\w+/,
        replace: (suffix: string) => `className,${suffix},`,
      },
      {
        match: "getGuildsTree()",
        replace: () => `getGuildsTree({custom:className?.includes?.("foldersRedesigned-sidebar")})`,
      },
      {
        match:
          /let \w+=\(0,\w+.default\)\("guildsnav"\);return\(0,\w+\.jsx\)\(\w+\.ListNavigatorProvider,{navigator:\w+,children:\(0,\w+\.jsx\)\((\w+)/,
        replace: (prefix: string, fn: string) =>
          `${prefix}=replugged.plugins.getExports("dev.tharki.FoldersRedesigned")?._assignSidebar?.(${fn})??${fn}`,
      },
    ],
  },
  {
    find: ".AnalyticsSections.RTC_CONNECTION_PANEL",
    replacements: [
      {
        match: /\.guilds,themeOverride:\w+}\),/,
        replace: (prefix) =>
          `${prefix}replugged.plugins.getExports("dev.tharki.FoldersRedesigned")?._renderCustomSidebar?.(),`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
