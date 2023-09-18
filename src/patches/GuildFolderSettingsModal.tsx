import { PluginInjector } from "../index";
import { GuildFolderSettingsModalPromise } from "../lib/requiredModules";
import FolderSettings from "../Components/FolderSettings";
import utils from "../lib/utils";
import Types from "../types";
export default async () => {
  const GuildFolderSettingsModal = await GuildFolderSettingsModalPromise;
  PluginInjector.after(
    GuildFolderSettingsModal.prototype,
    "render",
    (
      _args,
      res: React.ReactElement,
      { props: { folderId } }: Types.DefaultTypes.ObjectExports & { props: { folderId: string } },
    ) => {
      const container = utils.findInReactTree(res, (c) => c?.type === "form") as React.ReactElement;
      if (container?.props?.children.some((c) => c?.type?.toString()?.includes("folderData."))) {
        return res;
      }
      container?.props?.children?.push?.(
        <FolderSettings
          {...{
            folderId,
            style: {
              marginBottom: "10px",
            },
          }}
        />,
      );
      return res;
    },
  );
};
