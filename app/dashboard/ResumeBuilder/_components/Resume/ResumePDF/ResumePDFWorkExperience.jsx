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
export var ResumePDFWorkExperience = function (_a) {
    var heading = _a.heading, workExperiences = _a.workExperiences, themeColor = _a.themeColor;
    return (<ResumePDFSection themeColor={themeColor} heading={heading}>
      {workExperiences.map(function (_a, idx) {
            var company = _a.company, jobTitle = _a.jobTitle, date = _a.date, descriptions = _a.descriptions;
            // Hide company name if it is the same as the previous company
            var hideCompanyName = idx > 0 && company === workExperiences[idx - 1].company;
            return (<View key={idx} style={idx !== 0 ? { marginTop: spacing["2"] } : {}}>
            {!hideCompanyName && (<ResumePDFText bold={true}>{company}</ResumePDFText>)}
            <View style={__assign(__assign({}, styles.flexRowBetween), { marginTop: hideCompanyName
                        ? "-" + spacing["1"]
                        : spacing["1.5"] })}>
              <ResumePDFText>{jobTitle}</ResumePDFText>
              <ResumePDFText>{date}</ResumePDFText>
            </View>
            <View style={__assign(__assign({}, styles.flexCol), { marginTop: spacing["1.5"] })}>
              <ResumePDFBulletList items={descriptions}/>
            </View>
          </View>);
        })}
    </ResumePDFSection>);
};
