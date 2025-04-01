import Sidebar from "./Components/Sidebar";
import Utils from "./lib/utils";
import Types from "./types";

export const _renderCustomSidebar = () => {
  return <Sidebar />;
};

export const _reduceSidebar = ({ custom }, array, item, _index, orginal) => {
  if (!custom) return orginal;

  const scroller = Utils.findInReactTree(
    item,
    (c: React.ReactElement & Types.Tree) =>
      typeof c?.props?.onScroll === "function" &&
      c?.props?.onScroll &&
      c?.props?.className?.includes("scroller"),
    100,
  ) as React.ReactElement & Types.Tree;

  if (Array.isArray(scroller?.props?.children)) {
    const servers = scroller.props.children.find(
      (c) =>
        (c?.type === "div" ||
          /className:\w+\(\)\(\w+.stack,\w+\)/.test(c?.type?.render?.toString?.() ?? "")) &&
        Array.isArray(c.props.children),
    );

    scroller.props.children = servers?.props?.children;
    array.push(scroller);
  }

  return array;
};
