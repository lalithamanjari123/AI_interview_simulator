import { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { useAutosizeTextareaHeight } from "../../../../../../lib/hooks/useAutosizeTextareaHeight";
/**
 * InputGroupWrapper wraps a label element around a input children. This is preferable
 * than having input as a sibling since it makes clicking label auto focus input children
 */
export var InputGroupWrapper = function (_a) {
    var label = _a.label, className = _a.className, children = _a.children;
    return (<label className={"text-base font-medium text-gray-700 ".concat(className)}>
    {label}
    {children}
  </label>);
};
export var INPUT_CLASS_NAME = "mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-base";
export var Input = function (_a) {
    var name = _a.name, _b = _a.value, value = _b === void 0 ? "" : _b, placeholder = _a.placeholder, onChange = _a.onChange, label = _a.label, labelClassName = _a.labelClassName;
    return (<InputGroupWrapper label={label} className={labelClassName}>
      <input type="text" name={name} value={value} placeholder={placeholder} onChange={function (e) { return onChange(name, e.target.value); }} className={INPUT_CLASS_NAME}/>
    </InputGroupWrapper>);
};
export var Textarea = function (_a) {
    var label = _a.label, wrapperClassName = _a.labelClassName, name = _a.name, _b = _a.value, value = _b === void 0 ? "" : _b, placeholder = _a.placeholder, onChange = _a.onChange;
    var textareaRef = useAutosizeTextareaHeight({ value: value });
    return (<InputGroupWrapper label={label} className={wrapperClassName}>
      <textarea ref={textareaRef} name={name} className={"".concat(INPUT_CLASS_NAME, " resize-none overflow-hidden")} placeholder={placeholder} value={value} onChange={function (e) { return onChange(name, e.target.value); }}/>
    </InputGroupWrapper>);
};
export var BulletListTextarea = function (props) {
    var _a = useState(false), showFallback = _a[0], setShowFallback = _a[1];
    useEffect(function () {
        var isFirefox = navigator.userAgent.includes("Firefox");
        var isSafari = navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome"); // Note that Chrome also includes Safari in its userAgent
        if (isFirefox || isSafari) {
            setShowFallback(true);
        }
    }, []);
    if (showFallback) {
        return <BulletListTextareaFallback {...props}/>;
    }
    return <BulletListTextareaGeneral {...props}/>;
};
/**
 * BulletListTextareaGeneral is a textarea where each new line starts with a bullet point.
 *
 * In its core, it uses a div with contentEditable set to True. However, when
 * contentEditable is True, user can paste in any arbitrary html and it would
 * render. So to make it behaves like a textarea, it strips down all html while
 * keeping only the text part.
 *
 * Reference: https://stackoverflow.com/a/74998090/7699841
 */
var BulletListTextareaGeneral = function (_a) {
    var label = _a.label, wrapperClassName = _a.labelClassName, name = _a.name, _b = _a.value, bulletListStrings = _b === void 0 ? [] : _b, placeholder = _a.placeholder, onChange = _a.onChange, _c = _a.showBulletPoints, showBulletPoints = _c === void 0 ? true : _c;
    var html = getHTMLFromBulletListStrings(bulletListStrings);
    return (<InputGroupWrapper label={label} className={wrapperClassName}>
      <ContentEditable contentEditable={true} className={"".concat(INPUT_CLASS_NAME, " cursor-text [&>div]:list-item ").concat(showBulletPoints ? "pl-7" : "[&>div]:list-['']")} 
    // Note: placeholder currently doesn't work
    placeholder={placeholder} onChange={function (e) {
            if (e.type === "input") {
                var innerText = e.currentTarget.innerText;
                var newBulletListStrings = getBulletListStringsFromInnerText(innerText);
                onChange(name, newBulletListStrings);
            }
        }} html={html}/>
    </InputGroupWrapper>);
};
var NORMALIZED_LINE_BREAK = "\n";
/**
 * Normalize line breaks to be \n since different OS uses different line break
 *    Windows -> \r\n (CRLF)
 *    Unix    -> \n (LF)
 *    Mac     -> \n (LF), or \r (CR) for earlier versions
 */
var normalizeLineBreak = function (str) {
    return str.replace(/\r?\n/g, NORMALIZED_LINE_BREAK);
};
var dedupeLineBreak = function (str) {
    return str.replace(/\n\n/g, NORMALIZED_LINE_BREAK);
};
var getStringsByLineBreak = function (str) { return str.split(NORMALIZED_LINE_BREAK); };
var getBulletListStringsFromInnerText = function (innerText) {
    var innerTextWithNormalizedLineBreak = normalizeLineBreak(innerText);
    // In Windows Chrome, pressing enter creates 2 line breaks "\n\n"
    // This dedupes it into 1 line break "\n"
    var newInnerText = dedupeLineBreak(innerTextWithNormalizedLineBreak);
    // Handle the special case when content is empty
    if (newInnerText === NORMALIZED_LINE_BREAK) {
        newInnerText = "";
    }
    return getStringsByLineBreak(newInnerText);
};
var getHTMLFromBulletListStrings = function (bulletListStrings) {
    // If bulletListStrings is an empty array, make it an empty div
    if (bulletListStrings.length === 0) {
        return "<div></div>";
    }
    return bulletListStrings.map(function (text) { return "<div>".concat(text, "</div>"); }).join("");
};
/**
 * BulletListTextareaFallback is a fallback for BulletListTextareaGeneral to work around
 * content editable div issue in some browsers. For example, in Firefox, if user enters
 * space in the content editable div at the end of line, Firefox returns it as a new
 * line character \n instead of space in innerText.
 */
var BulletListTextareaFallback = function (_a) {
    var label = _a.label, labelClassName = _a.labelClassName, name = _a.name, _b = _a.value, bulletListStrings = _b === void 0 ? [] : _b, placeholder = _a.placeholder, onChange = _a.onChange, _c = _a.showBulletPoints, showBulletPoints = _c === void 0 ? true : _c;
    var textareaValue = getTextareaValueFromBulletListStrings(bulletListStrings, showBulletPoints);
    return (<Textarea label={label} labelClassName={labelClassName} name={name} value={textareaValue} placeholder={placeholder} onChange={function (name, value) {
            onChange(name, getBulletListStringsFromTextareaValue(value, showBulletPoints));
        }}/>);
};
var getTextareaValueFromBulletListStrings = function (bulletListStrings, showBulletPoints) {
    var prefix = showBulletPoints ? "• " : "";
    if (bulletListStrings.length === 0) {
        return prefix;
    }
    var value = "";
    for (var i = 0; i < bulletListStrings.length; i++) {
        var string = bulletListStrings[i];
        var isLastItem = i === bulletListStrings.length - 1;
        value += "".concat(prefix).concat(string).concat(isLastItem ? "" : "\r\n");
    }
    return value;
};
var getBulletListStringsFromTextareaValue = function (textareaValue, showBulletPoints) {
    var textareaValueWithNormalizedLineBreak = normalizeLineBreak(textareaValue);
    var strings = getStringsByLineBreak(textareaValueWithNormalizedLineBreak);
    if (showBulletPoints) {
        // Filter out empty strings
        var nonEmptyStrings = strings.filter(function (s) { return s !== "•"; });
        var newStrings = [];
        for (var _i = 0, nonEmptyStrings_1 = nonEmptyStrings; _i < nonEmptyStrings_1.length; _i++) {
            var string = nonEmptyStrings_1[_i];
            if (string.startsWith("• ")) {
                newStrings.push(string.slice(2));
            }
            else if (string.startsWith("•")) {
                // Handle the special case when user wants to delete the bullet point, in which case
                // we combine it with the previous line if previous line exists
                var lastItemIdx = newStrings.length - 1;
                if (lastItemIdx >= 0) {
                    var lastItem = newStrings[lastItemIdx];
                    newStrings[lastItemIdx] = "".concat(lastItem).concat(string.slice(1));
                }
                else {
                    newStrings.push(string.slice(1));
                }
            }
            else {
                newStrings.push(string);
            }
        }
        return newStrings;
    }
    return strings;
};
