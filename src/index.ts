import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import { registerSettings } from "./Components/Settings";
import "./style.css";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("FoldersRedesigned");
export const SettingValues = await settings.init("dev.tharki.FoldersRedesigned", defaultSettings);

import Injections from "./patches";

export const start = (): void => {
  registerSettings();
  void Injections.applyInjections();
};

export const stop = (): void => {
  Injections.removeInjections();
};
export { default as Modules } from "./lib/requiredModules";

export { Settings } from "./Components/Settings";

export { _renderCustomSidebar, _assignSidebar } from "./plaintextFunctions";
