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
import { View } from "@react-pdf/renderer";
import { ResumePDFSection, ResumePDFBulletList, ResumePDFText, } from "../../../_components/Resume/ResumePDF/common";
import { styles, spacing } from "../../../_components/Resume/ResumePDF/styles";
export var ResumePDFProject = function (_a) {
    var heading = _a.heading, projects = _a.projects, themeColor = _a.themeColor;
    return (<ResumePDFSection themeColor={themeColor} heading={heading}>
      {projects.map(function (_a, idx) {
            var project = _a.project, date = _a.date, descriptions = _a.descriptions;
            return (<View key={idx}>
          <View style={__assign(__assign({}, styles.flexRowBetween), { marginTop: spacing["0.5"] })}>
            <ResumePDFText bold={true}>{project}</ResumePDFText>
            <ResumePDFText>{date}</ResumePDFText>
          </View>
          <View style={__assign(__assign({}, styles.flexCol), { marginTop: spacing["0.5"] })}>
            <ResumePDFBulletList items={descriptions}/>
          </View>
        </View>);
        })}
    </ResumePDFSection>);
};
