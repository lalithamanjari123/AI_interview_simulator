import { useEffect, useState } from "react";
import { A4_HEIGHT_PX, LETTER_HEIGHT_PX } from "../../../../../lib/constants";
import { getPxPerRem } from "../../../../../lib/get-px-per-rem";
import { CSS_VARIABLES } from "../../../../globals-css";
/**
 * useSetDefaultScale sets the default scale of the resume on load.
 *
 * It computes the scale based on current screen height and derives the default
 * resume height by subtracting the screen height from the total heights of top
 * nav bar, resume control bar, and resume top & bottom padding.
 */
export var useSetDefaultScale = function (_a) {
    var setScale = _a.setScale, documentSize = _a.documentSize;
    var _b = useState(true), scaleOnResize = _b[0], setScaleOnResize = _b[1];
    useEffect(function () {
        var getDefaultScale = function () {
            var screenHeightPx = window.innerHeight;
            var PX_PER_REM = getPxPerRem();
            var screenHeightRem = screenHeightPx / PX_PER_REM;
            var topNavBarHeightRem = parseFloat(CSS_VARIABLES["--top-nav-bar-height"]);
            var resumeControlBarHeight = parseFloat(CSS_VARIABLES["--resume-control-bar-height"]);
            var resumePadding = parseFloat(CSS_VARIABLES["--resume-padding"]);
            var topAndBottomResumePadding = resumePadding * 2;
            var defaultResumeHeightRem = screenHeightRem -
                topNavBarHeightRem -
                resumeControlBarHeight -
                topAndBottomResumePadding;
            var resumeHeightPx = defaultResumeHeightRem * PX_PER_REM;
            var height = documentSize === "A4" ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;
            var defaultScale = Math.round((resumeHeightPx / height) * 100) / 100;
            return defaultScale;
        };
        var setDefaultScale = function () {
            var defaultScale = getDefaultScale();
            setScale(defaultScale);
        };
        if (scaleOnResize) {
            setDefaultScale();
            window.addEventListener("resize", setDefaultScale);
        }
        return function () {
            window.removeEventListener("resize", setDefaultScale);
        };
    }, [setScale, scaleOnResize, documentSize]);
    return { scaleOnResize: scaleOnResize, setScaleOnResize: setScaleOnResize };
};
