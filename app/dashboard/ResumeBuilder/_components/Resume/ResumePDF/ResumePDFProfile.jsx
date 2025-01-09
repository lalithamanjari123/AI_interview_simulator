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
import { ResumePDFIcon, } from "../../../_components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "../../../_components/Resume/ResumePDF/styles";
import { ResumePDFLink, ResumePDFSection, ResumePDFText, } from "../../../_components/Resume/ResumePDF/common";
export var ResumePDFProfile = function (_a) {
    var profile = _a.profile, themeColor = _a.themeColor, isPDF = _a.isPDF;
    var name = profile.name, email = profile.email, phone = profile.phone, url = profile.url, summary = profile.summary, location = profile.location;
    var iconProps = { email: email, phone: phone, location: location, url: url };
    return (<ResumePDFSection style={{ marginTop: spacing["4"] }}>
      <ResumePDFText bold={true} themeColor={themeColor} style={{ fontSize: "20pt" }}>
        {name}
      </ResumePDFText>
      {summary && <ResumePDFText>{summary}</ResumePDFText>}
      <View style={__assign(__assign({}, styles.flexRowBetween), { flexWrap: "wrap", marginTop: spacing["0.5"] })}>
        {Object.entries(iconProps).map(function (_a) {
            var key = _a[0], value = _a[1];
            if (!value)
                return null;
            var iconType = key;
            if (key === "url") {
                if (value.includes("github")) {
                    iconType = "url_github";
                }
                else if (value.includes("linkedin")) {
                    iconType = "url_linkedin";
                }
            }
            var shouldUseLinkWrapper = ["email", "url", "phone"].includes(key);
            var Wrapper = function (_a) {
                var children = _a.children;
                if (!shouldUseLinkWrapper)
                    return <>{children}</>;
                var src = "";
                switch (key) {
                    case "email": {
                        src = "mailto:".concat(value);
                        break;
                    }
                    case "phone": {
                        src = "tel:".concat(value.replace(/[^\d+]/g, "")); // Keep only + and digits
                        break;
                    }
                    default: {
                        src = value.startsWith("http") ? value : "https://".concat(value);
                    }
                }
                return (<ResumePDFLink src={src} isPDF={isPDF}>
                {children}
              </ResumePDFLink>);
            };
            return (<View key={key} style={__assign(__assign({}, styles.flexRow), { alignItems: "center", gap: spacing["1"] })}>
              <ResumePDFIcon type={iconType} isPDF={isPDF}/>
              <Wrapper>
                <ResumePDFText>{value}</ResumePDFText>
              </Wrapper>
            </View>);
        })}
      </View>
    </ResumePDFSection>);
};
