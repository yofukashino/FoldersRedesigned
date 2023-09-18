import { types as DefaultTypes } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";
export { types as DefaultTypes } from "replugged";

export interface GenericModule extends Record<string, DefaultTypes.AnyFunction> {}

export interface GenericMemo {
  $$typeof: Symbol;
  compare: DefaultTypes.AnyFunction;
  type: DefaultTypes.AnyFunction;
}

export interface AppViewClasses {
  allowsScrolling: string;
  app: string;
  appAsidePanelWrapper: string;
  mobileApp: string;
  mobileAppAsidePanelWrapper: string;
  notAppAsidePanel: string;
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

export type NestedType<T, P> = P extends `${infer Left}.${infer Right}`
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

export interface SortedGuildStore extends Store {
  getCompatibleGuildFolders: DefaultTypes.AnyFunction;
  getFlattenedGuildIds: DefaultTypes.AnyFunction;
  getGuildFolderById: DefaultTypes.AnyFunction;
  getGuildFolders: () => GuildFolder[];
  getGuildsTree: DefaultTypes.AnyFunction;
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
  BailSignal: React.ComponentType<any>;
  Controller: React.ComponentType<any>;
  FrameLoop: React.ComponentType<any>;
  FrameValue: React.ComponentType<any>;
  a: React.ComponentType<any>;
  animated: React.ComponentType<any> & {
    div: React.ComponentType<any>;
  };
  Globals: { __esModule: true };
  Interpolation: React.ComponentType<any>;
  Spring: React.ComponentType<any>;
  SpringContext: React.ComponentType<any>;
  SpringHandle: { create: DefaultTypes.AnyFunction };
  SpringValue: React.ComponentType<any>;
  Trail: React.ComponentType<any>;
  Transition: React.ComponentType<any>;
  config: {
    default: { tension: number; friction: number };
    gentle: { tension: number; friction: number };
    molasses: { tension: number; friction: number };
    slow: { tension: number; friction: number };
    stiff: { tension: number; friction: number };
    wobbly: { tension: number; friction: number };
  };
  createInterpolator: React.ComponentType<any>;
  inferTo: React.ComponentType<any>;
  interpolate: React.ComponentType<any>;
  to: React.ComponentType<any>;
  update: React.ComponentType<any>;
  useChain: React.ComponentType<any>;
  useSpring: React.ComponentType<any>;
  useSprings: React.ComponentType<any>;
  useTrail: React.ComponentType<any>;
  useTransition: React.ComponentType<any>;
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
  toggleGuildFolderExpand: DefaultTypes.AnyFunction & { isDispatching: boolean };
  transitionToGuildSync: DefaultTypes.AnyFunction;
  unassignGuildRoleConnection: DefaultTypes.AnyFunction;
  unbanUser: DefaultTypes.AnyFunction;
  updateRole: DefaultTypes.AnyFunction;
  updateRolePermissions: DefaultTypes.AnyFunction;
  waitForGuild: DefaultTypes.AnyFunction;
}

export interface Settings {
  folderData: {
    iconType: "CUSTOM" | "DEFAULT";
    openIcon: string;
    closedIcon: string;
  };
  sidebar: boolean;
  sidebarAnimation: boolean;
  sidebarBlacklist: Record<string, boolean>;
  closeAllFolders: boolean;
  forceOpen: boolean;
  closeOthers: boolean;
  iconSize: number;
}

export * as default from "./types";
