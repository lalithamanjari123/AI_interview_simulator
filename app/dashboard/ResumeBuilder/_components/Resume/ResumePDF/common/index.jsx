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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Text, View, Link } from "@react-pdf/renderer";
import { styles, spacing } from "../../../../_components/Resume/ResumePDF/styles";
import { DEBUG_RESUME_PDF_FLAG } from "../../../../../../../lib/constants";
import { DEFAULT_FONT_COLOR } from "../../../../../../../lib/redux/settingsSlice";
export var ResumePDFSection = function (_a) {
    var themeColor = _a.themeColor, heading = _a.heading, _b = _a.style, style = _b === void 0 ? {} : _b, children = _a.children;
    return (<View style={__assign(__assign(__assign({}, styles.flexCol), { gap: spacing["2"], marginTop: spacing["5"] }), style)}>
    {heading && (<View style={__assign(__assign({}, styles.flexRow), { alignItems: "center" })}>
        {themeColor && (<View style={{
                    height: "3.75pt",
                    width: "30pt",
                    backgroundColor: themeColor,
                    marginRight: spacing["3.5"],
                }} debug={DEBUG_RESUME_PDF_FLAG}/>)}
        <Text style={{
                fontWeight: "bold",
                letterSpacing: "0.3pt", // tracking-wide -> 0.025em * 12 pt = 0.3pt
            }} debug={DEBUG_RESUME_PDF_FLAG}>
          {heading}
        </Text>
      </View>)}
    {children}
  </View>);
};
export var ResumePDFText = function (_a) {
    var _b = _a.bold, bold = _b === void 0 ? false : _b, themeColor = _a.themeColor, _c = _a.style, style = _c === void 0 ? {} : _c, children = _a.children;
    return (<Text style={__assign({ color: themeColor || DEFAULT_FONT_COLOR, fontWeight: bold ? "bold" : "normal" }, style)} debug={DEBUG_RESUME_PDF_FLAG}>
      {children}
    </Text>);
};
export var ResumePDFBulletList = function (_a) {
    var items = _a.items, _b = _a.showBulletPoints, showBulletPoints = _b === void 0 ? true : _b;
    return (<>
      {items.map(function (item, idx) { return (<View style={__assign({}, styles.flexRow)} key={idx}>
          {showBulletPoints && (<ResumePDFText style={{
                    paddingLeft: spacing["2"],
                    paddingRight: spacing["2"],
                    lineHeight: "1.3",
                }} bold={true}>
              {"•"}
            </ResumePDFText>)}
          {/* A breaking change was introduced causing text layout to be wider than node's width
                https://github.com/diegomura/react-pdf/issues/2182. flexGrow & flexBasis fixes it */}
          <ResumePDFText style={{ lineHeight: "1.3", flexGrow: 1, flexBasis: 0 }}>
            {item}
          </ResumePDFText>
        </View>); })}
    </>);
};
export var ResumePDFLink = function (_a) {
    var src = _a.src, isPDF = _a.isPDF, children = _a.children;
    if (isPDF) {
        return (<Link src={src} style={{ textDecoration: "none" }}>
        {children}
      </Link>);
    }
    return (<a href={src} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
      {children}
    </a>);
};
export var ResumeFeaturedSkill = function (_a) {
    var skill = _a.skill, rating = _a.rating, themeColor = _a.themeColor, _b = _a.style, style = _b === void 0 ? {} : _b;
    var numCircles = 5;
    return (<View style={__assign(__assign(__assign({}, styles.flexRow), { alignItems: "center" }), style)}>
      <ResumePDFText style={{ marginRight: spacing[0.5] }}>
        {skill}
      </ResumePDFText>
      {__spreadArray([], Array(numCircles), true).map(function (_, idx) { return (<View key={idx} style={{
                height: "9pt",
                width: "9pt",
                marginLeft: "2.25pt",
                backgroundColor: rating >= idx ? themeColor : "#d9d9d9",
                borderRadius: "100%",
            }}/>); })}
    </View>);
};
