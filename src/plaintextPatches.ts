import * as Types from "./types";
export default [
  {
    find: "guildsnav",
    replacements: [
      {
        match:
          /(function\s*(\s*\w+\s*)\s*\(\s*\w+\s*\)\s*{\s*var\s*\w+\s*,\s*\w+\s*,\s*\w+\s*=\s*\w+\s*\.disableAppDownload[^]*?)(const)/,
        replace:
          `$1replugged.webpack.waitForModule(replugged.webpack.filters.bySource("guildsnav"),{raw:true, timeout: 10000}).then((mod)=>Object.defineProperty(mod.exports,"Sidebar",{` +
          `get:()=>$2,` +
          `set:(value)=>$2=value,` +
          `configurable:true,` +
          `writeable:true` +
          `}));$3`,
      },
      {
        match:
          /function\s*(\s*\w+\s*)\s*\(\s*\w+\s*\)\s*{\s*var\s*\w+\s*,\s*\w+\s*,\s*\w+\s*=\w+\s*\.folderNode[^]*?\.folderIconWrapper\s*,\s*children\s*:\s*\[\s*\w+\s*,\s*\w+\s*\]\s*}\s*\)\s*\}/,
        replace:
          `$&replugged.webpack.waitForModule(replugged.webpack.filters.bySource("guildsnav"),{raw:true, timeout: 10000}).then((mod)=>Object.defineProperty(mod.exports,"FolderIcon",{` +
          `get:()=>$1,` +
          `set:(value)=>$1=value,` +
          `configurable:true,` +
          `writeable:true` +
          `}));`,
      },
      {
        match: /(\w)\.themeOverride,/,
        replace: `$&{className}=$1,`,
      },
      {
        match: "getGuildsTree()",
        replace: `getGuildsTree({custom:className?.includes?.("foldersRedesigned-sidebar")})`,
      },
      {
        match: /const (\w+)=\w+\.memo\(\(function\(\w+\){var[^]*?onContextMenu:\w+}\)\)}\)\);/,
        replace:
          `$&replugged.webpack.waitForModule(replugged.webpack.filters.bySource("guildsnav"),{raw:true, timeout: 10000}).then((mod)=>Object.defineProperty(mod.exports,"FolderUnreadPill",{` +
          `get:()=>$1,` +
          `set:(value)=>$1=value,` +
          `configurable:true,` +
          `writeable:true` +
          `}));`,
      },
    ],
  },
  {
    find: "isCopiedStreakGodlike",
    replacements: [
      {
        match:
          /(function\s*(\s*[\w_$]+\s*)\s*\(\s*\)\s*{\s*var\s*\w+\s*,\s*\w+\s*=\s*\(\s*0\s*,\s*\w+\s*\.\s*\w+\s*\)\s*\(\s*\[\s*\w+\s*\.\s*\w+\s*\]\s*,\s*\(\s*function\s*\(\s*\)\s*{\s*return\s*\w+\s*\.\s*\w+\s*\.\s*hasNotice\s*\(\s*\)\s*[^]*?}\s*\)\s*}\s*)(var)/,
        replace:
          `$1replugged.webpack.waitForModule(replugged.webpack.filters.bySource("isCopiedStreakGodlike"),{raw:true, timeout: 10000}).then((mod)=>Object.defineProperty(mod.exports,"BaseLayer",{` +
          `get:()=>$2,` +
          `set:(value)=>$2=value,` +
          `configurable:true,` +
          `writeable:true` +
          `}));$3`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
