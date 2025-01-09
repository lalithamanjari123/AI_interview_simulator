import { cx } from "../../../../../lib/cx";
export var Table = function (_a) {
    var table = _a.table, title = _a.title, className = _a.className, _b = _a.trClassNames, trClassNames = _b === void 0 ? [] : _b, _c = _a.tdClassNames, tdClassNames = _c === void 0 ? [] : _c;
    var tableHeader = table[0];
    var tableBody = table.slice(1);
    return (<table className={cx("w-full divide-y border text-sm text-gray-900", className)}>
      <thead className="divide-y bg-gray-50 text-left align-top">
        {title && (<tr className="divide-x bg-gray-50">
            <th className="px-2 py-1.5 font-bold" scope="colSpan" colSpan={tableHeader.length}>
              {title}
            </th>
          </tr>)}
        <tr className="divide-x bg-gray-50">
          {tableHeader.map(function (item, idx) { return (<th className="px-2 py-1.5 font-semibold" scope="col" key={idx}>
              {item}
            </th>); })}
        </tr>
      </thead>
      <tbody className="divide-y text-left align-top">
        {tableBody.map(function (row, rowIdx) { return (<tr className={cx("divide-x", trClassNames[rowIdx])} key={rowIdx}>
            {row.map(function (item, colIdx) { return (<td className={cx("px-2 py-1.5", tdClassNames[colIdx])} key={colIdx}>
                {item}
              </td>); })}
          </tr>); })}
      </tbody>
    </table>);
};
