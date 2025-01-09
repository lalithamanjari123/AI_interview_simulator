import { Form, FormSection } from "../../_components/ResumeForm/Form";
import { Input, BulletListTextarea, } from "../../_components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";
import { changeWorkExperiences, selectWorkExperiences, } from "../../../../../lib/redux/resumeSlice";
export var WorkExperiencesForm = function () {
    var workExperiences = useAppSelector(selectWorkExperiences);
    var dispatch = useAppDispatch();
    var showDelete = workExperiences.length > 1;
    return (<Form form="workExperiences" addButtonText="Add Job">
      {workExperiences.map(function (_a, idx) {
            var company = _a.company, jobTitle = _a.jobTitle, date = _a.date, descriptions = _a.descriptions;
            var handleWorkExperienceChange = function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var field = _a[0], value = _a[1];
                // TS doesn't support passing union type to single call signature
                // https://github.com/microsoft/TypeScript/issues/54027
                // any is used here as a workaround
                dispatch(changeWorkExperiences({ idx: idx, field: field, value: value }));
            };
            var showMoveUp = idx !== 0;
            var showMoveDown = idx !== workExperiences.length - 1;
            return (<FormSection key={idx} form="workExperiences" idx={idx} showMoveUp={showMoveUp} showMoveDown={showMoveDown} showDelete={showDelete} deleteButtonTooltipText="Delete job">
            <Input label="Company" labelClassName="col-span-full" name="company" placeholder="Khan Academy" value={company} onChange={handleWorkExperienceChange}/>
            <Input label="Job Title" labelClassName="col-span-4" name="jobTitle" placeholder="Software Engineer" value={jobTitle} onChange={handleWorkExperienceChange}/>
            <Input label="Date" labelClassName="col-span-2" name="date" placeholder="Jun 2022 - Present" value={date} onChange={handleWorkExperienceChange}/>
            <BulletListTextarea label="Description" labelClassName="col-span-full" name="descriptions" placeholder="Bullet points" value={descriptions} onChange={handleWorkExperienceChange}/>
          </FormSection>);
        })}
    </Form>);
};
