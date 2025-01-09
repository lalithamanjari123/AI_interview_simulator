var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { cx } from "../../../../lib/cx";
import { Tooltip } from "../_components/Tooltip";
var isAnchor = function (props) {
    return "href" in props;
};
export var Button = function (props) {
    if (isAnchor(props)) {
        return <a {...props}/>;
    }
    else {
        return <button type="button" {...props}/>;
    }
};
export var PrimaryButton = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<Button className={cx("btn-primary", className)} {...props}/>);
};
export var IconButton = function (_a) {
    var className = _a.className, _b = _a.size, size = _b === void 0 ? "medium" : _b, tooltipText = _a.tooltipText, props = __rest(_a, ["className", "size", "tooltipText"]);
    return (<Tooltip text={tooltipText}>
    <Button type="button" className={cx("rounded-full outline-none hover:bg-gray-100 focus-visible:bg-gray-100", size === "medium" ? "p-1.5" : "p-1", className)} {...props}/>
  </Tooltip>);
};
