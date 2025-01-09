import { Form, FormSection } from "../../_components/ResumeForm/Form";
import { Input, BulletListTextarea, } from "../../_components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";
import { selectProjects, changeProjects } from "../../../../../lib/redux/resumeSlice";
export var ProjectsForm = function () {
    var projects = useAppSelector(selectProjects);
    var dispatch = useAppDispatch();
    var showDelete = projects.length > 1;
    return (<Form form="projects" addButtonText="Add Project">
      {projects.map(function (_a, idx) {
            var project = _a.project, date = _a.date, descriptions = _a.descriptions;
            var handleProjectChange = function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var field = _a[0], value = _a[1];
                dispatch(changeProjects({ idx: idx, field: field, value: value }));
            };
            var showMoveUp = idx !== 0;
            var showMoveDown = idx !== projects.length - 1;
            return (<FormSection key={idx} form="projects" idx={idx} showMoveUp={showMoveUp} showMoveDown={showMoveDown} showDelete={showDelete} deleteButtonTooltipText={"Delete project"}>
            <Input name="project" label="Project Name" placeholder="OpenResume" value={project} onChange={handleProjectChange} labelClassName="col-span-4"/>
            <Input name="date" label="Date" placeholder="Winter 2022" value={date} onChange={handleProjectChange} labelClassName="col-span-2"/>
            <BulletListTextarea name="descriptions" label="Description" placeholder="Bullet points" value={descriptions} onChange={handleProjectChange} labelClassName="col-span-full"/>
          </FormSection>);
        })}
    </Form>);
};
