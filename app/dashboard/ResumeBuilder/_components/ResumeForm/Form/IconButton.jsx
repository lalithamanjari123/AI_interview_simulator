import { IconButton } from "../../../_components/Button";
import { EyeIcon, EyeSlashIcon, ArrowSmallUpIcon, ArrowSmallDownIcon, TrashIcon, ListBulletIcon, } from "@heroicons/react/24/outline";
export var ShowIconButton = function (_a) {
    var show = _a.show, setShow = _a.setShow;
    var tooltipText = show ? "Hide section" : "Show section";
    var onClick = function () {
        setShow(!show);
    };
    var Icon = show ? EyeIcon : EyeSlashIcon;
    return (<IconButton onClick={onClick} tooltipText={tooltipText}>
      <Icon className="h-6 w-6 text-gray-400" aria-hidden="true"/>
      <span className="sr-only">{tooltipText}</span>
    </IconButton>);
};
export var MoveIconButton = function (_a) {
    var type = _a.type, _b = _a.size, size = _b === void 0 ? "medium" : _b, onClick = _a.onClick;
    var tooltipText = type === "up" ? "Move up" : "Move down";
    var sizeClassName = size === "medium" ? "h-6 w-6" : "h-4 w-4";
    var Icon = type === "up" ? ArrowSmallUpIcon : ArrowSmallDownIcon;
    return (<IconButton onClick={function () { return onClick(type); }} tooltipText={tooltipText} size={size}>
      <Icon className={"".concat(sizeClassName, " text-gray-400")} aria-hidden="true"/>
      <span className="sr-only">{tooltipText}</span>
    </IconButton>);
};
export var DeleteIconButton = function (_a) {
    var onClick = _a.onClick, tooltipText = _a.tooltipText;
    return (<IconButton onClick={onClick} tooltipText={tooltipText} size="small">
      <TrashIcon className="h-4 w-4 text-gray-400" aria-hidden="true"/>
      <span className="sr-only">{tooltipText}</span>
    </IconButton>);
};
export var BulletListIconButton = function (_a) {
    var onClick = _a.onClick, showBulletPoints = _a.showBulletPoints;
    var tooltipText = showBulletPoints
        ? "Hide bullet points"
        : "Show bullet points";
    return (<IconButton onClick={function () { return onClick(!showBulletPoints); }} tooltipText={tooltipText} size="small" className={showBulletPoints ? "!bg-sky-100" : ""}>
      <ListBulletIcon className={"h-4 w-4 ".concat(showBulletPoints ? "text-gray-700" : "text-gray-400")} aria-hidden="true"/>
      <span className="sr-only">{tooltipText}</span>
    </IconButton>);
};
