import { useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { store } from "../../lib/redux/store";
import { loadStateFromLocalStorage, saveStateToLocalStorage, } from "../../lib/redux/local-storage";
import { initialResumeState, setResume } from "../../lib/redux/resumeSlice";
import { initialSettings, setSettings, } from "../../lib/redux/settingsSlice";
import { deepMerge } from "../../lib/deep-merge";
export var useAppDispatch = useDispatch;
export var useAppSelector = useSelector;
/**
 * Hook to save store to local storage on store change
 */
export var useSaveStateToLocalStorageOnChange = function () {
    useEffect(function () {
        var unsubscribe = store.subscribe(function () {
            saveStateToLocalStorage(store.getState());
        });
        return unsubscribe;
    }, []);
};
export var useSetInitialStore = function () {
    var dispatch = useAppDispatch();
    useEffect(function () {
        var state = loadStateFromLocalStorage();
        if (!state)
            return;
        if (state.resume) {
            // We merge the initial state with the stored state to ensure
            // backward compatibility, since new fields might be added to
            // the initial state over time.
            var mergedResumeState = deepMerge(initialResumeState, state.resume);
            dispatch(setResume(mergedResumeState));
        }
        if (state.settings) {
            var mergedSettingsState = deepMerge(initialSettings, state.settings);
            dispatch(setSettings(mergedSettingsState));
        }
    }, []);
};
