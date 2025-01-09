"use client";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
  if (pack || arguments.length === 2) {
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

/**
 * Suppress ResumePDF development errors.
 * See ResumePDF doc string for context.
 */
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  const consoleError_1 = console.error;
  const SUPPRESSED_WARNINGS_1 = ["DOCUMENT", "PAGE", "TEXT", "VIEW"];

  console.error = function filterWarnings(msg) {
    const args = [];
    for (let _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    const firstArg = args[0];

    // Ensure the first argument is a string before calling .includes
    if (
      !SUPPRESSED_WARNINGS_1.some((entry) => {
        return typeof firstArg === "string" && firstArg.includes(entry);
      })
    ) {
      consoleError_1.apply(void 0, __spreadArray([msg], args, false));
    }
  };
}

export const SuppressResumePDFErrorMessage = function () {
  return <></>;
};
