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
import { ResumePDFBulletList, ResumePDFSection, ResumePDFText, } from "../../../_components/Resume/ResumePDF/common";
import { styles, spacing } from "../../../_components/Resume/ResumePDF/styles";
export var ResumePDFEducation = function (_a) {
    var heading = _a.heading, educations = _a.educations, themeColor = _a.themeColor, showBulletPoints = _a.showBulletPoints;
    return (<ResumePDFSection themeColor={themeColor} heading={heading}>
      {educations.map(function (_a, idx) {
            var school = _a.school, degree = _a.degree, date = _a.date, gpa = _a.gpa, _b = _a.descriptions, descriptions = _b === void 0 ? [] : _b;
            // Hide school name if it is the same as the previous school
            var hideSchoolName = idx > 0 && school === educations[idx - 1].school;
            var showDescriptions = descriptions.join() !== "";
            return (<View key={idx}>
              {!hideSchoolName && (<ResumePDFText bold={true}>{school}</ResumePDFText>)}
              <View style={__assign(__assign({}, styles.flexRowBetween), { marginTop: hideSchoolName
                        ? "-" + spacing["1"]
                        : spacing["1.5"] })}>
                <ResumePDFText>{"".concat(gpa
                    ? "".concat(degree, " - ").concat(Number(gpa) ? gpa + " GPA" : gpa)
                    : degree)}</ResumePDFText>
                <ResumePDFText>{date}</ResumePDFText>
              </View>
              {showDescriptions && (<View style={__assign(__assign({}, styles.flexCol), { marginTop: spacing["1.5"] })}>
                  <ResumePDFBulletList items={descriptions} showBulletPoints={showBulletPoints}/>
                </View>)}
            </View>);
        })}
    </ResumePDFSection>);
};
