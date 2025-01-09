var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState } from "react";
import { INPUT_CLASS_NAME } from "../../ResumeForm/Form/InputGroup";
export var FeaturedSkillInput = function (_a) {
    var skill = _a.skill, rating = _a.rating, setSkillRating = _a.setSkillRating, placeholder = _a.placeholder, className = _a.className, circleColor = _a.circleColor;
    return (<div className={"flex ".concat(className)}>
      <input type="text" value={skill} placeholder={placeholder} onChange={function (e) { return setSkillRating(e.target.value, rating); }} className={INPUT_CLASS_NAME}/>
      <CircleRating rating={rating} setRating={function (newRating) { return setSkillRating(skill, newRating); }} circleColor={circleColor}/>
    </div>);
};
var CircleRating = function (_a) {
    var rating = _a.rating, setRating = _a.setRating, _b = _a.circleColor, circleColor = _b === void 0 ? "#38bdf8" : _b;
    var numCircles = 5;
    var _c = useState(null), hoverRating = _c[0], setHoverRating = _c[1];
    return (<div className="flex items-center p-2">
      {__spreadArray([], Array(numCircles), true).map(function (_, idx) { return (<div className={"cursor-pointer p-0.5"} key={idx} onClick={function () { return setRating(idx); }} onMouseEnter={function () { return setHoverRating(idx); }} onMouseLeave={function () { return setHoverRating(null); }}>
          <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] " style={{
                backgroundColor: (hoverRating !== null && hoverRating >= idx) ||
                    (hoverRating === null && rating >= idx)
                    ? circleColor
                    : "#d1d5db", //gray-300
            }}/>
        </div>); })}
    </div>);
};
