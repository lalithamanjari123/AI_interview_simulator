import { BaseForm } from "../../../_components/ResumeForm/Form";
import { InputGroupWrapper } from "../../../_components/ResumeForm/Form/InputGroup";
import { THEME_COLORS } from "../../../_components/ResumeForm/ThemeForm/constants";
import { InlineInput } from "../../../_components/ResumeForm/ThemeForm/InlineInput";
import { DocumentSizeSelections, FontFamilySelectionsCSR, FontSizeSelections, } from "../../../_components/ResumeForm/ThemeForm/Selection";
import { changeSettings, DEFAULT_THEME_COLOR, selectSettings, } from "../../../../../../lib/redux/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../../../lib/redux/hooks";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
export var ThemeForm = function () {
    var settings = useAppSelector(selectSettings);
    var fontSize = settings.fontSize, fontFamily = settings.fontFamily, documentSize = settings.documentSize;
    var themeColor = settings.themeColor || DEFAULT_THEME_COLOR;
    var dispatch = useAppDispatch();
    var handleSettingsChange = function (field, value) {
        dispatch(changeSettings({ field: field, value: value }));
    };
    return (<BaseForm>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Cog6ToothIcon className="h-6 w-6 text-gray-600" aria-hidden="true"/>
          <h1 className="text-lg font-semibold tracking-wide text-gray-900 ">
            Resume Setting
          </h1>
        </div>
        <div>
          <InlineInput label="Theme Color" name="themeColor" value={settings.themeColor} placeholder={DEFAULT_THEME_COLOR} onChange={handleSettingsChange} inputStyle={{ color: themeColor }}/>
          <div className="mt-2 flex flex-wrap gap-2">
            {THEME_COLORS.map(function (color, idx) { return (<div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm text-white" style={{ backgroundColor: color }} key={idx} onClick={function () { return handleSettingsChange("themeColor", color); }} onKeyDown={function (e) {
                if (["Enter", " "].includes(e.key))
                    handleSettingsChange("themeColor", color);
            }} tabIndex={0}>
                {settings.themeColor === color ? "✓" : ""}
              </div>); })}
          </div>
        </div>
        <div>
          <InputGroupWrapper label="Font Family"/>
          <FontFamilySelectionsCSR selectedFontFamily={fontFamily} themeColor={themeColor} handleSettingsChange={handleSettingsChange}/>
        </div>
        <div>
          <InlineInput label="Font Size (pt)" name="fontSize" value={fontSize} placeholder="11" onChange={handleSettingsChange}/>
          <FontSizeSelections fontFamily={fontFamily} themeColor={themeColor} selectedFontSize={fontSize} handleSettingsChange={handleSettingsChange}/>
        </div>
        <div>
          <InputGroupWrapper label="Document Size"/>
          <DocumentSizeSelections themeColor={themeColor} selectedDocumentSize={documentSize} handleSettingsChange={handleSettingsChange}/>
        </div>
      </div>
    </BaseForm>);
};
