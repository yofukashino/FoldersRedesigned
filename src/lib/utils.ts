import { settings, util } from "replugged";
import { React, lodash } from "replugged/common";
import { PluginInjector } from "../index";
import Modules from "./requiredModules";
import Types from "../types";

export const GuildTrees = {
  custom: Modules.GuildTreeConstructors && new Modules.GuildTreeConstructors.GuildsTree(),
  main: Modules.GuildTreeConstructors && new Modules.GuildTreeConstructors.GuildsTree(),
};

export const forceRerenderElement = async (selector: string): Promise<void> => {
  const element = await util.waitFor(selector);
  if (!element) return;
  const ownerInstance = util.getOwnerInstance(element);
  const unpatchRender = PluginInjector.instead(ownerInstance, "render", () => {
    unpatchRender();
    return null;
  });
  ownerInstance.forceUpdate(() => ownerInstance.forceUpdate(() => {}));
};

export const getGuildTree = (type: "main" | "custom" | string): Types.GuildsTree => {
  switch (type) {
    case "main": {
      GuildTrees.main ??=
        Modules.GuildTreeConstructors && new Modules.GuildTreeConstructors.GuildsTree();
      return GuildTrees.main;
    }
    case "custom": {
      GuildTrees.custom ??=
        Modules.GuildTreeConstructors && new Modules.GuildTreeConstructors.GuildsTree();
      return GuildTrees.custom;
    }
    default: {
      GuildTrees[type] ??=
        Modules.GuildTreeConstructors && new Modules.GuildTreeConstructors.GuildsTree();
      return GuildTrees[type];
    }
  }
};

export const waitForProps = async (
  obj: Record<string, unknown>,
  prop: string,
): Promise<unknown> => {
  while (!obj[prop]) {
    await util.sleep(500);
  }
  return obj[prop];
};

export const useSetting = <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
  F extends Types.NestedType<T, P> | T[K] | undefined,
  P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}` | K,
  V extends P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}`
    ? NonNullable<Types.NestedType<T, P>>
    : P extends D
    ? NonNullable<T[P]>
    : F extends null | undefined
    ? T[P] | undefined
    : NonNullable<T[P]> | F,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): {
  value: V;
  onChange: (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => void;
} => {
  const initial = settings.get(key as K) ?? lodash.get(settings.all(), key) ?? fallback;
  const [value, setValue] = React.useState(initial as V);

  return {
    value,
    onChange: (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => {
      const isObj = newValue && typeof newValue === "object";
      const value = isObj && "value" in newValue ? newValue.value : newValue;
      const checked = isObj && "checked" in newValue ? newValue.checked : void 0;
      const target =
        isObj && "target" in newValue && newValue.target && typeof newValue.target === "object"
          ? newValue.target
          : void 0;
      const targetValue = target && "value" in target ? target.value : void 0;
      const targetChecked = target && "checked" in target ? target.checked : void 0;
      const finalValue = (checked ?? targetChecked ?? targetValue ?? value ?? newValue) as T[K];

      setValue(finalValue as V);

      if (settings.get(key as K)) {
        settings.set(key as K, finalValue);
      } else {
        const [rootKey] = key.split(/[-/.]/);
        const setting = lodash.set(settings.all(), key, finalValue)[rootKey as K];
        settings.set(rootKey as K, setting);
      }
    },
  };
};

export const useSettingArray = <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
  F extends Types.NestedType<T, P> | T[K] | undefined,
  P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}` | K,
  V extends P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}`
    ? NonNullable<Types.NestedType<T, P>>
    : P extends D
    ? NonNullable<T[P]>
    : F extends null | undefined
    ? T[P] | undefined
    : NonNullable<T[P]> | F,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): [V, (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => void] => {
  const { value, onChange } = useSetting(settings, key, fallback);

  return [value as V, onChange];
};

export default {
  ...util,
  GuildTrees,
  forceRerenderElement,
  getGuildTree,
  waitForProps,
  useSetting,
  useSettingArray,
};
