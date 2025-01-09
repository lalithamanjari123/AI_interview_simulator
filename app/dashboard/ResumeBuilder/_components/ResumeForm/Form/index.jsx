import { ExpanderWithHeightTransition } from "../../../_components/ExpanderWithHeightTransition";
import { DeleteIconButton, MoveIconButton, ShowIconButton, } from "../../../_components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "../../../../../../lib/redux/hooks";
import { changeFormHeading, changeFormOrder, changeShowForm, selectHeadingByForm, selectIsFirstForm, selectIsLastForm, selectShowByForm, } from "../../../../../../lib/redux/settingsSlice";
import { BuildingOfficeIcon, AcademicCapIcon, LightBulbIcon, WrenchIcon, PlusSmallIcon, } from "@heroicons/react/24/outline";
import { addSectionInForm, deleteSectionInFormByIdx, moveSectionInForm, } from "../../../../../../lib/redux/resumeSlice";
/**
 * BaseForm is the bare bone form, i.e. just the outline with no title and no control buttons.
 * ProfileForm uses this to compose its outline.
 */
export var BaseForm = function (_a) {
    var children = _a.children, className = _a.className;
    return (<section className={"flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 ".concat(className)}>
    {children}
  </section>);
};
var FORM_TO_ICON = {
    workExperiences: BuildingOfficeIcon,
    educations: AcademicCapIcon,
    projects: LightBulbIcon,
    skills: WrenchIcon,
    custom: WrenchIcon,
};
export var Form = function (_a) {
    var form = _a.form, addButtonText = _a.addButtonText, children = _a.children;
    var showForm = useAppSelector(selectShowByForm(form));
    var heading = useAppSelector(selectHeadingByForm(form));
    var dispatch = useAppDispatch();
    var setShowForm = function (showForm) {
        dispatch(changeShowForm({ field: form, value: showForm }));
    };
    var setHeading = function (heading) {
        dispatch(changeFormHeading({ field: form, value: heading }));
    };
    var isFirstForm = useAppSelector(selectIsFirstForm(form));
    var isLastForm = useAppSelector(selectIsLastForm(form));
    var handleMoveClick = function (type) {
        dispatch(changeFormOrder({ form: form, type: type }));
    };
    var Icon = FORM_TO_ICON[form];
    return (<BaseForm className={"transition-opacity duration-200 ".concat(showForm ? "pb-6" : "pb-2 opacity-60")}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-2">
          <Icon className="h-6 w-6 text-gray-600" aria-hidden="true"/>
          <input type="text" className="block w-full border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm" value={heading} onChange={function (e) { return setHeading(e.target.value); }}/>
        </div>
        <div className="flex items-center gap-0.5">
          {!isFirstForm && (<MoveIconButton type="up" onClick={handleMoveClick}/>)}
          {!isLastForm && (<MoveIconButton type="down" onClick={handleMoveClick}/>)}
          <ShowIconButton show={showForm} setShow={setShowForm}/>
        </div>
      </div>
      <ExpanderWithHeightTransition expanded={showForm}>
        {children}
      </ExpanderWithHeightTransition>
      {showForm && addButtonText && (<div className="mt-2 flex justify-end">
          <button type="button" onClick={function () {
                dispatch(addSectionInForm({ form: form }));
            }} className="flex items-center rounded-md bg-white py-2 pl-3 pr-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <PlusSmallIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
            {addButtonText}
          </button>
        </div>)}
    </BaseForm>);
};
export var FormSection = function (_a) {
    var form = _a.form, idx = _a.idx, showMoveUp = _a.showMoveUp, showMoveDown = _a.showMoveDown, showDelete = _a.showDelete, deleteButtonTooltipText = _a.deleteButtonTooltipText, children = _a.children;
    var dispatch = useAppDispatch();
    var handleDeleteClick = function () {
        dispatch(deleteSectionInFormByIdx({ form: form, idx: idx }));
    };
    var handleMoveClick = function (direction) {
        dispatch(moveSectionInForm({ form: form, direction: direction, idx: idx }));
    };
    return (<>
      {idx !== 0 && (<div className="mb-4 mt-6 border-t-2 border-dotted border-gray-200"/>)}
      <div className="relative grid grid-cols-6 gap-3">
        {children}
        <div className={"absolute right-0 top-0 flex gap-0.5 "}>
          <div className={"transition-all duration-300 ".concat(showMoveUp ? "" : "invisible opacity-0", " ").concat(showMoveDown ? "" : "-mr-6")}>
            <MoveIconButton type="up" size="small" onClick={function () { return handleMoveClick("up"); }}/>
          </div>
          <div className={"transition-all duration-300 ".concat(showMoveDown ? "" : "invisible opacity-0")}>
            <MoveIconButton type="down" size="small" onClick={function () { return handleMoveClick("down"); }}/>
          </div>
          <div className={"transition-all duration-300 ".concat(showDelete ? "" : "invisible opacity-0")}>
            <DeleteIconButton onClick={handleDeleteClick} tooltipText={deleteButtonTooltipText}/>
          </div>
        </div>
      </div>
    </>);
};
