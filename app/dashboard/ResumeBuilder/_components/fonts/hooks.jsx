import { useEffect } from "react";
import { Font } from "@react-pdf/renderer";
import { ENGLISH_FONT_FAMILIES } from "../../_components/fonts/constants";
import { getAllFontFamiliesToLoad } from "../../_components/fonts/lib";
/**
 * Register all fonts to React PDF so it can render fonts correctly in PDF
 */
export var useRegisterReactPDFFont = function () {
    useEffect(function () {
        var allFontFamilies = getAllFontFamiliesToLoad();
        allFontFamilies.forEach(function (fontFamily) {
            Font.register({
                family: fontFamily,
                fonts: [
                  {
                    src: `/fonts/${fontFamily}-Regular.ttf`, // Correct path for Next.js public folder
                  },
                  {
                    src: `/fonts/${fontFamily}-Bold.ttf`, // Correct path for Next.js public folder
                    fontWeight: "bold",
                  },
                ],
            });
        });
    }, []);
};
export var useRegisterReactPDFHyphenationCallback = function (fontFamily) {
    useEffect(function () {
        if (ENGLISH_FONT_FAMILIES.includes(fontFamily)) {
            // Disable hyphenation for English Font Family so the word wraps each line
            // https://github.com/diegomura/react-pdf/issues/311#issuecomment-548301604
            Font.registerHyphenationCallback(function (word) { return [word]; });
        }
        else {
            // React PDF doesn't understand how to wrap non-english word on line break
            // A workaround is to add an empty character after each word
            // Reference https://github.com/diegomura/react-pdf/issues/1568
            Font.registerHyphenationCallback(function (word) {
                return word
                    .split("")
                    .map(function (char) { return [char, ""]; })
                    .flat();
            });
        }
    }, [fontFamily]);
};
