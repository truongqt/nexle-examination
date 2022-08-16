import { combineReducers, Reducer } from "redux";
import user from "./user/slice";
import ui from './ui/slice';
import category from "./categories/slice";
import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const appReducer = combineReducers({
    user,
    ui,
    category
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;