import { matchOnlyLetterSpaceOrPeriod, matchEmail, matchPhone, matchUrl, } from "../../../lib/parse-resume-from-pdf/extract-resume-from-sections/extract-profile";
var makeTextItem = function (text) {
    return ({
        text: text,
    });
};
describe("extract-profile tests - ", function () {
    it("Name", function () {
        expect(matchOnlyLetterSpaceOrPeriod(makeTextItem("Leonardo W. DiCaprio"))[0]).toBe("Leonardo W. DiCaprio");
    });
    it("Email", function () {
        expect(matchEmail(makeTextItem("  hello@open-resume.org  "))[0]).toBe("hello@open-resume.org");
    });
    it("Phone", function () {
        expect(matchPhone(makeTextItem("  (123)456-7890  "))[0]).toBe("(123)456-7890");
    });
    it("Url", function () {
        expect(matchUrl(makeTextItem("  linkedin.com/in/open-resume  "))[0]).toBe("linkedin.com/in/open-resume");
        expect(matchUrl(makeTextItem("hello@open-resume.org"))).toBeFalsy();
    });
});
