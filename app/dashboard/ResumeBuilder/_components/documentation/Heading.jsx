import { cx } from "../../../../../lib/cx";
var HEADING_CLASSNAMES = {
    1: "text-2xl font-bold",
    2: "text-xl font-bold",
    3: "text-lg font-semibold",
};
export var Heading = function (_a) {
    var _b = _a.level, level = _b === void 0 ? 1 : _b, children = _a.children, _c = _a.className, className = _c === void 0 ? "" : _c;
    var Component = "h".concat(level);
    return (<Component className={cx("mt-[2em] text-gray-900", HEADING_CLASSNAMES[level], className)}>
      {children}
    </Component>);
};
