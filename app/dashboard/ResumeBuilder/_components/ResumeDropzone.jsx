var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { parseResumeFromPdf } from "../../../../lib/parse-resume-from-pdf";
import { getHasUsedAppBefore, saveStateToLocalStorage, } from "../../../../lib/redux/local-storage";
import { initialSettings } from "../../../../lib/redux/settingsSlice";
import { useRouter } from "next/navigation";
import addPdfSrc from "../../../../public/assets/add-pdf.svg";
import Image from "next/image";
import { cx } from "../../../../lib/cx";
import { deepClone } from "../../../../lib/deep-clone";
var defaultFileState = {
    name: "",
    size: 0,
    fileUrl: "",
};
export var ResumeDropzone = function (_a) {
    var onFileUrlChange = _a.onFileUrlChange, className = _a.className, _b = _a.playgroundView, playgroundView = _b === void 0 ? false : _b;
    var _c = useState(defaultFileState), file = _c[0], setFile = _c[1];
    var _d = useState(false), isHoveredOnDropzone = _d[0], setIsHoveredOnDropzone = _d[1];
    var _e = useState(false), hasNonPdfFile = _e[0], setHasNonPdfFile = _e[1];
    var router = useRouter();
    var hasFile = Boolean(file.name);
    var setNewFile = function (newFile) {
        if (file.fileUrl) {
            URL.revokeObjectURL(file.fileUrl);
        }
        var name = newFile.name, size = newFile.size;
        var fileUrl = URL.createObjectURL(newFile);
        setFile({ name: name, size: size, fileUrl: fileUrl });
        onFileUrlChange(fileUrl);
    };
    var onDrop = function (event) {
        event.preventDefault();
        var newFile = event.dataTransfer.files[0];
        if (newFile.name.endsWith(".pdf")) {
            setHasNonPdfFile(false);
            setNewFile(newFile);
        }
        else {
            setHasNonPdfFile(true);
        }
        setIsHoveredOnDropzone(false);
    };
    var onInputChange = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var files, newFile;
        return __generator(this, function (_a) {
            files = event.target.files;
            if (!files)
                return [2 /*return*/];
            newFile = files[0];
            setNewFile(newFile);
            return [2 /*return*/];
        });
    }); };
    var onRemove = function () {
        setFile(defaultFileState);
        onFileUrlChange("");
    };
    var onImportClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var resume, settings, sections, sectionToFormToShow, _i, sections_1, section;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseResumeFromPdf(file.fileUrl)];
                case 1:
                    resume = _a.sent();
                    settings = deepClone(initialSettings);
                    // Set formToShow settings based on uploaded resume if users have used the app before
                    if (getHasUsedAppBefore()) {
                        sections = Object.keys(settings.formToShow);
                        sectionToFormToShow = {
                            workExperiences: resume.workExperiences.length > 0,
                            educations: resume.educations.length > 0,
                            projects: resume.projects.length > 0,
                            skills: resume.skills.descriptions.length > 0,
                            custom: resume.custom.descriptions.length > 0,
                        };
                        for (_i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
                            section = sections_1[_i];
                            settings.formToShow[section] = sectionToFormToShow[section];
                        }
                    }
                    saveStateToLocalStorage({ resume: resume, settings: settings });
                    router.push("/resume-builder");
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className={cx("flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 ", isHoveredOnDropzone && "border-sky-400", playgroundView ? "pb-6 pt-4" : "py-12", className)} onDragOver={function (event) {
            event.preventDefault();
            setIsHoveredOnDropzone(true);
        }} onDragLeave={function () { return setIsHoveredOnDropzone(false); }} onDrop={onDrop}>
      <div className={cx("text-center", playgroundView ? "space-y-2" : "space-y-3")}>
        {!playgroundView && (<Image src={addPdfSrc} className="mx-auto h-14 w-14" alt="Add pdf" aria-hidden="true" priority/>)}
        {!hasFile ? (<>
            <p className={cx("pt-3 text-gray-700", !playgroundView && "text-lg font-semibold")}>
              Browse a pdf file or drop it here
            </p>
            <p className="flex text-sm text-gray-500">
              <LockClosedIcon className="mr-1 mt-1 h-3 w-3 text-gray-400"/>
              File data is used locally and never leaves your browser
            </p>
          </>) : (<div className="flex items-center justify-center gap-3 pt-3">
            <div className="pl-7 font-semibold text-gray-900">
              {file.name} - {getFileSizeString(file.size)}
            </div>
            <button type="button" className="outline-theme-blue rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500" title="Remove file" onClick={onRemove}>
              <XMarkIcon className="h-6 w-6"/>
            </button>
          </div>)}
        <div className="pt-4">
          {!hasFile ? (<>
              <label className={cx("within-outline-theme-purple cursor-pointer rounded-full px-6 pb-2.5 pt-2 font-semibold shadow-sm", playgroundView ? "border" : "bg-primary")}>
                Browse file
                <input type="file" className="sr-only" accept=".pdf" onChange={onInputChange}/>
              </label>
              {hasNonPdfFile && (<p className="mt-6 text-red-400">Only pdf file is supported</p>)}
            </>) : (<>
              {!playgroundView && (<button type="button" className="btn-primary" onClick={onImportClick}>
                  Import and Continue <span aria-hidden="true">→</span>
                </button>)}
              <p className={cx(" text-gray-500", !playgroundView && "mt-6")}>
                Note: {!playgroundView ? "Import" : "Parser"} works best on
                single column resume
              </p>
            </>)}
        </div>
      </div>
    </div>);
};
var getFileSizeString = function (fileSizeB) {
    var fileSizeKB = fileSizeB / 1024;
    var fileSizeMB = fileSizeKB / 1024;
    if (fileSizeKB < 1000) {
        return fileSizeKB.toPrecision(3) + " KB";
    }
    else {
        return fileSizeMB.toPrecision(3) + " MB";
    }
};
