"use client";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ENGLISH_FONT_FAMILIES, NON_ENGLISH_FONT_FAMILIES, NON_ENGLISH_FONT_FAMILY_TO_LANGUAGE, } from "../../_components/fonts/constants";
/**
 * getPreferredNonEnglishFontFamilies returns non-english font families that are included in
 * user's preferred languages. This is to avoid loading fonts/languages that users won't use.
 */
var getPreferredNonEnglishFontFamilies = function () {
    return NON_ENGLISH_FONT_FAMILIES.filter(function (fontFamily) {
        var _a;
        var fontLanguages = NON_ENGLISH_FONT_FAMILY_TO_LANGUAGE[fontFamily];
        var userPreferredLanguages = (_a = navigator.languages) !== null && _a !== void 0 ? _a : [navigator.language];
        return userPreferredLanguages.some(function (preferredLanguage) {
            return fontLanguages.includes(preferredLanguage);
        });
    });
};
export var getAllFontFamiliesToLoad = function () {
    return __spreadArray(__spreadArray([], ENGLISH_FONT_FAMILIES, true), getPreferredNonEnglishFontFamilies(), true);
};
