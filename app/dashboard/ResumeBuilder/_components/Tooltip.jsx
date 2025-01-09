"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
/**
 * A simple Tooltip component that shows tooltip text center below children on hover and on focus
 *
 * @example
 * <Tooltip text="Tooltip Text">
 *   <div>Hello</div>
 * </Tooltip>
 */
export var Tooltip = function (_a) {
    var text = _a.text, children = _a.children;
    var spanRef = useRef(null);
    var tooltipRef = useRef(null);
    var _b = useState({ top: 0, left: 0 }), tooltipPos = _b[0], setTooltipPos = _b[1];
    var _c = useState(false), show = _c[0], setShow = _c[1];
    var showTooltip = function () { return setShow(true); };
    var hideTooltip = function () { return setShow(false); };
    // Hook to set tooltip position to be right below children and centered
    useEffect(function () {
        var span = spanRef.current;
        var tooltip = tooltipRef.current;
        if (span && tooltip) {
            var rect = span.getBoundingClientRect();
            var TOP_OFFSET = 6;
            var newTop = rect.top + rect.height + TOP_OFFSET;
            var newLeft = rect.left - tooltip.offsetWidth / 2 + rect.width / 2;
            setTooltipPos({
                top: newTop,
                left: newLeft,
            });
        }
    }, [show]);
    return (<span ref={spanRef} onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onFocus={showTooltip} onBlur={hideTooltip} 
    // hide tooltip onClick to handle the edge case where the element position is changed after lick
    onClick={hideTooltip}>
      {children}
      {show &&
            createPortal(<div ref={tooltipRef} role="tooltip" className="absolute left-0 top-0 z-10 w-max rounded-md bg-gray-600 px-2 py-0.5 text-sm text-white" style={{
                    left: "".concat(tooltipPos.left, "px"),
                    top: "".concat(tooltipPos.top, "px"),
                }}>
            {text}
          </div>, document.body)}
    </span>);
};
