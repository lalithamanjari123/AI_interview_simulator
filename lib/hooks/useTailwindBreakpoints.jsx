import { useEffect, useState } from "react";
var TailwindBreakpoint;
(function (TailwindBreakpoint) {
    TailwindBreakpoint[TailwindBreakpoint["sm"] = 640] = "sm";
    TailwindBreakpoint[TailwindBreakpoint["md"] = 768] = "md";
    TailwindBreakpoint[TailwindBreakpoint["lg"] = 1024] = "lg";
    TailwindBreakpoint[TailwindBreakpoint["xl"] = 1280] = "xl";
    TailwindBreakpoint[TailwindBreakpoint["2xl"] = 1536] = "2xl";
})(TailwindBreakpoint || (TailwindBreakpoint = {}));
export var useTailwindBreakpoints = function () {
    var _a = useState(false), isSm = _a[0], setIsSm = _a[1];
    var _b = useState(false), isMd = _b[0], setIsMd = _b[1];
    var _c = useState(false), isLg = _c[0], setIsLg = _c[1];
    var _d = useState(false), isXl = _d[0], setIsXl = _d[1];
    var _e = useState(false), is2xl = _e[0], setIs2xl = _e[1];
    useEffect(function () {
        var handleResize = function () {
            var screenWidth = window.innerWidth;
            setIsSm(screenWidth >= TailwindBreakpoint.sm);
            setIsMd(screenWidth >= TailwindBreakpoint.md);
            setIsLg(screenWidth >= TailwindBreakpoint.lg);
            setIsXl(screenWidth >= TailwindBreakpoint.xl);
            setIs2xl(screenWidth >= TailwindBreakpoint["2xl"]);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []);
    return { isSm: isSm, isMd: isMd, isLg: isLg, isXl: isXl, is2xl: is2xl };
};
