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
import { ResumePDFSection, ResumePDFBulletList, ResumeFeaturedSkill, } from "../../../_components/Resume/ResumePDF/common";
import { styles, spacing } from "../../../_components/Resume/ResumePDF/styles";
export var ResumePDFSkills = function (_a) {
    var heading = _a.heading, skills = _a.skills, themeColor = _a.themeColor, showBulletPoints = _a.showBulletPoints;
    var descriptions = skills.descriptions, featuredSkills = skills.featuredSkills;
    var featuredSkillsWithText = featuredSkills.filter(function (item) { return item.skill; });
    var featuredSkillsPair = [
        [featuredSkillsWithText[0], featuredSkillsWithText[3]],
        [featuredSkillsWithText[1], featuredSkillsWithText[4]],
        [featuredSkillsWithText[2], featuredSkillsWithText[5]],
    ];
    return (<ResumePDFSection themeColor={themeColor} heading={heading}>
      {featuredSkillsWithText.length > 0 && (<View style={__assign(__assign({}, styles.flexRowBetween), { marginTop: spacing["0.5"] })}>
          {featuredSkillsPair.map(function (pair, idx) { return (<View key={idx} style={__assign({}, styles.flexCol)}>
              {pair.map(function (featuredSkill, idx) {
                    if (!featuredSkill)
                        return null;
                    return (<ResumeFeaturedSkill key={idx} skill={featuredSkill.skill} rating={featuredSkill.rating} themeColor={themeColor} style={{
                            justifyContent: "flex-end",
                        }}/>);
                })}
            </View>); })}
        </View>)}
      <View style={__assign({}, styles.flexCol)}>
        <ResumePDFBulletList items={descriptions} showBulletPoints={showBulletPoints}/>
      </View>
    </ResumePDFSection>);
};
