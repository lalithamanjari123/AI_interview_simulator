import { cx } from "../../../../../lib/cx";
export var Paragraph = function (_a) {
    var _b = _a.smallMarginTop, smallMarginTop = _b === void 0 ? false : _b, children = _a.children, _c = _a.className, className = _c === void 0 ? "" : _c;
    return (<p className={cx(smallMarginTop ? "mt-[0.8em]" : "mt-[1.5em]", "text-lg text-gray-700", className)}>
      {children}
    </p>);
};
