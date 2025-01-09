// Reference: https://dev.to/igorovic/simplest-way-to-persist-redux-state-to-localstorage-e67
var LOCAL_STORAGE_KEY = "open-resume-state";
export var loadStateFromLocalStorage = function () {
    try {
        var stringifiedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!stringifiedState)
            return undefined;
        return JSON.parse(stringifiedState);
    }
    catch (e) {
        return undefined;
    }
};
export var saveStateToLocalStorage = function (state) {
    try {
        var stringifiedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedState);
    }
    catch (e) {
        // Ignore
    }
};
export var getHasUsedAppBefore = function () { return Boolean(loadStateFromLocalStorage()); };
