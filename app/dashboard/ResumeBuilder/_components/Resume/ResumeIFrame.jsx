"use client";
import { useMemo } from "react";
import Frame from "react-frame-component";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { A4_HEIGHT_PX, A4_WIDTH_PX, A4_WIDTH_PT, LETTER_HEIGHT_PX, LETTER_WIDTH_PX, LETTER_WIDTH_PT, } from "../../../../../lib/constants";
import dynamic from "next/dynamic";
import { getAllFontFamiliesToLoad } from "../../_components/fonts/lib";
var getIframeInitialContent = function (isA4) {
    var width = isA4 ? A4_WIDTH_PT : LETTER_WIDTH_PT;
    var allFontFamilies = getAllFontFamiliesToLoad();
    var allFontFamiliesPreloadLinks = allFontFamilies
        .map(function (font) { return "<link rel=\"preload\" as=\"font\" href=\"/fonts/".concat(font, "-Regular.ttf\" type=\"font/ttf\" crossorigin=\"anonymous\">\n<link rel=\"preload\" as=\"font\" href=\"/fonts/").concat(font, "-Bold.ttf\" type=\"font/ttf\" crossorigin=\"anonymous\">"); })
        .join("");
    var allFontFamiliesFontFaces = allFontFamilies
        .map(function (font) { return "@font-face {font-family: \"".concat(font, "\"; src: url(\"/fonts/").concat(font, "-Regular.ttf\");}\n@font-face {font-family: \"").concat(font, "\"; src: url(\"/fonts/").concat(font, "-Bold.ttf\"); font-weight: bold;}"); })
        .join("");
    return "<!DOCTYPE html>\n<html>\n  <head>\n    ".concat(allFontFamiliesPreloadLinks, "\n    <style>\n      ").concat(allFontFamiliesFontFaces, "\n    </style>\n  </head>\n  <body style='overflow: hidden; width: ").concat(width, "pt; margin: 0; padding: 0; -webkit-text-size-adjust:none;'>\n    <div></div>\n  </body>\n</html>");
};
/**
 * Iframe is used here for style isolation, since react pdf uses pt unit.
 * It creates a sandbox document body that uses letter/A4 pt size as width.
 */
var ResumeIframe = function (_a) {
    var documentSize = _a.documentSize, scale = _a.scale, children = _a.children, _b = _a.enablePDFViewer, enablePDFViewer = _b === void 0 ? false : _b;
    var isA4 = documentSize === "A4";
    var iframeInitialContent = useMemo(function () { return getIframeInitialContent(isA4); }, [isA4]);
    if (enablePDFViewer) {
        return (<DynamicPDFViewer className="h-full w-full">
        {children}
      </DynamicPDFViewer>);
    }
    var width = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;
    var height = isA4 ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;
    return (<div style={{
            maxWidth: "".concat(width * scale, "px"),
            maxHeight: "".concat(height * scale, "px"),
        }}>
      {/* There is an outer div and an inner div here. The inner div sets the iframe width and uses transform scale to zoom in/out the resume iframe.
          While zooming out or scaling down via transform, the element appears smaller but still occupies the same width/height. Therefore, we use the
          outer div to restrict the max width & height proportionally */}
      <div style={{
            width: "".concat(width, "px"),
            height: "".concat(height, "px"),
            transform: "scale(".concat(scale, ")"),
        }} className={"origin-top-left bg-white shadow-lg"}>
        <Frame style={{ width: "100%", height: "100%" }} initialContent={iframeInitialContent} 
    // key is used to force component to re-mount when document size changes
    key={isA4 ? "A4" : "LETTER"}>
          {children}
        </Frame>
      </div>
    </div>);
};
/**
 * Load iframe client side since iframe can't be SSR
 */
export var ResumeIframeCSR = dynamic(function () { return Promise.resolve(ResumeIframe); }, {
    ssr: false,
});
// PDFViewer is only used for debugging. Its size is quite large, so we make it dynamic import
var DynamicPDFViewer = dynamic(function () { return import("@react-pdf/renderer").then(function (module) { return module.PDFViewer; }); }, {
    ssr: false,
});
