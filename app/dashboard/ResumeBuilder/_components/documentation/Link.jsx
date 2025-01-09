import { cx } from "../../../../../lib/cx";
export var Link = function (_a) {
    var href = _a.href, children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (<a href={href} target="_blank" className={cx("underline underline-offset-2 hover:decoration-2", className)}>
      {children}
    </a>);
};
