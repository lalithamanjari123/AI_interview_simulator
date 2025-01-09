import { BaseForm } from "../../_components/ResumeForm/Form";
import { Input, Textarea } from "../../_components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";
import { changeProfile, selectProfile } from "../../../../../lib/redux/resumeSlice";
export var ProfileForm = function () {
    var profile = useAppSelector(selectProfile);
    var dispatch = useAppDispatch();
    var name = profile.name, email = profile.email, phone = profile.phone, url = profile.url, summary = profile.summary, location = profile.location;
    var handleProfileChange = function (field, value) {
        dispatch(changeProfile({ field: field, value: value }));
    };
    return (<BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input label="Name" labelClassName="col-span-full" name="name" placeholder="Sal Khan" value={name} onChange={handleProfileChange}/>
        <Textarea label="Objective" labelClassName="col-span-full" name="summary" placeholder="Entrepreneur and educator obsessed with making education free for anyone" value={summary} onChange={handleProfileChange}/>
        <Input label="Email" labelClassName="col-span-4" name="email" placeholder="hello@khanacademy.org" value={email} onChange={handleProfileChange}/>
        <Input label="Phone" labelClassName="col-span-2" name="phone" placeholder="(123)456-7890" value={phone} onChange={handleProfileChange}/>
        <Input label="Website" labelClassName="col-span-4" name="url" placeholder="linkedin.com/in/khanacademy" value={url} onChange={handleProfileChange}/>
        <Input label="Location" labelClassName="col-span-2" name="location" placeholder="NYC, NY" value={location} onChange={handleProfileChange}/>
      </div>
    </BaseForm>);
};
