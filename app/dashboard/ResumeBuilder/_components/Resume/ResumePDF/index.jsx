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
import { Page, View, Document } from "@react-pdf/renderer";
import { styles, spacing } from "../../../_components/Resume/ResumePDF/styles";
import { ResumePDFProfile } from "../../../_components/Resume/ResumePDF/ResumePDFProfile";
import { ResumePDFWorkExperience } from "../../../_components/Resume/ResumePDF/ResumePDFWorkExperience";
import { ResumePDFEducation } from "../../../_components/Resume/ResumePDF/ResumePDFEducation";
import { ResumePDFProject } from "../../../_components/Resume/ResumePDF/ResumePDFProject";
import { ResumePDFSkills } from "../../../_components/Resume/ResumePDF/ResumePDFSkills";
import { ResumePDFCustom } from "../../../_components/Resume/ResumePDF/ResumePDFCustom";
import { DEFAULT_FONT_COLOR } from "../../../../../../lib/redux/settingsSlice";
import { SuppressResumePDFErrorMessage } from "../../../_components/Resume/ResumePDF/common/SuppressResumePDFErrorMessage";
/**
 * Note: ResumePDF is supposed to be rendered inside PDFViewer. However,
 * PDFViewer is rendered too slow and has noticeable delay as you enter
 * the resume form, so we render it without PDFViewer to make it render
 * instantly. There are 2 drawbacks with this approach:
 * 1. Not everything works out of box if not rendered inside PDFViewer,
 *    e.g. svg doesn't work, so it takes in a isPDF flag that maps react
 *    pdf element to the correct dom element.
 * 2. It throws a lot of errors in console log, e.g. "<VIEW /> is using incorrect
 *    casing. Use PascalCase for React components, or lowercase for HTML elements."
 *    in development, causing a lot of noises. We can possibly workaround this by
 *    mapping every react pdf element to a dom element, but for now, we simply
 *    suppress these messages in <SuppressResumePDFErrorMessage />.
 *    https://github.com/diegomura/react-pdf/issues/239#issuecomment-487255027
 */
export var ResumePDF = function (_a) {
    var resume = _a.resume, settings = _a.settings, _b = _a.isPDF, isPDF = _b === void 0 ? false : _b;
    var profile = resume.profile, workExperiences = resume.workExperiences, educations = resume.educations, projects = resume.projects, skills = resume.skills, custom = resume.custom;
    var name = profile.name;
    var fontFamily = settings.fontFamily, fontSize = settings.fontSize, documentSize = settings.documentSize, formToHeading = settings.formToHeading, formToShow = settings.formToShow, formsOrder = settings.formsOrder, showBulletPoints = settings.showBulletPoints;
    var themeColor = settings.themeColor || DEFAULT_FONT_COLOR;
    var showFormsOrder = formsOrder.filter(function (form) { return formToShow[form]; });
    var formTypeToComponent = {
        workExperiences: function () { return (<ResumePDFWorkExperience heading={formToHeading["workExperiences"]} workExperiences={workExperiences} themeColor={themeColor}/>); },
        educations: function () { return (<ResumePDFEducation heading={formToHeading["educations"]} educations={educations} themeColor={themeColor} showBulletPoints={showBulletPoints["educations"]}/>); },
        projects: function () { return (<ResumePDFProject heading={formToHeading["projects"]} projects={projects} themeColor={themeColor}/>); },
        skills: function () { return (<ResumePDFSkills heading={formToHeading["skills"]} skills={skills} themeColor={themeColor} showBulletPoints={showBulletPoints["skills"]}/>); },
        custom: function () { return (<ResumePDFCustom heading={formToHeading["custom"]} custom={custom} themeColor={themeColor} showBulletPoints={showBulletPoints["custom"]}/>); },
    };
    return (<>
      <Document title={"".concat(name, " Resume")} author={name} producer={"OpenResume"}>
        <Page size={documentSize === "A4" ? "A4" : "LETTER"} style={__assign(__assign({}, styles.flexCol), { color: DEFAULT_FONT_COLOR, fontFamily: fontFamily, fontSize: fontSize + "pt" })}>
          {Boolean(settings.themeColor) && (<View style={{
                width: spacing["full"],
                height: spacing[3.5],
                backgroundColor: themeColor,
            }}/>)}
          <View style={__assign(__assign({}, styles.flexCol), { padding: "".concat(spacing[0], " ").concat(spacing[20]) })}>
            <ResumePDFProfile profile={profile} themeColor={themeColor} isPDF={isPDF}/>
            {showFormsOrder.map(function (form) {
            var Component = formTypeToComponent[form];
            return <Component key={form}/>;
        })}
          </View>
        </Page>
      </Document>
      <SuppressResumePDFErrorMessage />
    </>);
};
