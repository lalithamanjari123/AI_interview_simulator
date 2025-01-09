"use client";
import { useState, useMemo } from "react";
import { ResumeIframeCSR } from "../../_components/Resume/ResumeIFrame";
import { ResumePDF } from "../../_components/Resume/ResumePDF";
import { ResumeControlBarCSR, ResumeControlBarBorder, } from "../../_components/Resume/ResumeControlBar";
import { FlexboxSpacer } from "../../_components/FlexboxSpacer";
import { useAppSelector } from "../../../../../lib/redux/hooks";
import { selectResume } from "../../../../../lib/redux/resumeSlice";
import { selectSettings } from "../../../../../lib/redux/settingsSlice";
import { DEBUG_RESUME_PDF_FLAG } from "../../../../../lib/constants";
import { useRegisterReactPDFFont, useRegisterReactPDFHyphenationCallback, } from "../../_components/fonts/hooks";
import { NonEnglishFontsCSSLazyLoader } from "../../_components/fonts/NonEnglishFontsCSSLoader";
export var Resume = function () {
    var _a = useState(0.8), scale = _a[0], setScale = _a[1];
    var resume = useAppSelector(selectResume);
    var settings = useAppSelector(selectSettings);
    var document = useMemo(function () { return <ResumePDF resume={resume} settings={settings} isPDF={true}/>; }, [resume, settings]);
    useRegisterReactPDFFont();
    useRegisterReactPDFHyphenationCallback(settings.fontFamily);
    return (<>
      <NonEnglishFontsCSSLazyLoader />
      <div className="relative flex justify-center md:justify-start">
        <FlexboxSpacer maxWidth={50} className="hidden md:block"/>
        <div className="relative">
          <section className="h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))] overflow-hidden md:p-[var(--resume-padding)]">
            <ResumeIframeCSR documentSize={settings.documentSize} scale={scale} enablePDFViewer={DEBUG_RESUME_PDF_FLAG}>
              <ResumePDF resume={resume} settings={settings} isPDF={DEBUG_RESUME_PDF_FLAG}/>
            </ResumeIframeCSR>
          </section>
          <ResumeControlBarCSR scale={scale} setScale={setScale} documentSize={settings.documentSize} document={document} fileName={resume.profile.name + " - Resume"}/>
        </div>
        <ResumeControlBarBorder />
      </div>
    </>);
};
