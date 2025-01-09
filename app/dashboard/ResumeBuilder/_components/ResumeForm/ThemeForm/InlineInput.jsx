export var InlineInput = function (_a) {
    var label = _a.label, labelClassName = _a.labelClassName, name = _a.name, _b = _a.value, value = _b === void 0 ? "" : _b, placeholder = _a.placeholder, _c = _a.inputStyle, inputStyle = _c === void 0 ? {} : _c, onChange = _a.onChange;
    return (<label className={"flex gap-2 text-base font-medium text-gray-700 ".concat(labelClassName)}>
      <span className="w-28">{label}</span>
      <input type="text" name={name} value={value} placeholder={placeholder} onChange={function (e) { return onChange(name, e.target.value); }} className="w-[5rem] border-b border-gray-300 text-center font-semibold leading-3 outline-none" style={inputStyle}/>
    </label>);
};
