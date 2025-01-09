"use client";
import { useState } from "react";
import { useAppSelector, useSaveStateToLocalStorageOnChange, useSetInitialStore, } from "../../../../../lib/redux/hooks";
import { selectFormsOrder } from "../../../../../lib/redux/settingsSlice";
import { ProfileForm } from "../../_components/ResumeForm/ProfileForm";
import { WorkExperiencesForm } from "../../_components/ResumeForm/WorkExperiencesForm";
import { EducationsForm } from "../../_components/ResumeForm/EducationsForm";
import { ProjectsForm } from "../../_components/ResumeForm/ProjectsForm";
import { SkillsForm } from "../../_components/ResumeForm/SkillsForm";
import { ThemeForm } from "../../_components/ResumeForm/ThemeForm";
import { CustomForm } from "../../_components/ResumeForm/CustomForm";
import { FlexboxSpacer } from "../../_components/FlexboxSpacer";
import { cx } from "../../../../../lib/cx";
var formTypeToComponent = {
    workExperiences: WorkExperiencesForm,
    educations: EducationsForm,
    projects: ProjectsForm,
    skills: SkillsForm,
    custom: CustomForm,
};
export var ResumeForm = function () {
    useSetInitialStore();
    useSaveStateToLocalStorageOnChange();
    var formsOrder = useAppSelector(selectFormsOrder);
    var _a = useState(false), isHover = _a[0], setIsHover = _a[1];
    return (<div className={cx("flex justify-center scrollbar-thin scrollbar-track-gray-100 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end md:overflow-y-scroll", isHover ? "scrollbar-thumb-gray-200" : "scrollbar-thumb-gray-100")} onMouseOver={function () { return setIsHover(true); }} onMouseLeave={function () { return setIsHover(false); }}>
      <section className="flex max-w-2xl flex-col gap-8 p-[var(--resume-padding)]">
        <ProfileForm />
        {formsOrder.map(function (form) {
            var Component = formTypeToComponent[form];
            return <Component key={form}/>;
        })}
        <ThemeForm />
        <br />
      </section>
      <FlexboxSpacer maxWidth={50} className="hidden md:block"/>
    </div>);
};
