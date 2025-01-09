import { Form } from "../../_components/ResumeForm/Form";
import { BulletListTextarea, InputGroupWrapper, } from "../../_components/ResumeForm/Form/InputGroup";
import { FeaturedSkillInput } from "../../_components/ResumeForm/Form/FeaturedSkillInput";
import { BulletListIconButton } from "../../_components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";
import { selectSkills, changeSkills } from "../../../../../lib/redux/resumeSlice";
import { selectShowBulletPoints, changeShowBulletPoints, selectThemeColor, } from "../../../../../lib/redux/settingsSlice";
export var SkillsForm = function () {
    var skills = useAppSelector(selectSkills);
    var dispatch = useAppDispatch();
    var featuredSkills = skills.featuredSkills, descriptions = skills.descriptions;
    var form = "skills";
    var showBulletPoints = useAppSelector(selectShowBulletPoints(form));
    var themeColor = useAppSelector(selectThemeColor) || "#38bdf8";
    var handleSkillsChange = function (field, value) {
        dispatch(changeSkills({ field: field, value: value }));
    };
    var handleFeaturedSkillsChange = function (idx, skill, rating) {
        dispatch(changeSkills({ field: "featuredSkills", idx: idx, skill: skill, rating: rating }));
    };
    var handleShowBulletPoints = function (value) {
        dispatch(changeShowBulletPoints({ field: form, value: value }));
    };
    return (<Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea label="Skills List" labelClassName="col-span-full" name="descriptions" placeholder="Bullet points" value={descriptions} onChange={handleSkillsChange} showBulletPoints={showBulletPoints}/>
          <div className="absolute left-[4.5rem] top-[0.07rem]">
            <BulletListIconButton showBulletPoints={showBulletPoints} onClick={handleShowBulletPoints}/>
          </div>
        </div>
        <div className="col-span-full mb-4 mt-6 border-t-2 border-dotted border-gray-200"/>
        <InputGroupWrapper label="Featured Skills (Optional)" className="col-span-full">
          <p className="mt-2 text-sm font-normal text-gray-600">
            Featured skills is optional to highlight top skills, with more
            circles mean higher proficiency.
          </p>
        </InputGroupWrapper>

        {featuredSkills.map(function (_a, idx) {
            var skill = _a.skill, rating = _a.rating;
            return (<FeaturedSkillInput key={idx} className="col-span-3" skill={skill} rating={rating} setSkillRating={function (newSkill, newRating) {
                    handleFeaturedSkillsChange(idx, newSkill, newRating);
                }} placeholder={"Featured Skill ".concat(idx + 1)} circleColor={themeColor}/>);
        })}
      </div>
    </Form>);
};
