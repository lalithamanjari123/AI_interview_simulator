var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { PX_PER_PT } from "../../../../../../lib/constants";
import { FONT_FAMILY_TO_STANDARD_SIZE_IN_PT, FONT_FAMILY_TO_DISPLAY_NAME, } from "../../../_components/fonts/constants";
import { getAllFontFamiliesToLoad } from "../../../_components/fonts/lib";
import dynamic from "next/dynamic";
var Selection = function (_a) {
    var selectedColor = _a.selectedColor, isSelected = _a.isSelected, _b = _a.style, style = _b === void 0 ? {} : _b, onClick = _a.onClick, children = _a.children;
    var selectedStyle = __assign({ color: "white", backgroundColor: selectedColor, borderColor: selectedColor }, style);
    return (<div className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100" onClick={onClick} style={isSelected ? selectedStyle : style} onKeyDown={function (e) {
            if (["Enter", " "].includes(e.key))
                onClick();
        }} tabIndex={0}>
      {children}
    </div>);
};
var SelectionsWrapper = function (_a) {
    var children = _a.children;
    return <div className="mt-2 flex flex-wrap gap-3">{children}</div>;
};
var FontFamilySelections = function (_a) {
    var selectedFontFamily = _a.selectedFontFamily, themeColor = _a.themeColor, handleSettingsChange = _a.handleSettingsChange;
    var allFontFamilies = getAllFontFamiliesToLoad();
    return (<SelectionsWrapper>
      {allFontFamilies.map(function (fontFamily, idx) {
            var isSelected = selectedFontFamily === fontFamily;
            var standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
            return (<Selection key={idx} selectedColor={themeColor} isSelected={isSelected} style={{
                    fontFamily: fontFamily,
                    fontSize: "".concat(standardSizePt * PX_PER_PT, "px"),
                }} onClick={function () { return handleSettingsChange("fontFamily", fontFamily); }}>
            {FONT_FAMILY_TO_DISPLAY_NAME[fontFamily]}
          </Selection>);
        })}
    </SelectionsWrapper>);
};
/**
 * Load FontFamilySelections client side since it calls getAllFontFamiliesToLoad,
 * which uses navigator object that is only available on client side
 */
export var FontFamilySelectionsCSR = dynamic(function () { return Promise.resolve(FontFamilySelections); }, {
    ssr: false,
});
export var FontSizeSelections = function (_a) {
    var selectedFontSize = _a.selectedFontSize, fontFamily = _a.fontFamily, themeColor = _a.themeColor, handleSettingsChange = _a.handleSettingsChange;
    var standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
    var compactSizePt = standardSizePt - 1;
    return (<SelectionsWrapper>
      {["Compact", "Standard", "Large"].map(function (type, idx) {
            var fontSizePt = String(compactSizePt + idx);
            var isSelected = fontSizePt === selectedFontSize;
            return (<Selection key={idx} selectedColor={themeColor} isSelected={isSelected} style={{
                    fontFamily: fontFamily,
                    fontSize: "".concat(Number(fontSizePt) * PX_PER_PT, "px"),
                }} onClick={function () { return handleSettingsChange("fontSize", fontSizePt); }}>
            {type}
          </Selection>);
        })}
    </SelectionsWrapper>);
};
export var DocumentSizeSelections = function (_a) {
    var selectedDocumentSize = _a.selectedDocumentSize, themeColor = _a.themeColor, handleSettingsChange = _a.handleSettingsChange;
    return (<SelectionsWrapper>
      {["Letter", "A4"].map(function (type, idx) {
            return (<Selection key={idx} selectedColor={themeColor} isSelected={type === selectedDocumentSize} onClick={function () { return handleSettingsChange("documentSize", type); }}>
            <div className="flex flex-col items-center">
              <div>{type}</div>
              <div className="text-xs">
                {type === "Letter" ? "(US, Canada)" : "(other countries)"}
              </div>
            </div>
          </Selection>);
        })}
    </SelectionsWrapper>);
};
