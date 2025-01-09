import { Form } from "../../_components/ResumeForm/Form";
import { BulletListIconButton } from "../../_components/ResumeForm/Form/IconButton";
import { BulletListTextarea } from "../../_components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";
import { changeCustom, selectCustom } from "../../../../../lib/redux/resumeSlice";
import { selectShowBulletPoints, changeShowBulletPoints, } from "../../../../../lib/redux/settingsSlice";
export var CustomForm = function () {
    var custom = useAppSelector(selectCustom);
    var dispatch = useAppDispatch();
    var descriptions = custom.descriptions;
    var form = "custom";
    var showBulletPoints = useAppSelector(selectShowBulletPoints(form));
    var handleCustomChange = function (field, value) {
        dispatch(changeCustom({ field: field, value: value }));
    };
    var handleShowBulletPoints = function (value) {
        dispatch(changeShowBulletPoints({ field: form, value: value }));
    };
    return (<Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea label="Custom Textbox" labelClassName="col-span-full" name="descriptions" placeholder="Bullet points" value={descriptions} onChange={handleCustomChange} showBulletPoints={showBulletPoints}/>
          <div className="absolute left-[7.7rem] top-[0.07rem]">
            <BulletListIconButton showBulletPoints={showBulletPoints} onClick={handleShowBulletPoints}/>
          </div>
        </div>
      </div>
    </Form>);
};
