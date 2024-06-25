import { types } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";
import type util from "replugged/dist/renderer/util";
import ReactSpring from "react-spring";

export namespace Types {
  export import DefaultTypes = types;
  export type Tree = util.Tree;
  export type GenericModule = Record<string, DefaultTypes.AnyFunction> & {
    default: DefaultTypes.AnyFunction;
  };
  export interface GenericExport {
    exports?: GenericModule;
    id: string;
    loaded: boolean;
  }
  export interface GenericMemo {
    $$typeof: symbol;
    compare: DefaultTypes.AnyFunction;
    type: DefaultTypes.AnyFunction;
  }

  export interface GuildsNavClasses {
    activityPanel: string;
    base: string;
    container: string;
    content: string;
    downloadProgressCircle: string;
    fullWidth: string;
    guilds: string;
    hasNotice: string;
    hidden: string;
    panels: string;
    sidebar: string;
  }

  export interface ExpandedGuildFolderStore extends Store {
    getExpandedFolders: DefaultTypes.AnyFunction;
    getState: DefaultTypes.AnyFunction;
    isFolderExpanded: DefaultTypes.AnyFunction;
  }

  export interface GuildFolder {
    expanded: boolean;
    folderColor: string;
    folderId: string;
    folderName: string;
    guildIds: string[];
  }

  export interface SortedGuildStore extends Store {
    getCompatibleGuildFolders: DefaultTypes.AnyFunction;
    getFlattenedGuildIds: DefaultTypes.AnyFunction;
    getGuildFolderById: DefaultTypes.AnyFunction;
    getGuildFolders: () => GuildFolder[];
    getGuildsTree: (e?: { custom?: boolean; original?: boolean }) => GuildsTree;
    takeSnapshot: DefaultTypes.AnyFunction;
  }

  export interface GuildTreeItem {
    children: GuildTreeItem[];
    color?: string;
    expanded?: boolean;
    id: string;
    name?: string;
    parentId?: string;
    type: string;
    unavailable?: boolean;
  }

  export interface GuildsTree {
    nodes: Record<string, GuildTreeItem>;
    root: {
      children: GuildTreeItem[];
      type: string;
    };
    version: number;
    size: number;
  }

  export interface Animations {
    animated: ReactSpring.AnimatedComponent<"animate"> & {
      div: ReactSpring.AnimatedComponent<"div">;
    };
    Transition: React.ComponentType<{
      items: boolean;
      from: { width: number };
      enter: { width: number };
      leave: { width: number };
      config: {
        duration: number;
      };
      children: (style: Record<string, string>, show: boolean) => React.ReactNode;
    }>;
    __esModule: true;
  }

  export interface ChannelSelectUtils {
    disconnect: DefaultTypes.AnyFunction;
    selectChannel: DefaultTypes.AnyFunction;
    selectPrivateChannel: DefaultTypes.AnyFunction;
    selectVoiceChannel: DefaultTypes.AnyFunction;
  }

  export interface GuildAndFolderUtils {
    addGuild: DefaultTypes.AnyFunction;
    assignGuildRoleConnection: DefaultTypes.AnyFunction;
    banMultipleUsers: DefaultTypes.AnyFunction;
    banUser: DefaultTypes.AnyFunction;
    batchChannelUpdate: DefaultTypes.AnyFunction;
    batchRoleUpdate: DefaultTypes.AnyFunction;
    collapseAllFolders: DefaultTypes.AnyFunction;
    createGuild: DefaultTypes.AnyFunction;
    createGuildFolderLocal: DefaultTypes.AnyFunction;
    createRole: DefaultTypes.AnyFunction;
    deleteGuild: DefaultTypes.AnyFunction;
    deleteGuildFolderLocal: DefaultTypes.AnyFunction;
    deleteRole: DefaultTypes.AnyFunction;
    editGuildFolderLocal: DefaultTypes.AnyFunction;
    escapeToDefaultChannel: DefaultTypes.AnyFunction;
    fetchApplications: DefaultTypes.AnyFunction;
    fetchGuildBans: DefaultTypes.AnyFunction;
    fetchGuildBansBatch: DefaultTypes.AnyFunction;
    fetchGuildRoleConnectionsEligibility: DefaultTypes.AnyFunction;
    getGuildRoleConnectionsConfigurations: DefaultTypes.AnyFunction;
    joinGuild: DefaultTypes.AnyFunction;
    kickUser: DefaultTypes.AnyFunction;
    move: DefaultTypes.AnyFunction;
    moveById: DefaultTypes.AnyFunction;
    nsfwAgree: DefaultTypes.AnyFunction;
    nsfwReturnToSafety: DefaultTypes.AnyFunction;
    requestMembers: DefaultTypes.AnyFunction;
    requestMembersById: DefaultTypes.AnyFunction;
    searchGuildBans: DefaultTypes.AnyFunction;
    searchRecentMembers: DefaultTypes.AnyFunction;
    selectGuild: DefaultTypes.AnyFunction;
    setChannel: DefaultTypes.AnyFunction;
    setCommunicationDisabledUntil: DefaultTypes.AnyFunction;
    setGuildFolderExpanded: DefaultTypes.AnyFunction;
    setMemberFlags: DefaultTypes.AnyFunction;
    setServerDeaf: DefaultTypes.AnyFunction;
    setServerMute: DefaultTypes.AnyFunction;
    toggleGuildFolderExpand: DefaultTypes.AnyFunction;
    transitionToGuildSync: DefaultTypes.AnyFunction;
    unassignGuildRoleConnection: DefaultTypes.AnyFunction;
    unbanUser: DefaultTypes.AnyFunction;
    updateRole: DefaultTypes.AnyFunction;
    updateRolePermissions: DefaultTypes.AnyFunction;
    waitForGuild: DefaultTypes.AnyFunction;
  }
  export interface GuildTreeConstructors {
    GuildsNodeType: Record<string, string>;
    GuildsTree: () => void;
    createFolderNode: DefaultTypes.AnyFunction;
    createGuildNode: DefaultTypes.AnyFunction;
  }
  export interface ImageInput {
    default: React.ComponentClass<{ onChange: (...args: unknown[]) => void }>;
    processImage: DefaultTypes.AnyFunction;
  }
  export type Jsonifiable =
    | null
    | undefined
    | boolean
    | number
    | string
    | Jsonifiable[]
    | { [key: string]: Jsonifiable };
  export type ValType<T> =
    | T
    | React.ChangeEvent<HTMLInputElement>
    | (Record<string, unknown> & { value?: T; checked?: T });

  export type NestedType<T, P> = P extends
    | `${infer Left}.${infer Right}`
    | `${infer Left}/${infer Right}`
    | `${infer Left}-${infer Right}`
    ? Left extends keyof T
      ? NestedType<T[Left], Right>
      : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? NestedType<Exclude<T[FieldKey], undefined> extends infer U ? U : never, IndexKey>
        : undefined
      : undefined
    : P extends keyof T
    ? T[P]
    : P extends `${infer FieldKey}[${infer _IndexKey}]`
    ? FieldKey extends keyof T
      ? Exclude<T[FieldKey], undefined> extends infer U
        ? U
        : never
      : undefined
    : undefined;
  export interface Modules extends Record<string, unknown> {
    loadModules?: () => Promise<void>;
    Sidebar:
      | null
      | (React.ComponentType<{
          custom: boolean;
          className: string;
          style?: React.StyleHTMLAttributes<React.ReactElement>;
        }> &
          DefaultTypes.AnyFunction);
    ExpandedGuildFolderStore?: ExpandedGuildFolderStore;
    SortedGuildStore?: SortedGuildStore;
    GuildsNavClasses?: GuildsNavClasses;
    GuildFolderSettingsModalPromise?: Promise<DefaultTypes.AnyFunction>;
    GuildTreeConstructorsModule?: GenericModule;
    GuildTreeConstructors?: GuildTreeConstructors;
    FolderConstructor?: GenericModule;
    FolderUnreadPillConstructor?: GenericMemo;
    Animations?: Animations;
    ChannelSelectUtils?: ChannelSelectUtils;
    GuildAndFolderUtils?: GuildAndFolderUtils;
    ImageInput?: GenericModule;
  }
  export interface Settings {
    folderData: {
      iconType: "CUSTOM" | "DEFAULT";
      openIcon: string;
      closedIcon: string;
    };
    sidebar: boolean;
    folderInSidebar: boolean;
    sidebarAnimation: boolean;
    sidebarBlacklist: Record<string, boolean>;
    closeAllFolders: boolean;
    forceOpen: boolean;
    closeOthers: boolean;
    iconSize: number;
  }
}
export default Types;
