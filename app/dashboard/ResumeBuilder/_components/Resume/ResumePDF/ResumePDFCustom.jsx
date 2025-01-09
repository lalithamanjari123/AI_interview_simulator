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
import { ResumePDFSection, ResumePDFBulletList, } from "../../../_components/Resume/ResumePDF/common";
import { styles } from "../../../_components/Resume/ResumePDF/styles";
export var ResumePDFCustom = function (_a) {
    var heading = _a.heading, custom = _a.custom, themeColor = _a.themeColor, showBulletPoints = _a.showBulletPoints;
    var descriptions = custom.descriptions;
    return (<ResumePDFSection themeColor={themeColor} heading={heading}>
      <View style={__assign({}, styles.flexCol)}>
        <ResumePDFBulletList items={descriptions} showBulletPoints={showBulletPoints}/>
      </View>
    </ResumePDFSection>);
};
