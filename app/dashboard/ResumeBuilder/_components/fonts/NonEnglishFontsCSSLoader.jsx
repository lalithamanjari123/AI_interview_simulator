import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getAllFontFamiliesToLoad } from "../../_components/fonts/lib";
var FontsZhCSR = dynamic(function () { return import("../../_components/fonts/FontsZh"); }, {
    ssr: false,
});
/**
 * Empty component to lazy load non-english fonts CSS conditionally
 *
 * Reference: https://prawira.medium.com/react-conditional-import-conditional-css-import-110cc58e0da6
 */
export var NonEnglishFontsCSSLazyLoader = function () {
    var _a = useState(false), shouldLoadFontsZh = _a[0], setShouldLoadFontsZh = _a[1];
    useEffect(function () {
        if (getAllFontFamiliesToLoad().includes("NotoSansSC")) {
            setShouldLoadFontsZh(true);
        }
    }, []);
    return <>{shouldLoadFontsZh && <FontsZhCSR />}</>;
};
