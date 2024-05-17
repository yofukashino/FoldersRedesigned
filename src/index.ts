import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import "./style.css";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("FoldersRedesigned");
export const SettingValues = await settings.init("dev.tharki.FoldersRedesigned", defaultSettings);
import Settings from "./Components/Settings";
import Injections from "./injections/index";

export const start = (): void => {
  Settings.registerSettings();
  void Injections.applyInjections();
};

export const stop = (): void => {
  Injections.removeInjections();
};
export { default as Modules } from "./lib/requiredModules";

export { Settings } from "./Components/Settings";

export { _renderCustomSidebar, _assignSidebar } from "./plaintextFunctions";
