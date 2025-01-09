/**
 * FlexboxSpacer can be used to create empty space in flex.
 * It is a div that grows to fill the available space specified by maxWidth.
 * You can also set a minimum width with minWidth.
 */
export var FlexboxSpacer = function (_a) {
    var maxWidth = _a.maxWidth, _b = _a.minWidth, minWidth = _b === void 0 ? 0 : _b, _c = _a.className, className = _c === void 0 ? "" : _c;
    return (<div className={"invisible shrink-[10000] grow ".concat(className)} style={{ maxWidth: "".concat(maxWidth, "px"), minWidth: "".concat(minWidth, "px") }}/>);
};
