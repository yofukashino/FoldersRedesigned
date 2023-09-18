import { common, settings, util } from "replugged";
import { PluginInjector } from "../index";
import Types from "../types";

const { lodash, React } = common;

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
export const findInTree = (
  tree: object,
  searchFilter: Types.DefaultTypes.AnyFunction | string,
  searchOptions?: { ignore?: string[]; walkable?: null | string[]; maxRecrusions?: number },
): unknown => {
  const { walkable = null, ignore = [], maxRecrusions = Infinity } = searchOptions ?? {};
  if (maxRecrusions == 0) return;
  if (typeof searchFilter === "string") {
    if (Object.hasOwnProperty.call(tree, searchFilter)) return tree[searchFilter];
  } else if (searchFilter(tree)) {
    return tree;
  }
  if (typeof tree !== "object" || tree == null) return;

  let tempReturn: unknown;
  if (Array.isArray(tree)) {
    for (const value of tree) {
      tempReturn = findInTree(value, searchFilter, {
        walkable,
        ignore,
        maxRecrusions: maxRecrusions - 1,
      });
      if (typeof tempReturn !== "undefined") return tempReturn;
    }
  } else {
    const toWalk = walkable == null ? Object.keys(tree) : walkable;
    for (const key of toWalk) {
      if (!Object.hasOwnProperty.call(tree, key) || ignore.includes(key)) continue;
      tempReturn = findInTree(tree[key], searchFilter, {
        walkable,
        ignore,
        maxRecrusions: maxRecrusions - 1,
      });
      if (typeof tempReturn !== "undefined") return tempReturn;
    }
  }
  return tempReturn;
};

export const findInReactTree = (
  tree: React.ReactElement,
  searchFilter: Types.DefaultTypes.AnyFunction | string,
  searchOptions?: { maxRecrusions?: number },
): unknown | React.ReactElement => {
  const { maxRecrusions = Infinity } = searchOptions ?? {};
  return findInTree(tree, searchFilter, {
    walkable: ["props", "children", "child", "sibling"],
    maxRecrusions,
  });
};

export const useSetting = <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
  F extends Types.NestedType<T, P> | T[K] | undefined,
  P extends `${K}.${string}` | K,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): {
  value: Types.NestedType<T, P> | F;
  onChange: (newValue: Types.ValType<Types.NestedType<T, P> | F>) => void;
} => {
  const [initialKey, ...pathArray] = Object.keys(settings.all()).includes(key)
    ? ([key] as [K])
    : (key.split(".") as [K, ...string[]]);
  const path = pathArray.join(".");
  const initial = settings.get(initialKey, path.length ? ({} as T[K]) : (fallback as T[K]));
  const [value, setValue] = React.useState<Types.NestedType<T, P>>(
    path.length
      ? (lodash.get(initial, path, fallback) as Types.NestedType<T, P>)
      : (initial as Types.NestedType<T, P>),
  );

  return {
    value,
    onChange: (newValue: Types.ValType<Types.NestedType<T, P> | F>) => {
      const isObj = newValue && typeof newValue === "object";
      const value = isObj && "value" in newValue ? newValue.value : newValue;
      const checked = isObj && "checked" in newValue ? newValue.checked : undefined;
      const target =
        isObj && "target" in newValue && newValue.target && typeof newValue.target === "object"
          ? newValue.target
          : undefined;
      const targetValue = target && "value" in target ? target.value : undefined;
      const targetChecked = target && "checked" in target ? target.checked : undefined;
      const finalValue = checked ?? targetChecked ?? targetValue ?? value ?? newValue;

      setValue(finalValue as Types.NestedType<T, P>);
      settings.set(
        initialKey,
        path.length ? (lodash.set(initial, path, finalValue) as T[K]) : (finalValue as T[K]),
      );
    },
  };
};

export default {
  ...util,
  forceRerenderElement,
  findInTree,
  findInReactTree,
  useSetting,
};
