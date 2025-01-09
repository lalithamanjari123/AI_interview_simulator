import { Form, FormSection } from "../../_components/ResumeForm/Form";
import { BulletListTextarea, Input, } from "../../_components/ResumeForm/Form/InputGroup";
import { BulletListIconButton } from "../../_components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";
import { changeEducations, selectEducations } from "../../../../../lib/redux/resumeSlice";
import { changeShowBulletPoints, selectShowBulletPoints, } from "../../../../../lib/redux/settingsSlice";
export var EducationsForm = function () {
    var educations = useAppSelector(selectEducations);
    var dispatch = useAppDispatch();
    var showDelete = educations.length > 1;
    var form = "educations";
    var showBulletPoints = useAppSelector(selectShowBulletPoints(form));
    return (<Form form={form} addButtonText="Add School">
      {educations.map(function (_a, idx) {
            var school = _a.school, degree = _a.degree, gpa = _a.gpa, date = _a.date, descriptions = _a.descriptions;
            var handleEducationChange = function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var field = _a[0], value = _a[1];
                dispatch(changeEducations({ idx: idx, field: field, value: value }));
            };
            var handleShowBulletPoints = function (value) {
                dispatch(changeShowBulletPoints({ field: form, value: value }));
            };
            var showMoveUp = idx !== 0;
            var showMoveDown = idx !== educations.length - 1;
            return (<FormSection key={idx} form="educations" idx={idx} showMoveUp={showMoveUp} showMoveDown={showMoveDown} showDelete={showDelete} deleteButtonTooltipText="Delete school">
            <Input label="School" labelClassName="col-span-4" name="school" placeholder="Cornell University" value={school} onChange={handleEducationChange}/>
            <Input label="Date" labelClassName="col-span-2" name="date" placeholder="May 2018" value={date} onChange={handleEducationChange}/>
            <Input label="Degree & Major" labelClassName="col-span-4" name="degree" placeholder="Bachelor of Science in Computer Engineering" value={degree} onChange={handleEducationChange}/>
            <Input label="GPA" labelClassName="col-span-2" name="gpa" placeholder="3.81" value={gpa} onChange={handleEducationChange}/>
            <div className="relative col-span-full">
              <BulletListTextarea label="Additional Information (Optional)" labelClassName="col-span-full" name="descriptions" placeholder="Free paragraph space to list out additional activities, courses, awards etc" value={descriptions} onChange={handleEducationChange} showBulletPoints={showBulletPoints}/>
              <div className="absolute left-[15.6rem] top-[0.07rem]">
                <BulletListIconButton showBulletPoints={showBulletPoints} onClick={handleShowBulletPoints}/>
              </div>
            </div>
          </FormSection>);
        })}
    </Form>);
};
